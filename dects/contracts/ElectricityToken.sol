// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ElectricityToken is ERC20, Ownable {
    constructor() ERC20("ElectricityCredit", "ELC") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Mint new ElectricityCredit (only owner)
    function mintCredits(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}