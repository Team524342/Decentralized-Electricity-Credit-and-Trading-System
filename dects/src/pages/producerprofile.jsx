import React from "react";
import "../assets/producer.css";
import { NavLink } from "react-router-dom";

function ProducerProfile() {
  const producer = {
    name: "Producer A",
    wallet: "0xABC123DEF456",
    email: "producer@example.com",
    totalTokens: 150,
    earnings: 4500,
  };

  return (
    <div className="producer-dashboard">
<aside className="sidebar">
  <h2>⚡ RTDEC&TS</h2>
  <ul>
    <li>
      <NavLink to="/producer" className={({ isActive }) => (isActive ? "active" : "")}>
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink to="/producer/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
        Transactions
      </NavLink>
    </li>
    <li>
      <NavLink to="/producer/mint" className={({ isActive }) => (isActive ? "active" : "")}>
        Mint Tokens
      </NavLink>
    </li>
    <li>
      <NavLink to="/producer/sell" className={({ isActive }) => (isActive ? "active" : "")}>
        Sell Tokens
      </NavLink>
    </li>
    <li>
      <NavLink to="/producer/reports" className={({ isActive }) => (isActive ? "active" : "")}>
        Reports
      </NavLink>
    </li>
    <li>
      <NavLink to="/producer/profile" className={({ isActive }) => (isActive ? "active" : "")}>
        Profile
      </NavLink>
    </li>
  </ul>
</aside>


      <main className="main-content">
        <header className="topbar">
          <h2>Producer Profile</h2>
        </header>

        <div className="profile-card">
          <img className="profile-img" src="https://i.pravatar.cc/100" alt="profile" />
          <h3>{producer.name}</h3>
          <p><strong>Email:</strong> {producer.email}</p>
          <p><strong>Wallet:</strong> {producer.wallet}</p>
          <p><strong>Total Tokens:</strong> {producer.totalTokens} ETK</p>
          <p><strong>Total Earnings:</strong> ₹{producer.earnings}</p>
        </div>
      </main>
    </div>
  );
}

export default ProducerProfile;
