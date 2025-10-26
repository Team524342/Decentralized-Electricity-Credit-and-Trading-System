import React from "react";
import '../assets/index.css';

function IndexPage() {
  return (
    <div className="index-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="logo">⚡ Electricity Credit & Trading System</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/marketplace">Marketplace</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Real-Time Decentralized Electricity Credit and Trading System</h1>
        <p className="tagline">
          Empowering Producers, Consumers, and Government through Blockchain, 
          Smart Contracts, and AI-driven Dynamic Pricing.
        </p>
        <div className="btn-group">
          <a href="/producer" className="btn primary">Producer Login</a>
          <a href="/consumer" className="btn secondary">Consumer Login</a>
          <a href="/admin" className="btn tertiary">Admin Login</a>
        </div>
      </section>

      {/* System Overview */}
      <section className="overview">
        <h2>🔗 System Flow Overview</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>🔆 Producer</h3>
            <p>
              Generates renewable energy, mints Energy Tokens (ETK), and sells
              them to consumers through blockchain-based smart contracts.
            </p>
          </div>
          <div className="card">
            <h3>💡 Consumer</h3>
            <p>
              Purchases ETK tokens to offset electricity bills and contribute to 
              renewable energy usage.
            </p>
          </div>
          <div className="card">
            <h3>🏛️ Government</h3>
            <p>
              Monitors energy data, verifies transactions, and distributes 
              subsidies automatically using smart contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <h2>🚀 Quick Access</h2>
        <div className="access-grid">
          <a href="/producer" className="access-card">Producer Dashboard</a>
          <a href="/consumer" className="access-card">Consumer Dashboard</a>
          <a href="/admin" className="access-card">Admin Dashboard</a>
          <a href="/marketplace" className="access-card">Token Marketplace</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Real-Time Decentralized Energy Credit and Trading System | All Rights Reserved</p>
        <p>Devloped by team BFG</p>
      </footer>
    </div>
  );
}

export default IndexPage;
