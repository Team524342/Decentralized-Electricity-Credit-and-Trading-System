// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ElectricityToken is ERC20, Ownable {
    mapping(address => bool) public authorizedMinters;

    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);

    constructor() ERC20("ElectricityCredit", "ELC") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
        authorizedMinters[msg.sender] = true;
    }

    // Authorize a contract to mint tokens
    function authorizeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = true;
        emit MinterAuthorized(_minter);
    }

    // Revoke minting authorization
    function revokeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = false;
        emit MinterRevoked(_minter);
    }

    // Mint new ElectricityCredit (only owner)
    function mintCredits(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Mint tokens (authorized contracts only)
    function mint(address to, uint256 amount) external {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        _mint(to, amount);
    }
}