import React from "react";
import "../assets/producer.css";
import { NavLink } from "react-router-dom";

function ProducerTransactions() {
  const transactions = [
    { id: 1, type: "Mint", amount: 50, date: "2025-10-20", value: "₹600" },
    { id: 2, type: "Sell", amount: 30, date: "2025-10-22", value: "₹350" },
    { id: 3, type: "Burn", amount: 10, date: "2025-10-23", value: "—" },
  ];

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
          <h2>Transaction History</h2>
          <div className="user-info">
            <img src="https://i.pravatar.cc/40" alt="profile" />
            <span>Producer A</span>
          </div>
        </header>

        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount (ETK)</th>
                <th>Date</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.date}</td>
                  <td>{tx.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ProducerTransactions;
