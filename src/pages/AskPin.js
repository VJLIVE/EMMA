// src/pages/AskPin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, getDoc, doc } from "../firebase";
import './AskPin.css'; // Import your CSS file for styling

const AskPin = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
      try {
        // Fetch the stored pin from Firestore for the logged-in user
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const storedPin = userDoc.data().pin;

          // Check if the entered pin matches the stored pin
          if (storedPin === pin) {
            // Pin matches, redirect to Dashboard
            navigate("/dashboard");
          } else {
            alert("Incorrect Pin. Please try again.");
          }
        } else {
          alert("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching pin:", error.message);
      }
    } else {
      alert("No user is logged in.");
    }
  };

  return (
    <div className="ask-pin-container">
      <h2 className="ask-pin-title">Enter Your Pin</h2>
      <form className="ask-pin-form" onSubmit={handleLogin}>
        <input 
          type="password" 
          placeholder="Enter Pin" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          required 
          className="pin-input" 
        />
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default AskPin;
