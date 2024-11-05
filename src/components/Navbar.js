// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth"; // For Firebase sign out functionality
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-brand">EMMA</h2>
        <div className="navbar-links">
          {/* Show links depending on the user authentication status */}
          {user ? (
            // Links for logged-in users
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/setpin">Reset Pin</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            // Links for logged-out users
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
