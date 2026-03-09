// import React, { useState, useCallback, useEffect } from "react";
// import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { NavLink } from "react-router-dom";
// import { 
//   Zap, TrendingUp, TrendingDown, DollarSign, 
//   ArrowUpRight, ArrowDownRight, RefreshCw, 
//   AlertCircle, CheckCircle, Loader 
// } from 'lucide-react';
// import "../assets/producer.css";

// function ProducerDashboard() {
//   const [energyGenerated, setEnergyGenerated] = useState(150);
//   const [tokenBalance, setTokenBalance] = useState(120);
//   const [earnings, setEarnings] = useState(4560);
//   const [pricePerETK, setPricePerETK] = useState(12);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   // Chart data
//   const energyData = [
//     { time: '00:00', generated: 2, sold: 1.5, revenue: 18 },
//     { time: '04:00', generated: 0.5, sold: 0, revenue: 0 },
//     { time: '08:00', generated: 8.5, sold: 7.2, revenue: 86.4 },
//     { time: '12:00', generated: 15.2, sold: 14.8, revenue: 177.6 },
//     { time: '16:00', generated: 12.8, sold: 12.1, revenue: 145.2 },
//     { time: '20:00', generated: 3.5, sold: 3.2, revenue: 38.4 },
//   ];

//   const monthlyData = [
//     { month: 'Jan', generated: 480, sold: 420, earnings: 5040 },
//     { month: 'Feb', generated: 520, sold: 480, earnings: 5760 },
//     { month: 'Mar', generated: 610, sold: 580, earnings: 6960 },
//     { month: 'Apr', generated: 680, sold: 640, earnings: 7680 },
//     { month: 'May', generated: 720, sold: 680, earnings: 8160 },
//     { month: 'Jun', generated: 850, sold: 800, earnings: 9600 },
//   ];

//   const revenueBreakdown = [
//     { name: 'Solar Sales', value: 45, color: '#fbbf24' },
//     { name: 'Grid Export', value: 35, color: '#3b82f6' },
//     { name: 'P2P Trading', value: 20, color: '#10b981' },
//   ];

//   // Clear notifications after 5 seconds
//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError(null);
//         setSuccess(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);

//   /**
//    * Mint tokens from generated energy
//    */
//   const mintTokens = useCallback(async () => {
//     if (energyGenerated <= 0) {
//       setError('No energy available to mint tokens');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const newBalance = tokenBalance + energyGenerated;
//       setTokenBalance(newBalance);
//       setSuccess(`Successfully minted ${energyGenerated} tokens!`);
//       setEnergyGenerated(0);
//     } catch (err) {
//       setError('Failed to mint tokens. Please try again.');
//       console.error('Mint error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [energyGenerated, tokenBalance]);

//   /**
//    * Sell tokens on marketplace
//    */
//   const sellTokens = useCallback(async () => {
//     const amount = prompt("Enter ETK amount to sell (max: " + tokenBalance + "):");
    
//     if (!amount) return;

//     const sellAmount = parseFloat(amount);
//     if (isNaN(sellAmount) || sellAmount <= 0) {
//       setError('Please enter a valid amount');
//       return;
//     }

//     if (sellAmount > tokenBalance) {
//       setError('Insufficient token balance');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       const total = sellAmount * pricePerETK;
//       const commission = (2 / 100) * total;
//       const net = total - commission;
      
//       setTokenBalance(tokenBalance - sellAmount);
//       setEarnings(earnings + net);
//       setSuccess(`Successfully sold ${sellAmount} ETK for $${net.toFixed(2)}!`);
//     } catch (err) {
//       setError('Failed to sell tokens. Please try again.');
//       console.error('Sell error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [tokenBalance, earnings, pricePerETK]);

//   const StatCard = ({ icon: Icon, title, value, change, suffix = '', trend, color }) => (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//           <p className="text-3xl font-bold text-gray-900 mb-2">
//             {value}{suffix}
//           </p>
//           {change !== undefined && (
//             <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//               {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
//               {Math.abs(change).toFixed(2)}% {trend}
//             </div>
//           )}
//         </div>
//         <div className={`p-3 rounded-lg ${color}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-orange-600 rounded-lg">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">EnergyChain</h1>
//                 <p className="text-sm text-gray-500">Producer Dashboard</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm text-gray-500">Monthly Earnings</p>
//                 <p className="text-lg font-bold text-gray-900">${earnings.toLocaleString()}</p>
//               </div>
//               <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
//                 PA
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Notifications */}
//       {(error || success) && (
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-6 py-4">
//             {error && (
//               <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
//                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
//                 <span>{error}</span>
//               </div>
//             )}
//             {success && (
//               <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
//                 <CheckCircle className="w-5 h-5 flex-shrink-0" />
//                 <span>{success}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6">
//           <nav className="flex gap-8">
//             {['overview', 'analytics', 'actions'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-2 font-medium text-sm capitalize transition-colors relative ${
//                   activeTab === tab
//                     ? 'text-orange-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab}
//                 {activeTab === tab && (
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
//                 )}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard 
//                 icon={Zap}
//                 title="Energy Generated"
//                 value={energyGenerated.toFixed(1)}
//                 change={12.5}
//                 suffix=" kWh"
//                 trend="vs yesterday"
//                 color="bg-blue-600"
//               />
//               <StatCard 
//                 icon={Zap}
//                 title="Token Balance"
//                 value={tokenBalance.toFixed(0)}
//                 change={5.2}
//                 suffix=" ETK"
//                 trend="this month"
//                 color="bg-green-600"
//               />
//               <StatCard 
//                 icon={DollarSign}
//                 title="Total Earnings"
//                 value={earnings.toFixed(0)}
//                 change={18.3}
//                 suffix=""
//                 trend="vs last month"
//                 color="bg-purple-600"
//               />
//               <StatCard 
//                 icon={TrendingUp}
//                 title="Token Price"
//                 value={pricePerETK.toFixed(2)}
//                 change={3.1}
//                 suffix=" $/ETK"
//                 trend="vs yesterday"
//                 color="bg-orange-600"
//               />
//             </div>

//             {/* Charts */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Energy Production</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={energyData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="time" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
//                   />
//                   <Legend />
//                   <Line type="monotone" dataKey="generated" stroke="#3b82f6" strokeWidth={2} name="Generated (kWh)" />
//                   <Line type="monotone" dataKey="sold" stroke="#10b981" strokeWidth={2} name="Sold (kWh)" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Generation & Earnings</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={monthlyData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="month" stroke="#6b7280" />
//                     <YAxis stroke="#6b7280" />
//                     <Tooltip 
//                       contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
//                     />
//                     <Legend />
//                     <Bar dataKey="generated" fill="#3b82f6" name="Generated (kWh)" />
//                     <Bar dataKey="sold" fill="#10b981" name="Sold (kWh)" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Breakdown</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={revenueBreakdown}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, value }) => `${name} ${value}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {revenueBreakdown.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Actions Tab */}
//         {activeTab === 'actions' && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Mint Tokens Card */}
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Mint Tokens</h3>
//                 <p className="text-gray-600 text-sm mb-6">Convert your generated energy into tradeable tokens</p>
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                   <p className="text-sm text-blue-900">Available Energy</p>
//                   <p className="text-3xl font-bold text-blue-600">{energyGenerated.toFixed(1)} kWh</p>
//                 </div>
//                 <button
//                   onClick={mintTokens}
//                   disabled={loading || energyGenerated === 0}
//                   className="w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="w-4 h-4 animate-spin" />
//                       Minting...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="w-4 h-4" />
//                       Mint {energyGenerated.toFixed(0)} Tokens
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Sell Tokens Card */}
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Sell Tokens</h3>
//                 <p className="text-gray-600 text-sm mb-6">Sell your tokens on the marketplace for earnings</p>
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
//                   <p className="text-sm text-green-900">Token Balance</p>
//                   <p className="text-3xl font-bold text-green-600">{tokenBalance.toFixed(0)} ETK</p>
//                 </div>
//                 <button
//                   onClick={sellTokens}
//                   disabled={loading || tokenBalance === 0}
//                   className="w-full px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="w-4 h-4 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <DollarSign className="w-4 h-4" />
//                       Sell Tokens
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <NavLink
//                   to="/producer/transactions"
//                   className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
//                 >
//                   <p className="text-sm font-medium text-gray-900">Transactions</p>
//                 </NavLink>
//                 <NavLink
//                   to="/producer/reports"
//                   className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
//                 >
//                   <p className="text-sm font-medium text-gray-900">Reports</p>
//                 </NavLink>
//                 <NavLink
//                   to="/producer/profile"
//                   className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
//                 >
//                   <p className="text-sm font-medium text-gray-900">Profile</p>
//                 </NavLink>
//                 <NavLink
//                   to="/marketplace"
//                   className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
//                 >
//                   <p className="text-sm font-medium text-gray-900">Marketplace</p>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default ProducerDashboard;










import { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// ── Data ────────────────────────────────────────────────────────────────────
const outputData = Array.from({length:24},(_,i)=>({t:`${i}:00`,kw:(3+Math.sin(i/2.5)*2.5+Math.random()*0.5).toFixed(2)}));
const gridInjected = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>({d,kwh:(18+Math.random()*14).toFixed(1)}));
const earningsData = ["Jan","Feb","Mar","Apr","May","Jun"].map(m=>({m,usd:(120+Math.random()*80).toFixed(0)}));
const myPriceVsMarket = Array.from({length:14},(_,i)=>({d:`D${i+1}`,mine:(0.086+Math.random()*0.006).toFixed(4),market:(0.083+Math.random()*0.008).toFixed(4)}));
const forecastData = [{hr:"6am",kwh:1.2},{hr:"8am",kwh:3.4},{hr:"10am",kwh:6.1},{hr:"12pm",kwh:7.8},{hr:"2pm",kwh:7.2},{hr:"4pm",kwh:5.3},{hr:"6pm",kwh:2.1},{hr:"8pm",kwh:0.4}];
const creditAccum = Array.from({length:14},(_,i)=>({d:`D${i+1}`,tkn:(300+i*22+Math.random()*15).toFixed(0)}));
const heatmapHours = ["12a","2a","4a","6a","8a","10a","12p","2p","4p","6p","8p","10p"];
const heatmapDays  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const heatmap = heatmapDays.map(()=>heatmapHours.map(()=>+(Math.random()*10).toFixed(1)));
const DONUT = [{name:"Your Share",value:18},{name:"Others",value:82}];
const DONUT_COLORS = ["#10b981","#e5e7eb"];

const bids = [
  {addr:"0xA1b…c23",kwh:6.0,offer:0.092,time:"just now",status:"New"},
  {addr:"0xB2c…d34",kwh:3.5,offer:0.089,time:"1m ago",status:"New"},
  {addr:"0xC3d…e45",kwh:10.0,offer:0.085,time:"4m ago",status:"Pending"},
  {addr:"0xD4e…f56",kwh:2.0,offer:0.094,time:"9m ago",status:"Countered"},
];
const trades = [
  {date:"2026-03-08",buyer:"0xE5f…g67",kwh:5.5,price:0.091,credits:50.1,status:"Confirmed",hash:"0xab1…"},
  {date:"2026-03-07",buyer:"0xF6g…h78",kwh:8.0,price:0.088,credits:70.4,status:"Confirmed",hash:"0xbc2…"},
  {date:"2026-03-06",buyer:"0xG7h…i89",kwh:3.0,price:0.093,credits:27.9,status:"Confirmed",hash:"0xcd3…"},
  {date:"2026-03-05",buyer:"0xH8i…j90",kwh:6.5,price:0.086,credits:55.9,status:"Pending",hash:"0xde4…"},
];
const devices = [
  {name:"Solar Panel A",type:"Solar",capacity:"5 kW",output:"3.8 kW",status:"Active",sync:"2s ago"},
  {name:"Solar Panel B",type:"Solar",capacity:"5 kW",output:"4.1 kW",status:"Active",sync:"2s ago"},
  {name:"Battery Bank 1",type:"Battery",capacity:"20 kWh",output:"72%",status:"Charging",sync:"5s ago"},
  {name:"Wind Unit 1",type:"Wind",capacity:"2 kW",output:"0.0 kW",status:"Offline",sync:"12m ago"},
];
const weatherFore = [
  {day:"Today",icon:"☀️",temp:"34°C",solar:"Excellent"},
  {day:"Tomorrow",icon:"⛅",temp:"31°C",solar:"Good"},
  {day:"Wed",icon:"🌤️",temp:"29°C",solar:"Moderate"},
  {day:"Thu",icon:"🌧️",temp:"26°C",solar:"Low"},
];
const carbonData = [
  {month:"Jan",ccr:8},{month:"Feb",ccr:11},{month:"Mar",ccr:9},{month:"Apr",ccr:15},{month:"May",ccr:12},{month:"Jun",ccr:14}
];

// ── Shared atoms ─────────────────────────────────────────────────────────────
const S = {
  card:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:"16px 20px",flex:1,minWidth:130,boxShadow:"0 1px 3px rgba(0,0,0,0.05)"},
  chartBox:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:16,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},
  chartLabel:{fontSize:12,color:"#6b7280",marginBottom:10,fontWeight:500},
  th:{padding:"10px 12px",borderBottom:"1px solid #e5e7eb",color:"#6b7280",fontSize:11,textTransform:"uppercase",letterSpacing:0.5,textAlign:"left",whiteSpace:"nowrap"},
  td:{padding:"10px 12px",fontSize:13,borderBottom:"1px solid #f3f4f6"},
};

const KpiCard = ({icon,label,value,sub,color="#10b981"})=>(
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

const Badge = ({s})=>{
  const m={Active:["#10b981","#d1fae5"],Confirmed:["#10b981","#d1fae5"],Charging:["#3b82f6","#dbeafe"],Pending:["#f59e0b","#fef3c7"],Offline:["#6b7280","#f3f4f6"],New:["#8b5cf6","#ede9fe"],Countered:["#f59e0b","#fef3c7"]};
  const [c,bg]=m[s]||["#6b7280","#f3f4f6"];
  return <span style={{background:bg,color:c,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600}}>{s}</span>;
};

const Btn = ({children,onClick,variant="primary",small,full})=>{
  const v={
    primary:{background:"#111827",color:"#fff",border:"none"},
    outline:{background:"#fff",color:"#374151",border:"1px solid #d1d5db"},
    green:{background:"#d1fae5",color:"#059669",border:"1px solid #6ee7b7"},
    danger:{background:"#fee2e2",color:"#ef4444",border:"1px solid #fca5a5"},
    blue:{background:"#eff6ff",color:"#3b82f6",border:"1px solid #bfdbfe"},
    amber:{background:"#fef3c7",color:"#d97706",border:"1px solid #fcd34d"},
  }[variant]||{background:"#111827",color:"#fff",border:"none"};
  return(
    <button onClick={onClick} style={{...v,borderRadius:8,padding:small?"5px 12px":"8px 16px",fontWeight:600,fontSize:small?11:13,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",width:full?"100%":"auto"}}>
      {children}
    </button>
  );
};

const Modal = ({title,children,onClose})=>(
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

const Field = ({label,placeholder,type="text",children})=>(
  <div style={{marginBottom:14}}>
    <div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:5}}>{label}</div>
    {children||<input type={type} placeholder={placeholder} style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",color:"#111827",fontSize:13,outline:"none",boxSizing:"border-box"}}/>}
  </div>
);

const PageWrap = ({title,subtitle,children,action})=>(
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

function PageDashboard({output,ticker,autoSell,setAutoSell,paused,setPaused,setModal}){
  return(
    <PageWrap title="Dashboard" subtitle="Your energy production overview">
      {/* KPIs */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        <KpiCard icon="⚡" label="Live Output" value={`${output} kW`} sub="↑ Peak: 8.4 kW today" color="#10b981"/>
        <KpiCard icon="🔋" label="Battery" value="72%" sub="Charging +0.3 kW" color="#3b82f6"/>
        <KpiCard icon="💰" label="Earned Today" value="$18.40" sub="+12% vs yesterday" color="#10b981"/>
        <KpiCard icon="📤" label="Sold This Month" value="842 kWh" sub="↑ 8% vs last month" color="#f59e0b"/>
        {/* <KpiCard icon="🌱" label="Carbon Credits" value="34 CCR" sub="Verified green energy" color="#10b981"/> */}
      </div>

      {/* Quick Actions */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        <Btn onClick={()=>setModal("list")}>📋 List Energy for Sale</Btn>
        <Btn variant={autoSell?"green":"outline"} onClick={()=>setAutoSell(a=>!a)}>{autoSell?"🤖 Auto-Sell ON":"🤖 Auto-Sell OFF"}</Btn>
        <Btn variant={paused?"amber":"outline"} onClick={()=>setPaused(p=>!p)}>{paused?"▶ Resume Selling":"⏸ Pause Selling"}</Btn>
        <Btn variant="outline" onClick={()=>setModal("withdraw")}>💸 Withdraw</Btn>
        <Btn variant="green" onClick={()=>alert("Carbon Credits Claimed! +5 CCR")}>🌱 Claim Credits</Btn>
      </div>

      {/* Charts Row 1 */}
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:2}}>
          <div style={S.chartLabel}>⚡ Real-Time Energy Output (24h)</div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={outputData}>
              <XAxis dataKey="t" tick={{fontSize:10,fill:"#9ca3af"}} interval={3}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,fontSize:12}}/>
              <Area type="monotone" dataKey="kw" stroke="#10b981" fill="#d1fae5" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🌐 Your Grid Share</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={DONUT} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
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
          <div style={S.chartLabel}>📤 Grid Injected (kWh/day)</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={gridInjected}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="kwh" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📊 My Price vs Market</div>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={myPriceVsMarket}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}} domain={["auto","auto"]}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Line type="monotone" dataKey="mine" stroke="#10b981" strokeWidth={2} dot={false} name="My Price"/>
              <Line type="monotone" dataKey="market" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="4 2" name="Market"/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[["#10b981","My Price"],["#3b82f6","Market"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:14,height:2,background:c,borderRadius:2}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>☀️ Forecasted Production (Today)</div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={forecastData}>
              <XAxis dataKey="hr" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Area type="monotone" dataKey="kwh" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Battery + Solar Forecast side by side */}
      <div style={{display:"flex",gap:14}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🔋 Battery Storage</div>
          <div style={{background:"#f3f4f6",borderRadius:8,height:16,overflow:"hidden",marginBottom:8}}>
            <div style={{width:"72%",height:"100%",background:"linear-gradient(90deg,#3b82f6,#10b981)",borderRadius:8}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
            <span style={{color:"#10b981",fontWeight:700,fontFamily:"'Space Mono',monospace"}}>72%</span>
            <span style={{color:"#6b7280"}}>20 kWh total · ⚡ Charging +0.3 kW</span>
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🌤️ Solar Forecast</div>
          {weatherFore.map((w,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<weatherFore.length-1?"1px solid #f3f4f6":"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16}}>{w.icon}</span>
                <div>
                  <div style={{fontSize:12,color:"#111827",fontWeight:500}}>{w.day}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{w.temp}</div>
                </div>
              </div>
              <span style={{fontSize:11,fontWeight:600,color:w.solar==="Excellent"?"#10b981":w.solar==="Good"?"#f59e0b":w.solar==="Moderate"?"#3b82f6":"#ef4444"}}>{w.solar}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}

function PageListings({setModal,paused,setPaused,autoSell,setAutoSell}){
  const listings=[{kwh:8,price:0.091,window:"6h",type:"Dynamic"},{kwh:5,price:0.088,window:"3h",type:"Fixed"},{kwh:12,price:0.085,window:"12h",type:"Dynamic"}];
  return(
    <PageWrap title="My Listings" subtitle="Active energy listings on the P2P market" action={<Btn onClick={()=>setModal("list")}>+ New Listing</Btn>}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="📋" label="Active Listings" value="3" sub="Open for buyers" color="#10b981"/>
        <KpiCard icon="⚡" label="Total Listed" value="25 kWh" sub="Available now" color="#3b82f6"/>
        <KpiCard icon="💵" label="Avg Price" value="$0.088" sub="per kWh" color="#f59e0b"/>
        <KpiCard icon="🤖" label="Auto-Sell" value={autoSell?"Active":"Off"} sub={autoSell?"Selling automatically":"Manual mode"} color={autoSell?"#10b981":"#6b7280"}/>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Btn variant={autoSell?"green":"outline"} onClick={()=>setAutoSell(a=>!a)}>{autoSell?"🤖 Auto-Sell ON":"🤖 Auto-Sell OFF"}</Btn>
        <Btn variant={paused?"amber":"outline"} onClick={()=>setPaused(p=>!p)}>{paused?"▶ Resume Selling":"⏸ Pause All"}</Btn>
        <Btn variant="outline" onClick={()=>setModal("minprice")}>🔒 Set Min Price</Btn>
        <Btn variant="outline" onClick={()=>setModal("autosell")}>⚙️ Auto-Sell Rules</Btn>
      </div>
      <div style={S.chartBox}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["kWh","Price Type","Min Price","Window","Status","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {listings.map((l,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,fontWeight:700,color:"#111827"}}>{l.kwh} kWh</td>
                <td style={S.td}><Badge s={l.type==="Dynamic"?"Active":"Confirmed"}/></td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#10b981"}}>${l.price}/kWh</td>
                <td style={{...S.td,color:"#6b7280"}}>{l.window}</td>
                <td style={S.td}><Badge s="Active"/></td>
                <td style={S.td}>
                  <div style={{display:"flex",gap:6}}>
                    <Btn variant="blue" small>Edit</Btn>
                    <Btn variant="danger" small>Cancel</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrap>
  );
}

function PageBids({setModal}){
  const [bidModal,setBidModal]=useState(null);
  return(
    <PageWrap title="Incoming Bids" subtitle="Buyer requests waiting for your response">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="📥" label="New Bids" value="2" sub="Needs response" color="#8b5cf6"/>
        <KpiCard icon="⏳" label="Pending" value="1" sub="Awaiting confirmation" color="#f59e0b"/>
        <KpiCard icon="💬" label="Countered" value="1" sub="Buyer reviewing" color="#3b82f6"/>
        <KpiCard icon="✅" label="Accepted Today" value="3" sub="34.5 kWh sold" color="#10b981"/>
      </div>
      <div style={S.chartBox}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:700,color:"#111827",fontSize:14}}>All Bids
            <span style={{marginLeft:8,background:"#ede9fe",color:"#7c3aed",borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:600}}>4 incoming</span>
          </div>
          <Btn variant="outline" small>Filter</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Buyer","kWh","Offered Price","Est. Value","Time","Status","Action"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {bids.map((b,i)=>(
              <tr key={i} className="trow" style={{cursor:"pointer"}} onClick={()=>setBidModal(b)}>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{b.addr}</td>
                <td style={{...S.td,fontWeight:600}}>{b.kwh} kWh</td>
                <td style={{...S.td,color:"#10b981",fontFamily:"'Space Mono',monospace",fontSize:12}}>${b.offer}/kWh</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f59e0b"}}>${(b.kwh*b.offer).toFixed(3)}</td>
                <td style={{...S.td,color:"#9ca3af"}}>{b.time}</td>
                <td style={S.td}><Badge s={b.status}/></td>
                <td style={S.td} onClick={e=>e.stopPropagation()}>
                  <div style={{display:"flex",gap:5}}>
                    <Btn variant="green" small onClick={()=>setBidModal(b)}>Accept</Btn>
                    <Btn variant="danger" small>Reject</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bidModal&&(
        <Modal title="📥 Review Bid" onClose={()=>setBidModal(null)}>
          <div style={{background:"#f9fafb",borderRadius:10,padding:14,marginBottom:16}}>
            {[["Buyer",bidModal.addr],["Requested",`${bidModal.kwh} kWh`],["Offered Price",`$${bidModal.offer}/kWh`],["Total Value",`$${(bidModal.kwh*bidModal.offer).toFixed(3)}`],["Submitted",bidModal.time]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #e5e7eb",fontSize:13}}>
                <span style={{color:"#6b7280",fontWeight:500}}>{k}</span>
                <span style={{color:"#111827",fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="green" full onClick={()=>setBidModal(null)}>✅ Accept Bid</Btn>
            <Btn variant="outline" full onClick={()=>setBidModal(null)}>🔄 Counter</Btn>
            <Btn variant="danger" full onClick={()=>setBidModal(null)}>❌ Reject</Btn>
          </div>
        </Modal>
      )}
    </PageWrap>
  );
}

function PageTradeHistory(){
  return(
    <PageWrap title="Trade History" subtitle="All completed and pending energy trades">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="✅" label="Confirmed" value="3" sub="This week" color="#10b981"/>
        <KpiCard icon="⏳" label="Pending" value="1" sub="Awaiting settlement" color="#f59e0b"/>
        <KpiCard icon="📤" label="Total Sold" value="23 kWh" sub="This week" color="#3b82f6"/>
        <KpiCard icon="💰" label="Revenue" value="$204.40" sub="This week" color="#10b981"/>
      </div>
      <div style={S.chartBox}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <input placeholder="Search trades…" style={{background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"8px 14px",fontSize:13,outline:"none",width:220}}/>
          <Btn variant="outline" small>Export CSV</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Date","Buyer","kWh Sold","Price/kWh","Total Credits","Status","TX Hash"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {trades.map((r,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,color:"#6b7280"}}>{r.date}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b7280"}}>{r.buyer}</td>
                <td style={{...S.td,fontWeight:600}}>{r.kwh} kWh</td>
                <td style={{...S.td,color:"#10b981",fontFamily:"'Space Mono',monospace",fontSize:12}}>${r.price}</td>
                <td style={{...S.td,color:"#f59e0b",fontFamily:"'Space Mono',monospace",fontSize:12}}>{r.credits} TKN</td>
                <td style={S.td}><Badge s={r.status}/></td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#9ca3af"}}>{r.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrap>
  );
}

function PageDevices({setModal}){
  return(
    <PageWrap title="Devices & Meters" subtitle="Manage your energy generation devices" action={<Btn onClick={()=>setModal("device")}>+ Register Device</Btn>}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="⚡" label="Active Devices" value="2" sub="Producing now" color="#10b981"/>
        <KpiCard icon="🔋" label="Charging" value="1" sub="Battery Bank 1" color="#3b82f6"/>
        <KpiCard icon="❌" label="Offline" value="1" sub="Wind Unit 1" color="#ef4444"/>
        <KpiCard icon="📡" label="Total Capacity" value="12 kW" sub="Registered capacity" color="#8b5cf6"/>
      </div>
      <div style={S.chartBox}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr>{["Device","Type","Capacity","Output","Status","Last Sync","Action"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {devices.map((d,i)=>(
              <tr key={i} className="trow">
                <td style={{...S.td,fontWeight:700,color:"#111827"}}>{d.name}</td>
                <td style={S.td}><span style={{color:"#6b7280"}}>{d.type}</span></td>
                <td style={{...S.td,color:"#6b7280"}}>{d.capacity}</td>
                <td style={{...S.td,fontFamily:"'Space Mono',monospace",fontSize:12,color:"#10b981"}}>{d.output}</td>
                <td style={S.td}><Badge s={d.status}/></td>
                <td style={{...S.td,color:"#9ca3af"}}>{d.sync}</td>
                <td style={S.td}><Btn variant="blue" small>Configure</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrap>
  );
}

function PageWallet({setModal}){
  return(
    <PageWrap title="Credits & Wallet" subtitle="Manage your earnings and token balance">
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <KpiCard icon="💳" label="Credit Balance" value="892 TKN" sub="≈ $78.50" color="#10b981"/>
        <KpiCard icon="💵" label="Revenue MTD" value="$74.10" sub="↑ 12% vs last month" color="#10b981"/>
        <KpiCard icon="📤" label="Withdrawn MTD" value="$42.00" sub="2 transactions" color="#3b82f6"/>
        <KpiCard icon="⏳" label="Pending Settlement" value="$12.30" sub="2 trades settling" color="#f59e0b"/>
      </div>
      <div style={{display:"flex",gap:14,marginBottom:20}}>
        <Btn onClick={()=>setModal("withdraw")}>💸 Withdraw Earnings</Btn>
        <Btn variant="outline">📋 Transaction History</Btn>
        <Btn variant="outline">📥 Export Statement</Btn>
      </div>
      <div style={{...S.chartBox}}>
        <div style={S.chartLabel}>💳 Credit Accumulation (14 days)</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={creditAccum}>
            <XAxis dataKey="d" tick={{fontSize:11,fill:"#9ca3af"}}/>
            <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
            <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
            <Line type="monotone" dataKey="tkn" stroke="#10b981" strokeWidth={2.5} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </PageWrap>
  );
}

function PageAnalytics(){
  return(
    <PageWrap title="Analytics" subtitle="Production, earnings, and market performance">
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📤 Energy Injected to Grid (kWh/day)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={gridInjected}>
              <XAxis dataKey="d" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="kwh" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>💵 Monthly Earnings ($)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={earningsData}>
              <XAxis dataKey="m" tick={{fontSize:11,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Bar dataKey="usd" fill="#f59e0b" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>📊 My Price vs Market ($/kWh)</div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={myPriceVsMarket}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:"#9ca3af"}}/>
              <YAxis tick={{fontSize:10,fill:"#9ca3af"}} domain={["auto","auto"]}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
              <Line type="monotone" dataKey="mine" stroke="#10b981" strokeWidth={2} dot={false} name="My Price"/>
              <Line type="monotone" dataKey="market" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="4 2" name="Market"/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:14,marginTop:6}}>
            {[["#10b981","My Price"],["#3b82f6","Market"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#6b7280"}}>
                <div style={{width:14,height:2,background:c,borderRadius:2}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{...S.chartBox,flex:1}}>
          <div style={S.chartLabel}>🔥 Buyer Demand Heatmap</div>
          <div style={{fontSize:9,color:"#9ca3af",marginBottom:6,display:"flex",gap:2}}>
            {heatmapHours.map(h=><div key={h} style={{width:15,textAlign:"center"}}>{h}</div>)}
          </div>
          {heatmap.map((row,di)=>(
            <div key={di} style={{display:"flex",alignItems:"center",gap:2,marginBottom:2}}>
              <div style={{fontSize:9,color:"#9ca3af",width:24}}>{heatmapDays[di]}</div>
              {row.map((v,hi)=>(
                <div key={hi} style={{width:15,height:11,borderRadius:2,background:`rgba(16,185,129,${v/10})`}} title={`${heatmapDays[di]} ${heatmapHours[hi]}: ${v}`}/>
              ))}
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:9,color:"#9ca3af"}}>
            <span>Low demand</span><span>High demand</span>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}

// function PageCarbon(){
//   return(
//     <PageWrap title="Carbon Credits" subtitle="Your verified green energy contributions">
//       <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
//         <KpiCard icon="🌱" label="Total Credits" value="34 CCR" sub="Lifetime earned" color="#10b981"/>
//         <KpiCard icon="✅" label="Verified" value="28 CCR" sub="On-chain confirmed" color="#10b981"/>
//         <KpiCard icon="⏳" label="Pending" value="6 CCR" sub="Awaiting verification" color="#f59e0b"/>
//         <KpiCard icon="♻️" label="CO₂ Offset" value="0.34 T" sub="Equivalent tonnes" color="#10b981"/>
//       </div>
//       <div style={{display:"flex",gap:14}}>
//         <div style={{...S.chartBox,flex:1}}>
//           <div style={S.chartLabel}>🌱 Carbon Credits Earned (CCR/month)</div>
//           <ResponsiveContainer width="100%" height={180}>
//             <BarChart data={carbonData}>
//               <XAxis dataKey="month" tick={{fontSize:11,fill:"#9ca3af"}}/>
//               <YAxis tick={{fontSize:11,fill:"#9ca3af"}}/>
//               <Tooltip contentStyle={{background:"#fff",border:"1px solid #e5e7eb",fontSize:12}}/>
//               <Bar dataKey="ccr" fill="#10b981" radius={[4,4,0,0]}/>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div style={{...S.chartBox,flex:1}}>
//           <div style={{fontWeight:600,color:"#111827",marginBottom:14}}>Credit History</div>
//           {[
//             {date:"2026-03-08",kwh:55,ccr:5,status:"Verified"},
//             {date:"2026-02-28",kwh:80,ccr:8,status:"Verified"},
//             {date:"2026-02-15",kwh:60,ccr:6,status:"Pending"},
//           ].map((r,i)=>(
//             <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
//               <div>
//                 <div style={{fontSize:13,fontWeight:600,color:"#111827"}}>{r.ccr} CCR</div>
//                 <div style={{fontSize:11,color:"#9ca3af"}}>{r.date} · {r.kwh} kWh contributed</div>
//               </div>
//               <Badge s={r.status==="Verified"?"Confirmed":"Pending"}/>
//             </div>
//           ))}
//           <div style={{marginTop:14}}>
//             <Btn variant="green" onClick={()=>alert("Credits Claimed!")}>🌱 Claim Pending Credits</Btn>
//           </div>
//         </div>
//       </div>
//     </PageWrap>
//   );
// }

function PageSettings({setModal,autoSell,setAutoSell,paused,setPaused}){
  return(
    <PageWrap title="Settings" subtitle="Configure your selling preferences">
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>🤖 Auto-Sell Configuration</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Automatically sell surplus energy based on rules you set</div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,padding:"10px 14px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
            <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>Auto-Sell</span>
            <button onClick={()=>setAutoSell(a=>!a)} style={{background:autoSell?"#10b981":"#e5e7eb",border:"none",borderRadius:20,width:44,height:24,cursor:"pointer",position:"relative",transition:"background 0.2s"}}>
              <div style={{position:"absolute",top:3,left:autoSell?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
            </button>
          </div>
          <Btn variant="outline" onClick={()=>setModal("autosell")}>Edit Auto-Sell Rules</Btn>
        </div>
        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>🔒 Pricing Controls</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Set minimum price floors for your energy listings</div>
          <div style={{display:"grid",gap:8,marginBottom:14}}>
            {[["Min Price Floor","$0.080/kWh"],["Current Market","$0.091/kWh"],["Your Avg Price","$0.089/kWh"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:"#f9fafb",borderRadius:8,border:"1px solid #e5e7eb"}}>
                <span style={{fontSize:12,color:"#6b7280"}}>{l}</span>
                <span style={{fontSize:12,fontWeight:700,color:"#111827",fontFamily:"'Space Mono',monospace"}}>{v}</span>
              </div>
            ))}
          </div>
          <Btn variant="outline" onClick={()=>setModal("minprice")}>Edit Price Floor</Btn>
        </div>
        <div style={{...S.chartBox,flex:1,minWidth:280}}>
          <div style={{fontWeight:700,color:"#111827",marginBottom:4}}>⏸ Selling Control</div>
          <div style={{color:"#6b7280",fontSize:12,marginBottom:16}}>Pause or resume all active listings instantly</div>
          <div style={{padding:"12px 14px",background:paused?"#fff5f5":"#f0fdf4",borderRadius:8,border:`1px solid ${paused?"#fca5a5":"#6ee7b7"}`,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,color:paused?"#ef4444":"#059669"}}>{paused?"⏸ Selling is PAUSED":"▶ Selling is ACTIVE"}</div>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{paused?"All listings hidden from buyers":"Listings visible to all buyers"}</div>
          </div>
          <Btn variant={paused?"green":"danger"} onClick={()=>setPaused(p=>!p)}>{paused?"▶ Resume Selling":"⏸ Pause All Listings"}</Btn>
        </div>
      </div>
    </PageWrap>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export default function ProducerDashboard(){
  const [tab,setTab]=useState("Dashboard");
  const [modal,setModal]=useState(null);
  const [autoSell,setAutoSell]=useState(true);
  const [paused,setPaused]=useState(false);
  const [ticker,setTicker]=useState(0.0912);
  const [output,setOutput]=useState(7.9);
  const [notif,setNotif]=useState(5);

  useEffect(()=>{
    const id=setInterval(()=>{
      setTicker(t=>+(t+(Math.random()-0.5)*0.0004).toFixed(4));
      setOutput(o=>+(o+(Math.random()-0.5)*0.3).toFixed(1));
    },2000);
    return()=>clearInterval(id);
  },[]);

  const nav=[
    {icon:"🏠",label:"Dashboard"},
    {icon:"⚡",label:"My Listings"},
    {icon:"📥",label:"Incoming Bids",badge:4,badgeColor:"#ef4444"},
    {icon:"🔄",label:"Trade History"},
    {icon:"🔋",label:"Devices & Meters"},
    {icon:"💳",label:"Credits & Wallet"},
    {icon:"📊",label:"Analytics"},
    // {icon:"🌱",label:"Carbon Credits"},
    {icon:"⚙️",label:"Settings"},
  ];

  const renderPage=()=>{
    const props={setModal,autoSell,setAutoSell,paused,setPaused,output,ticker};
    if(tab==="Dashboard") return <PageDashboard {...props}/>;
    if(tab==="My Listings") return <PageListings {...props}/>;
    if(tab==="Incoming Bids") return <PageBids {...props}/>;
    if(tab==="Trade History") return <PageTradeHistory/>;
    if(tab==="Devices & Meters") return <PageDevices setModal={setModal}/>;
    if(tab==="Credits & Wallet") return <PageWallet setModal={setModal}/>;
    if(tab==="Analytics") return <PageAnalytics/>;
    // if(tab==="Carbon Credits") return <PageCarbon/>;
    if(tab==="Settings") return <PageSettings {...props}/>;
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
            <div style={{width:32,height:32,background:"#10b981",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚡</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:"#111827"}}>DECT</div>
              <div style={{fontSize:10,color:"#9ca3af"}}>Producer Portal</div>
            </div>
          </div>
          <div style={{marginTop:12,background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:8,padding:"8px 12px",display:"flex",alignItems:"center",gap:7}}>
            <span style={{fontSize:14}}>🏭</span>
            <div>
              <div style={{color:"#059669",fontSize:11,fontWeight:700}}>Verified Producer</div>
              <div style={{color:"#9ca3af",fontSize:10}}>0x9bC…7f41</div>
            </div>
          </div>
        </div>

        <div style={{flex:1,padding:"12px 10px",overflowY:"auto"}}>
          {nav.map(n=>{
            const active=tab===n.label;
            return(
              <div key={n.label} className="nav-item" onClick={()=>setTab(n.label)}
                style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,cursor:"pointer",marginBottom:2,
                  background:active?"#f0fdf4":"transparent",
                  color:active?"#059669":"#6b7280",
                  fontWeight:active?700:400,fontSize:13,transition:"all 0.1s",
                  borderLeft:active?"3px solid #10b981":"3px solid transparent"}}>
                <span style={{fontSize:14}}>{n.icon}</span>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge&&<span style={{background:n.badgeColor,color:"#fff",borderRadius:20,padding:"1px 7px",fontSize:10,fontWeight:700}}>{n.badge}</span>}
              </div>
            );
          })}
        </div>

        <div style={{padding:"12px 16px",borderTop:"1px solid #e5e7eb"}}>
          <div style={{background:"#f9fafb",borderRadius:10,padding:"10px 12px",border:"1px solid #e5e7eb"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <div className="blink" style={{width:7,height:7,borderRadius:"50%",background:"#10b981"}}/>
              <span style={{color:"#10b981",fontSize:11,fontWeight:600,fontFamily:"'Space Mono',monospace"}}>{output} kW live</span>
            </div>
            <div style={{color:"#9ca3af",fontSize:10}}>Arbitrum · Connected</div>
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
            {paused&&<span style={{background:"#fef3c7",border:"1px solid #fcd34d",color:"#d97706",borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:600,marginLeft:6}}>⏸ Selling Paused</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{display:"flex",gap:8}}>
              <div style={{background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:7,padding:"4px 12px",display:"flex",gap:6,alignItems:"center"}}>
                <div className="blink" style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#059669",fontWeight:700}}>{output} kW</span>
              </div>
              <div style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:7,padding:"4px 12px"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#f59e0b",fontWeight:700}}>${ticker}/kWh</span>
              </div>
            </div>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setNotif(0)}>
              <span style={{fontSize:18}}>🔔</span>
              {notif>0&&<div style={{position:"absolute",top:-3,right:-3,background:"#ef4444",borderRadius:"50%",width:15,height:15,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>{notif}</div>}
            </div>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#10b981,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer"}}>P</div>
          </div>
        </div>

        {/* Page */}
        <div style={{flex:1,overflow:"auto",padding:24}}>
          {renderPage()}
        </div>
      </div>

      {/* Global Modals */}
      {modal==="list"&&(
        <Modal title="📋 List Energy for Sale" onClose={()=>setModal(null)}>
          <Field label="Amount (kWh)" placeholder="e.g. 8.0"/>
          <Field label="Price Type">
            <select style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",fontSize:13,outline:"none"}}>
              <option>Dynamic (follows market)</option><option>Fixed Price</option>
            </select>
          </Field>
          <Field label="Min Price ($/kWh)" placeholder="e.g. 0.085" type="number"/>
          <Field label="Availability Window (hours)" placeholder="e.g. 6" type="number"/>
          <Btn full onClick={()=>setModal(null)}>Post Listing</Btn>
        </Modal>
      )}
      {modal==="autosell"&&(
        <Modal title="🤖 Auto-Sell Rules" onClose={()=>setModal(null)}>
          <Field label="Sell when battery above (%)" placeholder="e.g. 80"/>
          <Field label="Min Acceptable Price ($/kWh)" placeholder="e.g. 0.082" type="number"/>
          <Field label="Max kWh per Auto-Sell" placeholder="e.g. 10" type="number"/>
          <Field label="Active Time Window" placeholder="e.g. 08:00 – 20:00"/>
          <Btn full onClick={()=>{setAutoSell(a=>!a);setModal(null);}}>Save Rules</Btn>
        </Modal>
      )}
      {modal==="minprice"&&(
        <Modal title="🔒 Set Minimum Price Floor" onClose={()=>setModal(null)}>
          <Field label="Min Price ($/kWh)" placeholder="e.g. 0.080" type="number"/>
          <div style={{background:"#f0fdf4",border:"1px solid #6ee7b7",borderRadius:8,padding:10,marginBottom:14,fontSize:12,color:"#059669"}}>
            Current market floor: <strong style={{fontFamily:"'Space Mono',monospace"}}>$0.079/kWh</strong>
          </div>
          <Btn full onClick={()=>setModal(null)}>Set Floor Price</Btn>
        </Modal>
      )}
      {modal==="withdraw"&&(
        <Modal title="💸 Withdraw Earnings" onClose={()=>setModal(null)}>
          <Field label="Amount (TKN)" placeholder="e.g. 200" type="number"/>
          <Field label="Destination Wallet" placeholder="0x…"/>
          <Btn full onClick={()=>setModal(null)}>Withdraw Now</Btn>
        </Modal>
      )}
      {modal==="device"&&(
        <Modal title="➕ Register New Device" onClose={()=>setModal(null)}>
          <Field label="Device Type">
            <select style={{width:"100%",background:"#f9fafb",border:"1px solid #d1d5db",borderRadius:8,padding:"9px 12px",fontSize:13,outline:"none"}}>
              <option>Solar Panel</option><option>Wind Turbine</option><option>Battery Storage</option>
            </select>
          </Field>
          <Field label="Device Name" placeholder="e.g. Solar Panel C"/>
          <Field label="Capacity (kW)" placeholder="e.g. 5" type="number"/>
          <Field label="Smart Meter ID" placeholder="e.g. SM-00492"/>
          <Btn full onClick={()=>setModal(null)}>Register Device</Btn>
        </Modal>
      )}
    </div>
  );
}