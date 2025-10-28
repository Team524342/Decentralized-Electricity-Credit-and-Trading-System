import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Register from './pages/Register';
// import ConsumerDashboard from './pages/ConsumerDashboard';
import ProducerDashboard from './pages/ProducerDashboard';
import ProducerTransactions from "./pages/producertracsaction";
import MintTokens from "./pages/minttokens";
import SellTokens from "./pages/selltokens";
import ProducerReports from "./pages/producerreports";
import ProducerProfile from "./pages/producerprofile";
import AdminPanal from './pages/adminPanal';
import Index from './pages/index';
import Marketplace from "./pages/marketplace";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Login from './pages/login';

function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        {<Link to="/consumer" style={styles.link}>Consumer</Link> }
        <Link to="/producer" style={styles.link}>Producer</Link>
        <Link to="/adminpanal" style={styles.link}>Admin Panal</Link>
        <Link to="/index" style={styles.link}>Index</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </nav>

      <Routes>
        
        <Route path="/" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/home" element={<Home />} /> {/* Home Page */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/consumer" element={<ConsumerDashboard />} /> */}
        <Route path="/producer" element={<ProducerDashboard />} />
        <Route path="/producer/transactions" element={<ProducerTransactions />} />
        <Route path="/producer/mint" element={<MintTokens />} />
        <Route path="/producer/sell" element={<SellTokens />} />
        <Route path="/producer/reports" element={<ProducerReports />} />
        <Route path="/producer/profile" element={<ProducerProfile />} />
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
