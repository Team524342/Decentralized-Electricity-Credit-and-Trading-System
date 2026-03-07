/**
 * Marketplace utilities for blockchain interactions
 * Handles token approvals, buying, and selling electricity credits
 */

import Web3 from "web3";
import ElectricityToken from "../contracts/ElectricityToken.json";
import Marketplace from "../contracts/ElectricityMarketplace.json";

/**
 * Validate Ethereum address format
 * @param {string} address - Address to validate
 * @returns {boolean} True if valid address
 */
const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validate amount is a positive number
 * @param {number|string} amount - Amount to validate
 * @returns {boolean} True if valid amount
 */
const isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Initialize Web3 and marketplace instances
 * @param {string} tokenAddress - Electricity token contract address
 * @param {string} marketplaceAddress - Marketplace contract address
 * @returns {Object} Object containing web3, token, and marketplace instances
 * @throws {Error} If initialization fails
 */
export const initializeMarketplace = (tokenAddress, marketplaceAddress) => {
  try {
    if (!window.ethereum) {
      throw new Error('Ethereum provider not found. Please install MetaMask.');
    }

    if (!isValidAddress(tokenAddress)) {
      throw new Error('Invalid token contract address');
    }

    if (!isValidAddress(marketplaceAddress)) {
      throw new Error('Invalid marketplace contract address');
    }

    const web3 = new Web3(window.ethereum);
    const token = new web3.eth.Contract(ElectricityToken.abi, tokenAddress);
    const marketplace = new web3.eth.Contract(Marketplace.abi, marketplaceAddress);

    return { web3, token, marketplace, tokenAddress, marketplaceAddress };
  } catch (error) {
    console.error('Marketplace initialization failed:', error);
    throw error;
  }
};

/**
 * Request user account from Ethereum provider
 * @returns {Promise<string[]>} Array of user accounts
 * @throws {Error} If user rejects connection
 */
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('Ethereum provider not found. Please install MetaMask.');
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    return accounts;
  } catch (error) {
    console.error('Wallet connection failed:', error);
    throw new Error(`Failed to connect wallet: ${error.message}`);
  }
};

/**
 * Approve marketplace to use tokens
 * @param {number|string} amount - Amount to approve (in tokens)
 * @param {string} account - User's account address
 * @param {Object} marketplace - Marketplace contract instance
 * @param {string} marketplaceAddress - Marketplace contract address
 * @returns {Promise<Object>} Transaction receipt
 * @throws {Error} If approval fails
 */
export const approveMarketplace = async (amount, account, marketplace, marketplaceAddress) => {
  try {
    if (!isValidAmount(amount)) {
      throw new Error('Invalid amount provided');
    }

    if (!isValidAddress(account)) {
      throw new Error('Invalid account address');
    }

    if (!isValidAddress(marketplaceAddress)) {
      throw new Error('Invalid marketplace address');
    }

    const web3 = new Web3(window.ethereum);
    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    const token = marketplace.constructor; // Get token instance
    const tx = await token.methods
      .approve(marketplaceAddress, amountInWei)
      .send({ from: account });

    console.log('Token approval successful:', tx);
    return tx;
  } catch (error) {
    console.error('Token approval failed:', error);
    throw new Error(`Token approval failed: ${error.message}`);
  }
};

/**
 * Sell electricity credits
 * @param {number|string} amount - Amount of tokens to sell
 * @param {number|string} price - Price per token
 * @param {string} account - User's account address
 * @param {Object} contracts - Object containing token and marketplace instances
 * @returns {Promise<Object>} Transaction receipt
 * @throws {Error} If selling fails
 */
export const sellElectricity = async (amount, price, account, contracts) => {
  try {
    if (!isValidAmount(amount)) {
      throw new Error('Invalid amount provided');
    }

    if (!isValidAmount(price)) {
      throw new Error('Invalid price provided');
    }

    if (!isValidAddress(account)) {
      throw new Error('Invalid account address');
    }

    const { web3, token, marketplace, marketplaceAddress } = contracts;

    // First approve the marketplace
    await approveMarketplace(amount, account, token, marketplaceAddress);

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");
    const priceInWei = web3.utils.toWei(price.toString(), "ether");

    const tx = await marketplace.methods
      .createListing(amountInWei, priceInWei)
      .send({ from: account });

    console.log('Electricity listing created:', tx);
    return tx;
  } catch (error) {
    console.error('Selling electricity failed:', error);
    throw new Error(`Failed to sell electricity: ${error.message}`);
  }
};

/**
 * Buy electricity credits
 * @param {string|number} listingId - Listing ID to purchase
 * @param {number|string} price - Price of the listing
 * @param {string} account - User's account address
 * @param {Object} marketplace - Marketplace contract instance
 * @param {Object} web3 - Web3 instance
 * @returns {Promise<Object>} Transaction receipt
 * @throws {Error} If purchase fails
 */
export const buyElectricity = async (listingId, price, account, marketplace, web3) => {
  try {
    if (!listingId) {
      throw new Error('Invalid listing ID');
    }

    if (!isValidAmount(price)) {
      throw new Error('Invalid price');
    }

    if (!isValidAddress(account)) {
      throw new Error('Invalid account address');
    }

    const priceInWei = web3.utils.toWei(price.toString(), "ether");

    const tx = await marketplace.methods
      .buyElectricity(listingId)
      .send({ from: account, value: priceInWei });

    console.log('Electricity purchase successful:', tx);
    return tx;
  } catch (error) {
    console.error('Buying electricity failed:', error);
    throw new Error(`Failed to buy electricity: ${error.message}`);
  }
};

/**
 * Get all listings from marketplace
 * @param {Object} marketplace - Marketplace contract instance
 * @returns {Promise<Array>} Array of listings
 * @throws {Error} If fetching fails
 */
export const getListings = async (marketplace) => {
  try {
    const count = await marketplace.methods.listingCount().call();
    const listings = [];

    for (let i = 1; i <= count; i++) {
      const listing = await marketplace.methods.listings(i).call();
      listings.push({ id: i, ...listing });
    }

    return listings;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    throw new Error('Failed to load marketplace listings');
  }
};

/**
 * Mint new tokens (producer only)
 * @param {number|string} amount - Amount of tokens to mint
 * @param {string} account - Producer's account
 * @param {Object} token - Token contract instance
 * @param {Object} web3 - Web3 instance
 * @returns {Promise<Object>} Transaction receipt
 * @throws {Error} If minting fails
 */
export const mintTokens = async (amount, account, token, web3) => {
  try {
    if (!isValidAmount(amount)) {
      throw new Error('Invalid amount');
    }

    if (!isValidAddress(account)) {
      throw new Error('Invalid account address');
    }

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    const tx = await token.methods
      .mint(account, amountInWei)
      .send({ from: account });

    console.log('Token minting successful:', tx);
    return tx;
  } catch (error) {
    console.error('Token minting failed:', error);
    throw new Error(`Failed to mint tokens: ${error.message}`);
  }
};

export default {
  initializeMarketplace,
  connectWallet,
  approveMarketplace,
  sellElectricity,
  buyElectricity,
  getListings,
  mintTokens,
  isValidAddress,
  isValidAmount,
};