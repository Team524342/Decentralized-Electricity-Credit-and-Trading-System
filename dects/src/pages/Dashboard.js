// dects/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { getDashboardStats, disconnect } from "../services/api";
import { connectWallet, getWalletAddress } from "../services/web3";
import "./Dashboard.css";

function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [stats, setStats] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      
      // Get user stats
      const response = await getDashboardStats();
      setStats(response.data);
      
      // Try to get wallet address
      const addr = await getWalletAddress();
      setAddress(addr);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      const addr = await connectWallet();
      setAddress(addr);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>⚡ Energy Trading Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="wallet-section">
        {!address ? (
          <button onClick={handleConnectWallet} className="btn-primary">
            🔗 Connect MetaMask
          </button>
        ) : (
          <div className="wallet-info">
            <p>Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
          </div>
        )}
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Open Orders</h3>
            <p className="stat-value">{stats.open_orders}</p>
          </div>

          <div className="stat-card">
            <h3>Matched Orders</h3>
            <p className="stat-value">{stats.matched_orders}</p>
          </div>

          <div className="stat-card">
            <h3>Token Balance</h3>
            <p className="stat-value">⚡ {stats.token_balance.toFixed(2)}</p>
          </div>

          <div className="stat-card">
            <h3>Trades (Buyer)</h3>
            <p className="stat-value">{stats.trades_as_buyer}</p>
          </div>

          <div className="stat-card">
            <h3>Trades (Seller)</h3>
            <p className="stat-value">{stats.trades_as_seller}</p>
          </div>

          <div className="stat-card">
            <h3>Total kWh Sold</h3>
            <p className="stat-value">☀️ {stats.total_kwh_sold.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/sell" className="btn-secondary">
            🔋 Sell Energy
          </a>
          <a href="/market" className="btn-secondary">
            🛒 Buy Energy
          </a>
          <a href="/trades" className="btn-secondary">
            📊 View Trades
          </a>
          <a href="/wallet" className="btn-secondary">
            💰 Wallet
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
