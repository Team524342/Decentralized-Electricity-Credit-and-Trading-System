import React from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import "../assets/enhanced-footer.css";

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="enhanced-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <Zap size={20} />
              <span>RTDECTS</span>
            </div>
            <p className="footer-description">
              Real-Time Decentralized Electricity Credit & Trading System powered by blockchain technology.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="social-link" title="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/marketplace">Marketplace</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div className="footer-section">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#security">Security</a>
              </li>
              <li>
                <a href="#roadmap">Roadmap</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <span>support@rtdects.com</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Energy St, Tech City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} RTDECTS. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
