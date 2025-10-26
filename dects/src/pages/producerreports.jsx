import React from "react";
import { Line } from "react-chartjs-2";
import "../assets/producer.css";
import { NavLink } from "react-router-dom";

function ProducerReports() {
  const reportData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Energy Generated (kWh)",
        data: [200, 260, 300, 280],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.2)",
        fill: true,
      },
      {
        label: "ETK Sold",
        data: [100, 150, 180, 170],
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,0.2)",
        fill: true,
      },
    ],
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
          <h2>Performance Reports</h2>
        </header>

        <div className="chart-card">
          <Line data={reportData} />
        </div>
      </main>
    </div>
  );
}

export default ProducerReports;
