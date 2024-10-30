import React from 'react';
import './Home.css'; // Custom CSS file for styling

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>EMMA</h1>
        <h1>Decentralized Event Ticketing on Algorand</h1>
        <p>Own your tickets as NFTs, trade securely, and enjoy fraud-free events.</p>
        <div className="button-group">
          <button className="connect-button">Connect Wallet</button>
          <button className="explore-button">Explore Events</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Platform Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>🔗 Connect Wallet</h3>
            <p>Securely connect your Algorand wallet to access tickets and manage events.</p>
          </div>
          <div className="feature-card">
            <h3>🎟️ NFT Tickets</h3>
            <p>Issue, trade, or transfer tickets as NFTs—completely transparent and tamper-proof.</p>
          </div>
          <div className="feature-card">
            <h3>💱 Marketplace</h3>
            <p>Buy, sell, or exchange tickets with other users without intermediaries.</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Smart Contracts</h3>
            <p>Resale rules and limits enforced through smart contracts to prevent fraud.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What People Say</h2>
        <div className="testimonials">
          <blockquote>
            "The NFT tickets make events secure and hassle-free!" – Alice
          </blockquote>
          <blockquote>
            "Buying and transferring tickets on Algorand is seamless." – Bob
          </blockquote>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <details>
          <summary>How do I connect my Algorand wallet?</summary>
          <p>Click on the 'Connect Wallet' button and follow the instructions.</p>
        </details>
        <details>
          <summary>What happens if I transfer my NFT ticket?</summary>
          <p>The ticket ownership changes instantly, and the new owner can use it to attend the event.</p>
        </details>
        <details>
          <summary>Are there any limits on reselling tickets?</summary>
          <p>Yes, event organizers can set rules to limit the number of resales.</p>
        </details>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Decentralized Ticketing Platform. Built on Algorand.</p>
      </footer>
    </div>
  );
}

export default Home;
