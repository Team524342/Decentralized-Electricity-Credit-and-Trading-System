// E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\pages\adminPanal.jsx
import React, { useState, useEffect } from "react";
import "../assets/adminPanal.css";
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/adminNavbar";
import AdminCard from "../components/adminCard";
import { 
  Users, TrendingUp, DollarSign, Zap, 
  BarChart3, LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ArrowUpRight, ArrowDownRight, RefreshCw,
  Moon, Sun, Wallet
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

/**
 * Admin Dashboard Component
 * System overview, analytics, and management controls
 */
function AdminPanal() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("admin-theme");
    return saved || "dark";
  });

  // Analytics data
  const priceData = [
    { name: "Jan", price: 0.12, volume: 4000, trades: 240 },
    { name: "Feb", price: 0.11, volume: 3000, trades: 221 },
    { name: "Mar", price: 0.15, volume: 5000, trades: 229 },
    { name: "Apr", price: 0.13, volume: 2000, trades: 200 },
    { name: "May", price: 0.14, volume: 2781, trades: 278 },
    { name: "Jun", price: 0.16, volume: 1890, trades: 189 },
    { name: "Jul", price: 0.17, volume: 2390, trades: 239 },
    { name: "Aug", price: 0.15, volume: 3490, trades: 349 },
    { name: "Sep", price: 0.18, volume: 4500, trades: 450 },
  ];

  const energySourceData = [
    { name: 'Solar', value: 45, color: '#fbbf24' },
    { name: 'Wind', value: 30, color: '#60a5fa' },
    { name: 'Hydro', value: 15, color: '#34d399' },
    { name: 'Grid', value: 10, color: '#a78bfa' },
  ];

  const userActivityData = [
    { date: '01 Jan', consumers: 240, producers: 140, admins: 10 },
    { date: '02 Jan', consumers: 265, producers: 155, admins: 10 },
    { date: '03 Jan', consumers: 280, producers: 168, admins: 12 },
    { date: '04 Jan', consumers: 310, producers: 180, admins: 12 },
    { date: '05 Jan', consumers: 340, producers: 195, admins: 14 },
    { date: '06 Jan', consumers: 370, producers: 210, admins: 15 },
  ];

  // Apply theme to document
  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-admin-theme", "dark");
    } else {
      root.removeAttribute("data-admin-theme");
      root.setAttribute("data-admin-theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  /**
   * Overview Tab Component
   */
  function OverviewTab() {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <AdminCard 
            icon={Users} 
            title="Active Users" 
            value="1,245" 
            trend="+12% this month" 
            color="#3B82F6" 
          />
          <AdminCard 
            icon={Zap} 
            title="Total Energy Traded" 
            value="40,341 kWh" 
            trend="+5% this month" 
            color="#ef6b6b" 
          />
          <AdminCard 
            icon={TrendingUp} 
            title="Total Transactions" 
            value="5,678" 
            trend="+8% this month" 
            color="#10B981" 
          />
          <AdminCard 
            icon={DollarSign} 
            title="Average Price" 
            value="$0.15" 
            trend="per kWh" 
            color="#f59e0b" 
          />
        </div>

        {/* Real-Time Energy Pricing */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Real-Time Energy Pricing</h3>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Price ($/kWh)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /**
   * Analytics Tab Component
   */
  function AnalyticsTab() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume & Trades */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Trading Volume & Transactions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="volume" fill="#3b82f6" name="Volume (kWh)" />
                <Bar yAxisId="right" dataKey="trades" fill="#10b981" name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Energy Source Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Energy Source Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energySourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {energySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Growth */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="consumers" stroke="#3b82f6" strokeWidth={2} name="Consumers" />
              <Line type="monotone" dataKey="producers" stroke="#f59e0b" strokeWidth={2} name="Producers" />
              <Line type="monotone" dataKey="admins" stroke="#10b981" strokeWidth={2} name="Admins" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /**
   * System Status Tab Component
   */
  function SystemStatusTab() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Health */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">API Response Time</span>
                  <span className="text-sm text-green-600">120ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Database Performance</span>
                  <span className="text-sm text-green-600">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Server Uptime</span>
                  <span className="text-sm text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">High transaction volume detected</p>
                <p className="text-xs text-yellow-600 mt-1">5 minutes ago</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">New producer registered</p>
                <p className="text-xs text-blue-600 mt-1">12 minutes ago</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">Daily backup completed successfully</p>
                <p className="text-xs text-green-600 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Wallet Guide Tab Component
   */
  function WalletTab() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const isMetaMaskInstalled = () => {
      return typeof window.ethereum !== 'undefined';
    };

    const connectWallet = async () => {
      if (!isMetaMaskInstalled()) {
        alert('Please install MetaMask to continue');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);

        const chainIdHex = await window.ethereum.request({
          method: 'eth_chainId',
        });
        setChainId(chainIdHex);

        const balanceWei = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        const balanceEth = parseInt(balanceWei, 16) / Math.pow(10, 18);
        setBalance(balanceEth.toFixed(4));
      } catch (error) {
        console.error('Connection failed:', error);
        alert('Failed to connect wallet');
      } finally {
        setIsConnecting(false);
      }
    };

    const getChainName = (chainId) => {
      const chains = {
        '0x1': 'Ethereum Mainnet',
        '0x5': 'Goerli Testnet',
        '0xaa36a7': 'Sepolia Testnet',
        '0x89': 'Polygon Mainnet',
      };
      return chains[chainId] || `Chain ${parseInt(chainId, 16)}`;
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MetaMask Connection Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold dark:text-white">Connect MetaMask Wallet</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">📋 Setup Steps:</h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
                  <li>Install MetaMask browser extension</li>
                  <li>Create or import your wallet</li>
                  <li>Set a strong password</li>
                  <li>Save your recovery phrase securely</li>
                  <li>Click "Connect Wallet" button below</li>
                </ol>
              </div>
              
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Wallet size={18} />
                {isConnecting ? 'Connecting...' : 'Connect MetaMask Wallet'}
              </button>

              {!isMetaMaskInstalled() && (
                <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">❌ MetaMask not detected. <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Install MetaMask</a></p>
                </div>
              )}
            </div>
          </div>

          {/* Wallet Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold dark:text-white mb-4">💰 Wallet Information</h3>
            {account ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                  <p className="text-xs text-green-600 dark:text-green-300 font-semibold">✓ Connected</p>
                  <p className="text-sm font-mono text-green-900 dark:text-green-100 break-all">{account}</p>
                </div>
                {chainId && (
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg">
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 font-semibold">Network</p>
                    <p className="text-sm text-indigo-900 dark:text-indigo-100">{getChainName(chainId)}</p>
                  </div>
                )}
                {balance && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg">
                    <p className="text-xs text-amber-600 dark:text-amber-300 font-semibold">Balance</p>
                    <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{balance} ETH</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">Connect your wallet to view information</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits & Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 dark:from-purple-900 to-purple-100 dark:to-purple-800 rounded-lg shadow p-6 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🔒 Security</h4>
            <p className="text-sm text-purple-700 dark:text-purple-200">Your private keys stay with you. We never have access to them.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900 to-blue-100 dark:to-blue-800 rounded-lg shadow p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">⚡ Instant Trades</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">Execute energy trades directly from your wallet in seconds.</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 dark:from-green-900 to-green-100 dark:to-green-800 rounded-lg shadow p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">💎 Full Control</h4>
            <p className="text-sm text-green-700 dark:text-green-200">Manage your tokens and assets with complete transparency.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-container theme-${theme}`}>
      <Sidebar
        active={activeTab}
        setActive={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role="admin"
      />
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        {/* Enhanced Navbar with Theme Toggle */}
        <div className="navbar-wrapper">
          <Navbar />
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>
        </div>
        
        <div className="content-area">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 flex-wrap">
              {['Overview', 'Analytics', 'Status', 'Wallet'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {tab === 'Wallet' && <Wallet size={16} />}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'Overview' && <OverviewTab />}
          {activeTab === 'Analytics' && <AnalyticsTab />}
          {activeTab === 'Status' && <SystemStatusTab />}
          {activeTab === 'Wallet' && <WalletTab />}
        </div>
      </div>
    </div>
  );
}




export default AdminPanal;
