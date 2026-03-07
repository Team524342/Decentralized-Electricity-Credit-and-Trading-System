import React, { useState, useCallback, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NavLink } from "react-router-dom";
import { 
  Zap, TrendingUp, TrendingDown, DollarSign, 
  ArrowUpRight, ArrowDownRight, RefreshCw, 
  AlertCircle, CheckCircle, Loader 
} from 'lucide-react';
import "../assets/producer.css";

function ProducerDashboard() {
  const [energyGenerated, setEnergyGenerated] = useState(150);
  const [tokenBalance, setTokenBalance] = useState(120);
  const [earnings, setEarnings] = useState(4560);
  const [pricePerETK, setPricePerETK] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Chart data
  const energyData = [
    { time: '00:00', generated: 2, sold: 1.5, revenue: 18 },
    { time: '04:00', generated: 0.5, sold: 0, revenue: 0 },
    { time: '08:00', generated: 8.5, sold: 7.2, revenue: 86.4 },
    { time: '12:00', generated: 15.2, sold: 14.8, revenue: 177.6 },
    { time: '16:00', generated: 12.8, sold: 12.1, revenue: 145.2 },
    { time: '20:00', generated: 3.5, sold: 3.2, revenue: 38.4 },
  ];

  const monthlyData = [
    { month: 'Jan', generated: 480, sold: 420, earnings: 5040 },
    { month: 'Feb', generated: 520, sold: 480, earnings: 5760 },
    { month: 'Mar', generated: 610, sold: 580, earnings: 6960 },
    { month: 'Apr', generated: 680, sold: 640, earnings: 7680 },
    { month: 'May', generated: 720, sold: 680, earnings: 8160 },
    { month: 'Jun', generated: 850, sold: 800, earnings: 9600 },
  ];

  const revenueBreakdown = [
    { name: 'Solar Sales', value: 45, color: '#fbbf24' },
    { name: 'Grid Export', value: 35, color: '#3b82f6' },
    { name: 'P2P Trading', value: 20, color: '#10b981' },
  ];

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  /**
   * Mint tokens from generated energy
   */
  const mintTokens = useCallback(async () => {
    if (energyGenerated <= 0) {
      setError('No energy available to mint tokens');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBalance = tokenBalance + energyGenerated;
      setTokenBalance(newBalance);
      setSuccess(`Successfully minted ${energyGenerated} tokens!`);
      setEnergyGenerated(0);
    } catch (err) {
      setError('Failed to mint tokens. Please try again.');
      console.error('Mint error:', err);
    } finally {
      setLoading(false);
    }
  }, [energyGenerated, tokenBalance]);

  /**
   * Sell tokens on marketplace
   */
  const sellTokens = useCallback(async () => {
    const amount = prompt("Enter ETK amount to sell (max: " + tokenBalance + "):");
    
    if (!amount) return;

    const sellAmount = parseFloat(amount);
    if (isNaN(sellAmount) || sellAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (sellAmount > tokenBalance) {
      setError('Insufficient token balance');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const total = sellAmount * pricePerETK;
      const commission = (2 / 100) * total;
      const net = total - commission;
      
      setTokenBalance(tokenBalance - sellAmount);
      setEarnings(earnings + net);
      setSuccess(`Successfully sold ${sellAmount} ETK for $${net.toFixed(2)}!`);
    } catch (err) {
      setError('Failed to sell tokens. Please try again.');
      console.error('Sell error:', err);
    } finally {
      setLoading(false);
    }
  }, [tokenBalance, earnings, pricePerETK]);

  const StatCard = ({ icon: Icon, title, value, change, suffix = '', trend, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {value}{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {Math.abs(change).toFixed(2)}% {trend}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EnergyChain</h1>
                <p className="text-sm text-gray-500">Producer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly Earnings</p>
                <p className="text-lg font-bold text-gray-900">${earnings.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                PA
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {(error || success) && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {['overview', 'analytics', 'actions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium text-sm capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Zap}
                title="Energy Generated"
                value={energyGenerated.toFixed(1)}
                change={12.5}
                suffix=" kWh"
                trend="vs yesterday"
                color="bg-blue-600"
              />
              <StatCard 
                icon={Zap}
                title="Token Balance"
                value={tokenBalance.toFixed(0)}
                change={5.2}
                suffix=" ETK"
                trend="this month"
                color="bg-green-600"
              />
              <StatCard 
                icon={DollarSign}
                title="Total Earnings"
                value={earnings.toFixed(0)}
                change={18.3}
                suffix=""
                trend="vs last month"
                color="bg-purple-600"
              />
              <StatCard 
                icon={TrendingUp}
                title="Token Price"
                value={pricePerETK.toFixed(2)}
                change={3.1}
                suffix=" $/ETK"
                trend="vs yesterday"
                color="bg-orange-600"
              />
            </div>

            {/* Charts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Energy Production</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="generated" stroke="#3b82f6" strokeWidth={2} name="Generated (kWh)" />
                  <Line type="monotone" dataKey="sold" stroke="#10b981" strokeWidth={2} name="Sold (kWh)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Generation & Earnings</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="generated" fill="#3b82f6" name="Generated (kWh)" />
                    <Bar dataKey="sold" fill="#10b981" name="Sold (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mint Tokens Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mint Tokens</h3>
                <p className="text-gray-600 text-sm mb-6">Convert your generated energy into tradeable tokens</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-900">Available Energy</p>
                  <p className="text-3xl font-bold text-blue-600">{energyGenerated.toFixed(1)} kWh</p>
                </div>
                <button
                  onClick={mintTokens}
                  disabled={loading || energyGenerated === 0}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Mint {energyGenerated.toFixed(0)} Tokens
                    </>
                  )}
                </button>
              </div>

              {/* Sell Tokens Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sell Tokens</h3>
                <p className="text-gray-600 text-sm mb-6">Sell your tokens on the marketplace for earnings</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-900">Token Balance</p>
                  <p className="text-3xl font-bold text-green-600">{tokenBalance.toFixed(0)} ETK</p>
                </div>
                <button
                  onClick={sellTokens}
                  disabled={loading || tokenBalance === 0}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4" />
                      Sell Tokens
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <NavLink
                  to="/producer/transactions"
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  <p className="text-sm font-medium text-gray-900">Transactions</p>
                </NavLink>
                <NavLink
                  to="/producer/reports"
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  <p className="text-sm font-medium text-gray-900">Reports</p>
                </NavLink>
                <NavLink
                  to="/producer/profile"
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  <p className="text-sm font-medium text-gray-900">Profile</p>
                </NavLink>
                <NavLink
                  to="/marketplace"
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  <p className="text-sm font-medium text-gray-900">Marketplace</p>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProducerDashboard;
