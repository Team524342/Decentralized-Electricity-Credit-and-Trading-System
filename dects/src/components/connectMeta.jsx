import React, { useState, useEffect } from 'react';
import { Wallet, AlertCircle, CheckCircle, ExternalLink, Copy, LogOut, RefreshCw } from 'lucide-react';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Get chain name from chainId
  const getChainName = (chainId) => {
    const chains = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
      '0x38': 'BSC Mainnet',
      '0x61': 'BSC Testnet'
    };
    return chains[chainId] || `Chain ID: ${chainId}`;
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Format balance
  const formatBalance = (balance) => {
    if (!balance) return '0';
    return parseFloat(balance).toFixed(4);
  };

  // Get account balance
  const getBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      // Convert from Wei to ETH
      const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
      setBalance(ethBalance.toString());
    } catch (err) {
      console.error('Error getting balance:', err);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      setAccount(accounts[0]);
      setChainId(chainId);
      
      // Get balance
      await getBalance(accounts[0]);

      console.log('Connected account:', accounts[0]);
      console.log('Chain ID:', chainId);
    } catch (err) {
      if (err.code === 4001) {
        setError('Connection rejected. Please approve the connection request.');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
      console.error('Error connecting wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setBalance(null);
    setError('');
  };

  // Copy address to clipboard
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Refresh balance
  const refreshBalance = async () => {
    if (account) {
      await getBalance(account);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        disconnectWallet();
      } else if (accounts[0] !== account) {
        // User switched accounts
        setAccount(accounts[0]);
        getBalance(accounts[0]);
      }
    };

    const handleChainChanged = (chainId) => {
      setChainId(chainId);
      // Refresh balance when chain changes
      if (account) {
        getBalance(account);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          window.ethereum.request({ method: 'eth_chainId' })
            .then(chainId => {
              setChainId(chainId);
              getBalance(accounts[0]);
            });
        }
      });

    // Cleanup listeners
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [account]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl">
              <Wallet className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Wallet</h1>
          <p className="text-gray-600">Connect your MetaMask wallet to get started</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Not Connected State */}
          {!account && (
            <div className="space-y-4">
              {!isMetaMaskInstalled() ? (
                <>
                  <div className="text-center py-4">
                    <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      MetaMask Not Detected
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Please install MetaMask to connect your wallet
                    </p>
                  </div>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Install MetaMask
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </>
              ) : (
                <>
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">
                      Connect your wallet to access the application
                    </p>
                  </div>
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5" />
                        Connect MetaMask
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Connected State */}
          {account && (
            <div className="space-y-6">
              {/* Success Badge */}
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-lg p-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Wallet Connected</span>
              </div>

              {/* Account Info */}
              <div className="space-y-4">
                {/* Address */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Wallet Address
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-mono text-sm">
                      {formatAddress(account)}
                    </span>
                    <button
                      onClick={copyAddress}
                      className="ml-2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy full address"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-xs text-green-600 mt-1 block">
                      Address copied!
                    </span>
                  )}
                </div>

                {/* Network */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Network
                  </label>
                  <span className="text-gray-900 font-medium">
                    {getChainName(chainId)}
                  </span>
                </div>

                {/* Balance */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">
                      Balance
                    </label>
                    <button
                      onClick={refreshBalance}
                      className="p-1 hover:bg-white rounded transition-colors"
                      title="Refresh balance"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatBalance(balance)} ETH
                  </span>
                </div>
              </div>

              {/* Disconnect Button */}
              <button
                onClick={disconnectWallet}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By connecting your wallet, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}