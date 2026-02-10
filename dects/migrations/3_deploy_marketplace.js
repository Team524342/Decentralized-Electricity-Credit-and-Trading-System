const ElectricityToken = artifacts.require("ElectricityToken");
const ElectricityMarketplace = artifacts.require("ElectricityMarketplace");

module.exports = async function (deployer) {
  const token = await ElectricityToken.deployed();
  await deployer.deploy(ElectricityMarketplace, token.address);
};
