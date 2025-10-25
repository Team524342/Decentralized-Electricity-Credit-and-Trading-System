import React, { useState } from "react";
import '../assets/styles.css';

function AdminDashboard() {
  const [stats] = useState({
    totalProducers: 12,
    totalConsumers: 25,
    totalTokens: 1200,
    totalRevenue: 45200,
  });

  const transactions = [
    { id: 1, producer: "Producer A", consumer: "Consumer B", tokens: 50, amount: 600, status: "Completed" },
    { id: 2, producer: "Producer C", consumer: "Consumer D", tokens: 20, amount: 240, status: "Completed" },
    { id: 3, producer: "Producer B", consumer: "Consumer E", tokens: 15, amount: 180, status: "Pending" },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Dashboard</li>
          <li>Producers</li>
          <li>Consumers</li>
          <li>Transactions</li>
          <li>Subsidy</li>
          <li>Analytics</li>
          <li>Logs</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3>Welcome, Admin ⚙️</h3>
        <p>
          Monitor and manage all producers, consumers, tokens, and subsidy data.
        </p>

        {/* Statistics Section */}
        <div className="stats">
          <div className="card">
            <h4>Total Producers</h4>
            <p>{stats.totalProducers}</p>
          </div>
          <div className="card">
            <h4>Total Consumers</h4>
            <p>{stats.totalConsumers}</p>
          </div>
          <div className="card">
            <h4>Total Tokens in Circulation</h4>
            <p>{stats.totalTokens} ETK</p>
          </div>
          <div className="card">
            <h4>Total Revenue</h4>
            <p>₹{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions">
          <h4>Recent Transactions</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producer</th>
                <th>Consumer</th>
                <th>Tokens</th>
                <th>Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.producer}</td>
                  <td>{t.consumer}</td>
                  <td>{t.tokens}</td>
                  <td>{t.amount}</td>
                  <td className={t.status === "Completed" ? "complete" : "pending"}>
                    {t.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes / Footer */}
        <div className="note">
          <p>
            🔍 Admin Role: Verify producer data, approve subsidies, track
            blockchain transactions, and manage dynamic pricing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
