import React, { useState } from "react";
import "../assets/producer.css";
// import { Link, NavLink } from "react-router-dom";
import { NavLink } from "react-router-dom";

function MintTokens() {
  const [energy, setEnergy] = useState("");

  const handleMint = () => {
    alert(`${energy} kWh = ${energy} ETK minted successfully!`);
    setEnergy("");
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
          <h2>Mint Energy Tokens</h2>
        </header>

        <div className="mint-section">
          <div className="mint-card">
            <h3>Convert Energy → Tokens</h3>
            <label>Enter Energy (kWh):</label>
            <input
              type="number"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
              placeholder="e.g. 100"
            />
            <button onClick={handleMint}>Mint Tokens</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MintTokens;
