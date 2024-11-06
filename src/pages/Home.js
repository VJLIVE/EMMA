import React from "react";
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    navigate(`/login`);
  };

  return (
    <>
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your Algorand Hub</h1>
          <p className="hero-subtitle">
            Take control of your crypto assets with ease. Manage your wallets, track transactions, and more.
          </p>
          <button className="cta-button" onClick={handleViewTransactions}>Get Started</button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Platform Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>🔗 Connect Wallets</h3>
            <p>Seamlessly connect and manage multiple Algorand wallets in one place.</p>
          </div>
          <div className="feature-item">
            <h3>💰 Real-time Balances</h3>
            <p>View your wallet balances in real-time and stay on top of your assets.</p>
          </div>
          <div className="feature-item">
            <h3>📜 Transaction History</h3>
            <p>Access detailed transaction history for full transparency and control.</p>
          </div>
          <div className="feature-item">
            <h3>🔐 Enhanced Security</h3>
            <p>Secure your accounts with PIN protection and encryption for peace of mind.</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h4>How do I connect my wallet?</h4>
            <p>Simply click the "Connect Wallet" button and follow the instructions to link your Algorand wallet.</p>
          </div>
          <div className="faq-item">
            <h4>Is my information secure?</h4>
            <p>Yes, we use encryption and secure authentication methods to keep your data safe.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default Home;
