// dects/src/pages/Marketplace.js
import React, { useEffect, useState } from "react";
import { listOpenOrders, createBuyOrder, executeTrade } from "../services/api";
import { transferTokens } from "../services/blockchain";
import "./Marketplace.css";

function Marketplace() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await listOpenOrders("SELL");
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyEnergy = async (order) => {
    try {
      setBuyLoading(true);
      setError("");

      // Create matching buy order
      const buyOrderResponse = await createBuyOrder({
        energy_amount_kwh: order.energy_amount_kwh,
        price_per_kwh: order.price_per_kwh,
        time_slot_start: order.time_slot_start,
        time_slot_end: order.time_slot_end,
      });

      // Try to transfer tokens on blockchain (optional, can fail without blocking)
      try {
        await transferTokens(order.user_name, order.energy_amount_kwh);
      } catch (tokenErr) {
        console.warn("Token transfer failed but buy order created:", tokenErr);
      }

      alert(`Buy order created! Order ID: ${buyOrderResponse.data.order_id}`);
      loadOrders();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create buy order");
    } finally {
      setBuyLoading(false);
    }
  };

  if (loading) {
    return <div className="marketplace">Loading orders...</div>;
  }

  return (
    <div className="marketplace">
      <h1>🛒 Energy Marketplace</h1>

      {error && <div className="error-message">{error}</div>}

      <button onClick={loadOrders} className="btn-secondary">
        🔄 Refresh Orders
      </button>

      <div className="orders-container">
        {orders.length === 0 ? (
          <p className="no-orders">No sell orders available</p>
        ) : (
          orders.map((order) => (
            <div key={order.order_id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.order_id}</h3>
                <span className="status-badge">{order.order_status}</span>
              </div>

              <div className="order-details">
                <p>
                  <strong>Seller:</strong> {order.user_name}
                </p>
                <p>
                  <strong>Energy Available:</strong> {order.energy_amount_kwh} kWh
                </p>
                <p>
                  <strong>Price:</strong> ₹{order.price_per_kwh}/kWh
                </p>
                <p>
                  <strong>Total Cost:</strong> ₹
                  {(order.energy_amount_kwh * order.price_per_kwh).toFixed(2)}
                </p>
              </div>

              <div className="time-slot">
                <p>
                  <strong>Time Slot:</strong>
                </p>
                <p>
                  From: {new Date(order.time_slot_start).toLocaleString()}
                </p>
                <p>
                  To: {new Date(order.time_slot_end).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleBuyEnergy(order)}
                disabled={buyLoading}
                className="btn-primary"
              >
                {buyLoading ? "Processing..." : "💳 Buy Energy"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marketplace;
