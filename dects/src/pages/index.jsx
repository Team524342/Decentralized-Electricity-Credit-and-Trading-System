import React from "react";
import "../assets/index.css";
import { NavLink } from "react-router-dom";


function IndexPage() {
  return (
    <div className="index-container">
      {/* 🌐 Header / Navbar */}
      <header className="navbar">
  <div className="logo">⚡ RTDECTS</div>
  <ul className="nav-links">
    <li><NavLink to="/home">Home</NavLink></li>
    <li><NavLink to="/marketplace">Marketplace</NavLink></li>
    <li><NavLink to="/about">About</NavLink></li>
    <li><NavLink to="/contact">Contact</NavLink></li>
  </ul>
</header>

      {/* 🌟 Hero Section */}
      <section className="hero">
        <h1>Real-Time Decentralized Electricity Credit & Trading System</h1>
        <p className="tagline">
          A Blockchain and AI-powered platform revolutionizing renewable energy
          trading between Producers, Consumers, and Government authorities.
        </p>
        <div className="btn-group">
          <a href="/producer" className="btn primary">Producer Login</a>
          <a href="/consumer" className="btn secondary">Consumer Login</a>
          <a href="/admin" className="btn tertiary">Admin Login</a>
        </div>
        {/* <img
          src="https://cdn.dribbble.com/users/1154756/screenshots/15596082/media/9152f6f98b1ad857d4d9a0cb1d2d7c17.png?compress=1&resize=1200x900"
          alt="Energy Trading Illustration"
          className="hero-img"
        /> */}
      </section>

      {/* 🔗 System Flow */}
      <section className="overview">
        <h2>🔗 System Workflow</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>🔆 Producer</h3>
            <p>
              Generates electricity from renewable sources, mints Energy Tokens (ETK),
              and lists them for sale on the decentralized marketplace.
            </p>
          </div>
          <div className="card">
            <h3>💡 Consumer</h3>
            <p>
              Buys ETK tokens to pay energy bills or trade for profit while supporting
              sustainable power generation.
            </p>
          </div>
          <div className="card">
            <h3>🏛️ Government</h3>
            <p>
              Verifies transactions, monitors energy flow, and automates incentives
              using smart contracts.
            </p>
          </div>
        </div>
      </section>

      {/* 🚀 Key Features */}
      <section className="features">
        <h2>🚀 Key Features</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>🔒 Blockchain Security</h3>
            <p>
              All transactions are encrypted and stored on a decentralized ledger,
              ensuring transparency and tamper-proof records.
            </p>
          </div>
          <div className="card">
            <h3>⚡ AI-based Dynamic Pricing</h3>
            <p>
              Smart algorithms adjust token prices dynamically based on supply, demand,
              and grid load.
            </p>
          </div>
          <div className="card">
            <h3>💰 Automated Settlement</h3>
            <p>
              Smart Contracts ensure instant payments and settlement between producers
              and consumers.
            </p>
          </div>
        </div>
      </section>

      {/* 🌍 Benefits */}
      <section className="benefits">
        <h2>🌿 Project Impact</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>♻️ Promotes Renewable Energy</h3>
            <p>
              Encourages use of clean energy by rewarding green power producers.
            </p>
          </div>
          <div className="card">
            <h3>⚙️ Transparent Transactions</h3>
            <p>
              Every ETK trade is visible and verified on blockchain.
            </p>
          </div>
          <div className="card">
            <h3>👥 Inclusive Economy</h3>
            <p>
              Brings both rural and urban producers into a unified digital marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* 🔗 Quick Access Section */}
      <section className="quick-access">
        <h2>🔗 Quick Access</h2>
        <div className="access-grid">
          <a href="/producer" className="access-card">Producer Dashboard</a>
          <a href="/consumer" className="access-card">Consumer Dashboard</a>
          <a href="/admin" className="access-card">Admin Dashboard</a>
          <a href="/marketplace" className="access-card">ETK Marketplace</a>
        </div>
      </section>

      {/* ⚙️ Footer */}
      <footer className="footer">
        <p>© 2025 RTDECTS — Real-Time Decentralized Electricity Credit & Trading System</p>
        <p>Developed by <strong>Team BFG</strong></p>
      </footer>
    </div>
  );
}

export default IndexPage;
