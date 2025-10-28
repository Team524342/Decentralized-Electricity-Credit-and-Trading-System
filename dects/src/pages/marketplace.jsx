import React from "react";
import "../assets/index.css";

function Marketplace() {
  return (
    <div className="page-container">
      {/* 💱 Title Section */}
      <h1>💱 ETK Token Marketplace</h1>
      <p>
        The <strong>Energy Token Marketplace (ETK)</strong> is the heart of the 
        Real-Time Decentralized Electricity Credit & Trading System (RTDECTS).  
        It enables secure and transparent peer-to-peer trading of renewable 
        energy credits using blockchain technology.
      </p>

      {/* 🌐 Marketplace Overview */}
      <section style={{ marginTop: "40px" }}>
        <h3>🌐 Marketplace Overview</h3>
        <p>
          The ETK Marketplace allows <strong>Producers</strong> to list their minted 
          Energy Tokens (ETK) for sale and <strong>Consumers</strong> to purchase these tokens 
          based on real-time dynamic pricing. All transactions are handled through 
          smart contracts, ensuring transparency, instant settlement, and zero 
          manual intervention.
        </p>
        { <img
          src="https://imgs.search.brave.com/2dVG2wfJE20xKG1JeBs6mq_-xF0o_DRrCFhgdWy64kw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZWpv/bHV0LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wMS9l/bGVjdHJpY2l0eS5w/bmc"
          alt="ETK trading process"
          style={{ width: "250px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🔄 Trading Process */}
      <section style={{ marginTop: "50px" }}>
        <h3>🔄 Token Trading Workflow</h3>
        <ul>
          <li>
            <strong>1. Producer:</strong> Mints Energy Tokens (ETK) based on generated renewable energy (1 ETK = 1 kWh).
          </li>
          <li>
            <strong>2. Marketplace Listing:</strong> ETK tokens are automatically listed on the decentralized marketplace.
          </li>
          <li>
            <strong>3. Dynamic Pricing:</strong> Token price is adjusted based on supply, demand, and energy grid load.
          </li>
          <li>
            <strong>4. Consumer Purchase:</strong> Consumers buy ETK tokens using their digital wallet.
          </li>
          <li>
            <strong>5. Smart Contract Settlement:</strong> Payments and ownership transfers occur instantly on blockchain.
          </li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/pxClj_xCrqQ_ms5urbhEpCvFTdCSs_TmnXYdfl3PsuQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVidXRpbmZvdGVj/aC5jb20vX25leHQv/aW1hZ2U_dXJsPWh0/dHBzOi8vYmxvZ3Mu/ZGVidXRpbmZvdGVj/aC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDYvQmxv/Y2tjaGFpbi1pbi1Q/MlAtRW5lcmd5LVRy/YWRpbmcuanBnJnc9/MTkyMCZxPTg1"
          alt="Dynamic pricing illustration"
          style={{ width: "230px", marginTop: "20px" }}
        /> }
      </section>

      {/* 💰 Pricing Model */}
      <section style={{ marginTop: "50px" }}>
        <h3>💰 Dynamic Pricing Model</h3>
        <p>
          The marketplace uses an <strong>AI-based dynamic pricing algorithm</strong> 
          that ensures fair and real-time value determination of ETK tokens.
        </p>
        <ul>
          <li>✅ Price increases when demand  supply.</li>
          <li>✅ Price decreases during low consumption hours.</li>
          <li>✅ Government regulates floor and ceiling prices for stability.</li>
          <li>✅ 2% platform commission per transaction ensures system sustainability.</li>
        </ul>
        { <img
          src="https://imgs.search.brave.com/Ig-N_sKFMI41b5itXG9P7-cLf4TqpvNYS5H56Xz7bzo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Z2lodWIub3JnL3Vt/YnJhY28vbWVkaWEv/NDg3MC9taWNyb2dy/aWRzLXAycC10cmFu/c2FjdGlvbnMucG5n"
          alt="Dynamic pricing illustration"
          style={{ width: "230px", marginTop: "20px" }}
        /> }
      </section>

      {/* 🧱 Blockchain Integration */}
      <section style={{ marginTop: "50px" }}>
        <h3>🧱 Blockchain Integration</h3>
        <p>
          Every ETK transaction is recorded on a <strong>public blockchain ledger</strong>, 
          ensuring immutability and verifiable proof of energy exchange.
        </p>
        <ul>
          <li>🔒 Each trade is secured using smart contract verification.</li>
          <li>📜 Transaction history is publicly visible but anonymized for privacy.</li>
          <li>⚙️ Automated settlements eliminate the need for middlemen.</li>
          <li>📈 Transparent record-keeping builds trust between users.</li>
        </ul>
         <img
          src="https://imgs.search.brave.com/mlz2TU0p8HjwkJLSK2uIUduqTw_FiwueXA0JT-jxXkE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb2lu/bGF3LmlvL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzA2L2Zl/YXR1cmVkLWJpdGNv/aW4tZW5lcmd5LWNv/bnN1bXB0aW9uLXN0/YXRpc3RpY3MuanBn"
          alt="Benefits of energy trading"
          style={{ width: "250px", marginTop: "20px" }}
        />
      </section>

      {/* ⚡ Benefits Section */}
      <section style={{ marginTop: "50px" }}>
        <h3>⚡ Key Benefits of the ETK Marketplace</h3>
        <ul>
          <li>💹 Promotes renewable energy adoption through incentivized trading.</li>
          <li>🌍 Creates a decentralized and fair electricity economy.</li>
          <li>🕒 Enables 24/7 real-time token trading and settlements.</li>
          <li>🪙 Provides traceability for every kWh generated and consumed.</li>
          <li>🏛️ Supports government monitoring and carbon credit programs.</li>
        </ul>
        <img
          src="https://imgs.search.brave.com/SXQDPNyjFpeJvIA315c5Bl4RluKNmQIvJAo9FH3VSq4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGRh/dGVwb29sLmNvbS91/cGxvYWRzLzIwMjUv/MDkvaW1wbGVtZW50/YXRpb24tcm9hZG1h/cC1mcm9tLWlkZWEt/dG8tbGl2ZS1uZXR3/b3JrLWJsb2NrY2hh/aW4tZW5lcmd5LWRh/dGEtbWFuYWdlbWVu/dC1ob3ctZGlzdHJp/YnV0ZWQtbGVkZ2Vy/cy10cmFuc2Zvcm0t/dGhlLXBvd2VyLXNl/Y3Rvci53ZWJw"
          alt="Benefits of energy trading"
          style={{ width: "250px", marginTop: "20px" }}
        />
      </section>

      {/* 🧠 Smart Contract Logic */}
      <section style={{ marginTop: "50px" }}>
        <h3>🧠 Smart Contract Logic</h3>
        <p>
          The marketplace operates on Ethereum-based smart contracts, automating 
          all token transfers and payments. Once a consumer purchases ETK:
        </p>
        <ul>
          <li>✔ ETK tokens are deducted from the producer’s account.</li>
          <li>✔ Equivalent amount is added to the consumer’s balance.</li>
          <li>✔ Transaction fee (2%) is distributed to the platform automatically.</li>
          <li>✔ Government node verifies and logs transaction authenticity.</li>
        </ul>
        <img
          src="https://imgs.search.brave.com/95eom1b9fvGoyREC7q6oU_OdmYDh1uOwWL4pbG5eLvU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZWpv/bHV0LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8xMi9z/bWFydC1jb250cmFj/dC5wbmc"
          alt="Benefits of energy trading"
          style={{ width: "250px", marginTop: "20px" }}
        />
      </section>

      {/* 📈 Future Enhancements */}
      <section style={{ marginTop: "50px" }}>
        <h3>📈 Future Enhancements</h3>
        <ul>
          <li>Integration with AI-based demand forecasting for predictive pricing.</li>
          <li>Introducing energy credit loans and staking programs.</li>
          <li>Developing cross-border ETK trading with global standards.</li>
          <li>Integration with carbon footprint tracking for sustainability credits.</li>
        </ul>
        <img
          src="https://imgs.search.brave.com/krrrNsCYVN9bi-05uPdEMMWOB-Z4GK8Fqz483Yv-qr8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgw/NTM3Njk4L3ZlY3Rv/ci9ncm93aW5nLWlk/ZWFzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1rRmlSZ0xE/eGg4RERPU2FyZTFq/NGhEaFNxcHZkS3dl/Y1dtVzdMU3pSRHpV/PQ"
          alt="Benefits of energy trading"
          style={{ width: "250px", marginTop: "20px" }}
        />
      </section>

      {/* 🏁 Conclusion */}
      <section style={{ marginTop: "50px" }}>
        <h3>🏁 Conclusion</h3>
        <p>
          The ETK Marketplace transforms how renewable energy is valued and traded.  
          By blending blockchain transparency, AI intelligence, and government regulation,  
          it builds a sustainable and economically rewarding ecosystem for all participants.
        </p>
      </section>
    </div>
  );
}

export default Marketplace;
