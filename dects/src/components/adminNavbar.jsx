import React from "react";
import "../assets/adminPanal.css";

const AdminNavbar = () => {
    return  (
        <div className="navbar">
            <h3 className="navbar-title">Admin Dashboard</h3>
            <div className="navbar-right">
                <button className="logout-btn">Logut</button>
            </div>
        </div>
    );
}

export default AdminNavbar;