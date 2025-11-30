// E:\Decentralized-Electricity-Credit-and-Trading-System\dects\src\pages\adminPanal.jsx
import React,{ useState } from "react";
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/adminNavbar";
import "../assets/adminPanal.css";
import { Link } from "react-router-dom";
import AdminCard from "../components/adminCard";
import { Users, TrendingUp, DollarSign, Zap } from 'lucide-react';
import ProfileC from "../components/ProfileC";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const priceData = [
  { name: "Jan", price: 400 },
  { name: "Feb", price: 300 },
  { name: "Mar", price: 500 },
    { name: "Apr", price: 200 },
    { name: "May", price: 278 },
    { name: "Jun", price: 189 },
    { name: "Jul", price: 239 },
    { name: "Aug", price: 349 },
    { name: "Sep", price: 450 },
];

function Overview() {
  return (
    <div>
      <h2>Overview</h2>
      <p>Overview stats...</p>

      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Real-Time Energy Pricing
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
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

function Pricing(){ return <div><h2>Pricing</h2><p>Form goes here</p></div>; }
function History(){ return <div><h2>Transaction History</h2><p>List of transactions</p></div>; }
function Trading(){ return <div><h2>Trading Status</h2><p>Track active tickets</p></div>; }
function UsersBoard(){ return <div><h2>Users Board</h2></div>; }
function Reports(){ return <div><h2>Reports</h2></div>; }
function Profile(){ 
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div>
      <h2>Profile</h2>
      <ProfileC email={email} role={role} />
    </div>

  );
}
function Settings(){ return <div><h2>Settings</h2></div>; }
function Help(){ return <div><h2>Help</h2></div>; }

const pageMap = {
  Overview: <Overview/>,
  pricing: <Pricing/>,
  history: <History/>,
  trading: <Trading/>,
  usersBoard: <UsersBoard/>,
  reports: <Reports/>,
  profile: <Profile/>,
  settings: <Settings/>,
  help: <Help/>
};

const AdminPanal = () => {
    const [active, setActive] = useState("Overview");
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <Sidebar
             active={active}
             setActive={setActive}
             collapsed={collapsed}
             setCollapsed={setCollapsed}
             role="admin" // change to "admin" to show all tabs 
            />
            <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
                <Navbar />
                <div className="content-area">
                     <p>Welcome to the Admin Panel</p>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <AdminCard icon={Users} title="Active Users" value="1,245" trend="+12% this month" color="#3B82F6" />
                        <AdminCard icon={Zap} title="Total Energy Traded" value="40341 kWh" trend="+5% this month" color="#e78061ff" />
                        <AdminCard icon={TrendingUp} title="Total Transactions" value="5,678" trend="+8% this month" color="#10B981" />
                        <AdminCard icon={DollarSign} title="Average price" value="2" trend="2 /KWh" color="#dfd817fb" />
                     </div>

                     <main style={{ marginTop: 30 }}>
                        {/* <header style={{ marginBottom:18 }}> */}
                        <h1 style={{ marginBottom:12 }}>{active.charAt(0).toUpperCase() + active.slice(1)}</h1>
                        {/* </header> */}

                        <section style={{ background:"#fff", padding:20, borderRadius:8, boxShadow:"0 6px 18px rgba(2,6,23,0.06)" }}>
                        {pageMap[active] || <div>Not found</div>}
                        <div style={{ height: "1200px" }}>
                            Scroll to test sidebar – it stays fixed 🎯
                        </div>
                        </section>
                     </main>
                </div>
                <Link to="/consumer">Go to consumer</Link>
            </div>
        </div>
    );
}

export default AdminPanal;
