// // // E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\pages\adminPanal.jsx
// // import React, { useState, useEffect } from "react";
// // import "../assets/adminPanal.css";
// // import Sidebar from "../components/adminSidebar";
// // import Navbar from "../components/adminNavbar";
// // import AdminCard from "../components/adminCard";
// // import { 
// //   Users, TrendingUp, DollarSign, Zap, 
// //   BarChart3, LineChart as LineChartIcon,
// //   PieChart as PieChartIcon,
// //   ArrowUpRight, ArrowDownRight, RefreshCw,
// //   Moon, Sun, Wallet
// // } from 'lucide-react';
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend
// // } from "recharts";

// // /**
// //  * Admin Dashboard Component
// //  * System overview, analytics, and management controls
// //  */
// // function AdminPanal() {
// //   const [activeTab, setActiveTab] = useState("Overview");
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [theme, setTheme] = useState(() => {
// //     const saved = localStorage.getItem("admin-theme");
// //     return saved || "dark";
// //   });

// //   // Analytics data
// //   const priceData = [
// //     { name: "Jan", price: 0.12, volume: 4000, trades: 240 },
// //     { name: "Feb", price: 0.11, volume: 3000, trades: 221 },
// //     { name: "Mar", price: 0.15, volume: 5000, trades: 229 },
// //     { name: "Apr", price: 0.13, volume: 2000, trades: 200 },
// //     { name: "May", price: 0.14, volume: 2781, trades: 278 },
// //     { name: "Jun", price: 0.16, volume: 1890, trades: 189 },
// //     { name: "Jul", price: 0.17, volume: 2390, trades: 239 },
// //     { name: "Aug", price: 0.15, volume: 3490, trades: 349 },
// //     { name: "Sep", price: 0.18, volume: 4500, trades: 450 },
// //   ];

// //   const energySourceData = [
// //     { name: 'Solar', value: 45, color: '#fbbf24' },
// //     { name: 'Wind', value: 30, color: '#60a5fa' },
// //     { name: 'Hydro', value: 15, color: '#34d399' },
// //     { name: 'Grid', value: 10, color: '#a78bfa' },
// //   ];

// //   const userActivityData = [
// //     { date: '01 Jan', consumers: 240, producers: 140, admins: 10 },
// //     { date: '02 Jan', consumers: 265, producers: 155, admins: 10 },
// //     { date: '03 Jan', consumers: 280, producers: 168, admins: 12 },
// //     { date: '04 Jan', consumers: 310, producers: 180, admins: 12 },
// //     { date: '05 Jan', consumers: 340, producers: 195, admins: 14 },
// //     { date: '06 Jan', consumers: 370, producers: 210, admins: 15 },
// //   ];

// //   // Apply theme to document
// //   useEffect(() => {
// //     localStorage.setItem("admin-theme", theme);
// //     const root = document.documentElement;
// //     if (theme === "dark") {
// //       root.setAttribute("data-admin-theme", "dark");
// //     } else {
// //       root.removeAttribute("data-admin-theme");
// //       root.setAttribute("data-admin-theme", "light");
// //     }
// //   }, [theme]);

// //   const toggleTheme = () => {
// //     setTheme(prev => prev === "dark" ? "light" : "dark");
// //   };

// //   /**
// //    * Overview Tab Component
// //    */
// //   function OverviewTab() {
// //     return (
// //       <div className="space-y-6">
// //         {/* Stats Cards */}
// //         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
// //           <AdminCard 
// //             icon={Users} 
// //             title="Active Users" 
// //             value="1,245" 
// //             trend="+12% this month" 
// //             color="#3B82F6" 
// //           />
// //           <AdminCard 
// //             icon={Zap} 
// //             title="Total Energy Traded" 
// //             value="40,341 kWh" 
// //             trend="+5% this month" 
// //             color="#ef6b6b" 
// //           />
// //           <AdminCard 
// //             icon={TrendingUp} 
// //             title="Total Transactions" 
// //             value="5,678" 
// //             trend="+8% this month" 
// //             color="#10B981" 
// //           />
// //           <AdminCard 
// //             icon={DollarSign} 
// //             title="Average Price" 
// //             value="$0.15" 
// //             trend="per kWh" 
// //             color="#f59e0b" 
// //           />
// //         </div>

// //         {/* Real-Time Energy Pricing */}
// //         <div className="bg-white rounded-lg shadow p-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <h3 className="text-lg font-semibold">Real-Time Energy Pricing</h3>
// //             <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
// //               <RefreshCw className="w-4 h-4" />
// //               Refresh
// //             </button>
// //           </div>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={priceData}>
// //               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //               <XAxis dataKey="name" stroke="#6b7280" />
// //               <YAxis stroke="#6b7280" />
// //               <Tooltip 
// //                 contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
// //               />
// //               <Legend />
// //               <Line 
// //                 type="monotone" 
// //                 dataKey="price" 
// //                 stroke="#3b82f6" 
// //                 strokeWidth={2}
// //                 name="Price ($/kWh)" 
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /**
// //    * Analytics Tab Component
// //    */
// //   function AnalyticsTab() {
// //     return (
// //       <div className="space-y-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Volume & Trades */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-semibold mb-4">Trading Volume & Transactions</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={priceData}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //                 <XAxis dataKey="name" stroke="#6b7280" />
// //                 <YAxis yAxisId="left" stroke="#6b7280" />
// //                 <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
// //                 <Tooltip 
// //                   contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
// //                 />
// //                 <Legend />
// //                 <Bar yAxisId="left" dataKey="volume" fill="#3b82f6" name="Volume (kWh)" />
// //                 <Bar yAxisId="right" dataKey="trades" fill="#10b981" name="Transactions" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Energy Source Distribution */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-semibold mb-4">Energy Source Distribution</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <PieChart>
// //                 <Pie
// //                   data={energySourceData}
// //                   cx="50%"
// //                   cy="50%"
// //                   labelLine={false}
// //                   label={({ name, value }) => `${name} ${value}%`}
// //                   outerRadius={80}
// //                   fill="#8884d8"
// //                   dataKey="value"
// //                 >
// //                   {energySourceData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={entry.color} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* User Activity Growth */}
// //         <div className="bg-white rounded-lg shadow p-6">
// //           <h3 className="text-lg font-semibold mb-4">User Activity Growth</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={userActivityData}>
// //               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //               <XAxis dataKey="date" stroke="#6b7280" />
// //               <YAxis stroke="#6b7280" />
// //               <Tooltip 
// //                 contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
// //               />
// //               <Legend />
// //               <Line type="monotone" dataKey="consumers" stroke="#3b82f6" strokeWidth={2} name="Consumers" />
// //               <Line type="monotone" dataKey="producers" stroke="#f59e0b" strokeWidth={2} name="Producers" />
// //               <Line type="monotone" dataKey="admins" stroke="#10b981" strokeWidth={2} name="Admins" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /**
// //    * System Status Tab Component
// //    */
// //   function SystemStatusTab() {
// //     return (
// //       <div className="space-y-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* System Health */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-semibold mb-4">System Health</h3>
// //             <div className="space-y-4">
// //               <div>
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="text-sm font-medium text-gray-700">API Response Time</span>
// //                   <span className="text-sm text-green-600">120ms</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="text-sm font-medium text-gray-700">Database Performance</span>
// //                   <span className="text-sm text-green-600">98%</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="text-sm font-medium text-gray-700">Server Uptime</span>
// //                   <span className="text-sm text-green-600">99.9%</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Recent Alerts */}
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
// //             <div className="space-y-3">
// //               <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <p className="text-sm font-medium text-yellow-800">High transaction volume detected</p>
// //                 <p className="text-xs text-yellow-600 mt-1">5 minutes ago</p>
// //               </div>
// //               <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
// //                 <p className="text-sm font-medium text-blue-800">New producer registered</p>
// //                 <p className="text-xs text-blue-600 mt-1">12 minutes ago</p>
// //               </div>
// //               <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
// //                 <p className="text-sm font-medium text-green-800">Daily backup completed successfully</p>
// //                 <p className="text-xs text-green-600 mt-1">1 hour ago</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /**
// //    * Wallet Guide Tab Component
// //    */
// //   function WalletTab() {
// //     const [account, setAccount] = useState(null);
// //     const [balance, setBalance] = useState(null);
// //     const [chainId, setChainId] = useState(null);
// //     const [isConnecting, setIsConnecting] = useState(false);

// //     const isMetaMaskInstalled = () => {
// //       return typeof window.ethereum !== 'undefined';
// //     };

// //     const connectWallet = async () => {
// //       if (!isMetaMaskInstalled()) {
// //         alert('Please install MetaMask to continue');
// //         window.open('https://metamask.io/download/', '_blank');
// //         return;
// //       }

// //       setIsConnecting(true);
// //       try {
// //         const accounts = await window.ethereum.request({
// //           method: 'eth_requestAccounts',
// //         });
// //         setAccount(accounts[0]);

// //         const chainIdHex = await window.ethereum.request({
// //           method: 'eth_chainId',
// //         });
// //         setChainId(chainIdHex);

// //         const balanceWei = await window.ethereum.request({
// //           method: 'eth_getBalance',
// //           params: [accounts[0], 'latest'],
// //         });
// //         const balanceEth = parseInt(balanceWei, 16) / Math.pow(10, 18);
// //         setBalance(balanceEth.toFixed(4));
// //       } catch (error) {
// //         console.error('Connection failed:', error);
// //         alert('Failed to connect wallet');
// //       } finally {
// //         setIsConnecting(false);
// //       }
// //     };

// //     const getChainName = (chainId) => {
// //       const chains = {
// //         '0x1': 'Ethereum Mainnet',
// //         '0x5': 'Goerli Testnet',
// //         '0xaa36a7': 'Sepolia Testnet',
// //         '0x89': 'Polygon Mainnet',
// //       };
// //       return chains[chainId] || `Chain ${parseInt(chainId, 16)}`;
// //     };

// //     return (
// //       <div className="space-y-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* MetaMask Connection Guide */}
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
// //             <div className="flex items-center gap-3 mb-4">
// //               <Wallet className="w-6 h-6 text-purple-600" />
// //               <h3 className="text-lg font-semibold dark:text-white">Connect MetaMask Wallet</h3>
// //             </div>
// //             <div className="space-y-4">
// //               <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
// //                 <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">📋 Setup Steps:</h4>
// //                 <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
// //                   <li>Install MetaMask browser extension</li>
// //                   <li>Create or import your wallet</li>
// //                   <li>Set a strong password</li>
// //                   <li>Save your recovery phrase securely</li>
// //                   <li>Click "Connect Wallet" button below</li>
// //                 </ol>
// //               </div>
              
// //               <button
// //                 onClick={connectWallet}
// //                 disabled={isConnecting}
// //                 className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
// //               >
// //                 <Wallet size={18} />
// //                 {isConnecting ? 'Connecting...' : 'Connect MetaMask Wallet'}
// //               </button>

// //               {!isMetaMaskInstalled() && (
// //                 <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
// //                   <p className="text-sm text-red-800 dark:text-red-200">❌ MetaMask not detected. <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Install MetaMask</a></p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Wallet Info */}
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
// //             <h3 className="text-lg font-semibold dark:text-white mb-4">💰 Wallet Information</h3>
// //             {account ? (
// //               <div className="space-y-4">
// //                 <div className="p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
// //                   <p className="text-xs text-green-600 dark:text-green-300 font-semibold">✓ Connected</p>
// //                   <p className="text-sm font-mono text-green-900 dark:text-green-100 break-all">{account}</p>
// //                 </div>
// //                 {chainId && (
// //                   <div className="p-3 bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg">
// //                     <p className="text-xs text-indigo-600 dark:text-indigo-300 font-semibold">Network</p>
// //                     <p className="text-sm text-indigo-900 dark:text-indigo-100">{getChainName(chainId)}</p>
// //                   </div>
// //                 )}
// //                 {balance && (
// //                   <div className="p-3 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg">
// //                     <p className="text-xs text-amber-600 dark:text-amber-300 font-semibold">Balance</p>
// //                     <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{balance} ETH</p>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-center">
// //                 <p className="text-sm text-gray-600 dark:text-gray-300">Connect your wallet to view information</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Benefits & Features */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           <div className="bg-gradient-to-br from-purple-50 dark:from-purple-900 to-purple-100 dark:to-purple-800 rounded-lg shadow p-6 border border-purple-200 dark:border-purple-700">
// //             <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🔒 Security</h4>
// //             <p className="text-sm text-purple-700 dark:text-purple-200">Your private keys stay with you. We never have access to them.</p>
// //           </div>
// //           <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900 to-blue-100 dark:to-blue-800 rounded-lg shadow p-6 border border-blue-200 dark:border-blue-700">
// //             <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">⚡ Instant Trades</h4>
// //             <p className="text-sm text-blue-700 dark:text-blue-200">Execute energy trades directly from your wallet in seconds.</p>
// //           </div>
// //           <div className="bg-gradient-to-br from-green-50 dark:from-green-900 to-green-100 dark:to-green-800 rounded-lg shadow p-6 border border-green-200 dark:border-green-700">
// //             <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">💎 Full Control</h4>
// //             <p className="text-sm text-green-700 dark:text-green-200">Manage your tokens and assets with complete transparency.</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`admin-container theme-${theme}`}>
// //       <Sidebar
// //         active={activeTab}
// //         setActive={setActiveTab}
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //         role="admin"
// //       />
// //       <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
// //         {/* Enhanced Navbar with Theme Toggle */}
// //         <div className="navbar-wrapper">
// //           <Navbar />
// //           <button
// //             onClick={toggleTheme}
// //             title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
// //             className="theme-toggle-btn"
// //             aria-label="Toggle theme"
// //           >
// //             {theme === 'dark' ? (
// //               <Sun size={20} className="text-yellow-500" />
// //             ) : (
// //               <Moon size={20} className="text-slate-700" />
// //             )}
// //           </button>
// //         </div>
        
// //         <div className="content-area">
// //           {/* Tab Navigation */}
// //           <div className="mb-6">
// //             <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 flex-wrap">
// //               {['Overview', 'Analytics', 'Status', 'Wallet'].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
// //                     activeTab === tab
// //                       ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
// //                       : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
// //                   }`}
// //                 >
// //                   {tab === 'Wallet' && <Wallet size={16} />}
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Tab Content */}
// //           {activeTab === 'Overview' && <OverviewTab />}
// //           {activeTab === 'Analytics' && <AnalyticsTab />}
// //           {activeTab === 'Status' && <SystemStatusTab />}
// //           {activeTab === 'Wallet' && <WalletTab />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // export default AdminPanal;



// import { useState, useEffect } from "react";
// import {
//   LineChart, Line, AreaChart, Area, BarChart, Bar,
//   XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
// } from "recharts";

// // ── Fake Data ───────────────────────────────────────────────────────────────
// const tpsData = Array.from({length:24},(_,i)=>({t:`${i}:00`,tps:(1600+Math.sin(i/2)*300+Math.random()*100).toFixed(0)}));
// const txVolume = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,vol:(800+Math.random()*400).toFixed(0)}));
// const energyFlow = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,prod:(220+Math.random()*80).toFixed(0),consumed:(190+Math.random()*70).toFixed(0),traded:(160+Math.random()*60).toFixed(0)}));
// const priceHistory = Array.from({length:14},(_,i)=>({d:`D${i+1}`,price:(0.086+Math.sin(i/3)*0.008+Math.random()*0.003).toFixed(4)}));
// const feeRevenue = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,fees:(180+Math.random()*120).toFixed(0)}));
// const userGrowth = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,consumers:Math.floor(120+Math.random()*60),producers:Math.floor(40+Math.random()*30)}));
// const fraudScatter = Array.from({length:30},(_,i)=>({x:+(Math.random()*100).toFixed(1),y:+(Math.random()*100).toFixed(1),z:Math.random()>0.85?80:20,flagged:Math.random()>0.85}));
// const gasUsage = ["trade","credit","price","register","withdraw"].map(fn=>({fn,gas:(21000+Math.random()*15000).toFixed(0)}));
// const carbonIssued = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,ccr:(40+Math.random()*30).toFixed(0)}));

// const PIE_ROLES = [{name:"Consumer",value:68},{name:"Producer",value:24},{name:"Both",value:8}];
// const PIE_COLORS = ["#0066ff","#00e5a0","#f5a623"];

// const users = [
//   {id:"USR-001",wallet:"0xA1b…c23",role:"Producer",status:"Active",joined:"2026-01-12",trades:142,balance:"892 TKN"},
//   {id:"USR-002",wallet:"0xB2c…d34",role:"Consumer",status:"Active",joined:"2026-01-28",trades:87,balance:"234 TKN"},
//   {id:"USR-003",wallet:"0xC3d…e45",role:"Both",status:"Suspended",joined:"2026-02-03",trades:203,balance:"1.2K TKN"},
//   {id:"USR-004",wallet:"0xD4e…f56",role:"Consumer",status:"Active",joined:"2026-02-14",trades:31,balance:"112 TKN"},
//   {id:"USR-005",wallet:"0xE5f…g67",role:"Producer",status:"Banned",joined:"2026-01-05",trades:0,balance:"0 TKN"},
// ];
// const txMonitor = [
//   {hash:"0xfe3…a1",from:"0xA1b…",to:"0xB2c…",kwh:5.2,price:0.091,credits:47.3,time:"2s ago",status:"Confirmed",flag:false},
//   {hash:"0xaa1…b2",from:"0xC3d…",to:"0xD4e…",kwh:9.8,price:0.089,credits:87.2,time:"14s ago",status:"Flagged",flag:true},
//   {hash:"0xbc2…c3",from:"0xE5f…",to:"0xF6g…",kwh:2.1,price:0.094,credits:19.7,time:"32s ago",status:"Confirmed",flag:false},
//   {hash:"0xde3…d4",from:"0xG7h…",to:"0xH8i…",kwh:14.0,price:0.082,credits:114.8,time:"1m ago",status:"Flagged",flag:true},
//   {hash:"0xef4…e5",from:"0xI9j…",to:"0xJ0k…",kwh:3.3,price:0.090,credits:29.7,time:"2m ago",status:"Pending",flag:false},
// ];
// const contracts = [
//   {name:"DECT_Trade",addr:"0x11a…",version:"v2.4.1",status:"Active",calls:"84,291",updated:"2026-02-20"},
//   {name:"DECT_Credit",addr:"0x22b…",version:"v2.1.0",status:"Active",calls:"61,047",updated:"2026-02-20"},
//   {name:"DECT_Pricing",addr:"0x33c…",version:"v1.8.3",status:"Active",calls:"38,822",updated:"2026-01-15"},
//   {name:"DECT_Carbon",addr:"0x44d…",version:"v1.2.0",status:"Paused",calls:"12,400",updated:"2026-01-08"},
// ];
// const auditLog = [
//   {time:"08:41:22",admin:"SuperAdmin",action:"Adjusted pricing weights",target:"DECT_Pricing",ip:"192.168.1.4"},
//   {time:"07:30:11",admin:"Moderator1",action:"Suspended user",target:"USR-003",ip:"10.0.0.12"},
//   {time:"06:55:00",admin:"SuperAdmin",action:"Deployed contract upgrade",target:"DECT_Trade v2.4.1",ip:"192.168.1.4"},
//   {time:"Yesterday",admin:"FinanceAdmin",action:"Withdrew platform fees",target:"Treasury wallet",ip:"172.16.0.5"},
// ];
// const pendingApprovals = [
//   {id:"PRD-091",wallet:"0xK1l…m23",capacity:"10 kW",location:"Hyderabad",submitted:"1h ago"},
//   {id:"PRD-092",wallet:"0xL2m…n34",capacity:"5 kW",location:"Bangalore",submitted:"3h ago"},
//   {id:"PRD-093",wallet:"0xM3n…o45",capacity:"20 kW",location:"Chennai",submitted:"6h ago"},
// ];

// // ── Atoms ───────────────────────────────────────────────────────────────────
// const Card=({icon,label,value,sub,accent="#00e5a0",alert})=>(
//   <div style={{background:alert?"#1a0a0a":"#0d1b36",border:`1px solid ${alert?"#3d1a1a":"#1e3460"}`,borderRadius:12,padding:"13px 16px",flex:1,minWidth:120}}>
//     <div style={{fontSize:17,marginBottom:2}}>{icon}</div>
//     <div style={{color:"#8ba0c4",fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
//     <div style={{color:alert?"#ff4d4d":"#e8f0ff",fontSize:18,fontWeight:700,fontFamily:"'Space Mono',monospace",marginTop:2}}>{value}</div>
//     {sub&&<div style={{color:alert?"#ff6b6b":accent,fontSize:10,marginTop:2}}>{sub}</div>}
//   </div>
// );
// const Modal=({title,children,onClose,danger})=>(
//   <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
//     <div style={{background:danger?"#130808":"#0d1b36",border:`1px solid ${danger?"#3d1a1a":"#1e3460"}`,borderRadius:16,padding:28,width:440,maxWidth:"92vw"}}>
//       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
//         <span style={{color:danger?"#ff4d4d":"#e8f0ff",fontWeight:700,fontSize:15}}>{title}</span>
//         <button onClick={onClose} style={{background:"none",border:"none",color:"#8ba0c4",fontSize:20,cursor:"pointer"}}>✕</button>
//       </div>
//       {children}
//     </div>
//   </div>
// );
// const Input=({label,placeholder,type="text"})=>(
//   <div style={{marginBottom:12}}>
//     <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>{label}</div>
//     <input type={type} placeholder={placeholder} style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
//   </div>
// );
// const Btn=({children,onClick,color="#00e5a0",small,full,danger})=>(
//   <button onClick={onClick} style={{
//     background:danger?"#ff4d4d22":color,
//     color:danger?"#ff4d4d":color==="#00e5a0"?"#071020":"#e8f0ff",
//     border:danger?"1px solid #ff4d4d44":"none",
//     borderRadius:8,padding:small?"5px 11px":"9px 17px",
//     fontWeight:700,fontSize:small?11:13,cursor:"pointer",
//     letterSpacing:0.4,fontFamily:"'Space Mono',monospace",
//     whiteSpace:"nowrap",width:full?"100%":"auto"
//   }}>{children}</button>
// );
// const StatusBadge=({s})=>{
//   const map={Active:["#00e5a0","#00e5a022"],Confirmed:["#00e5a0","#00e5a022"],Paused:["#f5a623","#f5a62322"],Pending:["#f5a623","#f5a62322"],Flagged:["#ff4d4d","#ff4d4d22"],Suspended:["#ff4d4d","#ff4d4d22"],Banned:["#ff4d4d","#ff4d4d22"],Deprecated:["#4a6490","#1e3460"]};
//   const [c,bg]=map[s]||["#8ba0c4","#1e3460"];
//   return <span style={{background:bg,color:c,borderRadius:5,padding:"2px 8px",fontSize:11,fontWeight:600}}>{s}</span>;
// };

// // ── Main ────────────────────────────────────────────────────────────────────
// export default function AdminDashboard(){
//   const [tab,setTab]=useState("Dashboard");
//   const [modal,setModal]=useState(null);
//   const [systemPaused,setSystemPaused]=useState(false);
//   const [tps,setTps]=useState(1847);
//   const [blockH,setBlockH]=useState(21904832);
//   const [notif,setNotif]=useState(7);
//   const [gridStress,setGridStress]=useState(34);
//   const [confirmPause,setConfirmPause]=useState(false);
//   const [selectedUser,setSelectedUser]=useState(null);
//   const [selectedTx,setSelectedTx]=useState(null);

//   useEffect(()=>{
//     const id=setInterval(()=>{
//       setTps(t=>Math.max(1400,Math.min(2100,t+Math.floor((Math.random()-0.5)*80))));
//       setBlockH(b=>b+Math.floor(Math.random()*3));
//       setGridStress(g=>Math.max(15,Math.min(85,g+(Math.random()-0.5)*4)));
//     },2000);
//     return()=>clearInterval(id);
//   },[]);

//   const stressColor=gridStress>70?"#ff4d4d":gridStress>50?"#f5a623":"#00e5a0";

//   const nav=[
//     {icon:"🏠",label:"Dashboard"},
//     {icon:"👥",label:"User Management"},
//     {icon:"⚡",label:"Market Oversight"},
//     {icon:"🔄",label:"Transaction Monitor"},
//     {icon:"📜",label:"Smart Contracts"},
//     {icon:"💳",label:"Fee & Revenue"},
//     {icon:"🚨",label:"Fraud Detection"},
//     {icon:"🌱",label:"Carbon Registry"},
//     {icon:"🔋",label:"Device Registry"},
//     {icon:"📊",label:"Analytics"},
//     {icon:"🔔",label:"Broadcast"},
//     {icon:"⚙️",label:"System Settings"},
//     {icon:"🛡️",label:"Admin Roles"},
//     {icon:"📋",label:"Audit Logs"},
//   ];

//   return(
//     <div style={{display:"flex",height:"100vh",background:"#071020",fontFamily:"'DM Sans',sans-serif",color:"#e8f0ff",overflow:"hidden"}}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         ::-webkit-scrollbar{width:4px;background:#071020}
//         ::-webkit-scrollbar-thumb{background:#1e3460;border-radius:4px}
//         .anav:hover{background:#0d1b36!important;color:#00e5a0!important}
//         .trow:hover{background:#0d2040!important}
//         @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
//         .blink{animation:pulse 1.2s infinite}
//         @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
//       `}</style>

//       {/* ── LEFT SIDEBAR ── */}
//       <div style={{width:215,background:"#08121f",borderRight:"1px solid #1e3460",display:"flex",flexDirection:"column",flexShrink:0}}>
//         <div style={{padding:"16px 18px 14px",borderBottom:"1px solid #1e3460"}}>
//           <div style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:17}}>⚡ DECT</div>
//           <div style={{color:"#4a6490",fontSize:10,marginTop:1}}>Energy Trading Network</div>
//           <div style={{marginTop:10,background:"#130808",border:"1px solid #3d1a1a",borderRadius:8,padding:"7px 10px",display:"flex",alignItems:"center",gap:7}}>
//             <span style={{fontSize:14}}>🛡️</span>
//             <div>
//               <div style={{color:"#ff6b6b",fontSize:11,fontWeight:700}}>Super Admin</div>
//               <div style={{color:"#4a6490",fontSize:10}}>Full Access</div>
//             </div>
//           </div>
//         </div>
//         <div style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
//           {nav.map(n=>(
//             <div key={n.label} className="anav" onClick={()=>setTab(n.label)}
//               style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:7,cursor:"pointer",marginBottom:1,
//                 background:tab===n.label?"#0d1b36":"transparent",
//                 color:tab===n.label?"#00e5a0":"#8ba0c4",
//                 fontSize:12,fontWeight:tab===n.label?600:400,transition:"all 0.12s"}}>
//               <span style={{fontSize:13}}>{n.icon}</span>{n.label}
//               {n.label==="Fraud Detection"&&<span style={{marginLeft:"auto",background:"#ff4d4d",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#fff",fontWeight:700}}>3</span>}
//               {n.label==="User Management"&&<span style={{marginLeft:"auto",background:"#f5a623",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#071020",fontWeight:700}}>3</span>}
//             </div>
//           ))}
//         </div>
//         <div style={{padding:"10px 14px",borderTop:"1px solid #1e3460"}}>
//           <div style={{background:"#0d1b36",borderRadius:9,padding:10,border:"1px solid #1e3460"}}>
//             <div style={{color:"#8ba0c4",fontSize:10}}>Admin Wallet</div>
//             <div style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace",fontSize:10,marginTop:2}}>0xADM…0001</div>
//             <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
//               <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#00e5a0"}}/>
//               <span style={{color:"#8ba0c4",fontSize:10}}>Block #{blockH.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN ── */}
//       <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

//         {/* Header */}
//         <div style={{background:systemPaused?"#130808":"#08121f",borderBottom:`1px solid ${systemPaused?"#3d1a1a":"#1e3460"}`,padding:"0 20px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,transition:"background 0.3s"}}>
//           <div style={{display:"flex",alignItems:"center",gap:12}}>
//             <span style={{color:"#e8f0ff",fontWeight:700,fontSize:14}}>{tab}</span>
//             {systemPaused&&(
//               <span className="blink" style={{background:"#ff4d4d22",border:"1px solid #ff4d4d",color:"#ff4d4d",borderRadius:6,padding:"2px 12px",fontSize:11,fontWeight:700}}>
//                 🔴 SYSTEM PAUSED — ALL TRADES FROZEN
//               </span>
//             )}
//           </div>
//           <div style={{display:"flex",alignItems:"center",gap:12}}>
//             {/* Live metrics strip */}
//             <div style={{display:"flex",gap:8}}>
//               {[
//                 {label:"TPS",val:tps.toLocaleString(),c:"#00e5a0"},
//                 {label:"GAS",val:"0.42 Gwei",c:"#f5a623"},
//                 {label:"GRID",val:`${gridStress.toFixed(0)}%`,c:stressColor},
//               ].map(m=>(
//                 <div key={m.label} style={{background:"#071020",border:"1px solid #1e3460",borderRadius:7,padding:"4px 10px",display:"flex",gap:5,alignItems:"center"}}>
//                   <span style={{color:"#4a6490",fontSize:10}}>{m.label}</span>
//                   <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:m.c,fontWeight:700}}>{m.val}</span>
//                 </div>
//               ))}
//             </div>
//             {/* Emergency Pause */}
//             <button onClick={()=>setConfirmPause(true)}
//               style={{background:systemPaused?"#00e5a0":"#ff4d4d",color:systemPaused?"#071020":"#fff",border:"none",borderRadius:8,padding:"6px 14px",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Space Mono',monospace",letterSpacing:0.5}}>
//               {systemPaused?"▶ RESUME":"🔴 PAUSE"}
//             </button>
//             <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setNotif(0)}>
//               <span style={{fontSize:17}}>🔔</span>
//               {notif>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#ff4d4d",borderRadius:"50%",width:15,height:15,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{notif}</div>}
//             </div>
//             <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#ff4d4d,#f5a623)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer"}}>A</div>
//           </div>
//         </div>

//         {/* Body */}
//         <div style={{flex:1,overflow:"auto",padding:16,display:"flex",gap:14}}>

//           {/* ── CENTER ── */}
//           <div style={{flex:1,display:"flex",flexDirection:"column",gap:13,minWidth:0}}>

//             {/* KPI Cards */}
//             <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
//               <Card icon="👥" label="Total Users" value="1,284" sub="↑ 34 this week" accent="#0066ff"/>
//               <Card icon="⚡" label="Traded Today" value="4,821 kWh" sub="↑ 8% vs yesterday" accent="#00e5a0"/>
//               <Card icon="💰" label="Fees Today" value="$14.62" sub="0.05% per tx" accent="#f5a623"/>
//               <Card icon="🔄" label="Active Trades" value="127" sub="Real-time"/>
//               <Card icon="🚨" label="Flagged Txs" value="3" sub="Needs review" accent="#ff4d4d" alert/>
//               <Card icon="🌱" label="Carbon Credits" value="142 CCR" sub="Issued this month"/>
//               <Card icon="📦" label="Contract Calls" value="38.4K" sub="Today"/>
//               <Card icon="🔋" label="Grid Supply" value="9,240 kWh" sub="Available now" accent="#0066ff"/>
//             </div>

//             {/* Admin Action Buttons */}
//             <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
//               <Btn onClick={()=>setModal("pricing")}>⚙️ Adjust Pricing</Btn>
//               <Btn onClick={()=>setModal("fee")} color="#0066ff">💳 Manage Fees</Btn>
//               <Btn onClick={()=>setModal("approve")} color="#f5a623">✅ Approve Producer</Btn>
//               <Btn onClick={()=>setModal("contract")} color="#1e3460">📜 Deploy Contract</Btn>
//               <Btn onClick={()=>setModal("broadcast")} color="#1e3460">📢 Broadcast Alert</Btn>
//               <Btn onClick={()=>setModal("carbon")} color="#1e3460">🌱 Issue Carbon Credits</Btn>
//               <Btn onClick={()=>alert("Rebalancing grid…")} color="#1e3460">⚡ Trigger Rebalance</Btn>
//               <Btn onClick={()=>alert("Exporting full audit report…")} color="#1e3460">📥 Export Report</Btn>
//             </div>

//             {/* Charts Row 1 */}
//             <div style={{display:"flex",gap:12}}>
//               <div style={{flex:2,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>⚡ System Energy Flow (kWh/day)</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <BarChart data={energyFlow}>
//                     <XAxis dataKey="d" tick={{fill:"#4a6490",fontSize:10}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:10}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",borderRadius:8,fontSize:11}}/>
//                     <Bar dataKey="prod" fill="#00e5a0" radius={[3,3,0,0]} name="Produced"/>
//                     <Bar dataKey="consumed" fill="#0066ff" radius={[3,3,0,0]} name="Consumed"/>
//                     <Bar dataKey="traded" fill="#f5a623" radius={[3,3,0,0]} name="Traded"/>
//                   </BarChart>
//                 </ResponsiveContainer>
//                 <div style={{display:"flex",gap:14,marginTop:5}}>
//                   {[["#00e5a0","Produced"],["#0066ff","Consumed"],["#f5a623","Traded"]].map(([c,l])=>(
//                     <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#8ba0c4"}}>
//                       <div style={{width:8,height:8,borderRadius:2,background:c}}/>{l}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>👥 User Role Distribution</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <PieChart>
//                     <Pie data={PIE_ROLES} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value">
//                       {PIE_ROLES.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
//                     </Pie>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:4,flexWrap:"wrap"}}>
//                   {PIE_ROLES.map((d,i)=>(
//                     <div key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:"#8ba0c4"}}>
//                       <div style={{width:7,height:7,borderRadius:2,background:PIE_COLORS[i]}}/>{d.name} {d.value}%
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Charts Row 2 */}
//             <div style={{display:"flex",gap:12}}>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>⚡ Layer-2 TPS Monitor</div>
//                 <ResponsiveContainer width="100%" height={110}>
//                   <AreaChart data={tpsData}>
//                     <XAxis dataKey="t" tick={{fill:"#4a6490",fontSize:9}} interval={4}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:9}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Area type="monotone" dataKey="tps" stroke="#00e5a0" fill="#00e5a011" strokeWidth={2}/>
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>📈 Dynamic Price History</div>
//                 <ResponsiveContainer width="100%" height={110}>
//                   <LineChart data={priceHistory}>
//                     <XAxis dataKey="d" tick={{fill:"#4a6490",fontSize:9}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:9}} domain={["auto","auto"]}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Line type="monotone" dataKey="price" stroke="#f5a623" strokeWidth={2} dot={false}/>
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>💰 Fee Revenue ($/month)</div>
//                 <ResponsiveContainer width="100%" height={110}>
//                   <BarChart data={feeRevenue}>
//                     <XAxis dataKey="m" tick={{fill:"#4a6490",fontSize:9}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:9}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Bar dataKey="fees" fill="#f5a623" radius={[3,3,0,0]}/>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Fraud Scatter + User Growth */}
//             <div style={{display:"flex",gap:12}}>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>🚨 Fraud Anomaly Detection</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <ScatterChart>
//                     <XAxis type="number" dataKey="x" tick={{fill:"#4a6490",fontSize:9}} name="Tx Amount"/>
//                     <YAxis type="number" dataKey="y" tick={{fill:"#4a6490",fontSize:9}} name="Risk Score"/>
//                     <ZAxis dataKey="z" range={[30,120]}/>
//                     <Tooltip cursor={{strokeDasharray:"3 3"}} contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Scatter data={fraudScatter.filter(d=>!d.flagged)} fill="#00e5a0" opacity={0.5}/>
//                     <Scatter data={fraudScatter.filter(d=>d.flagged)} fill="#ff4d4d" opacity={0.9}/>
//                   </ScatterChart>
//                 </ResponsiveContainer>
//                 <div style={{display:"flex",gap:12,marginTop:4}}>
//                   {[["#00e5a0","Normal"],["#ff4d4d","Flagged"]].map(([c,l])=>(
//                     <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#8ba0c4"}}>
//                       <div style={{width:7,height:7,borderRadius:"50%",background:c}}/>{l}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>👥 User Growth</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <BarChart data={userGrowth}>
//                     <XAxis dataKey="m" tick={{fill:"#4a6490",fontSize:9}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:9}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Bar dataKey="consumers" fill="#0066ff" radius={[3,3,0,0]} name="Consumers"/>
//                     <Bar dataKey="producers" fill="#00e5a0" radius={[3,3,0,0]} name="Producers"/>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>🌱 Carbon Credits Issued</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <BarChart data={carbonIssued}>
//                     <XAxis dataKey="m" tick={{fill:"#4a6490",fontSize:9}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:9}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:11}}/>
//                     <Bar dataKey="ccr" fill="#00e5a0" radius={[3,3,0,0]}/>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* User Management Table */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
//                 <div style={{color:"#e8f0ff",fontWeight:600,fontSize:13}}>👥 User Management</div>
//                 <div style={{display:"flex",gap:8}}>
//                   <input placeholder="Search wallet / ID…" style={{background:"#071020",border:"1px solid #1e3460",borderRadius:6,padding:"5px 10px",color:"#e8f0ff",fontSize:11,outline:"none",width:160}}/>
//                   <Btn small color="#1e3460">Filter</Btn>
//                   <Btn small color="#1e3460">Export</Btn>
//                 </div>
//               </div>
//               <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
//                 <thead>
//                   <tr style={{color:"#4a6490",textAlign:"left"}}>
//                     {["User ID","Wallet","Role","Status","Joined","Trades","Balance","Actions"].map(h=>(
//                       <th key={h} style={{padding:"6px 9px",borderBottom:"1px solid #1e3460",whiteSpace:"nowrap"}}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((u,i)=>(
//                     <tr key={i} className="trow" style={{borderBottom:"1px solid #0d2040",cursor:"pointer",transition:"background 0.1s"}} onClick={()=>setSelectedUser(u)}>
//                       <td style={{padding:"7px 9px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#8ba0c4"}}>{u.id}</td>
//                       <td style={{padding:"7px 9px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#8ba0c4"}}>{u.wallet}</td>
//                       <td style={{padding:"7px 9px"}}><span style={{color:u.role==="Producer"?"#00e5a0":u.role==="Consumer"?"#0066ff":"#f5a623",fontSize:11}}>{u.role}</span></td>
//                       <td style={{padding:"7px 9px"}}><StatusBadge s={u.status}/></td>
//                       <td style={{padding:"7px 9px",color:"#4a6490"}}>{u.joined}</td>
//                       <td style={{padding:"7px 9px",color:"#e8f0ff"}}>{u.trades}</td>
//                       <td style={{padding:"7px 9px",color:"#f5a623",fontFamily:"'Space Mono',monospace",fontSize:10}}>{u.balance}</td>
//                       <td style={{padding:"7px 9px"}}>
//                         <div style={{display:"flex",gap:4}}>
//                           <button style={{background:"#0066ff22",border:"1px solid #0066ff44",color:"#0066ff",borderRadius:4,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>View</button>
//                           <button style={{background:"#ff4d4d11",border:"1px solid #ff4d4d33",color:"#ff4d4d",borderRadius:4,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>Suspend</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Transaction Monitor */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
//                 <div style={{color:"#e8f0ff",fontWeight:600,fontSize:13}}>🔄 Transaction Monitor
//                   <span style={{background:"#ff4d4d22",border:"1px solid #ff4d4d44",color:"#ff4d4d",borderRadius:10,padding:"1px 7px",fontSize:10,marginLeft:8}}>2 flagged</span>
//                 </div>
//                 <div style={{display:"flex",gap:7}}>
//                   <Btn small color="#1e3460">Filter</Btn>
//                   <Btn small color="#1e3460">Flagged Only</Btn>
//                 </div>
//               </div>
//               <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
//                 <thead>
//                   <tr style={{color:"#4a6490",textAlign:"left"}}>
//                     {["TX Hash","From","To","kWh","Price","Credits","Time","Status","Action"].map(h=>(
//                       <th key={h} style={{padding:"5px 8px",borderBottom:"1px solid #1e3460",whiteSpace:"nowrap"}}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {txMonitor.map((r,i)=>(
//                     <tr key={i} className="trow" onClick={()=>setSelectedTx(r)} style={{borderBottom:"1px solid #0d2040",cursor:"pointer",background:r.flag?"#1a0a0a":"transparent",transition:"background 0.1s"}}>
//                       <td style={{padding:"6px 8px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#4a6490"}}>{r.hash}</td>
//                       <td style={{padding:"6px 8px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#8ba0c4"}}>{r.from}</td>
//                       <td style={{padding:"6px 8px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#8ba0c4"}}>{r.to}</td>
//                       <td style={{padding:"6px 8px",color:"#e8f0ff"}}>{r.kwh}</td>
//                       <td style={{padding:"6px 8px",color:"#00e5a0",fontFamily:"'Space Mono',monospace"}}>${r.price}</td>
//                       <td style={{padding:"6px 8px",color:"#f5a623"}}>{r.credits}</td>
//                       <td style={{padding:"6px 8px",color:"#4a6490"}}>{r.time}</td>
//                       <td style={{padding:"6px 8px"}}><StatusBadge s={r.status}/></td>
//                       <td style={{padding:"6px 8px"}}>
//                         {r.flag
//                           ? <button style={{background:"#ff4d4d22",border:"1px solid #ff4d4d44",color:"#ff4d4d",borderRadius:4,padding:"2px 8px",fontSize:10,cursor:"pointer"}}>Review</button>
//                           : <button style={{background:"#1e3460",border:"none",color:"#4a6490",borderRadius:4,padding:"2px 8px",fontSize:10,cursor:"pointer"}}>Flag</button>
//                         }
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Smart Contracts */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
//                 <div style={{color:"#e8f0ff",fontWeight:600,fontSize:13}}>📜 Smart Contract Manager</div>
//                 <Btn small onClick={()=>setModal("contract")}>+ Deploy New</Btn>
//               </div>
//               <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
//                 <thead>
//                   <tr style={{color:"#4a6490",textAlign:"left"}}>
//                     {["Contract","Address","Version","Status","Total Calls","Last Updated","Actions"].map(h=>(
//                       <th key={h} style={{padding:"5px 9px",borderBottom:"1px solid #1e3460",whiteSpace:"nowrap"}}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contracts.map((c,i)=>(
//                     <tr key={i} style={{borderBottom:"1px solid #0d2040"}}>
//                       <td style={{padding:"7px 9px",color:"#e8f0ff",fontWeight:600}}>{c.name}</td>
//                       <td style={{padding:"7px 9px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#4a6490"}}>{c.addr}</td>
//                       <td style={{padding:"7px 9px",color:"#8ba0c4",fontFamily:"'Space Mono',monospace"}}>{c.version}</td>
//                       <td style={{padding:"7px 9px"}}><StatusBadge s={c.status}/></td>
//                       <td style={{padding:"7px 9px",color:"#e8f0ff"}}>{c.calls}</td>
//                       <td style={{padding:"7px 9px",color:"#4a6490"}}>{c.updated}</td>
//                       <td style={{padding:"7px 9px"}}>
//                         <div style={{display:"flex",gap:4}}>
//                           <button style={{background:"#0066ff22",border:"1px solid #0066ff44",color:"#0066ff",borderRadius:4,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>Upgrade</button>
//                           <button style={{background:"#f5a62311",border:"1px solid #f5a62333",color:"#f5a623",borderRadius:4,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>Pause</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Audit Log */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
//                 <div style={{color:"#e8f0ff",fontWeight:600,fontSize:13}}>📋 Audit Log</div>
//                 <Btn small color="#1e3460">Export CSV</Btn>
//               </div>
//               <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
//                 <thead>
//                   <tr style={{color:"#4a6490",textAlign:"left"}}>
//                     {["Time","Admin","Action","Target","IP"].map(h=>(
//                       <th key={h} style={{padding:"5px 9px",borderBottom:"1px solid #1e3460"}}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {auditLog.map((a,i)=>(
//                     <tr key={i} style={{borderBottom:"1px solid #0d2040"}}>
//                       <td style={{padding:"6px 9px",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#4a6490"}}>{a.time}</td>
//                       <td style={{padding:"6px 9px",color:"#00e5a0",fontWeight:500}}>{a.admin}</td>
//                       <td style={{padding:"6px 9px",color:"#e8f0ff"}}>{a.action}</td>
//                       <td style={{padding:"6px 9px",color:"#8ba0c4",fontFamily:"'Space Mono',monospace",fontSize:10}}>{a.target}</td>
//                       <td style={{padding:"6px 9px",color:"#4a6490",fontFamily:"'Space Mono',monospace",fontSize:10}}>{a.ip}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>{/* end center */}

//           {/* ── RIGHT SIDEBAR ── */}
//           <div style={{width:228,display:"flex",flexDirection:"column",gap:12,flexShrink:0}}>

//             {/* Grid Stress Gauge */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:`1px solid ${stressColor}44`}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>⚡ Grid Stress Index</div>
//               <div style={{background:"#071020",borderRadius:8,height:14,overflow:"hidden",marginBottom:7}}>
//                 <div style={{width:`${gridStress}%`,height:"100%",background:`linear-gradient(90deg,#00e5a0,${stressColor})`,borderRadius:8,transition:"width 1.5s"}}/>
//               </div>
//               <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
//                 <span style={{color:stressColor,fontFamily:"'Space Mono',monospace",fontWeight:700}}>{gridStress.toFixed(0)}%</span>
//                 <span style={{color:"#4a6490"}}>{gridStress>70?"Critical":gridStress>50?"High":"Normal"}</span>
//               </div>
//             </div>

//             {/* Live TX Feed */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460",flex:1}}>
//               <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
//                 <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#ff4d4d"}}/>
//                 <span style={{color:"#8ba0c4",fontSize:11}}>Live Transaction Feed</span>
//               </div>
//               {txMonitor.map((t,i)=>(
//                 <div key={i} style={{borderBottom:"1px solid #0d2040",padding:"7px 0",background:t.flag?"#1a0a0a":"transparent"}}>
//                   <div style={{display:"flex",justifyContent:"space-between"}}>
//                     <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.flag?"#ff4d4d":"#8ba0c4"}}>{t.hash}</span>
//                     <span style={{fontSize:10,color:"#4a6490"}}>{t.time}</span>
//                   </div>
//                   <div style={{fontSize:10,color:"#4a6490",marginTop:2}}>{t.kwh} kWh · ${t.price} · {t.credits} TKN</div>
//                   {t.flag&&<div style={{fontSize:10,color:"#ff4d4d",marginTop:2}}>⚠️ Anomaly detected</div>}
//                 </div>
//               ))}
//             </div>

//             {/* Pending Producer Approvals */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #f5a62333"}}>
//               <div style={{color:"#f5a623",fontSize:11,marginBottom:10}}>⏳ Pending Approvals
//                 <span style={{background:"#f5a62322",borderRadius:10,padding:"1px 7px",fontSize:10,marginLeft:6}}>{pendingApprovals.length}</span>
//               </div>
//               {pendingApprovals.map((p,i)=>(
//                 <div key={i} style={{borderBottom:"1px solid #0d2040",padding:"7px 0"}}>
//                   <div style={{display:"flex",justifyContent:"space-between"}}>
//                     <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#e8f0ff"}}>{p.id}</span>
//                     <span style={{fontSize:10,color:"#4a6490"}}>{p.submitted}</span>
//                   </div>
//                   <div style={{fontSize:10,color:"#8ba0c4",marginTop:2}}>{p.location} · {p.capacity}</div>
//                   <div style={{display:"flex",gap:5,marginTop:5}}>
//                     <button style={{background:"#00e5a022",border:"1px solid #00e5a044",color:"#00e5a0",borderRadius:4,padding:"2px 9px",fontSize:10,cursor:"pointer",flex:1}}>Approve</button>
//                     <button style={{background:"#ff4d4d11",border:"1px solid #ff4d4d33",color:"#ff4d4d",borderRadius:4,padding:"2px 9px",fontSize:10,cursor:"pointer",flex:1}}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* System Health */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:10}}>🖥️ System Health</div>
//               {[
//                 {label:"API Uptime",val:"99.97%",c:"#00e5a0"},
//                 {label:"Node Sync",val:"In sync",c:"#00e5a0"},
//                 {label:"Arbitrum RPC",val:"12ms",c:"#00e5a0"},
//                 {label:"Gas Price",val:"0.42 Gwei",c:"#f5a623"},
//                 {label:"Pending Queue",val:"14 txs",c:"#0066ff"},
//               ].map((s,i)=>(
//                 <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:i<4?"1px solid #0d2040":"none"}}>
//                   <span style={{color:"#4a6490",fontSize:11}}>{s.label}</span>
//                   <span style={{color:s.c,fontSize:11,fontFamily:"'Space Mono',monospace",fontWeight:600}}>{s.val}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Admin Alerts */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>🔔 Admin Alerts</div>
//               {[
//                 {icon:"🚨",msg:"Suspicious tx 0xaa1 — review required",c:"#ff4d4d"},
//                 {icon:"⚡",msg:"Grid stress rising — 34%",c:"#f5a623"},
//                 {icon:"👤",msg:"New producer PRD-091 awaiting approval",c:"#0066ff"},
//                 {icon:"💸",msg:"Fee milestone: $500 collected",c:"#00e5a0"},
//                 {icon:"🔧",msg:"Contract upgrade available v2.4.2",c:"#8ba0c4"},
//               ].map((a,i)=>(
//                 <div key={i} style={{display:"flex",gap:7,padding:"5px 0",borderBottom:i<4?"1px solid #0d2040":"none",alignItems:"flex-start"}}>
//                   <span style={{fontSize:12}}>{a.icon}</span>
//                   <span style={{fontSize:10,color:a.c,lineHeight:1.4}}>{a.msg}</span>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── MODALS ── */}
//       {confirmPause&&(
//         <Modal title={systemPaused?"▶ Resume System":"🔴 Emergency System Pause"} onClose={()=>setConfirmPause(false)} danger={!systemPaused}>
//           <div style={{background:"#071020",borderRadius:8,padding:14,marginBottom:16,fontSize:13,color:systemPaused?"#00e5a0":"#ff6b6b",lineHeight:1.6}}>
//             {systemPaused
//               ?"This will resume all trading activity and smart contract interactions on the network."
//               :"⚠️ This will immediately freeze ALL trades, smart contracts, and transactions across the entire DECT network. Use only in emergencies."}
//           </div>
//           <div style={{display:"flex",gap:10}}>
//             <Btn full onClick={()=>{setSystemPaused(p=>!p);setConfirmPause(false);}} color={systemPaused?"#00e5a0":"#ff4d4d"}>
//               {systemPaused?"✅ Confirm Resume":"🔴 Confirm Pause"}
//             </Btn>
//             <Btn full color="#1e3460" onClick={()=>setConfirmPause(false)}>Cancel</Btn>
//           </div>
//         </Modal>
//       )}
//       {modal==="pricing"&&(
//         <Modal title="⚙️ Dynamic Pricing Parameters" onClose={()=>setModal(null)}>
//           <Input label="Supply Weight (0–1)" placeholder="e.g. 0.6" type="number"/>
//           <Input label="Demand Weight (0–1)" placeholder="e.g. 0.4" type="number"/>
//           <Input label="Update Frequency (seconds)" placeholder="e.g. 30" type="number"/>
//           <Input label="Min Price Floor ($/kWh)" placeholder="e.g. 0.070" type="number"/>
//           <Input label="Max Price Ceiling ($/kWh)" placeholder="e.g. 0.120" type="number"/>
//           <Btn full onClick={()=>setModal(null)}>Save Parameters</Btn>
//         </Modal>
//       )}
//       {modal==="fee"&&(
//         <Modal title="💳 Fee Structure" onClose={()=>setModal(null)}>
//           <Input label="Standard Fee (%)" placeholder="e.g. 0.05" type="number"/>
//           <Input label="Bulk Trader Threshold (kWh/month)" placeholder="e.g. 500" type="number"/>
//           <Input label="Bulk Trader Fee (%)" placeholder="e.g. 0.03" type="number"/>
//           <Btn full onClick={()=>setModal(null)}>Update Fee Structure</Btn>
//         </Modal>
//       )}
//       {modal==="approve"&&(
//         <Modal title="✅ Approve Producer" onClose={()=>setModal(null)}>
//           <Input label="Wallet Address" placeholder="0x…"/>
//           <Input label="Verified Capacity (kW)" placeholder="e.g. 10" type="number"/>
//           <Input label="Location" placeholder="e.g. Hyderabad"/>
//           <div style={{marginBottom:12}}>
//             <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>Energy Source</div>
//             <select style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none"}}>
//               <option>Solar</option><option>Wind</option><option>Battery</option><option>Hybrid</option>
//             </select>
//           </div>
//           <Btn full onClick={()=>setModal(null)}>Whitelist & Approve</Btn>
//         </Modal>
//       )}
//       {modal==="contract"&&(
//         <Modal title="📜 Deploy / Upgrade Smart Contract" onClose={()=>setModal(null)}>
//           <div style={{marginBottom:12}}>
//             <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>Contract</div>
//             <select style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none"}}>
//               <option>DECT_Trade</option><option>DECT_Credit</option><option>DECT_Pricing</option><option>DECT_Carbon</option>
//             </select>
//           </div>
//           <Input label="New Version Tag" placeholder="e.g. v2.4.2"/>
//           <Input label="Contract Bytecode / ABI Hash" placeholder="0x…"/>
//           <div style={{background:"#130808",borderRadius:8,padding:10,marginBottom:12,fontSize:11,color:"#ff6b6b"}}>
//             ⚠️ Deploying a contract upgrade will require admin wallet signature and brief service interruption.
//           </div>
//           <Btn full onClick={()=>setModal(null)}>Deploy to Arbitrum</Btn>
//         </Modal>
//       )}
//       {modal==="broadcast"&&(
//         <Modal title="📢 Broadcast System Alert" onClose={()=>setModal(null)}>
//           <div style={{marginBottom:12}}>
//             <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>Alert Type</div>
//             <select style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none"}}>
//               <option>Info</option><option>Warning</option><option>Critical</option><option>Maintenance</option>
//             </select>
//           </div>
//           <div style={{marginBottom:12}}>
//             <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>Recipients</div>
//             <select style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none"}}>
//               <option>All Users</option><option>Producers Only</option><option>Consumers Only</option>
//             </select>
//           </div>
//           <div style={{marginBottom:14}}>
//             <div style={{color:"#8ba0c4",fontSize:12,marginBottom:4}}>Message</div>
//             <textarea placeholder="Enter broadcast message…" style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"8px 12px",color:"#e8f0ff",fontSize:13,outline:"none",resize:"vertical",minHeight:80,boxSizing:"border-box"}}/>
//           </div>
//           <Btn full onClick={()=>setModal(null)}>Send Broadcast</Btn>
//         </Modal>
//       )}
//       {modal==="carbon"&&(
//         <Modal title="🌱 Issue Carbon Credits" onClose={()=>setModal(null)}>
//           <Input label="Producer Wallet Address" placeholder="0x…"/>
//           <Input label="kWh of Green Energy Contributed" placeholder="e.g. 50" type="number"/>
//           <Input label="Carbon Credits to Issue (CCR)" placeholder="e.g. 5" type="number"/>
//           <div style={{background:"#071020",borderRadius:8,padding:10,marginBottom:14,fontSize:11,color:"#8ba0c4"}}>
//             Conversion rate: <span style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace"}}>10 kWh = 1 CCR</span>
//           </div>
//           <Btn full onClick={()=>setModal(null)}>Issue Credits On-Chain</Btn>
//         </Modal>
//       )}
//       {selectedUser&&(
//         <Modal title={`👤 User: ${selectedUser.id}`} onClose={()=>setSelectedUser(null)}>
//           <div style={{background:"#071020",borderRadius:8,padding:12,marginBottom:14}}>
//             {[["Wallet",selectedUser.wallet],["Role",selectedUser.role],["Status",selectedUser.status],["Joined",selectedUser.joined],["Total Trades",selectedUser.trades],["Balance",selectedUser.balance]].map(([k,v])=>(
//               <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1e3460",fontSize:12}}>
//                 <span style={{color:"#8ba0c4"}}>{k}</span>
//                 <span style={{color:"#e8f0ff",fontFamily:k==="Wallet"||k==="Balance"?"'Space Mono',monospace":"inherit",fontSize:k==="Wallet"?11:12}}>{v}</span>
//               </div>
//             ))}
//           </div>
//           <div style={{display:"flex",gap:8}}>
//             <Btn full color="#f5a623" onClick={()=>setSelectedUser(null)}>⏸ Suspend</Btn>
//             <Btn full danger onClick={()=>setSelectedUser(null)}>🚫 Ban User</Btn>
//             <Btn full color="#1e3460" onClick={()=>setSelectedUser(null)}>Close</Btn>
//           </div>
//         </Modal>
//       )}
//       {selectedTx&&(
//         <Modal title="🚨 Review Flagged Transaction" onClose={()=>setSelectedTx(null)} danger={selectedTx.flag}>
//           <div style={{background:"#071020",borderRadius:8,padding:12,marginBottom:14}}>
//             {[["TX Hash",selectedTx.hash],["From",selectedTx.from],["To",selectedTx.to],["kWh",selectedTx.kwh],["Price",`$${selectedTx.price}/kWh`],["Credits",`${selectedTx.credits} TKN`],["Status",selectedTx.status]].map(([k,v])=>(
//               <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #1e3460",fontSize:12}}>
//                 <span style={{color:"#8ba0c4"}}>{k}</span>
//                 <span style={{color:"#e8f0ff",fontFamily:"'Space Mono',monospace",fontSize:11}}>{v}</span>
//               </div>
//             ))}
//           </div>
//           {selectedTx.flag&&<div style={{background:"#1a0a0a",border:"1px solid #3d1a1a",borderRadius:8,padding:10,marginBottom:14,fontSize:11,color:"#ff6b6b"}}>⚠️ Anomaly score: 87/100 — Unusual volume spike detected from this wallet</div>}
//           <div style={{display:"flex",gap:8}}>
//             <Btn full color="#1e3460" onClick={()=>setSelectedTx(null)}>✅ Mark Safe</Btn>
//             <Btn full danger onClick={()=>setSelectedTx(null)}>🚫 Ban Wallet</Btn>
//             <Btn full color="#1e3460" onClick={()=>setSelectedTx(null)}>Close</Btn>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from "recharts";

// ── Data ────────────────────────────────────────────────────────────────────
const tpsData = Array.from({length:24},(_,i)=>({t:`${i}:00`,tps:(1600+Math.sin(i/2)*300+Math.random()*100).toFixed(0)}));
const energyFlow = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,prod:(220+Math.random()*80).toFixed(0),consumed:(190+Math.random()*70).toFixed(0),traded:(160+Math.random()*60).toFixed(0)}));
const priceHistory = Array.from({length:14},(_,i)=>({d:`D${i+1}`,price:(0.086+Math.sin(i/3)*0.008+Math.random()*0.003).toFixed(4)}));
const feeRevenue = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,fees:(180+Math.random()*120).toFixed(0)}));
const userGrowth = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,consumers:Math.floor(120+Math.random()*60),producers:Math.floor(40+Math.random()*30)}));
const fraudScatter = Array.from({length:30},(_,i)=>({x:+(Math.random()*100).toFixed(1),y:+(Math.random()*100).toFixed(1),z:Math.random()>0.85?80:20,flagged:Math.random()>0.85}));
const carbonIssued = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,ccr:(40+Math.random()*30).toFixed(0)}));
const PIE_ROLES=[{name:"Consumer",value:68},{name:"Producer",value:24},{name:"Both",value:8}];
const PIE_COLORS=["#3b82f6","#10b981","#f59e0b"];

const users=[
  {id:"USR-001",wallet:"0xA1b…c23",role:"Producer",status:"Active",joined:"2026-01-12",trades:142,balance:"892 TKN"},
  {id:"USR-002",wallet:"0xB2c…d34",role:"Consumer",status:"Active",joined:"2026-01-28",trades:87,balance:"234 TKN"},
  {id:"USR-003",wallet:"0xC3d…e45",role:"Both",status:"Suspended",joined:"2026-02-03",trades:203,balance:"1.2K TKN"},
  {id:"USR-004",wallet:"0xD4e…f56",role:"Consumer",status:"Active",joined:"2026-02-14",trades:31,balance:"112 TKN"},
  {id:"USR-005",wallet:"0xE5f…g67",role:"Producer",status:"Banned",joined:"2026-01-05",trades:0,balance:"0 TKN"},
];
const txMonitor=[
  {hash:"0xfe3…a1",from:"0xA1b…",to:"0xB2c…",kwh:5.2,price:0.091,credits:47.3,time:"2s ago",status:"Confirmed",flag:false},
  {hash:"0xaa1…b2",from:"0xC3d…",to:"0xD4e…",kwh:9.8,price:0.089,credits:87.2,time:"14s ago",status:"Flagged",flag:true},
  {hash:"0xbc2…c3",from:"0xE5f…",to:"0xF6g…",kwh:2.1,price:0.094,credits:19.7,time:"32s ago",status:"Confirmed",flag:false},
  {hash:"0xde3…d4",from:"0xG7h…",to:"0xH8i…",kwh:14.0,price:0.082,credits:114.8,time:"1m ago",status:"Flagged",flag:true},
  {hash:"0xef4…e5",from:"0xI9j…",to:"0xJ0k…",kwh:3.3,price:0.090,credits:29.7,time:"2m ago",status:"Pending",flag:false},
];
const contracts=[
  {name:"DECT_Trade",addr:"0x11a…",version:"v2.4.1",status:"Active",calls:"84,291",updated:"2026-02-20"},
  {name:"DECT_Credit",addr:"0x22b…",version:"v2.1.0",status:"Active",calls:"61,047",updated:"2026-02-20"},
  {name:"DECT_Pricing",addr:"0x33c…",version:"v1.8.3",status:"Active",calls:"38,822",updated:"2026-01-15"},
  {name:"DECT_Carbon",addr:"0x44d…",version:"v1.2.0",status:"Paused",calls:"12,400",updated:"2026-01-08"},
];
const auditLog=[
  {time:"08:41:22",admin:"SuperAdmin",action:"Adjusted pricing weights",target:"DECT_Pricing",ip:"192.168.1.4"},
  {time:"07:30:11",admin:"Moderator1",action:"Suspended user",target:"USR-003",ip:"10.0.0.12"},
  {time:"06:55:00",admin:"SuperAdmin",action:"Deployed contract upgrade",target:"DECT_Trade v2.4.1",ip:"192.168.1.4"},
  {time:"Yesterday",admin:"FinanceAdmin",action:"Withdrew platform fees",target:"Treasury wallet",ip:"172.16.0.5"},
];
const pendingApprovals=[
  {id:"PRD-091",wallet:"0xK1l…m23",capacity:"10 kW",location:"Hyderabad",submitted:"1h ago"},
  {id:"PRD-092",wallet:"0xL2m…n34",capacity:"5 kW",location:"Bangalore",submitted:"3h ago"},
  {id:"PRD-093",wallet:"0xM3n…o45",capacity:"20 kW",location:"Chennai",submitted:"6h ago"},
];
const carbonRegistry=[
  {producer:"0xA1b…c23",kwh:120,credits:12,date:"2026-03-08",verified:true},
  {producer:"0xB2c…d34",kwh:85,credits:8,date:"2026-03-07",verified:true},
  {producer:"0xC3d…e45",kwh:200,credits:20,date:"2026-03-06",verified:false},
];

// ── Shared atoms ─────────────────────────────────────────────────────────────
const S={
  card:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:"16px 20px",flex:1,minWidth:130,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"},
  th:{padding:"10px 12px",borderBottom:"1px solid #e5e7eb",color:"#6b7280",fontSize:11,textTransform:"uppercase",letterSpacing:0.5,textAlign:"left",whiteSpace:"nowrap"},
  td:{padding:"10px 12px",fontSize:13,borderBottom:"1px solid #f3f4f6"},
  sectionTitle:{fontSize:15,fontWeight:700,color:"#111827",marginBottom:16},
  chartBox:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  chartLabel:{fontSize:12,color:"#6b7280",marginBottom:10,fontWeight:500},
};

const KpiCard=({icon,label,value,sub,color="#3b82f6",alert})=>(
  <div style={{...S.card,borderLeft:`4px solid ${alert?"#ef4444":color}`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{color:"#6b7280",fontSize:11,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>{label}</div>
        <div style={{color:alert?"#ef4444":"#111827",fontSize:22,fontWeight:800,fontFamily:"'Space Mono',monospace"}}>{value}</div>
        {sub&&<div style={{color:alert?"#ef4444":color,fontSize:11,marginTop:3}}>{sub}</div>}
      </div>
      <div style={{fontSize:22,opacity:0.7}}>{icon}</div>
    </div>
  </div>
);

const Badge=({s})=>{
  const m={Active:["#10b981","#d1fae5"],Confirmed:["#10b981","#d1fae5"],Paused:["#f59e0b","#fef3c7"],Pending:["#f59e0b","#fef3c7"],Flagged:["#ef4444","#fee2e2"],Suspended:["#ef4444","#fee2e2"],Banned:["#6b7280","#f3f4f6"],Deprecated:["#6b7280","#f3f4f6"]};
  const [c,bg]=m[s]||["#6b7280","#f3f4f6"];
  return <span style={{background:bg,color:c,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600}}>{s}</span>;
};

const Btn=({children,onClick,variant="primary",small})=>{
  const vars={
    primary:{background:"#111827",color:"#fff",border:"none"},
    outline:{background:"#fff",color:"#374151",border:"1px solid #d1d5db"},
    danger:{background:"#fee2e2",color:"#ef4444",border:"1px solid #fca5a5"},
    success:{background:"#d1fae5",color:"#10b981",border:"1px solid #6ee7b7"},
    blue:{background:"#eff6ff",color:"#3b82f6",border:"1px solid #bfdbfe"},
  };
  const v=vars[variant]||vars.primary;
  return(
    <button onClick={onClick} style={{...v,borderRadius:8,padding:small?"5px 12px":"8px 16px",fontWeight:600,fontSize:small?11:13,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>
      {children}
    </button>
  );
};

const Modal=({title,children,onClose})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{background:"#fff",borderRadius:16,padding:28,width:460,maxWidth:"92vw",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <span style={{color:"#111827",fontWeight:700,fontSize:16}}>{title}</span>
        <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,color:"#6b7280"}}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const Field=({label,placeholder,type="text"})=>(
  <div style={{marginBottom:14}}>
    <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>{label}</div>
    <input type={type} placeholder={placeholder} style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",color:"#111827",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
  </div>
);

const PageWrap=({title,subtitle,children,action})=>(
  <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h1 style={{fontSize:22,fontWeight:800,color:"#111827",margin:0}}>{title}</h1>
        {subtitle&&<p style={{color:"#6b7280",fontSize:13,margin:"4px 0 0"}}>{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Row=({children,gap=16})=><div style={{display:"flex",gap,flexWrap:"wrap",marginBottom:gap}}>{children}</div>;

// ── Pages ────────────────────────────────────────────────────────────────────

function PageDashboard({tps,gridStress,stressColor,setModal,setConfirmPause,systemPaused}){
  return(
    <PageWrap title="Dashboard" subtitle="System overview — live data">
      <Row gap={12}>
        <KpiCard icon="👥" label="Total Users" value="1,284" sub="↑ 34 this week" color="#3b82f6"/>
        <KpiCard icon="⚡" label="Traded Today" value="4,821 kWh" sub="↑ 8% vs yesterday" color="#10b981"/>
        <KpiCard icon="💰" label="Fees Today" value="$14.62" sub="0.05% per tx" color="#f59e0b"/>
        <KpiCard icon="🔄" label="Active Trades" value="127" sub="Real-time" color="#8b5cf6"/>
        <KpiCard icon="🚨" label="Flagged Txs" value="3" sub="Needs review" alert/>
        {/* <KpiCard icon="🌱" label="Carbon Credits" value="142 CCR" sub="This month" color="#10b981"/> */}
      </Row>

      <Row gap={16}>
        <div style={{...S.chartBox,flex:2}}>
          <div style={S.chartLabel}>⚡ System Energy Flow (kWh/day)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={energyFlow}>
              <XAxis dataKey="d" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,fontSize:12}}/>
              <Bar dataKey="prod" fill="#10b981" radius={[4,4,0,0]} name="Produced"/>
              <Bar dataKey="consumed" fill="#3b82f6" radius={[4,4,0,0]} name="Consumed"/>
              <Bar dataKey="traded" fill="#f59e0b" radius={[4,4,0,0]} name="Traded"/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:16,marginTop:8}}>
            {[["#10b981","Produced"],["#3b82f6","Consumed"],["#f59e0b","Traded"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:10,height:10,borderRadius:3,background:c}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>👥 User Role Distribution</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PIE_ROLES} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                {PIE_ROLES.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:4}}>
            {PIE_ROLES.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#6b7280"}}>
                <div style={{width:8,height:8,borderRadius:2,background:PIE_COLORS[i]}}/>{d.name} {d.value}%
              </div>
            ))}
          </div>
        </div>
      </Row>

      <Row gap={16}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>⚡ Layer-2 TPS Monitor</div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={tpsData}>
              <XAxis dataKey="t" tick={{fontSize:10,fill:"#9ca3af"}} interval={4}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Area type="monotone" dataKey="tps" stroke="#10b981" fill="#d1fae5" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📈 Dynamic Price History ($/kWh)</div>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={priceHistory}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}} domain={["auto","auto"]}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>💰 Fee Revenue ($/month)</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={feeRevenue}>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="fees" fill="#3b82f6" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Row>

      {/* Grid stress */}
      <div style={{...S.chartBox,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={S.chartLabel}>⚡ Grid Stress Index</span>
          <span style={{fontSize:12,fontWeight:700,color:stressColor}}>{gridStress.toFixed(0)}% — {gridStress>70?"Critical":gridStress>50?"High":"Normal"}</span>
        </div>
        <div style={{background:"#f3f4f6",borderRadius:8,height:14,overflow:"hidden"}}>
          <div style={{width:`${gridStress}%`,height:"100%",background:`linear-gradient(90deg,#10b981,${stressColor})`,borderRadius:8,transition:"width 1.5s"}}/>
        </div>
      </div>

      {/* System health */}
      <div style={{...S.chartBox}}>
        <div style={S.chartLabel}>🖥️ System Health</div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          {[["API Uptime","99.97%","#10b981"],["Node Sync","In sync","#10b981"],["Arbitrum RPC","12ms","#10b981"],["Gas Price","0.42 Gwei","#f59e0b"],["Pending Queue","14 txs","#3b82f6"]].map(([l,v,c])=>(
            <div key={l} style={{background:"#f9fafb",borderRadius:8,padding:"10px 16px",flex:1,minWidth:100,border:"1px solid #e5e7eb"}}>
              <div style={{color:"#6b7280",fontSize:11}}>{l}</div>
              <div style={{color:c,fontWeight:700,fontSize:15,fontFamily:"'Space Mono',monospace",marginTop:3}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageUsers({setModal}){
  const [sel,setSel]=useState(null);
  return(
    <PageWrap title="User Management" subtitle="Manage all registered users" action={<Btn onClick={()=>{}}>+ Add User</Btn>}>
      <div style={{...S.chartBox}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <input placeholder="Search by wallet or ID…" style={{background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"8px 14px",fontSize:13,outline:"none",width:240}}/>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="outline" small>Filter</Btn>
            <Btn variant="outline" small>Export CSV</Btn>
          </div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["User ID","Wallet","Role","Status","Joined","Trades","Balance","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {users.map((u,i)=>(
              <tr key={i} className="trow" style={{cursor:"pointer"}} onClick={()=>setSel(u)}>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{u.id}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{u.wallet}</td>
                <td style={S.td}><span style={{color:u.role==="Producer"?"#10b981":u.role==="Consumer"?"#3b82f6":"#f59e0b",fontWeight:600,fontSize:12}}>{u.role}</span></td>
                <td style={S.td}><Badge s={u.status}/></td>
                <td style={{...S.td,color:"#6b7280"}}>{u.joined}</td>
                <td style={{...S.td,color:"#111827",fontWeight:500}}>{u.trades}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f59e0b"}}>{u.balance}</td>
                <td style={S.td}>
                  <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
                    <Btn variant="blue" small onClick={()=>setSel(u)}>View</Btn>
                    <Btn variant="danger" small>Suspend</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel&&(
        <Modal title={`User — ${sel.id}`} onClose={()=>setSel(null)}>
          <div style={{background:"#f9fafb",borderRadius:10,padding:14,marginBottom:16}}>
            {[["Wallet",sel.wallet],["Role",sel.role],["Status",sel.status],["Joined",sel.joined],["Total Trades",sel.trades],["Balance",sel.balance]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #e5e7eb",fontSize:13}}>
                <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
                <span style={{color:"#111827",fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="outline" onClick={()=>setSel(null)}>⏸ Suspend</Btn>
            <Btn variant="danger" onClick={()=>setSel(null)}>🚫 Ban User</Btn>
            <Btn onClick={()=>setSel(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageTransactions(){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("All");
  const filtered=filter==="Flagged"?txMonitor.filter(t=>t.flag):txMonitor;
  return(
    <PageWrap title="Transaction Monitor" subtitle="All trades across the network">
      <div style={{...S.chartBox}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",gap:8}}>
            {["All","Flagged","Pending"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"#111827":"#f3f4f6",color:filter===f?"#fff":"#374151",border:"none",borderRadius:7,padding:"6px 14px",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                {f}{f==="Flagged"&&<span style={{marginLeft:5,background:"#ef4444",color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:10}}>2</span>}
              </button>
            ))}
          </div>
          <Btn variant="outline" small>Export</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["TX Hash","From","To","kWh","Price","Credits","Time","Status","Action"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((r,i)=>(
              <tr key={i} className="trow" onClick={()=>setSel(r)} style={{cursor:"pointer",background:r.flag?"#fff5f5":"transparent"}}>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#9ca3af"}}>{r.hash}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#6b7280"}}>{r.from}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#6b7280"}}>{r.to}</td>
                <td style={{...S.td,fontWeight:600}}>{r.kwh}</td>
                <td style={{...S.td,color:"#10b981",fontFamily:"'Space Mono',monospace",fontSize:12}}>${r.price}</td>
                <td style={{...S.td,color:"#f59e0b",fontFamily:"'Space Mono',monospace",fontSize:12}}>{r.credits}</td>
                <td style={{...S.td,color:"#9ca3af"}}>{r.time}</td>
                <td style={S.td}><Badge s={r.status}/></td>
                <td style={S.td} onClick={e=>e.stopPropagation()}>
                  {r.flag
                    ?<Btn variant="danger" small onClick={()=>setSel(r)}>Review</Btn>
                    :<Btn variant="outline" small>Flag</Btn>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel&&(
        <Modal title={sel.flag?"🚨 Flagged Transaction":"Transaction Detail"} onClose={()=>setSel(null)}>
          {sel.flag&&<div style={{background:"#fff5f5",border:"1px solid #fca5a5",borderRadius:8,padding:12,marginBottom:14,fontSize:12,color:"#ef4444"}}>⚠️ Anomaly score: 87/100 — Unusual volume spike detected from this wallet.</div>}
          <div style={{background:"#f9fafb",borderRadius:10,padding:14,marginBottom:16}}>
            {[["TX Hash",sel.hash],["From",sel.from],["To",sel.to],["kWh",sel.kwh],["Price",`$${sel.price}/kWh`],["Credits",`${sel.credits} TKN`],["Status",sel.status]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #e5e7eb",fontSize:13}}>
                <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
                <span style={{color:"#111827",fontWeight:600,fontFamily:k.includes("Hash")||k.includes("From")||k.includes("To")?"'Space Mono',monospace":"inherit",fontSize:k.includes("Hash")?11:13}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="success" onClick={()=>setSel(null)}>✅ Mark Safe</Btn>
            <Btn variant="danger" onClick={()=>setSel(null)}>🚫 Ban Wallet</Btn>
            <Btn onClick={()=>setSel(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageContracts(){
  const [modal,setModal]=useState(false);
  return(
    <PageWrap title="Smart Contracts" subtitle="Deployed contracts on Arbitrum" action={<Btn onClick={()=>setModal(true)}>+ Deploy New</Btn>}>
      <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        {[["84,291","Total Calls Today","#3b82f6"],["4","Contracts Live","#10b981"],["0","Failed Txs","#ef4444"],["12ms","Avg Latency","#f59e0b"]].map(([v,l,c])=>(
          <div key={l} style={{...S.chartBox,flex:1,minWidth:120}}>
            <div style={{color:"#6b7280",fontSize:11}}>{l}</div>
            <div style={{color:c,fontSize:20,fontWeight:800,fontFamily:"'Space Mono',monospace",marginTop:4}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={S.chartBox}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Contract","Address","Version","Status","Total Calls","Last Updated","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {contracts.map((c,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,fontWeight:700,color:"#111827"}}>{c.name}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#9ca3af"}}>{c.addr}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{c.version}</td>
                <td style={S.td}><Badge s={c.status}/></td>
                <td style={{...S.td,fontWeight:600}}>{c.calls}</td>
                <td style={{...S.td,color:"#9ca3af"}}>{c.updated}</td>
                <td style={S.td}>
                  <div style={{display:"flex",gap:6}}>
                    <Btn variant="blue" small>Upgrade</Btn>
                    <Btn variant="danger" small>Pause</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal&&(
        <Modal title="📜 Deploy / Upgrade Contract" onClose={()=>setModal(false)}>
          <div style={{marginBottom:14}}>
            <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>Contract</div>
            <select style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",fontSize:13,outline:"none"}}>
              <option>DECT_Trade</option><option>DECT_Credit</option><option>DECT_Pricing</option><option>DECT_Carbon</option>
            </select>
          </div>
          <Field label="New Version Tag" placeholder="e.g. v2.4.2"/>
          <Field label="ABI Hash" placeholder="0x…"/>
          <div style={{background:"#fff5f5",border:"1px solid #fca5a5",borderRadius:8,padding:10,marginBottom:14,fontSize:12,color:"#ef4444"}}>
            ⚠️ Deployment requires admin wallet signature and brief service interruption.
          </div>
          <Btn onClick={()=>setModal(false)}>Deploy to Arbitrum</Btn>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageFraud(){
  return(
    <PageWrap title="Fraud & Anomaly Detection" subtitle="AI-powered suspicious activity monitoring">
      <Row gap={12}>
        <KpiCard icon="🚨" label="Flagged Today" value="3" sub="Auto-detected" alert/>
        <KpiCard icon="🔍" label="Reviewed" value="1" sub="Marked safe" color="#10b981"/>
        <KpiCard icon="🚫" label="Wallets Banned" value="2" sub="This week" color="#6b7280"/>
        <KpiCard icon="📊" label="Avg Risk Score" value="14/100" sub="Healthy baseline" color="#3b82f6"/>
      </Row>
      <Row gap={16}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🔴 Anomaly Scatter Plot — Risk Score vs Tx Amount</div>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <XAxis type="number" dataKey="x" tick={{fontSize:10,fill:"#9ca3af"}} name="Tx Amount"/>
              <YAxis type="number" dataKey="y" tick={{fontSize:10,fill:"#9ca3af"}} name="Risk Score"/>
              <ZAxis dataKey="z" range={[30,120]}/>
              <Tooltip cursor={{strokeDasharray:"3 3"}} contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:11}}/>
              <Scatter data={fraudScatter.filter(d=>!d.flagged)} fill="#10b981" opacity={0.5}/>
              <Scatter data={fraudScatter.filter(d=>d.flagged)} fill="#ef4444" opacity={0.9}/>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[["#10b981","Normal"],["#ef4444","Flagged"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:c}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📋 Flagged Transactions</div>
          {txMonitor.filter(t=>t.flag).map((t,i)=>(
            <div key={i} style={{background:"#fff5f5",border:"1px solid #fca5a5",borderRadius:10,padding:12,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#ef4444",fontWeight:600}}>{t.hash}</span>
                <Badge s="Flagged"/>
              </div>
              <div style={{fontSize:12,color:"#6b7280"}}>From: {t.from} → To: {t.to}</div>
              <div style={{fontSize:12,color:"#374151",marginTop:3}}>{t.kwh} kWh · ${t.price}/kWh · Risk: 87/100</div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <Btn variant="success" small>✅ Mark Safe</Btn>
                <Btn variant="danger" small>🚫 Ban Wallet</Btn>
              </div>
            </div>
          ))}
        </div>
      </Row>
    </PageWrap>
  );
}

function PageCarbon(){
  const [modal,setModal]=useState(false);
  return(
    <PageWrap title="Carbon Credits Registry" subtitle="Green energy credits issued on-chain" action={<Btn onClick={()=>setModal(true)}>+ Issue Credits</Btn>}>
      <Row gap={12}>
        <KpiCard icon="🌱" label="Total Issued" value="142 CCR" sub="This month" color="#10b981"/>
        <KpiCard icon="✅" label="Verified" value="128 CCR" sub="90% verified" color="#10b981"/>
        <KpiCard icon="⏳" label="Pending" value="14 CCR" sub="Awaiting verification" color="#f59e0b"/>
        <KpiCard icon="♻️" label="CO₂ Offset" value="1.42 T" sub="Equivalent tonnes" color="#10b981"/>
      </Row>
      <Row gap={16}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🌱 Carbon Credits Issued (CCR/month)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={carbonIssued}>
              <XAxis dataKey="m" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="ccr" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>👥 User Growth (Consumer vs Producer)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={userGrowth}>
              <XAxis dataKey="m" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="consumers" fill="#3b82f6" radius={[4,4,0,0]}/>
              <Bar dataKey="producers" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Row>
      <div style={S.chartBox}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Producer Wallet","kWh Contributed","Credits Issued","Date","Verified","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {carbonRegistry.map((r,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{r.producer}</td>
                <td style={{...S.td,fontWeight:600}}>{r.kwh} kWh</td>
                <td style={{...S.td,color:"#10b981",fontWeight:700}}>{r.credits} CCR</td>
                <td style={{...S.td,color:"#9ca3af"}}>{r.date}</td>
                <td style={S.td}><Badge s={r.verified?"Confirmed":"Pending"}/></td>
                <td style={S.td}><div style={{display:"flex",gap:6}}><Btn variant="success" small>Verify</Btn><Btn variant="danger" small>Revoke</Btn></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal&&(
        <Modal title="🌱 Issue Carbon Credits" onClose={()=>setModal(false)}>
          <Field label="Producer Wallet Address" placeholder="0x…"/>
          <Field label="kWh of Green Energy Contributed" placeholder="e.g. 50" type="number"/>
          <Field label="Carbon Credits to Issue (CCR)" placeholder="e.g. 5" type="number"/>
          <div style={{background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:8,padding:10,marginBottom:14,fontSize:12,color:"#059669"}}>
            Conversion rate: <strong>10 kWh = 1 CCR</strong>
          </div>
          <Btn onClick={()=>setModal(false)}>Issue Credits On-Chain</Btn>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageAudit(){
  return(
    <PageWrap title="Audit Logs" subtitle="Immutable record of all admin actions">
      <div style={S.chartBox}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <input placeholder="Search logs…" style={{background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"8px 14px",fontSize:13,outline:"none",width:240}}/>
          <Btn variant="outline" small>Export CSV</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Time","Admin","Action","Target","IP Address"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {auditLog.map((a,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#9ca3af"}}>{a.time}</td>
                <td style={{...S.td,fontWeight:600,color:"#3b82f6"}}>{a.admin}</td>
                <td style={{...S.td,color:"#111827"}}>{a.action}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{a.target}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#9ca3af"}}>{a.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrap>
  );
}

function PageSettings({setConfirmPause,systemPaused}){
  const [pricingModal,setPricingModal]=useState(false);
  const [feeModal,setFeeModal]=useState(false);
  const [broadcastModal,setBroadcastModal]=useState(false);
  return(
    <PageWrap title="System Settings" subtitle="Configure pricing, fees, and network parameters">
      <Row gap={16}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>⚙️ Dynamic Pricing</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:14}}>Adjust supply/demand weights and price bounds</div>
          <div style={{display:"grid",gap:10,marginBottom:14}}>
            {[["Supply Weight","0.60"],["Demand Weight","0.40"],["Min Price Floor","$0.070/kWh"],["Max Price Ceiling","$0.120/kWh"],["Update Frequency","30 seconds"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
                <span style={{color:"#6b7280"}}>{l}</span>
                <span style={{fontWeight:600,color:"#111827",fontFamily:"'Space Mono',monospace",fontSize:12}}>{v}</span>
              </div>
            ))}
          </div>
          <Btn onClick={()=>setPricingModal(true)}>Edit Pricing</Btn>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>💳 Fee Structure</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:14}}>Platform transaction fee settings</div>
          <div style={{display:"grid",gap:10,marginBottom:14}}>
            {[["Standard Fee","0.05% per tx"],["Bulk Threshold","500 kWh/month"],["Bulk Trader Fee","0.03% per tx"],["Fee Collected MTD","$442.80"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
                <span style={{color:"#6b7280"}}>{l}</span>
                <span style={{fontWeight:600,color:"#111827",fontFamily:"'Space Mono',monospace",fontSize:12}}>{v}</span>
              </div>
            ))}
          </div>
          <Btn onClick={()=>setFeeModal(true)}>Edit Fees</Btn>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>🔔 Broadcast Alert</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:14}}>Push notifications to all users</div>
          <Btn variant="outline" onClick={()=>setBroadcastModal(true)}>📢 Send Broadcast</Btn>
        </div>
      </Row>

      <div style={{...S.chartBox,borderLeft:"4px solid #ef4444"}}>
        <div style={{fontWeight:700,color:"#ef4444",marginBottom:4}}>🔴 Emergency System Control</div>
        <div style={{color:"#6b7280",fontSize:12,marginBottom:14}}>Immediately freeze all trading activity across the network. Use only in emergencies.</div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <button onClick={()=>setConfirmPause(true)} style={{background:systemPaused?"#d1fae5":"#fee2e2",color:systemPaused?"#10b981":"#ef4444",border:`1px solid ${systemPaused?"#6ee7b7":"#fca5a5"}`,borderRadius:8,padding:"9px 20px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            {systemPaused?"▶ Resume System":"🔴 Emergency Pause"}
          </button>
          {systemPaused&&<span style={{color:"#ef4444",fontWeight:600,fontSize:13}}>⚠️ System is currently PAUSED — all trades frozen</span>}
        </div>
      </div>

      {pricingModal&&(
        <Modal title="⚙️ Dynamic Pricing Parameters" onClose={()=>setPricingModal(false)}>
          <Field label="Supply Weight (0–1)" placeholder="e.g. 0.6" type="number"/>
          <Field label="Demand Weight (0–1)" placeholder="e.g. 0.4" type="number"/>
          <Field label="Update Frequency (seconds)" placeholder="e.g. 30" type="number"/>
          <Field label="Min Price Floor ($/kWh)" placeholder="e.g. 0.070" type="number"/>
          <Field label="Max Price Ceiling ($/kWh)" placeholder="e.g. 0.120" type="number"/>
          <Btn onClick={()=>setPricingModal(false)}>Save Parameters</Btn>
        </Modal>
      )}
      {feeModal&&(
        <Modal title="💳 Fee Structure" onClose={()=>setFeeModal(false)}>
          <Field label="Standard Fee (%)" placeholder="e.g. 0.05" type="number"/>
          <Field label="Bulk Trader Threshold (kWh/month)" placeholder="e.g. 500" type="number"/>
          <Field label="Bulk Trader Fee (%)" placeholder="e.g. 0.03" type="number"/>
          <Btn onClick={()=>setFeeModal(false)}>Update Fee Structure</Btn>
        </Modal>
      )}
      {broadcastModal&&(
        <Modal title="📢 Broadcast System Alert" onClose={()=>setBroadcastModal(false)}>
          <div style={{marginBottom:14}}>
            <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>Alert Type</div>
            <select style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",fontSize:13,outline:"none"}}>
              <option>Info</option><option>Warning</option><option>Critical</option><option>Maintenance</option>
            </select>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>Recipients</div>
            <select style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",fontSize:13,outline:"none"}}>
              <option>All Users</option><option>Producers Only</option><option>Consumers Only</option>
            </select>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>Message</div>
            <textarea placeholder="Enter broadcast message…" style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",color:"#111827",fontSize:13,outline:"none",resize:"vertical",minHeight:90,boxSizing:"border-box"}}/>
          </div>
          <Btn onClick={()=>setBroadcastModal(false)}>Send Broadcast</Btn>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageApprovals(){
  const [list,setList]=useState(pendingApprovals);
  return(
    <PageWrap title="Producer Approvals" subtitle="Review and approve new energy producers">
      {list.length===0&&<div style={{...S.chartBox,textAlign:"center",padding:40,color:"#9ca3af"}}>✅ All caught up — no pending approvals</div>}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {list.map((p,i)=>(
          <div key={i} style={{...S.chartBox,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>{p.id} <span style={{background:"#fef3c7",color:"#f59e0b",borderRadius:20,padding:"2px 10px",fontSize:11,marginLeft:6}}>Pending</span></div>
              <div style={{fontSize:13,color:"#6b7280"}}>📍 {p.location} · ⚡ {p.capacity} · Wallet: <span style={{fontFamily:"'Space Mono',monospace",fontSize:12}}>{p.wallet}</span></div>
              <div style={{fontSize:12,color:"#9ca3af",marginTop:3}}>Submitted {p.submitted}</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn variant="success" onClick={()=>setList(l=>l.filter((_,j)=>j!==i))}>✅ Approve</Btn>
              <Btn variant="danger" onClick={()=>setList(l=>l.filter((_,j)=>j!==i))}>✗ Reject</Btn>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export default function AdminPanal(){
  const [tab,setTab]=useState("Dashboard");
  const [systemPaused,setSystemPaused]=useState(false);
  const [confirmPause,setConfirmPause]=useState(false);
  const [tps,setTps]=useState(1847);
  const [gridStress,setGridStress]=useState(34);
  const [notif,setNotif]=useState(4);

  useEffect(()=>{
    const id=setInterval(()=>{
      setTps(t=>Math.max(1400,Math.min(2100,t+Math.floor((Math.random()-0.5)*80))));
      setGridStress(g=>Math.max(15,Math.min(85,g+(Math.random()-0.5)*4)));
    },2000);
    return()=>clearInterval(id);
  },[]);

  const stressColor=gridStress>70?"#ef4444":gridStress>50?"#f59e0b":"#10b981";

  const nav=[
    {icon:"🏠",label:"Dashboard"},
    {icon:"👥",label:"Users",page:"Users"},
    {icon:"🔄",label:"Transactions",page:"Transactions"},
    {icon:"📜",label:"Smart Contracts",page:"Contracts"},
    {icon:"🚨",label:"Fraud Detection",page:"Fraud",badge:3,badgeColor:"#ef4444"},
    // {icon:"🌱",label:"Carbon Registry",page:"Carbon"},
    {icon:"✅",label:"Approvals",page:"Approvals",badge:3,badgeColor:"#f59e0b"},
    {icon:"📋",label:"Audit Logs",page:"Audit"},
    {icon:"⚙️",label:"Settings",page:"Settings"},
  ];

  const renderPage=()=>{
    if(tab==="Dashboard") return <PageDashboard tps={tps} gridStress={gridStress} stressColor={stressColor} setConfirmPause={setConfirmPause} systemPaused={systemPaused}/>;
    if(tab==="Users") return <PageUsers/>;
    if(tab==="Transactions") return <PageTransactions/>;
    if(tab==="Contracts") return <PageContracts/>;
    if(tab==="Fraud") return <PageFraud/>;
    if(tab==="Carbon") return <PageCarbon/>;
    if(tab==="Approvals") return <PageApprovals/>;
    if(tab==="Audit") return <PageAudit/>;
    if(tab==="Settings") return <PageSettings setConfirmPause={setConfirmPause} systemPaused={systemPaused}/>;
    return null;
  };

  return(
    <div style={{display:"flex",height:"100vh",background:"#f9fafb",fontFamily:"'DM Sans',sans-serif",color:"#111827",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar{width:5px;background:#f3f4f6}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
        .nav-item:hover{background:#f3f4f6!important}
        .trow:hover{background:#f9fafb!important}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .blink{animation:pulse 1.5s infinite}
      `}</style>

      {/* Sidebar */}
      <div style={{width:220,background:"#fff",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"2px 0 8px rgba(0,0,0,0.04)"}}>
        <div style={{padding:"20px 20px 16px",borderBottom:"1px solid #e5e7eb"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,background:"#111827",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚡</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#111827"}}>DECT Admin</div>
              <div style={{fontSize:10,color:"#9ca3af"}}>Super Admin · Full Access</div>
            </div>
          </div>
        </div>

        <div style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
          {nav.map(n=>{
            const active=tab===(n.page||n.label);
            return(
              <div key={n.label} className="nav-item" onClick={()=>setTab(n.page||n.label)}
                style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,cursor:"pointer",marginBottom:2,
                  background:active?"#f3f4f6":"transparent",
                  fontWeight:active?700:400,color:active?"#111827":"#6b7280",fontSize:13,transition:"all 0.1s"}}>
                <span style={{fontSize:15}}>{n.icon}</span>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge&&<span style={{background:n.badgeColor,color:"#fff",borderRadius:20,padding:"1px 7px",fontSize:10,fontWeight:700}}>{n.badge}</span>}
              </div>
            );
          })}
        </div>

        <div style={{padding:"12px 16px",borderTop:"1px solid #e5e7eb"}}>
          <div style={{background:"#f9fafb",borderRadius:10,padding:"10px 12px",border:"1px solid #e5e7eb"}}>
            <div style={{color:"#9ca3af",fontSize:10,marginBottom:3}}>Admin Wallet</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#374151",fontWeight:600}}>0xADM…0001</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:5}}>
              <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>
              <span style={{color:"#9ca3af",fontSize:10}}>Arbitrum · Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Topbar */}
        <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>DECT</span>
            <span style={{color:"#d1d5db"}}>/</span>
            <span style={{fontSize:13,fontWeight:600,color:"#111827"}}>{tab}</span>
            {systemPaused&&<span className="blink" style={{background:"#fee2e2",border:"1px solid #fca5a5",color:"#ef4444",borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700,marginLeft:8}}>🔴 SYSTEM PAUSED</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",gap:6}}>
              {[["TPS",tps.toLocaleString(),"#10b981"],["GRID",`${gridStress.toFixed(0)}%`,stressColor]].map(([l,v,c])=>(
                <div key={l} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"4px 10px",display:"flex",gap:5,alignItems:"center"}}>
                  <span style={{color:"#9ca3af",fontSize:10}}>{l}</span>
                  <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:c,fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setNotif(0)}>
              <span style={{fontSize:18}}>🔔</span>
              {notif>0&&<div style={{position:"absolute",top:-3,right:-3,background:"#ef4444",borderRadius:"50%",width:15,height:15,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{notif}</div>}
            </div>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"}}>A</div>
          </div>
        </div>

        {/* Page content */}
        <div style={{flex:1,overflow:"auto",padding:24}}>
          {renderPage()}
        </div>
      </div>

      {/* Confirm Pause Modal */}
      {confirmPause&&(
        <Modal title={systemPaused?"Resume System":"Emergency System Pause"} onClose={()=>setConfirmPause(false)}>
          <div style={{background:systemPaused?"#f0fdf4":"#fff5f5",border:`1px solid ${systemPaused?"#6ee7b7":"#fca5a5"}`,borderRadius:8,padding:14,marginBottom:16,fontSize:13,color:systemPaused?"#059669":"#ef4444",lineHeight:1.6}}>
            {systemPaused?"This will resume all trading activity and smart contract interactions on the network.":"⚠️ This will immediately freeze ALL trades, smart contracts, and transactions across the DECT network. Use only in emergencies."}
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn variant={systemPaused?"success":"danger"} onClick={()=>{setSystemPaused(p=>!p);setConfirmPause(false);}}>
              {systemPaused?"✅ Confirm Resume":"🔴 Confirm Emergency Pause"}
            </Btn>
            <Btn variant="outline" onClick={()=>setConfirmPause(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}