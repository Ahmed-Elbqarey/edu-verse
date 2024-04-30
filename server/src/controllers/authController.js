const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email , password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email, 
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If user not found or password doesn't match
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (user) {
      // If the user exists, you can choose to send an email with a password reset link here.
      // For simplicity, let's just return a success message for now.
      return res.json({ success: true, message: 'Password reset email sent successfully.' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const checkResetToken = (req, res) => {
  try {
    const { token } = req.body;

    // Check if the token matches the predefined value
    const isTokenValid = token === '888888';

    if (isTokenValid) {
      return res.json({ success: true, message: 'Valid token. You can now change the password.' });
    } else {
      return res.status(404).json({ success: false, message: 'Invalid token. Please try again.' });
    }
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};


// enter new passord and  enter email and   allow the user to change the password for this email 

const enterNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate email and new password
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email and new password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true, message: 'Password updated successfully.' });
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};


module.exports = { register, login, forgetPassword, checkResetToken, enterNewPassword };

 
 