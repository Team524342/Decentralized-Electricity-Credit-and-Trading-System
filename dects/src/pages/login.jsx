// E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\pages\login.jsx
import React, { useState } from "react";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("producer");
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role, // send role too if your backend uses it
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login successful!");
        console.log("Redirect path:", data.redirect_to);

        localStorage.setItem("loggedInEmail", email);

        // ✅ Redirect using backend’s redirect_to
        if (data.redirect_to) {
          navigate(data.redirect_to);
        } else {
          alert("Redirect path missing from backend!");
        }
      } else {
        alert(data.error || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong! Check your backend connection.");
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
