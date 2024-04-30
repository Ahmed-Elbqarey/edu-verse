import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";

function SignIn() {
  document.title = "Sign In";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  }); 

  const [loading, setLoading] = useState(false); // State for loading state
  const [generalError, setGeneralError] = useState(""); // State for general error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setGeneralError(""); // Clear the general error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    let formValid = true;
    let newErrors = { ...errors };

    if (!formData.email) {
      formValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formValid = false;
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      formValid = false;
      newErrors.password = "Password is required";
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Send data to the server
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const token = response.data;
      console.log(token);
      // Optionally, clear the form after successful submission
      setFormData({
        email: "",
        password: "",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You are logged in successfully",
      });
      // Clear the general error message
      setGeneralError("");
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 3000);
    } catch (error) {
      console.error("Error:", error);
        // Set loading state
    setLoading(false);
      // Handle login errors
      if (error.response && error.response.status === 401) {
        setGeneralError("Invalid email or password");
      } else {
        setGeneralError("Server error. Please try again later.");
        // Swal.fire("Error", "Server error. Please try again later.", "error");
      }
    }
  };

  return (
    <>
      <Link to="/">
        <Angle />
      </Link>
      <div className="container">
        <img src={logo} alt="" />
        <div className="parent">
          <div className="top">
            <h2>Sign in</h2>
            <p>Welcome back to edu vrse.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {generalError && <p className="error">{generalError}</p>}
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className={errors.password ? "error" : ""}
            />
            <button type="submit" className="action_btn" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
            <Link to="/forgetpassword">Forgot Password?</Link>
            <Link to="/signup">Don't have an account? Sign Up Now</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
