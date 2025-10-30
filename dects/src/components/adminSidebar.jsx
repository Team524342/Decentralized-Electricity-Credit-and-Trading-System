import React from "react";
import "../assets/adminPanal.css";
import {
  Home,
  Plus,
  List,
  Map,
  Wrench,
  BarChart2,
  User,
  Settings,
  HelpCircle
} from "lucide-react";

const tabs = [
    { id: "Overview", label: "Overview", icon: Home },
    { id: "file", label: "File Complaint", icon: Plus },
    { id: "history", label: "Complaint History", icon: List },
    { id: "track", label: "Track Status", icon: Map },
    { id: "treading", label: "Treading", icon: Wrench },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
];

export default function Sidebar({ active, setActive, collapsed, setCollapsed, role = 'admin' }) {
    // Normalize role to known values
    const r = (role || 'admin').toString().toLowerCase();

    const visibleTabs = tabs.filter(t => {
        // Admin sees all tabs
        if (r === 'admin') return true;

        // Producer: hide filing/history/track features
        if (r === 'producer') return !["file", "history", "track", "manage"].includes(t.id);

        // Consumer: hide technician/trading/report management
        if (r === 'consumer') return !["treading", "reports", "manage"].includes(t.id);

        return true;
    });

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Main sidebar">
            <div className="sidebar-top">
             <div className="brand" onClick={() => { setActive("Overview"); }}>
              <div className="brand-logo">⚡</div>
              <span className="brand-text">Electro</span>
             </div>

             <button className="collapse-btn" onClick={() => setCollapsed  (!collapsed)} aria-label="Toggle sidebar">
                {collapsed ? "→" : "←" }
             </button>
            </div>

            <nav className="nav">
                {visibleTabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-item ${active === tab.id ? "active" : ""}`}
                    onClick={() => setActive(tab.id)}
                    aria-current={active === tab.id ? "page" : undefined}
                >
                    <tab.icon size={20} className="icon" />
                    <span className="nav-label">{tab.label}</span>
                </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <small className="version">v0.1</small>
            </div>
        </aside>
    );
}

// const AdminSidebar = () => {
//     return (
//         <div className="admin-sidebar">
//             <h2 className="sidebar-title">Admin Panel</h2>
//             <ul className="sidebar-menu">
//                 <li>Dashboard</li>
//                 <li>Manage User</li>
//                 <li>Settings</li>
//                 <li>Reports</li>
//             </ul>
//         </div>
//     );
// }

// export default AdminSidebar;
