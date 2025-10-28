import React from "react";
import "../assets/index.css";

function About() {
  return (
    <div className="page-container">
      {/* 🌍 About Section */}
      <h1>🌍 About RTDECTS</h1>
      <p>
        <strong>Real-Time Decentralized Electricity Credit & Trading System (RTDECTS)</strong> 
        is a next-generation platform that revolutionizes the energy ecosystem by 
        enabling producers, consumers, and government agencies to exchange renewable 
        electricity credits securely through blockchain and AI technologies.
      </p>
      <p>
        Our mission is to create a transparent, efficient, and sustainable 
        energy trading infrastructure that promotes green energy generation, 
        decentralization, and digital trust.
      </p>

      {/* 🎯 Mission & Vision */}
      <section style={{ marginTop: "40px" }}>
        <h3>🎯 Our Mission</h3>
        <p>
          To empower renewable energy producers, decentralize electricity trade,
          and ensure fair dynamic pricing through AI-powered systems — while 
          supporting government sustainability goals and green initiatives.
        </p>

        <h3 style={{ marginTop: "30px" }}>🌟 Our Vision</h3>
        <p>
          To build a global, blockchain-based renewable energy marketplace 
          where every kilowatt-hour produced, consumed, and traded is 
          traceable, transparent, and economically rewarding.
        </p>
      </section>

      {/* 💡 Core Technologies */}
      <section style={{ marginTop: "40px" }}>
        <h3>💡 Core Technologies</h3>
        <ul style={{ textAlign: "left" }}>
          <li>🔗 <strong>Blockchain Smart Contracts</strong> — Powering secure, automated transactions.</li>
          <li>🧠 <strong>Artificial Intelligence</strong> — Dynamic token pricing and energy forecasting.</li>
          <li>⚡ <strong>ETK Tokenization</strong> — Each 1 ETK = 1 kWh of renewable energy.</li>
          <li>🏛️ <strong>Government Verification Portal</strong> — Real-time regulatory monitoring.</li>
          <li>☁️ <strong>Cloud-Based Data Analytics</strong> — Ensuring scalability and fast insights.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/wxUlNllURASbWrV5t2vSSp7Iox_RXz33ZL0sCddLX6Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmdhLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOS9l/bGVjdHJpY2l0eV8y/MDE5LmpwZw"
          alt="Core Technologies"
          style={{ width: "220px", marginTop: "20px" }}
        /> }
      </section>

      {/* ⚙️ System Architecture */}
      <section style={{ marginTop: "50px" }}>
        <h3>⚙️ System Architecture Overview</h3>
        <p>
          RTDECTS is designed around a secure, modular, and scalable architecture.  
          The main components include:
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>🔆 <strong>Producer Node</strong> – Generates renewable energy and mints ETK tokens.</li>
          <li>💡 <strong>Consumer Node</strong> – Purchases ETKs and offsets electricity bills.</li>
          <li>🏛️ <strong>Government Node</strong> – Verifies, regulates, and rewards green transactions.</li>
          <li>🔐 <strong>Blockchain Layer</strong> – Records transactions securely using smart contracts.</li>
          <li>🧮 <strong>AI Engine</strong> – Determines token price dynamically and forecasts energy demand.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/kyoZ3zKvt2fw_YMcC0V2eVwB0P8pb-Aza39hDTDL7OY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zbGlkZXNoYXJl/Y2RuLmNvbS9lbGVj/dHJpY2Fsc3lzdGVt/c2luYWJ1aWxkaW5n/LTE1MDkxMTA4MjEx/OS1sdmExLWFwcDY4/OTIvNzUvRWxlY3Ry/aWNhbC1TeXN0ZW1z/LWluLWEtQnVpbGRp/bmctNy0yMDQ4Lmpw/Zw"
          alt="System Architecture"
          style={{ width: "230px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🌿 Core Values */}
      <section style={{ marginTop: "50px" }}>
        <h3>🌿 Our Core Values</h3>
        <ul style={{ textAlign: "left" }}>
          <li>💚 <strong>Sustainability:</strong> Encouraging the generation and consumption of green power.</li>
          <li>⚖️ <strong>Transparency:</strong> Every transaction is verifiable on the blockchain ledger.</li>
          <li>🤝 <strong>Trust:</strong> No middlemen, no fraud — just secure smart contracts.</li>
          <li>🚀 <strong>Innovation:</strong> Constantly evolving with AI, IoT, and renewable energy tech.</li>
          <li>🌍 <strong>Inclusivity:</strong> Bridging rural producers and urban consumers on one platform.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/96cho6TDgftASR4mDUXMYIi97pAXElYZOY0GQE3YIPA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtY29y/ZS12YWx1ZXMtYmFj/a2dyb3VuZF8yMy0y/MTQ5MDgxNjU5Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
          alt="System Architecture"
          style={{ width: "230px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🏁 Closing Note */}
      <section style={{ marginTop: "60px" }}>
        <h3>🏁 Our Commitment</h3>
        <p>
          RTDECTS aims to redefine how energy is traded, monitored, and consumed — 
          merging technology with environmental responsibility.  
          Together, we move towards a smarter, cleaner, and greener future.
        </p>
      </section>
    </div>
  );
}

export default About;
