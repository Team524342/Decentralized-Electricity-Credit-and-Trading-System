import React,{ useState } from "react";
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/adminNavbar";
import "../assets/adminPanal.css";
import { Link } from "react-router-dom";
import AdminCard from "../components/adminCard";
import { Users, TrendingUp, DollarSign, Zap } from 'lucide-react';

function Overview(){ return <div><h2>Overview</h2><p>Overview stats...</p></div>; }
function FileComplaint(){ return <div><h2>File Complaint</h2><p>Form goes here</p></div>; }
function History(){ return <div><h2>Complaint History</h2><p>List of complaints</p></div>; }
function Track(){ return <div><h2>Track Status</h2><p>Track active tickets</p></div>; }
function Technician(){ return <div><h2>Technician Board</h2></div>; }
function Reports(){ return <div><h2>Reports</h2></div>; }
function Profile(){ return <div><h2>Profile</h2></div>; }
function Settings(){ return <div><h2>Settings</h2></div>; }
function Help(){ return <div><h2>Help</h2></div>; }

const pageMap = {
  Overview: <Overview/>,
  file: <FileComplaint/>,
  history: <History/>,
  track: <Track/>,
  technician: <Technician/>,
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
