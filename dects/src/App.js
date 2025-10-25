import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Register from './pages/Register';
// import ConsumerDashboard from './pages/ConsumerDashboard';
import ProducerDashboard from './pages/ProducerDashboard';
import AdminPanal from './pages/adminPanal';
import Index from './pages/index';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        {/* <Link to="/consumer" style={styles.link}>Consumer</Link> */}
        <Link to="/producer" style={styles.link}>Producer</Link>
        <Link to="/adminpanal" style={styles.link}>Admin Panal</Link>
        <Link to="/index" style={styles.link}>Index</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/consumer" element={<ConsumerDashboard />} /> */}
        <Route path="/producer" element={<ProducerDashboard />} />
        <Route path="/adminpanal" element={<AdminPanal />} />
        {/* Fallback: redirect unknown routes to register */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    padding: '10px',
    textAlign: 'center',
  },
  link: {
    color: 'white',
    margin: '0 10px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default App;
