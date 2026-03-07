import Web3 from "web3";
import ElectricityToken from "./contracts/ElectricityToken.json";
import Marketplace from "./contracts/ElectricityMarketplace.json";

const web3 = new Web3(window.ethereum);
const TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
const MARKETPLACE_ADDRESS = "YOUR_MARKETPLACE_ADDRESS";

const token = new web3.eth.Contract(ElectricityToken.abi, TOKEN_ADDRESS);
const marketplace = new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDRESS);

// Approve marketplace to use tokens
export async function approveMarketplace(amount, account) {
  await token.methods
    .approve(MARKETPLACE_ADDRESS, web3.utils.toWei(amount.toString(), "ether"))
    .send({ from: account });
}

// Sell Electricity Credits
export async function sellElectricity(amount, price, account) {
  await approveMarketplace(amount, account);
  await marketplace.methods
    .createListing(web3.utils.toWei(amount.toString(), "ether"), web3.utils.toWei(price.toString(), "ether"))
    .send({ from: account });
}

// Buy Electricity Credits
export async function buyElectricity(id, price, account) {
  await marketplace.methods
    .buyElectricity(id)
    .send({ from: account, value: web3.utils.toWei(price.toString(), "ether") });
}