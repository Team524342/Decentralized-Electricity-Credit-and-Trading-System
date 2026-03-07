// dects/src/pages/Billing.js
import React, { useEffect, useState } from "react";
import { listUserBills, getCurrentDynamicPrice } from "../services/api";
import "./Billing.css";

function Billing() {
  const [bills, setBills] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc, date-asc, amount-desc

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      setLoading(true);
      const [billsRes, priceRes] = await Promise.all([
        listUserBills(),
        getCurrentDynamicPrice(),
      ]);
      setBills(billsRes.data || []);
      setCurrentPrice(priceRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSortedBills = () => {
    const sorted = [...bills];
    if (sortBy === "date-desc") {
      return sorted.sort((a, b) => new Date(b.billing_month) - new Date(a.billing_month));
    } else if (sortBy === "date-asc") {
      return sorted.sort((a, b) => new Date(a.billing_month) - new Date(b.billing_month));
    } else if (sortBy === "amount-desc") {
      return sorted.sort((a, b) => b.total_amount - a.total_amount);
    }
    return sorted;
  };

  const calculateStats = () => {
    const paidBills = bills.filter(b => b.payment_status === "PAID");
    const pendingBills = bills.filter(b => b.payment_status === "PENDING");
    const overdueBills = bills.filter(b => b.payment_status === "OVERDUE");

    return {
      totalAmount: bills.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      paidAmount: paidBills.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      pendingAmount: pendingBills.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      overdueAmount: overdueBills.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      paidCount: paidBills.length,
      pendingCount: pendingBills.length,
      overdueCount: overdueBills.length,
    };
  };

  const stats = calculateStats();
  const sortedBills = getSortedBills();

  if (loading && bills.length === 0) {
    return <div className="billing">Loading billing history...</div>;
  }

  return (
    <div className="billing">
      <h1>💳 Monthly Billing</h1>

      {error && <div className="error-message">{error}</div>}

      {/* Statistics Section */}
      <div className="billing-stats">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="amount">💰 ${stats.totalAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card paid">
          <h3>Paid ✅</h3>
          <p className="count">{stats.paidCount} bills</p>
          <p className="amount">${stats.paidAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending ⏳</h3>
          <p className="count">{stats.pendingCount} bills</p>
          <p className="amount">${stats.pendingAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card overdue">
          <h3>Overdue ⚠️</h3>
          <p className="count">{stats.overdueCount} bills</p>
          <p className="amount">${stats.overdueAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Current Price Information */}
      {currentPrice && (
        <div className="current-price-box">
          <h3>⚡ Current Market Price</h3>
          <p className="price">Zone {currentPrice.zone}: ${currentPrice.price_per_kwh.toFixed(4)}/kWh</p>
          <p className="timestamp">Hour: {new Date(currentPrice.updated_at).toLocaleString()}</p>
        </div>
      )}

      {/* Sort Controls */}
      <div className="sort-controls">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">📅 Newest First</option>
          <option value="date-asc">📅 Oldest First</option>
          <option value="amount-desc">💰 Highest Amount</option>
        </select>
      </div>

      {/* Bills List */}
      {sortedBills.length === 0 ? (
        <div className="empty-state">
          <p>No billing records yet</p>
          <p>Your monthly bills will appear here</p>
        </div>
      ) : (
        <div className="bills-list">
          {sortedBills.map(bill => (
            <div key={bill.id} className={`bill-card status-${bill.payment_status}`}>
              <div className="bill-header">
                <h3>
                  {new Date(bill.billing_month).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </h3>
                <span className={`status-badge ${bill.payment_status}`}>
                  {bill.payment_status === "PAID" && "✅ Paid"}
                  {bill.payment_status === "PENDING" && "⏳ Pending"}
                  {bill.payment_status === "OVERDUE" && "⚠️ Overdue"}
                </span>
              </div>

              <div className="bill-details">
                <div className="detail-row">
                  <span className="label">Energy Consumption:</span>
                  <span className="value">{bill.energy_consumed_kwh?.toFixed(2) || "0"} kWh</span>
                </div>
                <div className="detail-row">
                  <span className="label">Energy Cost:</span>
                  <span className="value">${bill.energy_cost?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Base Charge:</span>
                  <span className="value">${bill.base_charge?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Taxes:</span>
                  <span className="value">${bill.taxes?.toFixed(2) || "0.00"}</span>
                </div>
                {bill.token_discount_applied > 0 && (
                  <div className="detail-row discount">
                    <span className="label">⚡ Token Discount:</span>
                    <span className="value">-${bill.token_discount_applied?.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="bill-total">
                <p className="label">Total Amount Due:</p>
                <p className="amount">${bill.total_amount?.toFixed(2) || "0.00"}</p>
              </div>

              {bill.due_date && (
                <div className="bill-due">
                  <p className="due-date">
                    Due: {new Date(bill.due_date).toLocaleDateString()}
                  </p>
                </div>
              )}

              {bill.payment_status === "PENDING" && (
                <button className="btn-primary">
                  💳 Pay Now
                </button>
              )}
              {bill.payment_status === "OVERDUE" && (
                <button className="btn-warning">
                  ⚠️ Pay Overdue Bill
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FAQ Section */}
      <div className="billing-faq">
        <h3>📖 Billing Information</h3>
        <div className="faq-item">
          <h4>❓ How is my bill calculated?</h4>
          <p>
            Your bill includes energy cost (consumption × hourly zone price) + base charge + taxes - token
            discounts
          </p>
        </div>
        <div className="faq-item">
          <h4>❓ How do token discounts work?</h4>
          <p>
            Electricity tokens earned from solar production can be redeemed as discounts on your monthly bill
          </p>
        </div>
        <div className="faq-item">
          <h4>❓ What payment methods are available?</h4>
          <p>Credit card, bank transfer, or electricity tokens</p>
        </div>
        <div className="faq-item">
          <h4>❓ What happens if I pay late?</h4>
          <p>Overdue bills may incur late fees and affect your account status</p>
        </div>
      </div>
    </div>
  );
}

export default Billing;
