import React from "react";
import { Link } from "react-router-dom";
import { Zap, TrendingUp, Shield, Zap as Bolt, BarChart3, Globe } from "lucide-react";
import "../assets/home.css";

function Home() {
  const features = [
    {
      icon: <Shield size={28} />,
      title: "Blockchain Security",
      description: "All transactions secured by smart contracts ensuring transparency and immutability"
    },
    {
      icon: <Bolt size={28} />,
      title: "AI-Powered Pricing",
      description: "Dynamic pricing algorithms for fair and real-time energy token valuation"
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Decentralized Trading",
      description: "Peer-to-peer marketplace for ETK token trading without intermediaries"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with live energy data and performance metrics"
    }
  ];

  const objectives = [
    "Transparent and decentralized energy trading ecosystem",
    "Monetize surplus renewable energy using blockchain tokens",
    "Direct producer-to-consumer energy transactions",
    "Government monitoring and compliance automation",
    "AI-based dynamic pricing system"
  ];

  const techStack = [
    { category: "Frontend", tech: "React.js, Tailwind CSS" },
    { category: "Backend", tech: "Django, Python, Node.js" },
    { category: "Blockchain", tech: "Ethereum, Solidity" },
    { category: "Database", tech: "SQLite, PostgreSQL" },
    { category: "AI/ML", tech: "Python, TensorFlow" }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">Welcome to the Future of Energy</div>
              <h1 className="hero-title">
                <span className="gradient-text">Decentralized Electricity</span> Trading System
              </h1>
              <p className="hero-description">
                Real-Time Decentralized Electricity Credit & Trading System (RTDECTS) – transforming renewable energy trading with blockchain technology, AI-powered pricing, and transparent transactions.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/about" className="btn btn-secondary btn-lg">
                  Learn More
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">10K+</div>
                  <div className="stat-label">Users</div>
                </div>
                <div className="stat">
                  <div className="stat-value">500M</div>
                  <div className="stat-label">Energy Tokens Traded</div>
                </div>
                <div className="stat">
                  <div className="stat-value">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-card">
                <div className="card-icon">
                  <Zap size={40} />
                </div>
                <h3>Clean Energy Trading</h3>
                <p>Trade renewable energy tokens securely</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose RTDECTS?</h2>
          <p className="section-subtitle">Key advantages of our decentralized platform</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Producers Generate</h3>
              <p>Renewable energy producers generate clean power and mint Energy Tokens (ETK)</p>
            </div>
            <div className="arrow">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Smart Contract Trading</h3>
              <p>Tokens are securely traded through blockchain smart contracts</p>
            </div>
            <div className="arrow">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Consumers Purchase</h3>
              <p>Consumers buy tokens to offset their energy consumption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="objectives-section section-dark">
        <div className="container">
          <h2 className="section-title">Project Objectives</h2>
          <div className="objectives-grid">
            {objectives.map((objective, index) => (
              <div key={index} className="objective-item">
                <div className="objective-icon">
                  <Zap size={20} />
                </div>
                <p>{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="tech-stack-section">
        <div className="container">
          <h2 className="section-title">Technology Stack</h2>
          <p className="section-subtitle">Built with cutting-edge technologies</p>
          <div className="tech-grid">
            {techStack.map((item, index) => (
              <div key={index} className="tech-card">
                <h4 className="tech-category">{item.category}</h4>
                <p className="tech-list">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section section-dark">
        <div className="container">
          <h2 className="section-title">Environmental Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon green">🌱</div>
              <h3>Promote Green Energy</h3>
              <p>Encourage renewable energy generation and reduce carbon footprint</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon blue">💧</div>
              <h3>Reduce Waste</h3>
              <p>Minimize energy waste through fair and dynamic pricing</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon purple">🔐</div>
              <h3>User Control</h3>
              <p>Give users complete control over their energy data</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon yellow">✓</div>
              <h3>Full Transparency</h3>
              <p>Ensure accountability with blockchain security</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join the Energy Revolution?</h2>
            <p>Start trading renewable energy tokens today</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Account
              </Link>
              <Link to="/marketplace" className="btn btn-secondary btn-lg">
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

