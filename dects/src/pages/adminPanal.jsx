import React from "react";
import { Users, TrendingUp, DollarSign, BoltIcon, Bolt, Bold, Zap } from 'lucide-react';
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/adminNavbar";

import "../assets/adminPanal.css";
import { Link } from "react-router-dom";
import AdminCard from "../components/adminCard";

const AdminPanal = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content-area">
                     <p>Welcome to the Admin Panel</p>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <AdminCard icon={Users} title="Active Users" value="1,245" trend="+12% this month" color="#3B82F6" />
                        <AdminCard icon={Zap} title="Total Energy Traded" value="40341 kWh" trend="+5% this month" color="#e78061ff" />
                        <AdminCard icon={TrendingUp} title="Total Transactions" value="5,678" trend="+8% this month" color="#10B981" />
                        <AdminCard icon={DollarSign} title="Average price" value="2" trend="2 /KWh" color="#dfd817fb" />
                     </div>
                </div>
                <Link to="/consumer">Go to consumer</Link>
            </div>
        </div>
    );
}

export default AdminPanal;
