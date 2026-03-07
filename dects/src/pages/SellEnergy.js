// dects/src/pages/SellEnergy.js
import React, { useState } from "react";
import { createSellOrder, getCurrentPrice } from "../services/api";
import "./SellEnergy.css";

function SellEnergy() {
  const [formData, setFormData] = useState({
    energy_amount_kwh: "",
    price_per_kwh: "",
    time_slot_start: "",
    time_slot_end: "",
  });

  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetCurrentPrice = async () => {
    try {
      setLoading(true);
      const response = await getCurrentPrice("ZONE_A");
      setCurrentPrice(response.data);
      setFormData((prev) => ({
        ...prev,
        price_per_kwh: response.data.final_price,
      }));
    } catch (err) {
      setError("Failed to fetch current price");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.energy_amount_kwh || !formData.price_per_kwh) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await createSellOrder({
        energy_amount_kwh: parseFloat(formData.energy_amount_kwh),
        price_per_kwh: parseFloat(formData.price_per_kwh),
        time_slot_start: formData.time_slot_start,
        time_slot_end: formData.time_slot_end,
      });

      setSuccess(
        `Sell order created successfully! Order ID: ${response.data.order_id}`
      );
      setFormData({
        energy_amount_kwh: "",
        price_per_kwh: "",
        time_slot_start: "",
        time_slot_end: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-energy">
      <h1>☀️ Sell Energy</h1>

      <div className="price-section">
        <button
          onClick={handleGetCurrentPrice}
          disabled={loading}
          className="btn-secondary"
        >
          📊 Get Current Market Price
        </button>

        {currentPrice && (
          <div className="price-info">
            <p>Current Price: ₹{currentPrice.final_price}/kWh</p>
            <p className="price-small">
              (Base: ₹{currentPrice.base_price} × Demand: {currentPrice.demand_supply_factor})
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="sell-form">
        <div className="form-group">
          <label>Energy Amount (kWh)</label>
          <input
            type="number"
            name="energy_amount_kwh"
            value={formData.energy_amount_kwh}
            onChange={handleInputChange}
            placeholder="e.g., 50"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label>Price per kWh (₹)</label>
          <input
            type="number"
            name="price_per_kwh"
            value={formData.price_per_kwh}
            onChange={handleInputChange}
            placeholder="e.g., 9.5"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Time Slot Start</label>
          <input
            type="datetime-local"
            name="time_slot_start"
            value={formData.time_slot_start}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time Slot End</label>
          <input
            type="datetime-local"
            name="time_slot_end"
            value={formData.time_slot_end}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Creating Order..." : "Create Sell Order"}
        </button>
      </form>

      <div className="tips">
        <h3>💡 Tips</h3>
        <ul>
          <li>Check current market price before listing</li>
          <li>Set competitive prices to get matched faster</li>
          <li>Longer time slots may have higher acceptance rates</li>
          <li>After matching, tokens will be transferred on blockchain</li>
        </ul>
      </div>
    </div>
  );
}

export default SellEnergy;
