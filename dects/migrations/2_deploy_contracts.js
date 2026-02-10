const ElectricityToken =artifacts.require("ElectricityToken");
module.exports =function(deployer){
    deployer.deploy(ElectricityToken);
};