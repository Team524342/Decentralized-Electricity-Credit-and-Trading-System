import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Register from './pages/Register';
import ConsumerDashboard from './pages/ConsumerDashboard';
import ProducerDashboard from './pages/ProducerDashboard';
import AdminDashboard from './pages/admindashboard';
import AdminPanal from './pages/adminPanal';

function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to="/consumer" style={styles.link}>Consumer</Link>
        <Link to="/producer" style={styles.link}>Producer</Link>
        <Link to="/admin" style={styles.link}>Admin Dashboard</Link>
        <Link to="/adminpanal" style={styles.link}>Admin Panal</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
        <Route path="/producer" element={<ProducerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
