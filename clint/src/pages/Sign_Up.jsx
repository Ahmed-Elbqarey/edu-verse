import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";

function SignUp() {
  document.title = "Sign Up";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // State for loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    let formValid = true;
    let newErrors = { ...errors };

    if (!formData.username) {
      formValid = false;
      newErrors.username = "Username is required";
    }

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
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        formData.password
      )
    ) {
      formValid = false;
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
    }

    if (!formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = "Passwords do not match";
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
        "http://localhost:3000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response.data); // Log the response from the server

      // Optionally, clear the form after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Show success message
      Swal.fire("Success", "User registered successfully!", "success");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    } catch (error) {
      // Set loading state
      setLoading(false);
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.includes("duplicate key error")
      ) {
        if (error.response.data.error.includes("username")) {
          setErrors({ ...errors, username: "Username is already taken" });
        } else if (error.response.data.error.includes("email")) {
          setErrors({ ...errors, email: "Email is already taken" });
        }
      } else {
        Swal.fire("Error", "Server error. Please try again.", "error");
      }
    }
  };

  return (
    <>
      <Link to="/signin">
        <Angle />
      </Link>
      <div className="container">
        <img src={logo} alt="" />
        <div className="parent">
          <div className="top">
            <h2>Sign up</h2>
            <p>Welcome to edu vrse.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {errors.username && <p className="error">{errors.username}</p>}
            <input
              onChange={handleChange}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className={errors.username ? "error" : ""}
            />
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
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}  
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className={errors.confirmPassword ? "error" : ""}
            />

            <button type="submit" className="action_btn" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
