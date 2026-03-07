import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, TrendingDown, Users, Battery, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw, Sun, Wind, Activity } from 'lucide-react';

const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPrice, setCurrentPrice] = useState(0.15);
  const [priceChange, setPriceChange] = useState(0);

  // Simulate dynamic pricing
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.02;
      setCurrentPrice(prev => Math.max(0.05, Math.min(0.30, prev + change)));
      setPriceChange(change);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const energyUsageData = [
    { time: '00:00', usage: 2.1, generation: 0, price: 0.12 },
    { time: '04:00', usage: 1.8, generation: 0, price: 0.10 },
    { time: '08:00', usage: 3.5, generation: 1.2, price: 0.16 },
    { time: '12:00', usage: 4.2, generation: 4.8, price: 0.14 },
    { time: '16:00', usage: 3.8, generation: 3.5, price: 0.18 },
    { time: '20:00', usage: 5.1, generation: 0.2, price: 0.22 },
  ];

  const p2pTransactions = [
    { id: 1, peer: 'Solar House #247', type: 'buy', amount: 12.5, price: 0.14, time: '2 min ago', status: 'completed' },
    { id: 2, peer: 'Wind Farm Collective', type: 'buy', amount: 25.0, price: 0.13, time: '15 min ago', status: 'completed' },
    { id: 3, peer: 'Community Battery', type: 'sell', amount: 8.3, price: 0.16, time: '1 hr ago', status: 'completed' },
    { id: 4, peer: 'Green Energy Coop', type: 'buy', amount: 15.7, price: 0.15, time: '2 hr ago', status: 'pending' },
  ];

  const marketOffers = [
    { id: 1, seller: 'Solar Array #89', quantity: 50, price: 0.13, source: 'Solar', distance: '0.8 km', rating: 4.8 },
    { id: 2, seller: 'Community Wind', quantity: 100, price: 0.14, source: 'Wind', distance: '2.1 km', rating: 4.9 },
    { id: 3, seller: 'Hydro Station', quantity: 75, price: 0.12, source: 'Hydro', distance: '5.3 km', rating: 4.7 },
    { id: 4, seller: 'Residential Solar', quantity: 20, price: 0.15, source: 'Solar', distance: '0.3 km', rating: 4.6 },
  ];

  const energySourceDistribution = [
    { name: 'Solar', value: 45, color: '#fbbf24' },
    { name: 'Wind', value: 30, color: '#60a5fa' },
    { name: 'Hydro', value: 15, color: '#34d399' },
    { name: 'Grid', value: 10, color: '#a78bfa' },
  ];

  const StatCard = ({ icon: Icon, title, value, change, suffix = '', trend }) => (
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
        <div className={`p-3 rounded-lg ${
          title.includes('Price') ? 'bg-purple-100' :
          title.includes('Credits') ? 'bg-green-100' :
          title.includes('Usage') ? 'bg-blue-100' :
          'bg-orange-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            title.includes('Price') ? 'text-purple-600' :
            title.includes('Credits') ? 'text-green-600' :
            title.includes('Usage') ? 'text-blue-600' :
            'text-orange-600'
          }`} />
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={DollarSign}
          title="Current Price"
          value={currentPrice.toFixed(3)}
          change={(priceChange / currentPrice) * 100}
          suffix=" $/kWh"
          trend="vs last update"
        />
        <StatCard 
          icon={Battery}
          title="Energy Credits"
          value="847.5"
          change={12.3}
          suffix=" kWh"
          trend="this month"
        />
        <StatCard 
          icon={Zap}
          title="Today's Usage"
          value="24.3"
          change={-5.2}
          suffix=" kWh"
          trend="vs yesterday"
        />
        <StatCard 
          icon={Users}
          title="P2P Trades"
          value="156"
          change={23.1}
          suffix=""
          trend="this week"
        />
      </div>

      {/* Energy Flow Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Energy Flow & Pricing (24h)</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Price</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={energyUsageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} name="Usage (kWh)" />
            <Line yAxisId="left" type="monotone" dataKey="generation" stroke="#10b981" strokeWidth={2} name="Generation (kWh)" />
            <Line yAxisId="right" type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} name="Price ($/kWh)" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Energy Sources & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Energy Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={energySourceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {energySourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {energySourceDistribution.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                <span className="text-sm text-gray-600">{source.name}: {source.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent P2P Transactions</h3>
          <div className="space-y-3">
            {p2pTransactions.slice(0, 4).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tx.type === 'buy' ? 'bg-blue-100' : 'bg-green-100'}`}>
                    {tx.type === 'buy' ? 
                      <ArrowDownRight className={`w-4 h-4 text-blue-600`} /> : 
                      <ArrowUpRight className={`w-4 h-4 text-green-600`} />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.peer}</p>
                    <p className="text-xs text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{tx.amount} kWh</p>
                  <p className="text-xs text-gray-500">${tx.price}/kWh</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MarketplaceTab = () => (
    <div className="space-y-6">
      {/* Live Market Price */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Live Market Price</p>
            <p className="text-4xl font-bold">${currentPrice.toFixed(3)}/kWh</p>
            <div className={`flex items-center mt-2 text-sm ${priceChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {priceChange >= 0 ? '+' : ''}{((priceChange / currentPrice) * 100).toFixed(2)}% Last update
            </div>
          </div>
          <div className="p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur">
            <Activity className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Available Offers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Available Energy Offers</h3>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Seller</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Source</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Distance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {marketOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{offer.seller}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {offer.source === 'Solar' && <Sun className="w-4 h-4 text-yellow-500" />}
                      {offer.source === 'Wind' && <Wind className="w-4 h-4 text-blue-500" />}
                      {offer.source === 'Hydro' && <Zap className="w-4 h-4 text-green-500" />}
                      <span className="text-sm text-gray-700">{offer.source}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{offer.quantity} kWh</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-semibold text-purple-600">${offer.price}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{offer.distance}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-900">{offer.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Sell Order */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sell Your Energy</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kWh)</label>
            <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($/kWh)</label>
            <input type="number" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0.15" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>1 hour</option>
              <option>4 hours</option>
              <option>24 hours</option>
              <option>Until sold</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
              Create Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaction History</h3>
        <div className="space-y-3">
          {p2pTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${tx.type === 'buy' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {tx.type === 'buy' ? 
                    <ArrowDownRight className="w-5 h-5 text-blue-600" /> : 
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{tx.peer}</p>
                  <p className="text-sm text-gray-500">{tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{tx.amount} kWh</p>
                <p className="text-sm text-gray-600">${tx.price}/kWh · ${(tx.amount * tx.price).toFixed(2)}</p>
              </div>
              <div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
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
              <div className="p-2 bg-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EnergyChain</h1>
                <p className="text-sm text-gray-500">Decentralized Energy Exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Account Balance</p>
                <p className="text-lg font-bold text-gray-900">$2,347.82</p>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {['overview', 'marketplace', 'transactions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium text-sm capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'marketplace' && <MarketplaceTab />}
        {activeTab === 'transactions' && <TransactionsTab />}
      </main>
    </div>
  );
};

export default ConsumerDashboard;