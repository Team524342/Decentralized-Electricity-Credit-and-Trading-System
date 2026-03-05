/**
 * Web3 Service
 * Handles MetaMask wallet connection and blockchain interactions
 */

import Web3 from "web3";

let web3Instance = null;

export const initWeb3 = async () => {
  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    return web3Instance;
  } else {
    throw new Error("MetaMask is not installed");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const web3 = new Web3(window.ethereum);
    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    const balanceInEth = web3.utils.fromWei(balance, "ether");

    return {
      account,
      balance: balanceInEth,
      web3
    };
  } catch (error) {
    console.error("Wallet connection failed:", error);
    throw error;
  }
};

export const getWeb3 = () => {
  if (!web3Instance) {
    web3Instance = new Web3(window.ethereum);
  }
  return web3Instance;
};

export const getConnectedAccount = async () => {
  try {
    const web3 = getWeb3();
    const accounts = await web3.eth.getAccounts();
    return accounts[0] || null;
  } catch (error) {
    console.error("Error getting account:", error);
    return null;
  }
};

export const getWalletBalance = async (address) => {
  try {
    const web3 = getWeb3();
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, "ether");
  } catch (error) {
    console.error("Error getting balance:", error);
    return 0;
  }
};

/**
 * Get user's wallet address
 */
export const getWalletAddress = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get user's balance in ETH from current connected account or specified address
 */
export const getBalance = async (address = null) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const web3 = getWeb3();
    if (!web3) {
      throw new Error("Web3 not initialized");
    }

    // Use provided address or get current connected account
    let targetAddress = address;
    if (!targetAddress) {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        throw new Error("No accounts found");
      }
      targetAddress = accounts[0];
    }

    const balanceWei = await web3.eth.getBalance(targetAddress);
    return web3.utils.fromWei(balanceWei, "ether");
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get network chain ID
 */
export const getChainId = async () => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error("Web3 not initialized");
  }

  return await web3.eth.net.getId();
};

/**
 * Switch to Sepolia network
 */
export const switchToSepoliaNetwork = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // Sepolia chain ID
    });
  } catch (error) {
    if (error.code === 4902) {
      // Network not added, add it
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xaa36a7",
            chainName: "Sepolia",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/demo"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    } else {
      throw error;
    }
  }
};

/**
 * Listen to account change
 */
export const onAccountChange = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      callback(accounts[0]);
    });
  }
};

/**
 * Listen to chain change
 */
export const onChainChange = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", (chainId) => {
      callback(chainId);
    });
  }
};

/**
 * Check if MetaMask is connected
 */
export const isMetaMaskConnected = async () => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return accounts.length > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Get current gas price
 */
export const getGasPrice = async () => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error("Web3 not initialized");
  }

  const gasPriceWei = await web3.eth.getGasPrice();
  return web3.utils.fromWei(gasPriceWei, "gwei");
};

export default {
  connectWallet,
  getWalletAddress,
  getWeb3,
  getBalance,
  getChainId,
  switchToSepoliaNetwork,
  onAccountChange,
  onChainChange,
  isMetaMaskConnected,
  getGasPrice,
};
