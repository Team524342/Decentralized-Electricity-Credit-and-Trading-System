import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../assets/producer.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProducerDashboard() {
  const [energyGenerated, setEnergyGenerated] = useState(150);
  const [tokenBalance, setTokenBalance] = useState(120);
  const [earnings, setEarnings] = useState(4560);
  const [pricePerETK, setPricePerETK] = useState(12);

  // chart data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Energy Generated (kWh)",
        data: [40, 45, 60, 55, 70, 65],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "ETK Sold",
        data: [10, 15, 30, 25, 45, 40],
        borderColor: "#06B6D4",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const mintTokens = () => {
    alert(`${energyGenerated} ETK minted successfully!`);
    setTokenBalance(tokenBalance + energyGenerated);
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
    <div className="producer-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>⚡ ECMS</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Transactions</li>
          <li>Mint Tokens</li>
          <li>Sell Tokens</li>
          <li>Reports</li>
          <li>Profile</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <h2>Producer Dashboard</h2>
          <div className="user-info">
            <img src="https://i.pravatar.cc/40" alt="profile" />
            <span>Producer A</span>
          </div>
        </header>

        {/* Statistic cards */}
        <section className="stats-cards">
          <div className="card blue">
            <h4>Energy Generated</h4>
            <p>{energyGenerated} kWh</p>
          </div>
          <div className="card teal">
            <h4>Token Balance</h4>
            <p>{tokenBalance} ETK</p>
          </div>
          <div className="card yellow">
            <h4>Earnings</h4>
            <p>₹{earnings}</p>
          </div>
          <div className="card purple">
            <h4>Price per ETK</h4>
            <p>₹{pricePerETK}</p>
          </div>
        </section>

        {/* Chart section */}
        <section className="chart-section">
          <div className="chart-card">
            <h3>Energy vs Token Trends</h3>
            <Line data={data} />
          </div>

          <div className="trade-actions">
            <h3>Quick Actions</h3>
            <button className="mint-btn" onClick={mintTokens}>
              ⚙️ Mint Tokens
            </button>
            <button className="sell-btn" onClick={sellTokens}>
              💸 Sell Tokens
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProducerDashboard;
