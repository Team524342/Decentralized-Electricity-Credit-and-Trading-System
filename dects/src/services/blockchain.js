/**
 * Blockchain Service
 * Handles smart contract interactions for energy trading system
 */

import Web3 from "web3";
import { getWeb3, getConnectedAccount } from "./web3";
import { CONTRACT_ADDRESSES, ERC20_ABI, ENERGY_CREDIT_ABI, MARKETPLACE_ABI, BILLING_ABI } from "./contracts";

// =================== TOKEN CONTRACT ===================

export const getTokenContract = () => {
  const web3 = getWeb3();
  if (!CONTRACT_ADDRESSES.ENERGY_TOKEN || CONTRACT_ADDRESSES.ENERGY_TOKEN === "0x...") {
    console.warn("Energy Token contract address not set");
    return null;
  }
  return new web3.eth.Contract(ERC20_ABI, CONTRACT_ADDRESSES.ENERGY_TOKEN);
};

export const getTokenBalance = async (address) => {
  try {
    const contract = getTokenContract();
    if (!contract) return 0;
    const balance = await contract.methods.balanceOf(address).call();
    return balance / 1e18; // Convert from wei
  } catch (error) {
    console.error("Error getting token balance:", error);
    return 0;
  }
};

export const transferTokens = async (toAddress, amount) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getTokenContract();

    if (!contract) throw new Error("Token contract not initialized");

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    const tx = contract.methods.transfer(toAddress, amountInWei);
    const gas = await tx.estimateGas({ from: account });

    return await tx.send({
      from: account,
      gas: Math.ceil(gas * 1.1) // 10% gas buffer
    });
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
};

export const approveTokens = async (spenderAddress, amount) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getTokenContract();

    if (!contract) throw new Error("Token contract not initialized");

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    const tx = contract.methods.approve(spenderAddress, amountInWei);
    const gas = await tx.estimateGas({ from: account });

    return await tx.send({
      from: account,
      gas: Math.ceil(gas * 1.1)
    });
  } catch (error) {
    console.error("Error approving tokens:", error);
    throw error;
  }
};

export const getAllowance = async (ownerAddress, spenderAddress) => {
  try {
    const contract = getTokenContract();
    if (!contract) return 0;
    const allowance = await contract.methods.allowance(ownerAddress, spenderAddress).call();
    return allowance / 1e18;
  } catch (error) {
    console.error("Error getting allowance:", error);
    return 0;
  }
};

// =================== ENERGY CREDIT CONTRACT ===================

export const getEnergyCreditContract = () => {
  const web3 = getWeb3();
  if (!CONTRACT_ADDRESSES.ENERGY_CREDIT || CONTRACT_ADDRESSES.ENERGY_CREDIT === "0x...") {
    console.warn("Energy Credit contract address not set");
    return null;
  }
  return new web3.eth.Contract(ENERGY_CREDIT_ABI, CONTRACT_ADDRESSES.ENERGY_CREDIT);
};

export const submitEnergyToContract = async (userAddress, units) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getEnergyCreditContract();

    if (!contract) throw new Error("Energy Credit contract not initialized");

    const tx = contract.methods.submitEnergy(userAddress, web3.utils.toWei(units.toString()));
    const gas = await tx.estimateGas({ from: account });

    return await tx.send({
      from: account,
      gas: Math.ceil(gas * 1.1)
    });
  } catch (error) {
    console.error("Error submitting energy:", error);
    throw error;
  }
};

export const getUserEnergyRecords = async (userAddress) => {
  try {
    const contract = getEnergyCreditContract();
    if (!contract) return [];
    const records = await contract.methods.getUserRecords(userAddress).call();
    return records;
  } catch (error) {
    console.error("Error getting energy records:", error);
    return [];
  }
};

// =================== MARKETPLACE CONTRACT ===================

export const getMarketplaceContract = () => {
  const web3 = getWeb3();
  if (!CONTRACT_ADDRESSES.MARKETPLACE || CONTRACT_ADDRESSES.MARKETPLACE === "0x...") {
    console.warn("Marketplace contract address not set");
    return null;
  }
  return new web3.eth.Contract(MARKETPLACE_ABI, CONTRACT_ADDRESSES.MARKETPLACE);
};

export const listTokensOnMarketplace = async (amount, price) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getMarketplaceContract();

    if (!contract) throw new Error("Marketplace contract not initialized");

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");
    const priceInWei = web3.utils.toWei(price.toString(), "ether");

    const tx = contract.methods.listTokens(amountInWei, priceInWei);
    const gas = await tx.estimateGas({ from: account });

    return await tx.send({
      from: account,
      gas: Math.ceil(gas * 1.1)
    });
  } catch (error) {
    console.error("Error listing tokens:", error);
    throw error;
  }
};

export const buyTokensFromMarketplace = async (listingId, ethValue) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getMarketplaceContract();

    if (!contract) throw new Error("Marketplace contract not initialized");

    const valueInWei = web3.utils.toWei(ethValue.toString(), "ether");

    const tx = contract.methods.buyTokens(listingId);
    const gas = await tx.estimateGas({ from: account, value: valueInWei });

    return await tx.send({
      from: account,
      value: valueInWei,
      gas: Math.ceil(gas * 1.1)
    });
  } catch (error) {
    console.error("Error buying tokens:", error);
    throw error;
  }
};

export const getMarketplaceListing = async (listingId) => {
  try {
    const contract = getMarketplaceContract();
    if (!contract) return null;
    const listing = await contract.methods.listings(listingId).call();
    return {
      id: listing.id,
      seller: listing.seller,
      tokenAmount: listing.tokenAmount / 1e18,
      price: listing.price / 1e18,
      active: listing.active
    };
  } catch (error) {
    console.error("Error getting listing:", error);
    return null;
  }
};

// =================== BILLING CONTRACT ===================

export const getBillingContract = () => {
  const web3 = getWeb3();
  if (!CONTRACT_ADDRESSES.BILLING || CONTRACT_ADDRESSES.BILLING === "0x...") {
    console.warn("Billing contract address not set");
    return null;
  }
  return new web3.eth.Contract(BILLING_ABI, CONTRACT_ADDRESSES.BILLING);
};

export const redeemTokensForBilling = async (userAddress, billAmount, tokenAmount) => {
  try {
    const web3 = getWeb3();
    const account = await getConnectedAccount();
    const contract = getBillingContract();

    if (!contract) throw new Error("Billing contract not initialized");

    const billInWei = web3.utils.toWei(billAmount.toString(), "ether");
    const tokenInWei = web3.utils.toWei(tokenAmount.toString(), "ether");

    const tx = contract.methods.redeemTokens(userAddress, billInWei, tokenInWei);
    const gas = await tx.estimateGas({ from: account });

    return await tx.send({
      from: account,
      gas: Math.ceil(gas * 1.1)
    });
  } catch (error) {
    console.error("Error redeeming tokens:", error);
    throw error;
  }
};

export const getUserBillingHistory = async (userAddress) => {
  try {
    const contract = getBillingContract();
    if (!contract) return [];
    const bills = await contract.methods.getBills(userAddress).call();
    return bills.map(bill => ({
      unitsUsed: bill.unitsUsed / 1e18,
      billAmount: bill.billAmount / 1e18,
      tokensRedeemed: bill.tokensRedeemed / 1e18,
      finalAmount: bill.finalAmount / 1e18,
      timestamp: new Date(bill.timestamp * 1000)
    }));
  } catch (error) {
    console.error("Error getting billing history:", error);
    return [];
  }
};

// =================== UTILITY FUNCTIONS ===================

export const verifyContractAddresses = () => {
  const addresses = Object.values(CONTRACT_ADDRESSES);
  return addresses.every(addr => addr && addr !== "0x...");
};

export const getAllContractData = async (userAddress) => {
  try {
    const [tokenBalance, energyRecords, billingHistory] = await Promise.all([
      getTokenBalance(userAddress),
      getUserEnergyRecords(userAddress),
      getUserBillingHistory(userAddress)
    ]);

    return {
      tokenBalance,
      energyRecords,
      billingHistory
    };
  } catch (error) {
    console.error("Error getting contract data:", error);
    return null;
  }
};

export default {
  getTokenBalance,
  transferTokens,
  approveTokens,
  getAllowance,
  submitEnergyToContract,
  getUserEnergyRecords,
  listTokensOnMarketplace,
  buyTokensFromMarketplace,
  getMarketplaceListing,
  redeemTokensForBilling,
  getUserBillingHistory,
  verifyContractAddresses,
  getAllContractData
};
