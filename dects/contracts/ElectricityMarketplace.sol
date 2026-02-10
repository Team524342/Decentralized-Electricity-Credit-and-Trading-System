// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract ElectricityMarketplace {

    IERC20 public token;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    struct Listing {
        uint id;
        address seller;
        uint amount;   // ELC tokens
        uint price;    // in ETH
        bool sold;
    }

    uint public listingCount = 0;
    mapping(uint => Listing) public listings;

    // Seller lists electricity credits
    function createListing(uint _amount, uint _price) public {
        listingCount++;

        listings[listingCount] = Listing(
            listingCount,
            msg.sender,
            _amount,
            _price,
            false
        );

        // Transfer tokens to marketplace contract
        token.transferFrom(msg.sender, address(this), _amount);
    }

    // Buyer buys electricity credits
    function buyElectricity(uint _id) public payable {
        Listing storage item = listings[_id];

        require(!item.sold, "Already sold");
        require(msg.value >= item.price, "Not enough ETH");

        item.sold = true;

        // Pay seller
        payable(item.seller).transfer(item.price);

        // Send tokens to buyer
        token.transfer(msg.sender, item.amount);
    }
}
