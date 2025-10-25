import React, { useState } from "react";
import '../assets/producer.css';

function ProducerDashboard() {
  // const [generatedEnergy, setGeneratedEnergy] = useState(50); // Example: 50 kWh
  const [tokenBalance, setTokenBalance] = useState(50); // Example: 50 ETK
  // const [pricePerETK, setPricePerETK] = useState(12); // ₹12 per ETK
  const [earnings, setEarnings] = useState(0);

  const mintTokens = () => {
    alert(`${generatedEnergy} ETK minted successfully!`);
    setTokenBalance(tokenBalance + generatedEnergy);
  };

  const sellTokens = () => {
    const amount = prompt("Enter ETK amount to sell:");
    if (amount && amount <= tokenBalance) {
      const total = amount * pricePerETK;
      const commission = (2 / 100) * total;
      const net = total - commission;
      setTokenBalance(tokenBalance - amount);
      setEarnings(earnings + net);
      alert(`Sold ${amount} ETK for ₹${net} (after 2% commission).`);
    } else {
      alert("Invalid amount or insufficient balance.");
    }
  };

  return (
    <div className="producer-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Producer Dashboard</h2>
        <ul>
          <li>Dashboard</li>
          <li>Mint Tokens</li>
          <li>Sell Tokens</li>
          <li>Transactions</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3>Welcome, Producer ☀️</h3>
        <p>
          Manage your energy production, mint tokens, sell them, and track your
          earnings.
        </p>

        {/* Stats Section */}
        <div className="stats">
          <div className="card">
            <h4>Generated Energy</h4>
            <p>{generatedEnergy} kWh</p>
          </div>
          <div className="card">
            <h4>Token Balance</h4>
            <p>{tokenBalance} ETK</p>
          </div>
          <div className="card">
            <h4>Current Price</h4>
            <p>₹{pricePerETK} / ETK</p>
          </div>
          <div className="card">
            <h4>Total Earnings</h4>
            <p>₹{earnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button onClick={mintTokens}>Mint Tokens</button>
          <button onClick={sellTokens}>Sell Tokens</button>
        </div>

        {/* Transaction Info */}
        <div className="note">
          <p>
            💡 Each kWh = 1 ETK. 2% platform commission applies on each trade.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProducerDashboard;
