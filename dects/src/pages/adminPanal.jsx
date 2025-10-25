import React from "react";
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/adminNavbar";

import "../assets/adminPanal.css";
import { Link } from "react-router-dom";

const AdminPanal = () => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content-area">
                     <p>Welcome to the Admin Panel</p>
                </div>
                <Link to="/consumer">Go to consumer</Link>
            </div>
        </div>
    );
}

export default AdminPanal;
