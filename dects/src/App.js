import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import ElectricityMarketplace from './contracts/ElectricityMarketplace.json';
import { clearAuth, getAccessToken } from './utils/auth';

// Import styles
import './App.css';
import './assets/enhanced-globals.css';
import './assets/enhanced-navbar.css';
import './assets/enhanced-footer.css';
import './assets/enhanced-components.css';

// Import components
import EnhancedNavbar from './components/EnhancedNavbar';
import EnhancedFooter from './components/EnhancedFooter';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
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

/**
 * Main application component
 * Manages Web3 connection, marketplace contract, and user authentication
 */
function App() {
  // State management
  const [listings, setListings] = useState([]);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Configuration
  const MARKETPLACE_ADDRESS = process.env.REACT_APP_MARKETPLACE_ADDRESS || "YOUR_MARKETPLACE_ADDRESS_HERE";
  const LISTING_POLL_INTERVAL = 10000; // 10 seconds
  const listingPollerRef = useRef(null);

  /**
   * Load listings from blockchain with error handling
   */
  const loadListings = useCallback(async () => {
    if (!marketplace) return;
    try {
      const count = await marketplace.methods.listingCount().call();
      const items = [];

      for (let i = 1; i <= count; i++) {
        try {
          const listing = await marketplace.methods.listings(i).call();
          items.push({ id: i, ...listing });
        } catch (err) {
          console.warn(`Failed to load listing ${i}:`, err);
        }
      }

      setListings(items);
      setError(null);
    } catch (err) {
      console.error('Error loading listings:', err);
      setError('Failed to load marketplace listings');
    }
  }, [marketplace]);

  /**
   * Buy electricity with transaction handling
   */
  const buyElectricity = useCallback(async (id, price) => {
    if (!account || !marketplace || !web3Instance) {
      setError('Wallet not connected or marketplace not initialized');
      return { success: false, error: 'Connection not ready' };
    }

    try {
      setLoading(true);
      setError(null);

      const transaction = await marketplace.methods
        .buyElectricity(id)
        .send({ from: account, value: price });

      // Refresh listings after successful purchase
      await loadListings();
      
      return { success: true, transaction };
    } catch (err) {
      const errorMessage = err.message || 'Purchase failed';
      console.error('Purchase error:', err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [account, marketplace, web3Instance, loadListings]);

  /**
   * Handle user logout securely
   */
  const handleLogout = useCallback(() => {
    setUser(null);
    setAccount(null);
    setMarketplace(null);
    setWeb3Instance(null);
    setListings([]);
    clearAuth();
    localStorage.removeItem('user');
  }, []);

  /**
   * Initialize Web3 connection and load user data
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);

        // Check if user is logged in
        const token = getAccessToken();
        const savedUser = localStorage.getItem('user');
        
        if (savedUser && token) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (err) {
            console.error('Invalid stored user data:', err);
            clearAuth();
          }
        }

        // Initialize Web3 if MetaMask is available and marketplace address is configured
        if (window.ethereum && MARKETPLACE_ADDRESS !== "YOUR_MARKETPLACE_ADDRESS_HERE") {
          try {
            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);

            // Get user accounts
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              setIsConnected(true);
            }

            // Initialize marketplace contract
            const marketplaceInstance = new web3.eth.Contract(
              ElectricityMarketplace.abi,
              MARKETPLACE_ADDRESS
            );
            setMarketplace(marketplaceInstance);
          } catch (err) {
            console.warn('Web3 initialization warning:', err);
            setError('MetaMask connection failed. Some features may be unavailable.');
          }
        } else {
          if (!window.ethereum) {
            console.warn('Ethereum provider not found');
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('App initialization error:', err);
        setError('Failed to initialize application');
        setLoading(false);
      }
    };

    initializeApp();
  }, [MARKETPLACE_ADDRESS]);

  /**
   * Load listings when marketplace is ready
   */
  useEffect(() => {
    if (marketplace && isConnected) {
      loadListings();

      // Set up interval to poll for latest listings
      const pollListings = async () => {
        await loadListings();
      };

      listingPollerRef.current = setInterval(pollListings, LISTING_POLL_INTERVAL);

      return () => {
        if (listingPollerRef.current) {
          clearInterval(listingPollerRef.current);
        }
      };
    }
  }, [marketplace, isConnected, loadListings]);

  /**
   * Set up account change listener
   */
  useEffect(() => {
    if (window.ethereum && isConnected) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          handleLogout();
        } else {
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [isConnected, handleLogout]);

  return (
    <Router>
      <div className="app-container">
        <EnhancedNavbar user={user} onLogout={handleLogout} />

        {error && (
          <div className="app-error-banner" role="alert">
            <p>{error}</p>
            <button onClick={() => setError(null)} aria-label="Dismiss error">✕</button>
          </div>
        )}

        <main className="app-main">
          {loading && (
            <div className="app-loader">
              <div className="spinner"></div>
              <p>Initializing application...</p>
            </div>
          )}

          {!loading && (
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/index" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route 
                path="/marketplace" 
                element={
                  <Marketplace 
                    listings={listings} 
                    buyElectricity={buyElectricity} 
                    web3={web3Instance}
                    account={account}
                    isConnected={isConnected}
                  />
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/consumer" element={<ProtectedRoute allowedRoles={['consumer']}><ConsumerDashboard /></ProtectedRoute>} />
              <Route path="/producer" element={<ProtectedRoute allowedRoles={['producer']}><ProducerDashboard /></ProtectedRoute>} />
              <Route path="/producer/transactions" element={<ProducerTransactions />} />
              <Route path="/producer/mint" element={<MintTokens />} />
              <Route path="/producer/sell" element={<SellTokens />} />
              <Route path="/producer/reports" element={<ProducerReports />} />
              <Route path="/producer/profile" element={<ProducerProfile />} />
              <Route path="/adminpanal" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanal /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>

        <EnhancedFooter />
      </div>
    </Router>
  );
}

export default App;
