// // // import React from "react";
// // // import Sidebar from "../components/adminSidebar";
// // // import { useState } from "react";
// // // import "../assets/adminPanal.css";
// // // import ProfileC from "../components/ProfileC";
// // // import MetaMaskGuide from "../components/MetaMask";

// // // function Overview(){ return <div><h2>Overview</h2>
// // // <MetaMaskGuide />
// // // <p>Overview stats...</p></div>; }
// // // function FileComplaint(){ return <div><h2>File Complaint</h2><p>Form goes here</p></div>; }
// // // function History(){ return <div><h2>Complaint History</h2><p>List of complaints</p></div>; }
// // // function Track(){ return <div><h2>Track Status</h2><p>Track active tickets</p></div>; }
// // // function Technician(){ return <div><h2>Technician Board</h2></div>; }
// // // function Reports(){ return <div><h2>Reports</h2></div>; }
// // // function Profile(){
// // //   const email = localStorage.getItem("email");
// // //   const role = localStorage.getItem("role");

// // //   return (
// // //     <div>
// // //       <h2>Profile</h2>
// // //       <ProfileC email={email} role={role} />
// // //     </div>
// // //   );
// // // }
// // // function Settings(){ return <div><h2>Settings</h2></div>; }
// // // function Help(){ return <div><h2>Help</h2></div>; }

// // // const pageMap = {
// // //   Overview: <Overview/>,
// // //   file: <FileComplaint/>,
// // //   history: <History/>,
// // //   track: <Track/>,
// // //   technician: <Technician/>,
// // //   reports: <Reports/>,
// // //   profile: <Profile/>,
// // //   settings: <Settings/>,
// // //   help: <Help/>
// // // };

// // // function ConsumerDashboard() {
// // //   const [active, setActive] = useState("Overview");
// // //   const [collapsed, setCollapsed] = useState(false);
// // //   return (
// // //     <div style={{ textAlign: "center", marginTop: "50px" }}>
// // //       <Sidebar
// // //             active={active}
// // //              setActive={setActive}
// // //              collapsed={collapsed}
// // //              setCollapsed={setCollapsed}
// // //              role="consumer" // change to "admin" to show all tabs 
// // //       />
// // //       <h1>Welcome, Consumer ⚡</h1>
// // //        <section style={{ background:"#fff", padding:20, borderRadius:8, boxShadow:"0 6px 18px rgba(2,6,23,0.06)" }}>
// // //                         {pageMap[active] || <div>Not found</div>}
// // //                         <div style={{ height: "1200px" }}>
// // //                             Scroll to test sidebar – it stays fixed 🎯
// // //                         </div>
// // //        </section>
       
// // //     </div>
// // //   );
// // // }

// // // export default ConsumerDashboard;

// // // import React, { useEffect, useState } from "react";
// // // // import '../assets/styles.css';
// // // import Navbar from "../components/Navbar";
// // // import Sidebar from "../components/Sidebar";
// // // import TokenCard from "../components/TokenCard";
// // // import { Link } from "react-router-dom";


// // // const ConsumerDashboard = () =>{


// // //   const [usageData, setUsageData]=useState([]);
// // //   const [loading,setLoading]=useState(true);
// // // //   useEffect(()=>{
// // // //     axios.get('http://127.0.0.1.8000/api/energy/consumer_1/').then((res)=>{
// // // //         console.log(res.data);
// // // //         const formattedData=res.data.map((item)=>({
// // // //             date:item.date,value:item.energy_consumed,
// // // //         }));
// // // //     setUsageData(formattedData);
// // // //     setLoading(false);
// // // //     })
// // // //     .catch((err )=> console.error(err);
// // // //     setLoading(false);
// // // // });
  
// // // // },[]);  

// // //  const[tokenBalance,setTokenBalance]=useState(100);
// // //  const[buyAmount,setBuyAmount]=useState('');
// // //  const handleBuyTokens = () =>{
// // //     if(buyAmount <=0 )
// // //         return alert('Enter a valid amount');
// // //     setTokenBalance(tokenBalance + parseInt(buyAmount));
// // //     setBuyAmount('');
// // //     alert('Tokens purchased successfully !');
// // //  } 

// // //     return (
// // //         <div>
// // //             <Navbar />
// // //             <Sidebar />
// // //             <div>
// // //                 {loading ?(<p>Loading ...</p>) :usageData.length ===0 ?
// // //                 (<p>no data available</p>):(
// // //                 <table>
// // //                     <thead>
// // //                         <tr>
// // //                             <th>Date</th>
// // //                             <th>Energy</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {usageData.map((item,index)=>(
// // //                             <tr key={index}>
// // //                                 <td>{item.date}</td>
// // //                                 <td>{item.value}</td>
// // //                             </tr>
// // //                         ))}
// // //                     </tbody>
// // //                 </table>
// // //                 )
// // //                 }
// // //             </div>
// // //             <div className="main-content">
// // //                 <h3>Welcome ,Consumer !</h3>
// // //                 <p>
// // //                     Here you can view your token blance,buy tokens,and track your Energy usage.
// // //                 </p>
// // //                 <Link to="/admin">Go to AdminPanal</Link>
// // //                 {/* Token Balance */}
// // //                 <TokenCard title={"Your Token Balance"} value={`${tokenBalance} ET`} />
// // //                 {/* Buy Token  Section  */}
// // //                 <div className="buy-tokens">
// // //                     <h4>buy Energy Token</h4>
// // //                     <input type="number" placeholder="Enter Amount" value={buyAmount}
// // //                     onChange={(e)=>setBuyAmount(e.target.value)} />
// // //                      <button onClick={handleBuyTokens}>Buy Tokens</button>
// // //                 </div>

// // //             </div>
            
// // //         </div>
// // //     );
// // // }
// // // export default ConsumerDashboard;


// // import React, { useState, useEffect } from 'react';
// // import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import { Zap, TrendingUp, TrendingDown, Users, Battery, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw, Sun, Wind, Activity } from 'lucide-react';

// // const ConsumerDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [currentPrice, setCurrentPrice] = useState(0.15);
// //   const [priceChange, setPriceChange] = useState(0);

// //   // Simulate dynamic pricing
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const change = (Math.random() - 0.5) * 0.02;
// //       setCurrentPrice(prev => Math.max(0.05, Math.min(0.30, prev + change)));
// //       setPriceChange(change);
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Sample data for charts
// //   const energyUsageData = [
// //     { time: '00:00', usage: 2.1, generation: 0, price: 0.12 },
// //     { time: '04:00', usage: 1.8, generation: 0, price: 0.10 },
// //     { time: '08:00', usage: 3.5, generation: 1.2, price: 0.16 },
// //     { time: '12:00', usage: 4.2, generation: 4.8, price: 0.14 },
// //     { time: '16:00', usage: 3.8, generation: 3.5, price: 0.18 },
// //     { time: '20:00', usage: 5.1, generation: 0.2, price: 0.22 },
// //   ];

// //   const p2pTransactions = [
// //     { id: 1, peer: 'Solar House #247', type: 'buy', amount: 12.5, price: 0.14, time: '2 min ago', status: 'completed' },
// //     { id: 2, peer: 'Wind Farm Collective', type: 'buy', amount: 25.0, price: 0.13, time: '15 min ago', status: 'completed' },
// //     { id: 3, peer: 'Community Battery', type: 'sell', amount: 8.3, price: 0.16, time: '1 hr ago', status: 'completed' },
// //     { id: 4, peer: 'Green Energy Coop', type: 'buy', amount: 15.7, price: 0.15, time: '2 hr ago', status: 'pending' },
// //   ];

// //   const marketOffers = [
// //     { id: 1, seller: 'Solar Array #89', quantity: 50, price: 0.13, source: 'Solar', distance: '0.8 km', rating: 4.8 },
// //     { id: 2, seller: 'Community Wind', quantity: 100, price: 0.14, source: 'Wind', distance: '2.1 km', rating: 4.9 },
// //     { id: 3, seller: 'Hydro Station', quantity: 75, price: 0.12, source: 'Hydro', distance: '5.3 km', rating: 4.7 },
// //     { id: 4, seller: 'Residential Solar', quantity: 20, price: 0.15, source: 'Solar', distance: '0.3 km', rating: 4.6 },
// //   ];

// //   const energySourceDistribution = [
// //     { name: 'Solar', value: 45, color: '#fbbf24' },
// //     { name: 'Wind', value: 30, color: '#60a5fa' },
// //     { name: 'Hydro', value: 15, color: '#34d399' },
// //     { name: 'Grid', value: 10, color: '#a78bfa' },
// //   ];

// //   const StatCard = ({ icon: Icon, title, value, change, suffix = '', trend }) => (
// //     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
// //       <div className="flex items-start justify-between">
// //         <div className="flex-1">
// //           <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
// //           <p className="text-3xl font-bold text-gray-900 mb-2">
// //             {value}{suffix}
// //           </p>
// //           {change !== undefined && (
// //             <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
// //               {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
// //               {Math.abs(change).toFixed(2)}% {trend}
// //             </div>
// //           )}
// //         </div>
// //         <div className={`p-3 rounded-lg ${
// //           title.includes('Price') ? 'bg-purple-100' :
// //           title.includes('Credits') ? 'bg-green-100' :
// //           title.includes('Usage') ? 'bg-blue-100' :
// //           'bg-orange-100'
// //         }`}>
// //           <Icon className={`w-6 h-6 ${
// //             title.includes('Price') ? 'text-purple-600' :
// //             title.includes('Credits') ? 'text-green-600' :
// //             title.includes('Usage') ? 'text-blue-600' :
// //             'text-orange-600'
// //           }`} />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const OverviewTab = () => (
// //     <div className="space-y-6">
// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <StatCard 
// //           icon={DollarSign}
// //           title="Current Price"
// //           value={currentPrice.toFixed(3)}
// //           change={(priceChange / currentPrice) * 100}
// //           suffix=" $/kWh"
// //           trend="vs last update"
// //         />
// //         <StatCard 
// //           icon={Battery}
// //           title="Energy Credits"
// //           value="847.5"
// //           change={12.3}
// //           suffix=" kWh"
// //           trend="this month"
// //         />
// //         <StatCard 
// //           icon={Zap}
// //           title="Today's Usage"
// //           value="24.3"
// //           change={-5.2}
// //           suffix=" kWh"
// //           trend="vs yesterday"
// //         />
// //         <StatCard 
// //           icon={Users}
// //           title="P2P Trades"
// //           value="156"
// //           change={23.1}
// //           suffix=""
// //           trend="this week"
// //         />
// //       </div>

// //       {/* Energy Flow Chart */}
// //       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //         <div className="flex items-center justify-between mb-6">
// //           <h3 className="text-lg font-semibold text-gray-900">Energy Flow & Pricing (24h)</h3>
// //           <div className="flex gap-4 text-sm">
// //             <div className="flex items-center gap-2">
// //               <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
// //               <span className="text-gray-600">Usage</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
// //               <span className="text-gray-600">Generation</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
// //               <span className="text-gray-600">Price</span>
// //             </div>
// //           </div>
// //         </div>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={energyUsageData}>
// //             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //             <XAxis dataKey="time" stroke="#6b7280" />
// //             <YAxis yAxisId="left" stroke="#6b7280" />
// //             <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
// //             <Tooltip 
// //               contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
// //             />
// //             <Legend />
// //             <Line yAxisId="left" type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} name="Usage (kWh)" />
// //             <Line yAxisId="left" type="monotone" dataKey="generation" stroke="#10b981" strokeWidth={2} name="Generation (kWh)" />
// //             <Line yAxisId="right" type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} name="Price ($/kWh)" strokeDasharray="5 5" />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Energy Sources & Recent Activity */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-6">Energy Sources</h3>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <PieChart>
// //               <Pie
// //                 data={energySourceDistribution}
// //                 cx="50%"
// //                 cy="50%"
// //                 labelLine={false}
// //                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// //                 outerRadius={80}
// //                 fill="#8884d8"
// //                 dataKey="value"
// //               >
// //                 {energySourceDistribution.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="grid grid-cols-2 gap-3 mt-4">
// //             {energySourceDistribution.map((source) => (
// //               <div key={source.name} className="flex items-center gap-2">
// //                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
// //                 <span className="text-sm text-gray-600">{source.name}: {source.value}%</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent P2P Transactions</h3>
// //           <div className="space-y-3">
// //             {p2pTransactions.slice(0, 4).map((tx) => (
// //               <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// //                 <div className="flex items-center gap-3">
// //                   <div className={`p-2 rounded-lg ${tx.type === 'buy' ? 'bg-blue-100' : 'bg-green-100'}`}>
// //                     {tx.type === 'buy' ? 
// //                       <ArrowDownRight className={`w-4 h-4 text-blue-600`} /> : 
// //                       <ArrowUpRight className={`w-4 h-4 text-green-600`} />
// //                     }
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-900">{tx.peer}</p>
// //                     <p className="text-xs text-gray-500">{tx.time}</p>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-sm font-semibold text-gray-900">{tx.amount} kWh</p>
// //                   <p className="text-xs text-gray-500">${tx.price}/kWh</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const MarketplaceTab = () => (
// //     <div className="space-y-6">
// //       {/* Live Market Price */}
// //       <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="text-sm opacity-90 mb-1">Live Market Price</p>
// //             <p className="text-4xl font-bold">${currentPrice.toFixed(3)}/kWh</p>
// //             <div className={`flex items-center mt-2 text-sm ${priceChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
// //               {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
// //               {priceChange >= 0 ? '+' : ''}{((priceChange / currentPrice) * 100).toFixed(2)}% Last update
// //             </div>
// //           </div>
// //           <div className="p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur">
// //             <Activity className="w-8 h-8" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Available Offers */}
// //       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //         <div className="flex items-center justify-between mb-6">
// //           <h3 className="text-lg font-semibold text-gray-900">Available Energy Offers</h3>
// //           <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
// //             <RefreshCw className="w-4 h-4" />
// //             Refresh
// //           </button>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="border-b border-gray-200">
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Seller</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Source</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Distance</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
// //                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {marketOffers.map((offer) => (
// //                 <tr key={offer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// //                   <td className="py-4 px-4">
// //                     <p className="text-sm font-medium text-gray-900">{offer.seller}</p>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <div className="flex items-center gap-2">
// //                       {offer.source === 'Solar' && <Sun className="w-4 h-4 text-yellow-500" />}
// //                       {offer.source === 'Wind' && <Wind className="w-4 h-4 text-blue-500" />}
// //                       {offer.source === 'Hydro' && <Zap className="w-4 h-4 text-green-500" />}
// //                       <span className="text-sm text-gray-700">{offer.source}</span>
// //                     </div>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <p className="text-sm font-medium text-gray-900">{offer.quantity} kWh</p>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <p className="text-sm font-semibold text-purple-600">${offer.price}</p>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <p className="text-sm text-gray-600">{offer.distance}</p>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <div className="flex items-center gap-1">
// //                       <span className="text-sm font-medium text-gray-900">{offer.rating}</span>
// //                       <span className="text-yellow-400">★</span>
// //                     </div>
// //                   </td>
// //                   <td className="py-4 px-4">
// //                     <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
// //                       Buy
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Create Sell Order */}
// //       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //         <h3 className="text-lg font-semibold text-gray-900 mb-4">Sell Your Energy</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kWh)</label>
// //             <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="50" />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Price ($/kWh)</label>
// //             <input type="number" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="0.15" />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
// //             <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
// //               <option>1 hour</option>
// //               <option>4 hours</option>
// //               <option>24 hours</option>
// //               <option>Until sold</option>
// //             </select>
// //           </div>
// //           <div className="flex items-end">
// //             <button className="w-full px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
// //               Create Offer
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const TransactionsTab = () => (
// //     <div className="space-y-6">
// //       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
// //         <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaction History</h3>
// //         <div className="space-y-3">
// //           {p2pTransactions.map((tx) => (
// //             <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
// //               <div className="flex items-center gap-4">
// //                 <div className={`p-3 rounded-lg ${tx.type === 'buy' ? 'bg-blue-100' : 'bg-green-100'}`}>
// //                   {tx.type === 'buy' ? 
// //                     <ArrowDownRight className="w-5 h-5 text-blue-600" /> : 
// //                     <ArrowUpRight className="w-5 h-5 text-green-600" />
// //                   }
// //                 </div>
// //                 <div>
// //                   <p className="font-semibold text-gray-900">{tx.peer}</p>
// //                   <p className="text-sm text-gray-500">{tx.time}</p>
// //                 </div>
// //               </div>
// //               <div className="text-right">
// //                 <p className="font-semibold text-gray-900">{tx.amount} kWh</p>
// //                 <p className="text-sm text-gray-600">${tx.price}/kWh · ${(tx.amount * tx.price).toFixed(2)}</p>
// //               </div>
// //               <div>
// //                 <span className={`px-3 py-1 text-xs font-medium rounded-full ${
// //                   tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
// //                 }`}>
// //                   {tx.status}
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-purple-600 rounded-lg">
// //                 <Zap className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">EnergyChain</h1>
// //                 <p className="text-sm text-gray-500">Decentralized Energy Exchange</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <div className="text-right">
// //                 <p className="text-sm text-gray-500">Account Balance</p>
// //                 <p className="text-lg font-bold text-gray-900">$2,347.82</p>
// //               </div>
// //               <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
// //                 JD
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Navigation Tabs */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <nav className="flex gap-8">
// //             {['overview', 'marketplace', 'transactions'].map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`py-4 px-2 font-medium text-sm capitalize transition-colors relative ${
// //                   activeTab === tab
// //                     ? 'text-purple-600'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //               >
// //                 {tab}
// //                 {activeTab === tab && (
// //                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
// //                 )}
// //               </button>
// //             ))}
// //           </nav>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-6 py-8">
// //         {activeTab === 'overview' && <OverviewTab />}
// //         {activeTab === 'marketplace' && <MarketplaceTab />}
// //         {activeTab === 'transactions' && <TransactionsTab />}
// //       </main>
// //     </div>
// //   );
// // };

// // export default ConsumerDashboard;

// import { useState, useEffect } from "react";
// import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// // ── Fake data ──────────────────────────────────────────────────────────────
// const priceData = Array.from({length:24},(_,i)=>({t:`${i}:00`, price:(0.08+Math.sin(i/3)*0.03+Math.random()*0.01).toFixed(4)}));
// const consumptionData = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d, kwh:(10+Math.random()*8).toFixed(1)}));
// const productionData = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d, kwh:(6+Math.random()*10).toFixed(1)}));
// const buySellData = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m, buy:(20+Math.random()*15).toFixed(1), sell:(15+Math.random()*15).toFixed(1)}));
// const creditHistory = Array.from({length:14},(_,i)=>({d:`D${i+1}`, bal:(200+i*12+Math.random()*20).toFixed(0)}));
// const txData = [
//   {date:"2026-03-08",type:"Buy",peer:"0xA3f…b12",kwh:4.2,price:0.091,credits:38.2,status:"Confirmed",hash:"0xfe3…"},
//   {date:"2026-03-07",type:"Sell",peer:"0xB7c…d44",kwh:6.1,price:0.088,credits:53.7,status:"Confirmed",hash:"0xaa1…"},
//   {date:"2026-03-06",type:"Buy",peer:"0xC1d…e77",kwh:2.5,price:0.094,credits:23.5,status:"Pending",hash:"0xbc2…"},
//   {date:"2026-03-05",type:"Sell",peer:"0xD9e…f90",kwh:8.0,price:0.085,credits:68.0,status:"Confirmed",hash:"0xde3…"},
//   {date:"2026-03-04",type:"Buy",peer:"0xE2a…c33",kwh:3.3,price:0.090,credits:29.7,status:"Failed",hash:"0xef4…"},
// ];
// const marketFeed = [
//   {peer:"0xF1b…",kwh:5.2,price:0.089,ago:"2s ago"},
//   {peer:"0xG3c…",kwh:2.8,price:0.092,ago:"11s ago"},
//   {peer:"0xH4d…",kwh:7.1,price:0.086,ago:"34s ago"},
//   {peer:"0xI5e…",kwh:1.5,price:0.095,ago:"1m ago"},
// ];
// const nearbySellers = [
//   {addr:"0xJ6f…",dist:"0.3km",kwh:10,price:0.088,rating:4.8},
//   {addr:"0xK7g…",dist:"0.7km",kwh:6,price:0.091,rating:4.5},
//   {addr:"0xL8h…",dist:"1.2km",kwh:15,price:0.085,rating:4.9},
// ];
// const DONUT = [{name:"Supply",value:62},{name:"Demand",value:38}];
// const COLORS = ["#00e5a0","#1a2744"];

// // ── Sub-components ─────────────────────────────────────────────────────────
// const Card = ({icon,label,value,sub,accent})=>(
//   <div style={{background:"#0d1b36",border:`1px solid ${accent||"#1e3460"}`,borderRadius:12,padding:"14px 18px",minWidth:140,flex:1}}>
//     <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
//     <div style={{color:"#8ba0c4",fontSize:11,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
//     <div style={{color:"#e8f0ff",fontSize:20,fontWeight:700,fontFamily:"'Space Mono',monospace",marginTop:2}}>{value}</div>
//     {sub&&<div style={{color:accent||"#00e5a0",fontSize:11,marginTop:2}}>{sub}</div>}
//   </div>
// );

// const Modal = ({title,children,onClose})=>(
//   <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
//     <div style={{background:"#0d1b36",border:"1px solid #1e3460",borderRadius:16,padding:28,width:400,maxWidth:"90vw"}}>
//       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
//         <span style={{color:"#e8f0ff",fontWeight:700,fontSize:16}}>{title}</span>
//         <button onClick={onClose} style={{background:"none",border:"none",color:"#8ba0c4",fontSize:20,cursor:"pointer"}}>✕</button>
//       </div>
//       {children}
//     </div>
//   </div>
// );

// const Input = ({label,placeholder,type="text"})=>(
//   <div style={{marginBottom:14}}>
//     <div style={{color:"#8ba0c4",fontSize:12,marginBottom:5}}>{label}</div>
//     <input type={type} placeholder={placeholder} style={{width:"100%",background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"9px 12px",color:"#e8f0ff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
//   </div>
// );

// const Btn = ({children,onClick,color="#00e5a0",small})=>(
//   <button onClick={onClick} style={{background:color,color:color==="#00e5a0"?"#071020":"#e8f0ff",border:"none",borderRadius:8,padding:small?"6px 14px":"10px 20px",fontWeight:700,fontSize:small?12:13,cursor:"pointer",letterSpacing:0.5,fontFamily:"'Space Mono',monospace",whiteSpace:"nowrap"}}>
//     {children}
//   </button>
// );

// // ── Main Dashboard ─────────────────────────────────────────────────────────
// export default function ConsumerDashboard(){
//   const [tab,setTab]=useState("Dashboard");
//   const [modal,setModal]=useState(null);
//   const [autoTrade,setAutoTrade]=useState(false);
//   const [dark]=useState(true);
//   const [notif,setNotif]=useState(3);
//   const [ticker,setTicker]=useState(0.0912);

//   useEffect(()=>{
//     const id=setInterval(()=>setTicker(t=>+(t+(Math.random()-0.5)*0.0005).toFixed(4)),2000);
//     return()=>clearInterval(id);
//   },[]);

//   const navItems=[
//     {icon:"🏠",label:"Dashboard"},
//     {icon:"⚡",label:"Energy Market"},
//     {icon:"🔄",label:"My Trades"},
//     {icon:"💳",label:"Credits & Wallet"},
//     {icon:"📊",label:"Analytics"},
//     {icon:"⚙️",label:"Settings"},
//     {icon:"❓",label:"Help / FAQ"},
//     {icon:"📄",label:"Smart Contract"},
//   ];

//   const statusColor=(s)=>s==="Confirmed"?"#00e5a0":s==="Pending"?"#f5a623":"#ff4d4d";

//   return(
//     <div style={{display:"flex",height:"100vh",background:"#071020",fontFamily:"'DM Sans',sans-serif",color:"#e8f0ff",overflow:"hidden"}}>
//       {/* Google Font */}
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
//       ::-webkit-scrollbar{width:4px;background:#071020}::-webkit-scrollbar-thumb{background:#1e3460;border-radius:4px}
//       .nav-item:hover{background:#0d1b36!important;color:#00e5a0!important}
//       .tab-btn:hover{background:#0d1b36!important}`}</style>

//       {/* ── LEFT SIDEBAR ── */}
//       <div style={{width:210,background:"#08121f",borderRight:"1px solid #1e3460",display:"flex",flexDirection:"column",padding:"20px 0",flexShrink:0}}>
//         <div style={{padding:"0 20px 24px",borderBottom:"1px solid #1e3460"}}>
//           <div style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace",fontWeight:700,fontSize:18}}>⚡ DECT</div>
//           <div style={{color:"#4a6490",fontSize:11,marginTop:2}}>Energy Trading Network</div>
//         </div>
//         <div style={{flex:1,padding:"14px 10px",overflowY:"auto"}}>
//           {navItems.map(n=>(
//             <div key={n.label} className="nav-item" onClick={()=>setTab(n.label)}
//               style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,
//                 background:tab===n.label?"#0d1b36":"transparent",
//                 color:tab===n.label?"#00e5a0":"#8ba0c4",fontSize:13,fontWeight:tab===n.label?600:400,transition:"all 0.15s"}}>
//               <span style={{fontSize:15}}>{n.icon}</span>{n.label}
//             </div>
//           ))}
//         </div>
//         <div style={{padding:"14px 20px",borderTop:"1px solid #1e3460"}}>
//           <div style={{background:"#0d1b36",borderRadius:10,padding:"12px",border:"1px solid #1e3460"}}>
//             <div style={{color:"#8ba0c4",fontSize:11}}>Connected Wallet</div>
//             <div style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace",fontSize:11,marginTop:4}}>0x7aF…3c92</div>
//             <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
//               <div style={{width:7,height:7,borderRadius:"50%",background:"#00e5a0"}}/>
//               <span style={{color:"#8ba0c4",fontSize:11}}>Arbitrum</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
//         {/* Header */}
//         <div style={{background:"#08121f",borderBottom:"1px solid #1e3460",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
//           <div style={{color:"#e8f0ff",fontWeight:700,fontSize:15}}>{tab}</div>
//           <div style={{display:"flex",alignItems:"center",gap:16}}>
//             <div style={{background:"#071020",border:"1px solid #1e3460",borderRadius:8,padding:"5px 12px",fontFamily:"'Space Mono',monospace",fontSize:12,color:"#00e5a0"}}>
//               Live: ${ticker}/kWh <span style={{color:ticker>0.091?"#00e5a0":"#ff4d4d"}}>{ticker>0.091?"↑":"↓"}</span>
//             </div>
//             <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setNotif(0)}>
//               <span style={{fontSize:18}}>🔔</span>
//               {notif>0&&<div style={{position:"absolute",top:-4,right:-4,background:"#ff4d4d",borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{notif}</div>}
//             </div>
//             <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#00e5a0,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#071020",cursor:"pointer"}}>F</div>
//           </div>
//         </div>

//         {/* Scrollable body */}
//         <div style={{flex:1,overflow:"auto",padding:20,display:"flex",gap:16}}>

//           {/* ── CENTER COLUMN ── */}
//           <div style={{flex:1,display:"flex",flexDirection:"column",gap:16,minWidth:0}}>

//             {/* KPI Cards */}
//             <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
//               <Card icon="⚡" label="Energy Balance" value="24.7 kWh" sub="+3.2 today" accent="#00e5a0"/>
//               <Card icon="💰" label="Credit Balance" value="412 TKN" sub="≈ $37.50" accent="#f5a623"/>
//               <Card icon="📈" label="Market Price" value={`$${ticker}`} sub="per kWh" accent="#00aaff"/>
//               <Card icon="🔄" label="Active Trades" value="3" sub="2 buy · 1 sell"/>
//               <Card icon="💵" label="Earnings MTD" value="$84.20" sub="↑ 12% vs last month" accent="#00e5a0"/>
//               <Card icon="🌱" label="CO₂ Offset" value="18.4 kg" sub="this month" accent="#00e5a0"/>
//             </div>

//             {/* Action Buttons */}
//             <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
//               <Btn onClick={()=>setModal("buy")}>⚡ Buy Energy</Btn>
//               <Btn onClick={()=>setModal("sell")} color="#0066ff">📤 Sell Energy</Btn>
//               <Btn onClick={()=>setModal("alert")} color="#1e3460">🔔 Price Alert</Btn>
//               <Btn onClick={()=>setAutoTrade(a=>!a)} color={autoTrade?"#00e5a0":"#1e3460"}>{autoTrade?"🤖 Auto-Trade ON":"🤖 Auto-Trade OFF"}</Btn>
//               <Btn onClick={()=>setModal("withdraw")} color="#1e3460">💸 Withdraw</Btn>
//               <Btn onClick={()=>setModal("topup")} color="#1e3460">➕ Top Up</Btn>
//               <Btn onClick={()=>alert("Rewards Claimed! +15 TKN")} color="#1e3460">🎁 Claim Rewards</Btn>
//             </div>

//             {/* Charts Row 1 */}
//             <div style={{display:"flex",gap:14}}>
//               <div style={{flex:2,background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>⚡ Real-Time Energy Price (24h)</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <LineChart data={priceData}>
//                     <XAxis dataKey="t" tick={{fill:"#4a6490",fontSize:10}} interval={3}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:10}} domain={["auto","auto"]}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",borderRadius:8,fontSize:12}}/>
//                     <Line type="monotone" dataKey="price" stroke="#00e5a0" strokeWidth={2} dot={false}/>
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>🔋 Supply vs Demand</div>
//                 <ResponsiveContainer width="100%" height={130}>
//                   <PieChart>
//                     <Pie data={DONUT} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
//                       {DONUT.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
//                     </Pie>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:12}}/>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:4}}>
//                   {DONUT.map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#8ba0c4"}}><div style={{width:8,height:8,borderRadius:2,background:COLORS[i]}}/>{d.name} {d.value}%</div>)}
//                 </div>
//               </div>
//             </div>

//             {/* Charts Row 2 */}
//             <div style={{display:"flex",gap:14}}>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>📉 My Consumption (kWh)</div>
//                 <ResponsiveContainer width="100%" height={120}>
//                   <AreaChart data={consumptionData}>
//                     <XAxis dataKey="d" tick={{fill:"#4a6490",fontSize:10}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:10}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:12}}/>
//                     <Area type="monotone" dataKey="kwh" stroke="#0066ff" fill="#0066ff22"/>
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>☀️ My Production (kWh)</div>
//                 <ResponsiveContainer width="100%" height={120}>
//                   <BarChart data={productionData}>
//                     <XAxis dataKey="d" tick={{fill:"#4a6490",fontSize:10}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:10}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:12}}/>
//                     <Bar dataKey="kwh" fill="#00e5a0" radius={[4,4,0,0]}/>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{flex:1,background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//                 <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>💳 Credit Balance History</div>
//                 <ResponsiveContainer width="100%" height={120}>
//                   <LineChart data={creditHistory}>
//                     <XAxis dataKey="d" tick={{fill:"#4a6490",fontSize:10}}/>
//                     <YAxis tick={{fill:"#4a6490",fontSize:10}}/>
//                     <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:12}}/>
//                     <Line type="monotone" dataKey="bal" stroke="#f5a623" strokeWidth={2} dot={false}/>
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Buy vs Sell */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:12,marginBottom:10}}>🔄 Buy vs Sell Activity (kWh/month)</div>
//               <ResponsiveContainer width="100%" height={120}>
//                 <BarChart data={buySellData}>
//                   <XAxis dataKey="m" tick={{fill:"#4a6490",fontSize:10}}/>
//                   <YAxis tick={{fill:"#4a6490",fontSize:10}}/>
//                   <Tooltip contentStyle={{background:"#0d1b36",border:"1px solid #1e3460",fontSize:12}}/>
//                   <Bar dataKey="buy" fill="#0066ff" radius={[4,4,0,0]}/>
//                   <Bar dataKey="sell" fill="#00e5a0" radius={[4,4,0,0]}/>
//                 </BarChart>
//               </ResponsiveContainer>
//               <div style={{display:"flex",gap:16,marginTop:6}}>
//                 <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#8ba0c4"}}><div style={{width:10,height:10,borderRadius:2,background:"#0066ff"}}/>Buy</div>
//                 <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#8ba0c4"}}><div style={{width:10,height:10,borderRadius:2,background:"#00e5a0"}}/>Sell</div>
//               </div>
//             </div>

//             {/* Transaction Table */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:16,border:"1px solid #1e3460"}}>
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
//                 <div style={{color:"#e8f0ff",fontWeight:600,fontSize:13}}>📁 Transaction History</div>
//                 <div style={{display:"flex",gap:8}}>
//                   <input placeholder="Search…" style={{background:"#071020",border:"1px solid #1e3460",borderRadius:6,padding:"5px 10px",color:"#e8f0ff",fontSize:12,outline:"none",width:140}}/>
//                   <Btn small color="#1e3460">Filter</Btn>
//                   <Btn small color="#1e3460">Export CSV</Btn>
//                 </div>
//               </div>
//               <div style={{overflowX:"auto"}}>
//                 <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
//                   <thead>
//                     <tr style={{color:"#4a6490",textAlign:"left"}}>
//                       {["Date","Type","Counterparty","kWh","Price","Credits","Status","TX Hash"].map(h=>(
//                         <th key={h} style={{padding:"6px 10px",borderBottom:"1px solid #1e3460",whiteSpace:"nowrap"}}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {txData.map((r,i)=>(
//                       <tr key={i} style={{borderBottom:"1px solid #0d2040"}}>
//                         <td style={{padding:"8px 10px",color:"#8ba0c4"}}>{r.date}</td>
//                         <td style={{padding:"8px 10px"}}><span style={{background:r.type==="Buy"?"#0066ff22":"#00e5a022",color:r.type==="Buy"?"#0066ff":"#00e5a0",borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600}}>{r.type}</span></td>
//                         <td style={{padding:"8px 10px",color:"#8ba0c4",fontFamily:"'Space Mono',monospace",fontSize:11}}>{r.peer}</td>
//                         <td style={{padding:"8px 10px",color:"#e8f0ff"}}>{r.kwh}</td>
//                         <td style={{padding:"8px 10px",color:"#e8f0ff"}}>${r.price}</td>
//                         <td style={{padding:"8px 10px",color:"#f5a623"}}>{r.credits}</td>
//                         <td style={{padding:"8px 10px"}}><span style={{color:statusColor(r.status),fontSize:11}}>{r.status}</span></td>
//                         <td style={{padding:"8px 10px",color:"#4a6490",fontFamily:"'Space Mono',monospace",fontSize:11}}>{r.hash}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//           </div>{/* end center */}

//           {/* ── RIGHT SIDEBAR ── */}
//           <div style={{width:240,display:"flex",flexDirection:"column",gap:14,flexShrink:0}}>

//             {/* Price Trend */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>📈 Price Trend</div>
//               <div style={{display:"flex",alignItems:"baseline",gap:8}}>
//                 <span style={{fontFamily:"'Space Mono',monospace",fontSize:22,fontWeight:700,color:"#00e5a0"}}>${ticker}</span>
//                 <span style={{color:"#00e5a0",fontSize:12}}>↑ 2.4%</span>
//               </div>
//               <div style={{color:"#4a6490",fontSize:11,marginTop:4}}>24h high: $0.098 · low: $0.079</div>
//             </div>

//             {/* Live Market Feed */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460",flex:1}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:10}}>🔴 Live Market Feed</div>
//               {marketFeed.map((f,i)=>(
//                 <div key={i} style={{borderBottom:"1px solid #0d2040",padding:"8px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
//                   <div>
//                     <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#e8f0ff"}}>{f.peer}</div>
//                     <div style={{fontSize:11,color:"#4a6490"}}>{f.kwh} kWh · ${f.price}</div>
//                   </div>
//                   <div style={{fontSize:10,color:"#4a6490"}}>{f.ago}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Nearby Sellers */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:10}}>📍 Nearby Sellers</div>
//               {nearbySellers.map((s,i)=>(
//                 <div key={i} style={{borderBottom:"1px solid #0d2040",padding:"8px 0"}}>
//                   <div style={{display:"flex",justifyContent:"space-between"}}>
//                     <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#e8f0ff"}}>{s.addr}</span>
//                     <span style={{fontSize:10,color:"#00e5a0"}}>⭐ {s.rating}</span>
//                   </div>
//                   <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
//                     <span style={{fontSize:11,color:"#4a6490"}}>{s.dist} · {s.kwh} kWh</span>
//                     <span style={{fontSize:11,color:"#f5a623"}}>${s.price}/kWh</span>
//                   </div>
//                   <button onClick={()=>setModal("buy")} style={{marginTop:5,background:"#00e5a011",border:"1px solid #00e5a044",borderRadius:5,padding:"3px 10px",color:"#00e5a0",fontSize:11,cursor:"pointer",width:"100%"}}>Buy from this seller</button>
//                 </div>
//               ))}
//             </div>

//             {/* My Active Orders */}
//             <div style={{background:"#0d1b36",borderRadius:12,padding:14,border:"1px solid #1e3460"}}>
//               <div style={{color:"#8ba0c4",fontSize:11,marginBottom:8}}>🔄 My Active Orders</div>
//               {[{type:"Buy",kwh:5,price:0.090},{type:"Sell",kwh:3,price:0.093},{type:"Buy",kwh:8,price:0.088}].map((o,i)=>(
//                 <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #0d2040"}}>
//                   <div>
//                     <span style={{color:o.type==="Buy"?"#0066ff":"#00e5a0",fontSize:11,fontWeight:600}}>{o.type}</span>
//                     <span style={{color:"#8ba0c4",fontSize:11}}> · {o.kwh} kWh</span>
//                   </div>
//                   <span style={{color:"#f5a623",fontSize:11,fontFamily:"'Space Mono',monospace"}}>${o.price}</span>
//                 </div>
//               ))}
//             </div>

//             {/* System Alerts */}
//             <div style={{background:"#1a0d0d",borderRadius:12,padding:14,border:"1px solid #3d1a1a"}}>
//               <div style={{color:"#ff6b6b",fontSize:11,marginBottom:8}}>⚠️ System Alerts</div>
//               <div style={{fontSize:11,color:"#ff6b6b",marginBottom:6}}>⚡ Grid stress high — peak hours 6–9 PM</div>
//               <div style={{fontSize:11,color:"#f5a623"}}>🔧 Scheduled maintenance Sun 02:00 UTC</div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── MODALS ── */}
//       {modal==="buy"&&(
//         <Modal title="⚡ Buy Energy" onClose={()=>setModal(null)}>
//           <Input label="Amount (kWh)" placeholder="e.g. 5.0"/>
//           <Input label="Max Price ($/kWh)" placeholder="e.g. 0.095" type="number"/>
//           <Input label="Duration (hours)" placeholder="e.g. 4" type="number"/>
//           <div style={{background:"#071020",borderRadius:8,padding:10,marginBottom:14,fontSize:12,color:"#8ba0c4"}}>
//             Estimated Cost: <span style={{color:"#00e5a0",fontFamily:"'Space Mono',monospace"}}>~$0.475</span>
//           </div>
//           <Btn onClick={()=>setModal(null)}>Confirm Buy Order</Btn>
//         </Modal>
//       )}
//       {modal==="sell"&&(
//         <Modal title="📤 Sell Energy" onClose={()=>setModal(null)}>
//           <Input label="Amount (kWh)" placeholder="e.g. 3.0"/>
//           <Input label="Min Price ($/kWh)" placeholder="e.g. 0.085" type="number"/>
//           <Input label="Availability Window (hours)" placeholder="e.g. 6" type="number"/>
//           <Btn onClick={()=>setModal(null)} color="#0066ff">List for Sale</Btn>
//         </Modal>
//       )}
//       {modal==="alert"&&(
//         <Modal title="🔔 Set Price Alert" onClose={()=>setModal(null)}>
//           <Input label="Alert when price ABOVE ($/kWh)" placeholder="e.g. 0.100"/>
//           <Input label="Alert when price BELOW ($/kWh)" placeholder="e.g. 0.080"/>
//           <Btn onClick={()=>setModal(null)}>Save Alert</Btn>
//         </Modal>
//       )}
//       {modal==="withdraw"&&(
//         <Modal title="💸 Withdraw Credits" onClose={()=>setModal(null)}>
//           <Input label="Amount (TKN)" placeholder="e.g. 100"/>
//           <Input label="Destination Wallet" placeholder="0x…"/>
//           <Btn onClick={()=>setModal(null)}>Withdraw</Btn>
//         </Modal>
//       )}
//       {modal==="topup"&&(
//         <Modal title="➕ Top Up Credits" onClose={()=>setModal(null)}>
//           <Input label="Amount (TKN)" placeholder="e.g. 200"/>
//           <div style={{color:"#8ba0c4",fontSize:12,marginBottom:14}}>Connect via MetaMask or WalletConnect</div>
//           <Btn onClick={()=>setModal(null)}>Top Up Now</Btn>
//         </Modal>
//       )}
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────
const priceData = Array.from({length:24},(_,i)=>({t:`${i}:00`,price:(0.08+Math.sin(i/3)*0.03+Math.random()*0.01).toFixed(4)}));
const consumptionData = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,kwh:(10+Math.random()*8).toFixed(1)}));
const productionData = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,kwh:(6+Math.random()*10).toFixed(1)}));
const buySellData = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,buy:(20+Math.random()*15).toFixed(1),sell:(15+Math.random()*15).toFixed(1)}));
const creditHistory = Array.from({length:14},(_,i)=>({d:`D${i+1}`,bal:(200+i*12+Math.random()*20).toFixed(0)}));
const txData = [
  {date:"2026-03-08",type:"Buy",peer:"0xA3f…b12",kwh:4.2,price:0.091,credits:38.2,status:"Confirmed",hash:"0xfe3…"},
  {date:"2026-03-07",type:"Sell",peer:"0xB7c…d44",kwh:6.1,price:0.088,credits:53.7,status:"Confirmed",hash:"0xaa1…"},
  {date:"2026-03-06",type:"Buy",peer:"0xC1d…e77",kwh:2.5,price:0.094,credits:23.5,status:"Pending",hash:"0xbc2…"},
  {date:"2026-03-05",type:"Sell",peer:"0xD9e…f90",kwh:8.0,price:0.085,credits:68.0,status:"Confirmed",hash:"0xde3…"},
  {date:"2026-03-04",type:"Buy",peer:"0xE2a…c33",kwh:3.3,price:0.090,credits:29.7,status:"Failed",hash:"0xef4…"},
];
const marketFeed = [
  {peer:"0xF1b…",kwh:5.2,price:0.089,ago:"2s ago"},
  {peer:"0xG3c…",kwh:2.8,price:0.092,ago:"11s ago"},
  {peer:"0xH4d…",kwh:7.1,price:0.086,ago:"34s ago"},
  {peer:"0xI5e…",kwh:1.5,price:0.095,ago:"1m ago"},
];
const nearbySellers = [
  {addr:"0xJ6f…",dist:"0.3km",kwh:10,price:0.088,rating:4.8},
  {addr:"0xK7g…",dist:"0.7km",kwh:6,price:0.091,rating:4.5},
  {addr:"0xL8h…",dist:"1.2km",kwh:15,price:0.085,rating:4.9},
];
const DONUT=[{name:"Supply",value:62},{name:"Demand",value:38}];
const DONUT_COLORS=["#3b82f6","#e5e7eb"];
const savingsData=["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,saved:(8+Math.random()*12).toFixed(1),utility:(18+Math.random()*8).toFixed(1)}));

// ── Shared atoms ──────────────────────────────────────────────────────────────
const S={
  card:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:"16px 20px",flex:1,minWidth:130,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"},
  chartBox:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  chartLabel:{fontSize:12,color:"#6b7280",marginBottom:10,fontWeight:500},
  th:{padding:"10px 12px",borderBottom:"1px solid #e5e7eb",color:"#6b7280",fontSize:11,textTransform:"uppercase",letterSpacing:0.5,textAlign:"left",whiteSpace:"nowrap"},
  td:{padding:"10px 12px",fontSize:13,borderBottom:"1px solid #f3f4f6"},
};

const KpiCard=({icon,label,value,sub,color="#3b82f6"})=>(
  <div style={{...S.card,borderLeft:`4px solid ${color}`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{color:"#6b7280",fontSize:11,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>{label}</div>
        <div style={{color:"#111827",fontSize:21,fontWeight:800,fontFamily:"'Space Mono',monospace"}}>{value}</div>
        {sub&&<div style={{color,fontSize:11,marginTop:3}}>{sub}</div>}
      </div>
      <div style={{fontSize:22,opacity:0.7}}>{icon}</div>
    </div>
  </div>
);

const Badge=({s})=>{
  const m={Confirmed:["#10b981","#d1fae5"],Pending:["#f59e0b","#fef3c7"],Failed:["#ef4444","#fee2e2"],Buy:["#3b82f6","#dbeafe"],Sell:["#10b981","#d1fae5"]};
  const [c,bg]=m[s]||["#6b7280","#f3f4f6"];
  return <span style={{background:bg,color:c,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600}}>{s}</span>;
};

const Btn=({children,onClick,variant="primary",small,full})=>{
  const v={
    primary:{background:"#111827",color:"#fff",border:"none"},
    outline:{background:"#fff",color:"#374151",border:"1px solid #d1d5db"},
    blue:{background:"#eff6ff",color:"#3b82f6",border:"1px solid #bfdbfe"},
    green:{background:"#d1fae5",color:"#059669",border:"1px solid #6ee7b7"},
    danger:{background:"#fee2e2",color:"#ef4444",border:"1px solid #fca5a5"},
    amber:{background:"#fef3c7",color:"#d97706",border:"1px solid #fcd34d"},
  }[variant]||{background:"#111827",color:"#fff",border:"none"};
  return(
    <button onClick={onClick} style={{...v,borderRadius:8,padding:small?"5px 12px":"8px 16px",fontWeight:600,fontSize:small?11:13,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",width:full?"100%":"auto"}}>
      {children}
    </button>
  );
};

const Modal=({title,children,onClose})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{background:"#fff",borderRadius:16,padding:28,width:440,maxWidth:"92vw",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <span style={{color:"#111827",fontWeight:700,fontSize:16}}>{title}</span>
        <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,color:"#6b7280"}}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const Field=({label,placeholder,type="text",note})=>(
  <div style={{marginBottom:14}}>
    <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>{label}</div>
    <input type={type} placeholder={placeholder} style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",color:"#111827",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
    {note&&<div style={{color:"#9ca3af",fontSize:11,marginTop:4}}>{note}</div>}
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

// ── Pages ─────────────────────────────────────────────────────────────────────

function PageDashboard({ticker,autoTrade,setAutoTrade,setModal}){
  return(
    <PageWrap title="Dashboard" subtitle="Your energy trading overview">
      {/* KPIs */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        <KpiCard icon="⚡" label="Energy Balance" value="24.7 kWh" sub="+3.2 today" color="#3b82f6"/>
        <KpiCard icon="💰" label="Credit Balance" value="412 TKN" sub="≈ $37.50" color="#f59e0b"/>
        <KpiCard icon="📈" label="Market Price" value={`$${ticker}`} sub="per kWh" color="#3b82f6"/>
        <KpiCard icon="🔄" label="Active Trades" value="3" sub="2 buy · 1 sell" color="#8b5cf6"/>
        <KpiCard icon="💵" label="Earnings MTD" value="$84.20" sub="↑ 12% vs last month" color="#10b981"/>
        {/* <KpiCard icon="🌱" label="CO₂ Offset" value="18.4 kg" sub="this month" color="#10b981"/> */}
      </div>

      {/* Quick Actions */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        <Btn onClick={()=>setModal("buy")}>⚡ Buy Energy</Btn>
        <Btn variant="blue" onClick={()=>setModal("sell")}>📤 Sell Energy</Btn>
        <Btn variant="outline" onClick={()=>setModal("alert")}>🔔 Price Alert</Btn>
        <Btn variant={autoTrade?"green":"outline"} onClick={()=>setAutoTrade(a=>!a)}>{autoTrade?"🤖 Auto-Trade ON":"🤖 Auto-Trade OFF"}</Btn>
        <Btn variant="outline" onClick={()=>setModal("withdraw")}>💸 Withdraw</Btn>
        <Btn variant="amber" onClick={()=>alert("Rewards Claimed! +15 TKN")}>🎁 Claim Rewards</Btn>
      </div>

      {/* Charts Row 1 */}
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:2}}>
          <div style={S.chartLabel}>⚡ Real-Time Energy Price (24h)</div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={priceData}>
              <XAxis dataKey="t" tick={{fontSize:10,fill:"#9ca3af"}} interval={3}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}} domain={["auto","auto"]}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,fontSize:12}}/>
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🔋 Supply vs Demand</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={DONUT} cx="50%" cy="50%" innerRadius={40} outerRadius={62} dataKey="value">
                {DONUT.map((_,i)=><Cell key={i} fill={DONUT_COLORS[i]}/>)}
              </Pie>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:4}}>
            {DONUT.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#6b7280"}}>
                <div style={{width:8,height:8,borderRadius:2,background:DONUT_COLORS[i]}}/>{d.name} {d.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📉 My Consumption (kWh)</div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={consumptionData}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Area type="monotone" dataKey="kwh" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>☀️ My Production (kWh)</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={productionData}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="kwh" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div> */}
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>💳 Credit Balance History</div>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={creditHistory}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Line type="monotone" dataKey="bal" stroke="#f59e0b" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Orders strip */}
      <div style={S.chartBox}>
        <div style={{fontWeight:600,color:"#111827",fontSize:13,marginBottom:12}}>🔄 My Active Orders</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[{type:"Buy",kwh:5,price:0.090},{type:"Sell",kwh:3,price:0.093},{type:"Buy",kwh:8,price:0.088}].map((o,i)=>(
            <div key={i} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 16px",display:"flex",gap:12,alignItems:"center"}}>
              <Badge s={o.type}/>
              <span style={{fontSize:13,color:"#374151",fontWeight:500}}>{o.kwh} kWh</span>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f59e0b",fontWeight:700}}>${o.price}/kWh</span>
              <button style={{background:"none",border:"none",color:"#ef4444",fontSize:11,cursor:"pointer",fontWeight:600}}>Cancel</button>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageMarket({setModal,ticker}){
  return(
    <PageWrap title="Energy Market" subtitle="Live P2P marketplace — buy and sell energy">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="📈" label="Current Price" value={`$${ticker}`} sub="per kWh live" color="#3b82f6"/>
        <KpiCard icon="🏪" label="Active Sellers" value="24" sub="In your area" color="#10b981"/>
        <KpiCard icon="📦" label="Available Supply" value="284 kWh" sub="Right now" color="#8b5cf6"/>
        <KpiCard icon="⚡" label="Avg Deal Size" value="5.8 kWh" sub="Last 1 hour" color="#f59e0b"/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Btn onClick={()=>setModal("buy")}>⚡ Buy Energy</Btn>
        <Btn variant="blue" onClick={()=>setModal("sell")}>📤 Sell Energy</Btn>
        <Btn variant="outline" onClick={()=>setModal("alert")}>🔔 Set Price Alert</Btn>
      </div>

      <div style={{display:"flex",gap:14,marginBottom:16}}>
        {/* Live Feed */}
        <div style={{...S.chartBox,flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#ef4444",animation:"pulse 1.5s infinite"}}/>
            <span style={{fontWeight:600,color:"#111827",fontSize:13}}>Live Market Feed</span>
          </div>
          {marketFeed.map((f,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#374151",fontWeight:500}}>{f.peer}</div>
                <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{f.kwh} kWh · ${f.price}/kWh</div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:11,color:"#9ca3af"}}>{f.ago}</span>
                <Btn variant="blue" small onClick={()=>setModal("buy")}>Buy</Btn>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby Sellers */}
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:600,color:"#111827",fontSize:13,marginBottom:12}}>📍 Nearby Sellers</div>
          {nearbySellers.map((s,i)=>(
            <div key={i} style={{padding:"12px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#374151",fontWeight:500}}>{s.addr}</span>
                <span style={{fontSize:11,color:"#f59e0b",fontWeight:600}}>⭐ {s.rating}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,color:"#6b7280"}}>{s.dist} · {s.kwh} kWh available</span>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#10b981",fontWeight:700}}>${s.price}/kWh</span>
                  <Btn variant="green" small onClick={()=>setModal("buy")}>Buy</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price chart */}
      <div style={S.chartBox}>
        <div style={S.chartLabel}>📈 Market Price — Last 24 Hours</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={priceData}>
            <XAxis dataKey="t" tick={{fontSize:10,fill:"#9ca3af"}} interval={3}/>
            <YAxis tick={{fontSize:10,fill:"#9ca3af"}} domain={["auto","auto"]}/>
            <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,fontSize:12}}/>
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:20,marginTop:8}}>
          {[["24h High","$0.098","#10b981"],["24h Low","$0.079","#ef4444"],["Avg","$0.088","#f59e0b"],["Change","↑ 2.4%","#10b981"]].map(([l,v,c])=>(
            <div key={l}>
              <div style={{fontSize:10,color:"#9ca3af"}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:c,fontFamily:"'Space Mono',monospace"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageTrades(){
  const [filter,setFilter]=useState("All");
  const filtered=filter==="All"?txData:txData.filter(t=>t.type===filter||t.status===filter);
  return(
    <PageWrap title="My Trades" subtitle="All buy and sell transactions">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="✅" label="Confirmed" value="3" sub="This week" color="#10b981"/>
        <KpiCard icon="⏳" label="Pending" value="1" sub="Awaiting settlement" color="#f59e0b"/>
        <KpiCard icon="❌" label="Failed" value="1" sub="See details" color="#ef4444"/>
        <KpiCard icon="📊" label="Volume MTD" value="24.1 kWh" sub="Bought + sold" color="#3b82f6"/>
      </div>

      <div style={S.chartBox}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",gap:6}}>
            {["All","Buy","Sell","Pending","Failed"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"#111827":"#f3f4f6",color:filter===f?"#fff":"#374151",border:"none",borderRadius:7,padding:"5px 12px",fontWeight:600,fontSize:12,cursor:"pointer"}}>
                {f}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <input placeholder="Search…" style={{background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"6px 12px",fontSize:12,outline:"none",width:160}}/>
            <Btn variant="outline" small>Export CSV</Btn>
          </div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>{["Date","Type","Counterparty","kWh","Price","Credits","Status","TX Hash"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((r,i)=>(
                <tr key={i} className="trow">
                  <td style={{...S.td,color:"#6b7280"}}>{r.date}</td>
                  <td style={S.td}><Badge s={r.type}/></td>
                  <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#6b7280"}}>{r.peer}</td>
                  <td style={{...S.td,fontWeight:600}}>{r.kwh}</td>
                  <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#10b981"}}>${r.price}</td>
                  <td style={{...S.td,color:"#f59e0b",fontFamily:"'Space Mono',monospace",fontSize:12}}>{r.credits}</td>
                  <td style={S.td}><Badge s={r.status}/></td>
                  <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#9ca3af"}}>{r.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrap>
  );
}

function PageWallet({setModal}){
  return(
    <PageWrap title="Credits & Wallet" subtitle="Manage your token balance and withdrawals">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="💳" label="Credit Balance" value="412 TKN" sub="≈ $37.50" color="#10b981"/>
        <KpiCard icon="💵" label="Earnings MTD" value="$84.20" sub="↑ 12% vs last month" color="#10b981"/>
        <KpiCard icon="📤" label="Withdrawn MTD" value="$52.00" sub="3 transactions" color="#3b82f6"/>
        <KpiCard icon="🎁" label="Claimable Rewards" value="15 TKN" sub="Available now" color="#f59e0b"/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Btn onClick={()=>setModal("withdraw")}>💸 Withdraw Credits</Btn>
        <Btn variant="blue" onClick={()=>setModal("topup")}>➕ Top Up Credits</Btn>
        <Btn variant="amber" onClick={()=>alert("Rewards Claimed! +15 TKN")}>🎁 Claim Rewards</Btn>
      </div>

      <div style={{display:"flex",gap:14}}>
        <div style={{...S.chartBox,flex:2}}>
          <div style={S.chartLabel}>💳 Credit Balance History (14 days)</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={creditHistory}>
              <XAxis dataKey="d" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Area type="monotone" dataKey="bal" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:600,color:"#111827",marginBottom:14}}>Recent Transactions</div>
          {txData.slice(0,4).map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div>
                <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:2}}>
                  <Badge s={r.type}/>
                  <span style={{fontSize:12,color:"#374151",fontWeight:500}}>{r.kwh} kWh</span>
                </div>
                <div style={{fontSize:11,color:"#9ca3af"}}>{r.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f59e0b",fontWeight:600}}>{r.credits} TKN</div>
                <Badge s={r.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageAnalytics(){
  return(
    <PageWrap title="Analytics" subtitle="Energy consumption, production and savings insights">
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📉 Consumption vs Production (kWh/day)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={consumptionData.map((c,i)=>({d:c.d,consumption:c.kwh,production:productionData[i].kwh}))}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="consumption" fill="#3b82f6" radius={[4,4,0,0]} name="Consumption"/>
              <Bar dataKey="production" fill="#10b981" radius={[4,4,0,0]} name="Production"/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[["#3b82f6","Consumption"],["#10b981","Production"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:10,height:10,borderRadius:3,background:c}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🔄 Buy vs Sell Activity (kWh/month)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={buySellData}>
              <XAxis dataKey="m" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="buy" fill="#3b82f6" radius={[4,4,0,0]} name="Bought"/>
              <Bar dataKey="sell" fill="#10b981" radius={[4,4,0,0]} name="Sold"/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[["#3b82f6","Bought"],["#10b981","Sold"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:10,height:10,borderRadius:3,background:c}}/>{l}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.chartBox}>
        <div style={S.chartLabel}>💰 DECT Savings vs Traditional Utility ($/month)</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={savingsData}>
            <XAxis dataKey="m" tick={{fontSize:10,fill:"#9ca3af"}}/>
            <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
            <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
            <Bar dataKey="utility" fill="#e5e7eb" radius={[4,4,0,0]} name="Traditional Utility"/>
            <Bar dataKey="saved" fill="#10b981" radius={[4,4,0,0]} name="DECT Cost"/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:20,marginTop:10}}>
          {[["Total Saved","$42.80","#10b981"],["Avg Monthly","$7.10","#10b981"],["Best Month","$14.20","#3b82f6"]].map(([l,v,c])=>(
            <div key={l} style={{background:"#f9fafb",borderRadius:8,padding:"8px 14px",border:"1px solid #e5e7eb"}}>
              <div style={{fontSize:11,color:"#6b7280"}}>{l}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:14,fontWeight:700,color:c,marginTop:2}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageSettings({autoTrade,setAutoTrade,setModal}){
  return(
    <PageWrap title="Settings" subtitle="Configure your trading preferences">
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>🤖 Auto-Trade</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Automatically execute trades based on rules you define</div>
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb",marginBottom:14}}>
            <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>Auto-Trade</span>
            <button onClick={()=>setAutoTrade(a=>!a)} style={{background:autoTrade?"#10b981":"#e5e7eb",border:"none",borderRadius:20,width:44,height:24,cursor:"pointer",position:"relative",transition:"background 0.2s"}}>
              <div style={{position:"absolute",top:3,left:autoTrade?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
            </button>
          </div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:4}}>When active, trades will execute automatically within your set price bounds.</div>
        </div>

        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>🔔 Price Alerts</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Get notified when the market price crosses your thresholds</div>
          <div style={{display:"grid",gap:8,marginBottom:14}}>
            {[["Alert Above","$0.100/kWh"],["Alert Below","$0.080/kWh"],["Current Price","$0.091/kWh"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
                <span style={{fontSize:12,color:"#6b7280"}}>{l}</span>
                <span style={{fontSize:12,fontWeight:700,color:"#111827",fontFamily:"'Space Mono',monospace"}}>{v}</span>
              </div>
            ))}
          </div>
          <Btn variant="outline" onClick={()=>setModal("alert")}>Edit Alert Thresholds</Btn>
        </div>

        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>💳 Wallet & Credits</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Manage your connected wallet and token balance</div>
          <div style={{background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:8,padding:"10px 14px",marginBottom:14}}>
            <div style={{fontSize:11,color:"#6b7280"}}>Connected Wallet</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#059669",fontWeight:600,marginTop:2}}>0x7aF…3c92</div>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>Arbitrum Network · Active</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="outline" onClick={()=>setModal("withdraw")}>💸 Withdraw</Btn>
            <Btn variant="blue" onClick={()=>setModal("topup")}>➕ Top Up</Btn>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}

function PageContract(){
  return(
    <PageWrap title="Smart Contract" subtitle="Your DECT contract interactions on Arbitrum">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="📜" label="Contract Version" value="v2.4.1" sub="Latest deployed" color="#8b5cf6"/>
        <KpiCard icon="⚡" label="Total Calls" value="312" sub="Your lifetime calls" color="#3b82f6"/>
        <KpiCard icon="💰" label="Gas Saved" value="$1.24" sub="vs Layer-1" color="#10b981"/>
        <KpiCard icon="🔗" label="Network" value="Arbitrum" sub="Layer-2 · Active" color="#8b5cf6"/>
      </div>
      <div style={{display:"flex",gap:14}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:600,color:"#111827",marginBottom:14}}>Contract Details</div>
          {[["Contract Address","0x11a…DECT"],["Network","Arbitrum One"],["Version","v2.4.1"],["Status","Active"],["Total Calls","84,291"],["Last Interaction","2026-03-08 14:32"],["Gas Used (avg)","0.42 Gwei"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f3f4f6",fontSize:13}}>
              <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
              <span style={{color:"#111827",fontWeight:600,fontFamily:k.includes("Address")?"'Space Mono',monospace":"inherit",fontSize:k.includes("Address")?11:13}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:16}}>
            <Btn variant="outline">🔍 View on Arbiscan</Btn>
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={{fontWeight:600,color:"#111827",marginBottom:14}}>Available Functions</div>
          {[
            {fn:"buyEnergy()",desc:"Purchase energy from a seller",color:"#3b82f6"},
            {fn:"sellEnergy()",desc:"List your energy for sale",color:"#10b981"},
            {fn:"withdrawCredits()",desc:"Withdraw token balance to wallet",color:"#f59e0b"},
            {fn:"claimRewards()",desc:"Claim earned incentive tokens",color:"#8b5cf6"},
            {fn:"setAutoTrade()",desc:"Configure automated trading rules",color:"#6b7280"},
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:f.color,fontWeight:600}}>{f.fn}</div>
                <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{f.desc}</div>
              </div>
              <Btn variant="outline" small>Call</Btn>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export default function ConsumerDashboard(){
  const [tab,setTab]=useState("Dashboard");
  const [modal,setModal]=useState(null);
  const [autoTrade,setAutoTrade]=useState(false);
  const [notif,setNotif]=useState(3);
  const [ticker,setTicker]=useState(0.0912);

  useEffect(()=>{
    const id=setInterval(()=>setTicker(t=>+(t+(Math.random()-0.5)*0.0005).toFixed(4)),2000);
    return()=>clearInterval(id);
  },[]);

  const nav=[
    {icon:"🏠",label:"Dashboard"},
    {icon:"⚡",label:"Energy Market"},
    {icon:"🔄",label:"My Trades"},
    {icon:"💳",label:"Credits & Wallet"},
    {icon:"📊",label:"Analytics"},
    {icon:"📄",label:"Smart Contract"},
    {icon:"⚙️",label:"Settings"},
  ];

  const renderPage=()=>{
    const p={setModal,autoTrade,setAutoTrade,ticker};
    if(tab==="Dashboard") return <PageDashboard {...p}/>;
    if(tab==="Energy Market") return <PageMarket {...p}/>;
    if(tab==="My Trades") return <PageTrades/>;
    if(tab==="Credits & Wallet") return <PageWallet setModal={setModal}/>;
    if(tab==="Analytics") return <PageAnalytics/>;
    if(tab==="Smart Contract") return <PageContract/>;
    if(tab==="Settings") return <PageSettings {...p}/>;
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
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,background:"#3b82f6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚡</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#111827"}}>DECT</div>
              <div style={{fontSize:10,color:"#9ca3af"}}>Consumer Portal</div>
            </div>
          </div>
          <div style={{marginTop:12,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"8px 12px"}}>
            <div style={{fontSize:10,color:"#6b7280"}}>Connected Wallet</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#3b82f6",fontWeight:600,marginTop:2}}>0x7aF…3c92</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
              <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>
              <span style={{color:"#9ca3af",fontSize:10}}>Arbitrum · Live</span>
            </div>
          </div>
        </div>

        <div style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
          {nav.map(n=>{
            const active=tab===n.label;
            return(
              <div key={n.label} className="nav-item" onClick={()=>setTab(n.label)}
                style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,cursor:"pointer",marginBottom:2,
                  background:active?"#eff6ff":"transparent",
                  color:active?"#2563eb":"#6b7280",
                  fontWeight:active?700:400,fontSize:13,transition:"all 0.1s",
                  borderLeft:active?"3px solid #3b82f6":"3px solid transparent"}}>
                <span style={{fontSize:14}}>{n.icon}</span>
                <span>{n.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{padding:"12px 16px",borderTop:"1px solid #e5e7eb"}}>
          <div style={{background:"#f9fafb",borderRadius:10,padding:"10px 12px",border:"1px solid #e5e7eb"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#6b7280",fontSize:11}}>Credit Balance</span>
              <span style={{color:"#10b981",fontSize:11,fontWeight:700}}>412 TKN</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
              <span style={{color:"#6b7280",fontSize:11}}>Active Trades</span>
              <span style={{color:"#3b82f6",fontSize:11,fontWeight:700}}>3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Topbar */}
        <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:13,color:"#9ca3af"}}>DECT</span>
            <span style={{color:"#d1d5db"}}>/</span>
            <span style={{fontSize:13,fontWeight:600,color:"#111827"}}>{tab}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"5px 14px",display:"flex",gap:6,alignItems:"center"}}>
              <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#3b82f6",fontWeight:700}}>${ticker}/kWh</span>
              <span style={{fontSize:11,color:ticker>0.091?"#10b981":"#ef4444",fontWeight:700}}>{ticker>0.091?"↑":"↓"}</span>
            </div>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setNotif(0)}>
              <span style={{fontSize:18}}>🔔</span>
              {notif>0&&<div style={{position:"absolute",top:-3,right:-3,background:"#ef4444",borderRadius:"50%",width:15,height:15,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{notif}</div>}
            </div>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#10b981)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"}}>F</div>
          </div>
        </div>

        {/* Page */}
        <div style={{flex:1,overflow:"auto",padding:24}}>
          {renderPage()}
        </div>
      </div>

      {/* Global Modals */}
      {modal==="buy"&&(
        <Modal title="⚡ Buy Energy" onClose={()=>setModal(null)}>
          <Field label="Amount (kWh)" placeholder="e.g. 5.0"/>
          <Field label="Max Price ($/kWh)" placeholder="e.g. 0.095" type="number"/>
          <Field label="Duration (hours)" placeholder="e.g. 4" type="number"/>
          <div style={{background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:8,padding:10,marginBottom:14,fontSize:12,color:"#059669"}}>
            Estimated Cost: <strong style={{fontFamily:"'Space Mono',monospace"}}>~$0.475</strong>
          </div>
          <Btn full onClick={()=>setModal(null)}>Confirm Buy Order</Btn>
        </Modal>
      )}
      {modal==="sell"&&(
        <Modal title="📤 Sell Energy" onClose={()=>setModal(null)}>
          <Field label="Amount (kWh)" placeholder="e.g. 3.0"/>
          <Field label="Min Price ($/kWh)" placeholder="e.g. 0.085" type="number"/>
          <Field label="Availability Window (hours)" placeholder="e.g. 6" type="number"/>
          <Btn full variant="blue" onClick={()=>setModal(null)}>List for Sale</Btn>
        </Modal>
      )}
      {modal==="alert"&&(
        <Modal title="🔔 Set Price Alert" onClose={()=>setModal(null)}>
          <Field label="Alert when price ABOVE ($/kWh)" placeholder="e.g. 0.100" type="number"/>
          <Field label="Alert when price BELOW ($/kWh)" placeholder="e.g. 0.080" type="number"/>
          <Btn full onClick={()=>setModal(null)}>Save Alert</Btn>
        </Modal>
      )}
      {modal==="withdraw"&&(
        <Modal title="💸 Withdraw Credits" onClose={()=>setModal(null)}>
          <Field label="Amount (TKN)" placeholder="e.g. 100" type="number"/>
          <Field label="Destination Wallet" placeholder="0x…" note="Make sure this is your correct Arbitrum wallet address"/>
          <Btn full onClick={()=>setModal(null)}>Withdraw</Btn>
        </Modal>
      )}
      {modal==="topup"&&(
        <Modal title="➕ Top Up Credits" onClose={()=>setModal(null)}>
          <Field label="Amount (TKN)" placeholder="e.g. 200" type="number"/>
          <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:12,marginBottom:14,fontSize:12,color:"#3b82f6"}}>
            Connect via <strong>MetaMask</strong> or <strong>WalletConnect</strong> to complete top-up.
          </div>
          <Btn full onClick={()=>setModal(null)}>Top Up Now</Btn>
        </Modal>
      )}
    </div>
  );
}