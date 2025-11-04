// E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\pages\producerprofile.jsx
import React, { useEffect, useState } from "react";
import "../assets/producer.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

function ProducerProfile() {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Use same base URL from .env
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

  useEffect(() => {
    async function fetchProfile() {
      const email = localStorage.getItem("loggedInEmail");
      if (!email) {
        setError("No logged-in user found. Please log in first.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/profile/${encodeURIComponent(email)}/`);
        const data = res.data;

        setProducer({
          name: data.name,
          email: data.email,
          wallet: data.wallet_address || "—",
          location: data.location || "—",
          role: data.role,
          totalTokens: 0, // placeholder, can be fetched from /api/token later
          earnings: 0, // placeholder
        });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [API_BASE]);

  return (
    <div className="producer-dashboard">
      <aside className="sidebar">
        <h2>⚡ RTDEC&TS</h2>
        <ul>
          <li><NavLink to="/producer">Dashboard</NavLink></li>
          <li><NavLink to="/producer/transactions">Transactions</NavLink></li>
          <li><NavLink to="/producer/mint">Mint Tokens</NavLink></li>
          <li><NavLink to="/producer/sell">Sell Tokens</NavLink></li>
          <li><NavLink to="/producer/reports">Reports</NavLink></li>
          <li><NavLink to="/producer/profile" className="active">Profile</NavLink></li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h2>Producer Profile</h2>
        </header>

        <div className="profile-card">
          {loading && <p>Loading profile…</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && producer && (
            <>
              <img className="profile-img" src="https://i.pravatar.cc/100" alt="profile" />
              <h3>{producer.name}</h3>
              <p><strong>Email:</strong> {producer.email}</p>
              <p><strong>Wallet:</strong> {producer.wallet}</p>
              <p><strong>Location:</strong> {producer.location}</p>
              <p><strong>Role:</strong> {producer.role}</p>
              <p><strong>Total Tokens:</strong> {producer.totalTokens} ETK</p>
              <p><strong>Total Earnings:</strong> ₹{producer.earnings}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProducerProfile;
