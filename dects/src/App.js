// E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Web3 from 'web3';
import ElectricityMarketplace from './contracts/ElectricityMarketplace.json';

import Register from './pages/Register';
import ConsumerDashboard from './pages/ConsumerDashboard';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [listings, setListings] = useState([]);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);

  const MARKETPLACE_ADDRESS = "YOUR_MARKETPLACE_ADDRESS_HERE"; // TODO: Replace with actual address after deploying

  // Load listings from blockchain
  const loadListings = async () => {
    if (!marketplace) return;
    try {
      const count = await marketplace.methods.listingCount().call();
      let items = [];

      for (let i = 1; i <= count; i++) {
        const listing = await marketplace.methods.listings(i).call();
        items.push({ id: i, ...listing });
      }

      setListings(items);
    } catch (error) {
      console.error('Error loading listings:', error);
    }
  };

  // Buy Electricity
  const buyElectricity = async (id, price) => {
    if (!account || !marketplace) return;
    try {
      await marketplace.methods
        .buyElectricity(id)
        .send({ from: account, value: price });
      alert('✅ Purchase successful!');
      await loadListings(); // Refresh listings
    } catch (error) {
      alert('❌ Purchase failed: ' + error.message);
    }
  };

  // Initialize Web3 and Marketplace contract
  useEffect(() => {
    if (window.ethereum && MARKETPLACE_ADDRESS !== "YOUR_MARKETPLACE_ADDRESS_HERE") {
      const web3 = new Web3(window.ethereum);
      setWeb3Instance(web3);
      
      const marketplaceInstance = new web3.eth.Contract(
        ElectricityMarketplace.abi,
        MARKETPLACE_ADDRESS
      );
      setMarketplace(marketplaceInstance);

      // Load listings when marketplace is ready
      (async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      })();
    }
  }, []);

  // Load listings when marketplace changes
  useEffect(() => {
    if (marketplace) {
      loadListings();
    }
  }, [marketplace]);

  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to="/consumer" style={styles.link}>Consumer</Link> 
        <Link to="/producer" style={styles.link}>Producer</Link>
        <Link to="/adminpanal" style={styles.link}>Admin Panal</Link>
        <Link to="/index" style={styles.link}>Index</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </nav>

      <Routes>
        
        <Route path="/" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/home" element={<Home />} /> {/* Home Page */}
        <Route path="/marketplace" element={<Marketplace listings={listings} buyElectricity={buyElectricity} web3={web3Instance} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
  <Route path="/consumer" element={<ProtectedRoute allowedRoles={['consumer']}><ConsumerDashboard /></ProtectedRoute>} />
  <Route path="/producer" element={<ProtectedRoute allowedRoles={['producer']}><ProducerDashboard /></ProtectedRoute>} />
        <Route path="/producer/transactions" element={<ProducerTransactions />} />
        <Route path="/producer/mint" element={<MintTokens />} />
        <Route path="/producer/sell" element={<SellTokens />} />
        <Route path="/producer/reports" element={<ProducerReports />} />
        <Route path="/producer/profile" element={<ProducerProfile />} />
  <Route path="/adminpanal" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanal /></ProtectedRoute>} />
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
