import React, { useState } from "react";
import "../assets/login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("producer");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Later connect this to backend endpoint
    // For now simulate login redirection
    if (role === "producer") {
      window.location.href = "/producer";
    } else if (role === "consumer") {
      window.location.href = "/consumer";
    } else if (role === "admin") {
      window.location.href = "/admin";
    } else {
      alert("Invalid role selected!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>⚡ Electricity Credit & Trading System</h1>
        <h2>Login Portal</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="producer">Producer</option>
              <option value="consumer">Consumer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn primary">
            Login
          </button>
        </form>

        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
