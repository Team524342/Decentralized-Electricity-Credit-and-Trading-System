// dects/src/pages/Trades.js
import React, { useEffect, useState } from "react";
import { listMatchedTrades, executeTrade, getUserDashboard } from "../services/api";
import { transferTokens } from "../services/blockchain";
import "./Trades.css";

function Trades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [executingTrade, setExecutingTrade] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, success, failed

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      setLoading(true);
      const response = await listMatchedTrades();
      setTrades(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteTrade = async (tradeId, buyerAddress, amount) => {
    try {
      setExecutingTrade(tradeId);
      setError("");

      // First execute on backend
      const response = await executeTrade(tradeId);

      // If blockchain required, execute token transfer
      if (response.data.requires_blockchain) {
        try {
          await transferTokens(buyerAddress, amount);
        } catch (blockchainErr) {
          console.error("Blockchain transfer failed:", blockchainErr);
          // Trade created but blockchain failed - can retry
        }
      }

      // Reload trades
      await loadTrades();
    } catch (err) {
      setError(err.message);
    } finally {
      setExecutingTrade(null);
    }
  };

  const getFilteredTrades = () => {
    if (filter === "all") return trades;
    return trades.filter(trade => trade.settlement_status === filter);
  };

  const filteredTrades = getFilteredTrades();

  if (loading && trades.length === 0) {
    return <div className="trades">Loading trades...</div>;
  }

  return (
    <div className="trades">
      <h1>📊 My Trades</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-section">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({trades.length})
        </button>
        <button
          className={`filter-btn ${filter === "PENDING" ? "active" : ""}`}
          onClick={() => setFilter("PENDING")}
        >
          ⏳ Pending
        </button>
        <button
          className={`filter-btn ${filter === "SUCCESS" ? "active" : ""}`}
          onClick={() => setFilter("SUCCESS")}
        >
          ✅ Success
        </button>
        <button
          className={`filter-btn ${filter === "FAILED" ? "active" : ""}`}
          onClick={() => setFilter("FAILED")}
        >
          ❌ Failed
        </button>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="empty-state">
          <p>No trades yet</p>
          <p>Check the marketplace to start buying or selling energy</p>
        </div>
      ) : (
        <div className="trades-list">
          {filteredTrades.map(trade => (
            <div key={trade.id} className={`trade-card status-${trade.settlement_status}`}>
              <div className="trade-header">
                <h3>Trade #{trade.id}</h3>
                <span className={`status-badge ${trade.settlement_status}`}>
                  {trade.settlement_status === "PENDING" && "⏳ Pending"}
                  {trade.settlement_status === "SUCCESS" && "✅ Success"}
                  {trade.settlement_status === "FAILED" && "❌ Failed"}
                </span>
              </div>

              <div className="trade-details">
                <div className="detail-row">
                  <span className="label">Buy Order ID:</span>
                  <span className="value">{trade.buy_order_id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Sell Order ID:</span>
                  <span className="value">{trade.sell_order_id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Buyer:</span>
                  <span className="value">{trade.buyer_name || "Unknown"}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Seller:</span>
                  <span className="value">{trade.seller_name || "Unknown"}</span>
                </div>
              </div>

              <div className="trade-amounts">
                <div className="amount-box">
                  <p className="label">Energy</p>
                  <p className="amount">⚡ {trade.energy_amount_kwh} kWh</p>
                </div>
                <div className="amount-box">
                  <p className="label">Price/kWh</p>
                  <p className="amount">💲 {trade.price_per_kwh.toFixed(2)}</p>
                </div>
                <div className="amount-box">
                  <p className="label">Total</p>
                  <p className="amount">💰 {(trade.energy_amount_kwh * trade.price_per_kwh).toFixed(2)}</p>
                </div>
              </div>

              <div className="trade-blockchain">
                {trade.blockchain_tx_hash && (
                  <div className="tx-info">
                    <p className="label">Blockchain TX:</p>
                    <p className="tx-hash">{trade.blockchain_tx_hash.substring(0, 20)}...</p>
                  </div>
                )}
              </div>

              <div className="trade-timestamps">
                <p className="timestamp">
                  Created: {new Date(trade.created_at).toLocaleString()}
                </p>
                {trade.settlement_completed && (
                  <p className="timestamp">
                    Settled: {new Date(trade.settlement_completed).toLocaleString()}
                  </p>
                )}
              </div>

              {trade.settlement_status === "PENDING" && (
                <button
                  className="btn-primary"
                  onClick={() =>
                    handleExecuteTrade(
                      trade.id,
                      trade.buyer_address,
                      trade.energy_amount_kwh
                    )
                  }
                  disabled={executingTrade === trade.id}
                >
                  {executingTrade === trade.id ? "Processing..." : "⚡ Execute Blockchain"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="trading-tips">
        <h3>📖 Trade Settlement</h3>
        <ul>
          <li>
            <strong>PENDING:</strong> Trade created, waiting for blockchain settlement
          </li>
          <li>
            <strong>SUCCESS:</strong> Tokens transferred to buyer on blockchain
          </li>
          <li>
            <strong>FAILED:</strong> Blockchain settlement failed, can retry
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Trades;
