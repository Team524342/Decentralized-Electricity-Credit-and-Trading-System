import React, { useState } from "react";
import "../assets/producer.css";

import { NavLink } from "react-router-dom";


function SellTokens() {
  const [amount, setAmount] = useState("");
  const pricePerETK = 12;

  const handleSell = () => {
    const total = amount * pricePerETK;
    const commission = (2 / 100) * total;
    const net = total - commission;
    alert(`Sold ${amount} ETK for ₹${net} (after 2% commission).`);
    setAmount("");
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
          <h2>Sell Energy Tokens</h2>
        </header>

        <div className="mint-section">
          <div className="mint-card">
            <h3>Trade ETK for ₹</h3>
            <label>Enter ETK amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 50"
            />
            <button onClick={handleSell}>Sell Tokens</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellTokens;
