import Web3 from "web3";
import ElectricityToken from "../contracts/ElectricityToken.json";
import Marketplace from "../contracts/ElectricityMarketplace.json";
import { CONTRACT_ADDRESSES } from "../services/contracts";

const web3 = new Web3(window.ethereum);

// Use contract addresses from environment variables or contracts.js configuration
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS || CONTRACT_ADDRESSES?.ENERGY_TOKEN || "0x0000000000000000000000000000000000000000";
const MARKETPLACE_ADDRESS = process.env.REACT_APP_MARKETPLACE_ADDRESS || CONTRACT_ADDRESSES?.MARKETPLACE || "0x0000000000000000000000000000000000000000";

// Initialize contracts only if valid addresses are available
let token = null;
let marketplace = null;

if (TOKEN_ADDRESS && TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000" && TOKEN_ADDRESS !== "0x...") {
  token = new web3.eth.Contract(ElectricityToken.abi, TOKEN_ADDRESS);
}

if (MARKETPLACE_ADDRESS && MARKETPLACE_ADDRESS !== "0x0000000000000000000000000000000000000000" && MARKETPLACE_ADDRESS !== "0x...") {
  marketplace = new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDRESS);
}

// Approve marketplace to use tokens
export async function approveMarketplace(amount, account) {
  if (!token) {
    throw new Error("Token contract not initialized. Please configure TOKEN_ADDRESS in environment variables.");
  }
  if (!MARKETPLACE_ADDRESS || MARKETPLACE_ADDRESS === "0x0000000000000000000000000000000000000000") {
    throw new Error("Marketplace address not configured.");
  }
  
  await token.methods
    .approve(MARKETPLACE_ADDRESS, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: account });
}

// Sell Electricity Credits
export async function sellElectricity(amount, price, account) {
  if (!marketplace) {
    throw new Error("Marketplace contract not initialized. Please configure MARKETPLACE_ADDRESS in environment variables.");
  }
  
  await approveMarketplace(amount, account);
  await marketplace.methods
    .createListing(web3.utils.toWei(amount.toString(), "ether"), web3.utils.toWei(price.toString(), "ether"))
    .send({ from: account });
}

// Buy Electricity Credits
export async function buyElectricity(id, price, account) {
  if (!marketplace) {
    throw new Error("Marketplace contract not initialized. Please configure MARKETPLACE_ADDRESS in environment variables.");
  }
  
  await marketplace.methods
    .buyElectricity(id)
    .send({ from: account, value: web3.utils.toWei(price.toString(), "ether") });
}