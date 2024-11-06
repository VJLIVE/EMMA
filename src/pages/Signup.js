// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from "../firebase";
import './Signup.css'; // Import your CSS file for styling

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleloginorsignup = () => {
    navigate(`/login`); // Adjust the route based on your routing setup
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user's name, email, and initial fields in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        pin: "",       // Initially, the pin is empty
        wallets: [],   // Initialize with an empty wallets array
        hidden: []
      });

      // Redirect to SetPin page after signup
      navigate("/setpin");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="signup-input" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="signup-input" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="signup-input" 
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <button className="loginorsignup" onClick={handleloginorsignup}>Already have an account?</button>
    </div>
  );
};

export default Signup;
