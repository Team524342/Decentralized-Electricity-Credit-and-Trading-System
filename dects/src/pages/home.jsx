import React from "react";
import "../assets/index.css";

function Home() {
  return (
    <div className="page-container">
      {/* 🔷 Project Title */}
      <h1>⚡ Welcome to RTDECTS</h1>
      <p>
        <strong>Real-Time Decentralized Electricity Credit & Trading System (RTDECTS)</strong> 
        is an innovative blockchain-powered platform that ensures transparent, efficient, 
        and automated energy trading between Producers, Consumers, and Government authorities.
      </p>

      {/* 🌍 Project Overview */}
      <section style={{ marginTop: "40px" }}>
        <h3>🌐 Project Overview</h3>
        <p>
          The RTDECTS platform revolutionizes the way renewable energy is traded. 
          It introduces a digital token called <strong>Energy Token (ETK)</strong>, 
          representing one unit (kWh) of electricity generated from renewable sources. 
          Producers can mint ETK based on the energy they produce and trade it securely 
          through smart contracts, while consumers can purchase tokens to offset 
          their energy consumption.
        </p>
        { <img
          src="https://imgs.search.brave.com/e_sJgynficz6SPIrtpfF-oegcu9seEenAXsdrKkSW3c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lbXAu/bGJsLmdvdi9zaXRl/cy9kZWZhdWx0L2Zp/bGVzL3N0eWxlcy9n/cmlkX2l0ZW0vcHVi/bGljLzIwMjMtMTEv/RWZmaWNpZW5jeUVs/ZWN0cmlmaWNhdGlv/bkZsZXhpYmlsaXR5/LTEyNjI2MDU2MTJf/MC5qcGc_aXRvaz03/MHBZaTBBUA"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🎯 Objectives */}
      <section style={{ marginTop: "50px" }}>
        <h3>🎯 Project Objectives</h3>
        <ul>
          <li>To create a transparent and decentralized energy trading ecosystem.</li>
          <li>To enable producers to monetize surplus renewable energy using blockchain tokens.</li>
          <li>To allow consumers to buy clean energy directly from producers.</li>
          <li>To ensure government monitoring, subsidies, and compliance through smart contracts.</li>
          <li>To integrate AI-based dynamic pricing for fair energy token valuation.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/hugjLronSPZHzB3j0ZdGTDi4WLbY_J9rJrTXkP7vaiA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2xpZGVzaGFyZWNk/bi5jb20vc3NfdGh1/bWJuYWlscy9wb3dl/ci1tYXJrZXQtaW5k/aWEtMTQxMjA2MjEw/MjEzLWNvbnZlcnNp/b24tZ2F0ZTAxLXRo/dW1ibmFpbC5qcGc_/d2lkdGg9NTYwJmZp/dD1ib3VuZHM"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* ⚙️ System Architecture */}
      <section style={{ marginTop: "50px" }}>
        <h3>⚙️ System Architecture</h3>
        <p>
          The RTDECTS system is designed using a **three-layer architecture**:
        </p>
        <ul>
          <li><strong>1. Producer Layer:</strong> Generates renewable energy and mints ETK tokens.</li>
          <li><strong>2. Consumer Layer:</strong> Buys ETK tokens and manages energy usage.</li>
          <li><strong>3. Government Layer:</strong> Verifies transactions, monitors energy data, and provides incentives.</li>
        </ul>
        <img
          src="https://imgs.search.brave.com/dRZ1SQBmxGyhLVUCkAVFqA3AHv7LzEM3YQtMNCXl0_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQx/NjQxMjM2MC92ZWN0/b3IvdmlydHVhbC1w/b3dlci1wbGFudC1j/b25jZXB0LXZwcC0z/ZC1pbGx1c3RyYXRp/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVp6SkhqdVhG/OTZZNVhFQ3dIY2pE/bVIzaWJWXzAteFlw/d3pwUWl3a1oxQXM9"
          alt="System architecture diagram"
          style={{ width: "280px", marginTop: "25px" }}
        />
      </section>

      {/* 💡 Key Features */}
      <section style={{ marginTop: "50px" }}>
        <h3>💡 Key Features</h3>
        <ul>
          <li>Blockchain-secured token transactions for transparency.</li>
          <li>AI-powered dynamic pricing for fair and real-time value adjustments.</li>
          <li>Decentralized marketplace for ETK trading.</li>
          <li>Automated settlements and rewards via smart contracts.</li>
          <li>Role-based dashboards for Producers, Consumers, and Admin.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/U40Gs-0mZJRkREUpiH6hMEkFCT7GxzBCCNXl-22CUwM/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/ZWxlY3RyaWNhbGlu/ZGlhLmluL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzA3L2Vs/ZWN0cmljaXR5LTIx/OHgxNTAuanBn"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🧰 Technology Stack */}
      <section style={{ marginTop: "50px" }}>
        <h3>🧰 Technology Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React.js, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Blockchain:</strong> Ethereum Smart Contracts (Solidity)</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>AI Integration:</strong> Python (for price prediction and energy analytics)</li>
        </ul>
         { <img
          src="https://imgs.search.brave.com/Az-yJOi3MTwKvG0K4zNdjMXk2Kmy8Uwon0o7gJRoNrk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzVi/LzlhLzFiNWI5YTQz/NWM1ODliMjE0N2Uw/YzRlMWNlNzc1OWIw/LmpwZw"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* 📊 Project Impact */}
      <section style={{ marginTop: "50px" }}>
        <h3>📊 Project Impact</h3>
        <p>
          RTDECTS promotes a greener and more efficient energy market by:
        </p>
        <ul>
          <li>Encouraging renewable energy generation.</li>
          <li>Reducing energy waste through fair and dynamic pricing.</li>
          <li>Empowering users with full control of their energy data.</li>
          <li>Ensuring accountability and security with blockchain technology.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/wxUlNllURASbWrV5t2vSSp7Iox_RXz33ZL0sCddLX6Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmdhLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOS9l/bGVjdHJpY2l0eV8y/MDE5LmpwZw"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🚀 Future Scope */}
      <section style={{ marginTop: "50px" }}>
        <h3>🚀 Future Scope</h3>
        <ul>
          <li>Integration with IoT smart meters for real-time data collection.</li>
          <li>Expansion into international renewable energy markets.</li>
          <li>Incorporating carbon credit trading and environmental tracking.</li>
          <li>Developing a mobile app for instant access and live token trading.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/wxUlNllURASbWrV5t2vSSp7Iox_RXz33ZL0sCddLX6Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmdhLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOS9l/bGVjdHJpY2l0eV8y/MDE5LmpwZw"
          alt="Energy trading concept"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🏁 Conclusion */}
      <section style={{ marginTop: "50px" }}>
        <h3>🏁 Conclusion</h3>
        <p>
          The Real-Time Decentralized Electricity Credit & Trading System bridges 
          the gap between technology and sustainability. By combining blockchain, 
          artificial intelligence, and renewable energy, this project provides 
          a scalable and transparent solution for the future of green power trading.
        </p>
      </section>
    </div>
  );
}

export default Home;
