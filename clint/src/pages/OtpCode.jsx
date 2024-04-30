import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";

function OtpCode() {
  document.title = "Confirm Email";
  const [loading, setLoading] = useState(false); // State for loading state
  const [resetEmail, setResetEmail] = useState(""); // State for reset email

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (email) {
      setResetEmail(email);
    }
  }, []);

  return (
    <>
      <Link to="/forgetpassword">
        <Angle />
      </Link>
      <div className="container">
        <img src={logo} alt="" />
        <div className="parent">
          <div className="top">
            <h2>forgot password</h2>
            <p>We just sent a code to {resetEmail}.</p>
          </div>
          <div className="form">
            <input type="number" maxLength={6} placeholder="Enter Code" />
            <Link to="http://localhost:3001/newpass">
              <button className="action_btn">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpCode;
