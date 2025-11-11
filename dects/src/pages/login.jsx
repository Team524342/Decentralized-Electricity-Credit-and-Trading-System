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
      // build full URL robustly and log for debugging
      console.log('API_BASE=', API_BASE);
      const base = API_BASE.replace(/\/$/, '');
      const fullUrl = `${base}/login/`;
      console.log('POST ->', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content-type') || '';

      // If the server returned HTML (e.g. a 404 HTML page) parsing as JSON will fail.
      if (!response.ok) {
        // try to read plain text to show a useful error
        const text = await response.text();
        console.error('Login failed:', response.status, text);
        alert(`Login failed (status ${response.status}). See console for details.`);
        return;
      }

      // Successful HTTP status. Expect JSON.
      if (contentType.includes('application/json')) {
        const data = await response.json();
        alert(data.message || 'Login successful!');
        console.log('Login result:', data);

        // store tokens and role for later requests (normalize role)
        if (data.access) localStorage.setItem('access_token', data.access);
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        if (data.role) {
          const rl = data.role.toLowerCase();
          localStorage.setItem('user_role', rl);
          // also keep legacy key names used in other components
          localStorage.setItem('role', rl);
        }
        // store email so Profile components can read it
        if (data.email) localStorage.setItem('email', data.email);
        else if (email) localStorage.setItem('email', email);

        // redirect to the backend-provided path if present, else fallback by role
        if (data.redirect_to) {
          navigate(data.redirect_to);
        } else if (data.role) {
          const r = data.role.toLowerCase();
          if (r === 'consumer') navigate('/consumer');
          else if (r === 'producer') navigate('/producer');
          else if (r === 'admin') navigate('/adminpanal');
          else navigate('/');
        } else {
          navigate('/');
        }
      } else {
        const text = await response.text();
        console.error('Expected JSON but got:', contentType, text);
        alert('Login failed: unexpected server response (not JSON). Check backend.');
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
