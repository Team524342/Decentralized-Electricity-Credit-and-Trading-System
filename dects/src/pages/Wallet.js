// dects/src/pages/Wallet.js
import React, { useEffect, useState } from "react";
import { getWalletBlockchainBalance, connectWallet as apiConnectWallet } from "../services/api";
import { getTokenBalance, connectWallet } from "../services/blockchain";
import "./Wallet.css";

function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      setLoading(true);
      const response = await getWalletBlockchainBalance();
      setWallet(response.data);
      setWalletAddress(response.data.wallet_address);
    } catch (err) {
      console.error("Error loading wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      setError("");
      
      const address = await connectWallet();
      
      // Connect this address to backend
      await apiConnectWallet(address);
      
      setWalletAddress(address);
      await loadWallet();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBalance = async () => {
    try {
      setLoading(true);
      const balance = await getTokenBalance(walletAddress);
      setBalance(balance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !wallet) {
    return <div className="wallet">Loading wallet...</div>;
  }

  return (
    <div className="wallet">
      <h1>💰 My Wallet</h1>

      {error && <div className="error-message">{error}</div>}

      {!walletAddress ? (
        <div className="wallet-connect">
          <p>Connect your MetaMask wallet to manage tokens</p>
          <button onClick={handleConnectWallet} disabled={loading} className="btn-primary">
            🔗 Connect Wallet
          </button>
        </div>
      ) : (
        <div className="wallet-info">
          <div className="wallet-card">
            <h2>Wallet Address</h2>
            <p className="address">{walletAddress}</p>
            <button onClick={() => navigator.clipboard.writeText(walletAddress)} className="btn-secondary">
              📋 Copy
            </button>
          </div>

          {wallet && (
            <div className="balance-card">
              <h2>Token Balance</h2>
              <p className="balance">
                ⚡ {wallet.balance_cached ? wallet.balance_cached.toFixed(2) : "0.00"} Tokens
              </p>
              <p className="subtext">Blockchain: {wallet.balance_on_blockchain?.toFixed(2) || "0.00"}</p>
              <button onClick={handleGetBalance} disabled={loading} className="btn-secondary">
                🔄 Refresh Balance
              </button>
            </div>
          )}

          {balance !== null && (
            <div className="blockchain-balance">
              <h3>Live Blockchain Balance</h3>
              <p className="balance">⚡ {balance.toFixed(2)} ⚡</p>
            </div>
          )}

          <div className="info-box">
            <h3>📊 Blockchain Details</h3>
            {wallet && (
              <ul>
                <li>Balance: {wallet.balance_cached?.toFixed(2) || "0"} tokens</li>
                <li>Last Sync Block: {wallet.last_synced_block}</li>
                <li>Network: Sepolia Testnet</li>
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="tips">
        <h3>💡 How to use your wallet:</h3>
        <ul>
          <li>⚡ Tokens are minted when you produce excess solar energy</li>
          <li>🔥 Tokens are burned when you consume energy from grid</li>
          <li>🔄 Trade tokens with other users in the marketplace</li>
          <li>💳 Redeem tokens in monthly billing for bill discount</li>
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
