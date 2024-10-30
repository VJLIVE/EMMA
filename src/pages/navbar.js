// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth
import './Navbar.css'; // Import CSS file

function Navbar({ user }) {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">EMMA</h1>
      <div className="links">
        {user ? (
          <>
            <Link to="/dashboard" className="link">Dashboard</Link>
            <Link to="/events" className="link">Events</Link>
            <Link to="/profile" className="link">Profile</Link>
            <Link to="/connectwallet" className="link">Connect Wallet</Link>
            <button onClick={handleLogout} className="button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="link">Home</Link>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
