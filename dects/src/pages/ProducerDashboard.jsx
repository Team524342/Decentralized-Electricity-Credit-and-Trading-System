import React, { useState, useEffect } from "react";
import "../assets/producer.css";

function ProducerDashboard() {
  const [producerData, setProducerData] = useState(null);
  const [generatedEnergy, setGeneratedEnergy] = useState(0);
  const [pricePerETK, setPricePerETK] = useState(12); // ₹12 per ETK
  const [loading, setLoading] = useState(true);

  // 🔹 Load producer data on page load
  useEffect(() => {
    fetch("http://localhost:5000/producer/data/1")
      .then((res) => res.json())
      .then((data) => {
        setProducerData(data);
        setGeneratedEnergy(data.energy_generated);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching producer data:", err));
  }, []);

  // 🔹 Mint Tokens API
  const mintTokens = async () => {
    try {
      const response = await fetch("http://localhost:5000/producer/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1, energy: generatedEnergy }),
      });

      const data = await response.json();
      alert(data.message);
      // Refresh data after mint
      window.location.reload();
    } catch (error) {
      console.error("Mint error:", error);
    }
  };

  // 🔹 Sell Tokens API
  const sellTokens = async () => {
    const amount = prompt("Enter ETK amount to sell:");
    if (!amount) return;

    try {
      const response = await fetch("http://localhost:5000/producer/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1, amount: parseFloat(amount), price: pricePerETK }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${data.message}\nEarnings: ₹${data.earnings.toFixed(2)}\nCommission: ₹${data.commission.toFixed(2)}`);
        window.location.reload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Sell error:", error);
    }
  };

  // 🔹 Burn Tokens API
  const burnTokens = async () => {
    const amount = prompt("Enter ETK amount to burn:");
    if (!amount) return;

    try {
      const response = await fetch("http://localhost:5000/producer/burn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 1, amount: parseFloat(amount) }),
      });

      const data = await response.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Burn error:", error);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading Producer Data...</h2>;

  return (
    <div className="producer-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Producer Dashboard</h2>
        <ul>
          <li>Dashboard</li>
          <li>Mint Tokens</li>
          <li>Sell Tokens</li>
          <li>Burn Tokens</li>
          <li>Transactions</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3>Welcome, {producerData.name} ☀️</h3>
        <p>Wallet: {producerData.wallet}</p>
        <p>
          Manage your energy production, mint tokens, sell them, and track your
          earnings.
        </p>

        {/* Stats Section */}
        <div className="stats">
          <div className="card">
            <h4>Generated Energy</h4>
            <p>{producerData.energy_generated} kWh</p>
          </div>
          <div className="card">
            <h4>Token Balance</h4>
            <p>{producerData.token_balance} ETK</p>
          </div>
          <div className="card">
            <h4>Current Price</h4>
            <p>₹{pricePerETK} / ETK</p>
          </div>
          <div className="card">
            <h4>Total Earnings</h4>
            <p>₹{producerData.earnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button onClick={mintTokens}>Mint Tokens</button>
          <button onClick={sellTokens}>Sell Tokens</button>
          <button onClick={burnTokens}>Burn Tokens</button>
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
