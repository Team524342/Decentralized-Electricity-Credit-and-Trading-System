import React, { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap, LogOut, Home, ShoppingCart, Info, Mail } from "lucide-react";
import "../assets/enhanced-navbar.css";

/**
 * Enhanced Navigation Bar Component
 * Responsive navbar with mobile menu, user info, and role-based navigation
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object with name and role
 * @param {Function} props.onLogout - Logout callback function
 * @returns {React.ReactElement} Navigation bar
 */
const EnhancedNavbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  const navItems = [
    { label: "Home", path: "/home", icon: Home },
    { label: "Marketplace", path: "/marketplace", icon: ShoppingCart },
    { label: "Dashboard", path: user?.role === "producer" ? "/producer" : "/consumer", icon: null },
    { label: "About", path: "/about", icon: Info },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
    setIsOpen(false);
  }, [onLogout, navigate]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="enhanced-navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link 
          to="/" 
          className="navbar-logo"
          onClick={closeMobileMenu}
          aria-label="RTDECTS Home"
        >
          <Zap size={24} className="logo-icon" />
          <span className="logo-text">RTDECTS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-items">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="user-section">
              <div className="user-info">
                <span className="user-name">{user.name || "User"}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="logout-btn"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu" role="navigation" aria-label="Mobile menu">
            <ul className="mobile-nav-items">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${isActive(item.path) ? "active" : ""}`}
                    onClick={closeMobileMenu}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {user ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <p className="mobile-user-name">{user.name || "User"}</p>
                  <p className="mobile-user-role">{user.role}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="mobile-logout-btn"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="mobile-signup-btn" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
