// src/pages/SetPin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, setDoc, doc } from "../firebase";
import './SetPin.css'; // Import your CSS file for styling

const SetPin = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const navigate = useNavigate();

  const handleSetPin = async (e) => {
    e.preventDefault();
    
    // Check if the pins match
    if (pin !== confirmPin) {
      alert("Pins do not match. Please try again.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        // Store the pin in the user's Firestore document
        await setDoc(doc(db, "users", user.uid), { pin }, { merge: true });

        // Redirect to Dashboard after setting the pin
        navigate("/dashboard");
      } catch (error) {
        console.error("Error setting pin:", error.message);
      }
    } else {
      alert("No user is logged in.");
    }
  };

  return (
    <div className="set-pin-container">
      <h2>Set Your Pin</h2>
      <form onSubmit={handleSetPin} className="set-pin-form">
        <input 
          type="password" 
          placeholder="Set Pin" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          required 
          className="pin-input"
        />
        <input 
          type="password" 
          placeholder="Confirm Pin" 
          value={confirmPin} 
          onChange={(e) => setConfirmPin(e.target.value)} 
          required 
          className="pin-input"
        />
        <button type="submit" className="set-pin-button">Set Pin</button>
      </form>
    </div>
  );
};

export default SetPin;
