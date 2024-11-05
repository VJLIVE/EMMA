// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import './Login.css'; // Import your CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleloginorsignup = () => {
    navigate(`/signup`); // Adjust the route based on your routing setup
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // After successful login, redirect to AskPin page
      navigate("/askpin");
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="login-input" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="login-input" 
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="loginorsignup" onClick={handleloginorsignup}>Don't have an account?</button>
    </div>
  );
};

export default Login;
