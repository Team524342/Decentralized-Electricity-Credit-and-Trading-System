import React from "react";
import "../assets/adminPanal.css";

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <h2 className="sidebar-title">Admin Panel</h2>
            <ul className="sidebar-menu">
                <li>Dashboard</li>
                <li>Manage User</li>
                <li>Settings</li>
                <li>Reports</li>
            </ul>
        </div>
    );
}

export default AdminSidebar;
