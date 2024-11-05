// src/pages/Home.js
import React from "react";
import './Home.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleViewTransactions = () => {
    navigate(`/login`); // Adjust the route based on your routing setup
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Home Page</h2>
      <p className="home-intro">
        Discover a seamless way to manage your Algorand wallets and transactions.
        Our platform provides an intuitive interface for connecting your wallets, viewing balances, and tracking your transaction history.
      </p>
      
      <div className="home-overview">
        <h3>Overview of Features</h3>
        <ul>
          <li>🔗 Connect multiple Algorand wallets effortlessly.</li>
          <li>💰 View real-time balances for your wallets.</li>
          <li>📜 Access detailed transaction histories for transparency.</li>
          <li>🔐 Securely set and manage your PIN for added security.</li>
          <li>🛠️ Easy-to-use interface designed for all users.</li>
        </ul>
      </div>

      <div className="home-call-to-action">
        <h3>Get Started Now!</h3>
        <p>
          Join us on this exciting journey and take full control of your crypto assets!
        </p>
        <button className="cta-button" onClick={handleViewTransactions}>Start Using the Platform</button>
      </div>
    </div>
  );
};

export default Home;
