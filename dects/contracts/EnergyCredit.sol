// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEnergyToken {
    function mint(address to, uint256 amount) external;
}

contract EnergyCredit {

    address public admin;
    IEnergyToken public energyToken;

    struct EnergyRecord {
        uint256 unitsProduced;
        uint256 timestamp;
    }

    mapping(address => EnergyRecord[]) public records;

    event EnergySubmitted(
        address indexed user,
        uint256 units,
        uint256 reward
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(address _tokenAddress) {
        admin = msg.sender;
        energyToken = IEnergyToken(_tokenAddress);
    }

    // Submit produced energy
    function submitEnergy(
        address user,
        uint256 unitsProduced
    ) external onlyAdmin {

        require(unitsProduced > 0, "Invalid units");

        uint256 reward = calculateReward(unitsProduced);

        records[user].push(
            EnergyRecord(
                unitsProduced,
                block.timestamp
            )
        );

        energyToken.mint(user, reward);

        emit EnergySubmitted(user, unitsProduced, reward);
    }

    // Reward Logic
    function calculateReward(
        uint256 units
    ) public pure returns (uint256) {

        // 1 kWh = 1 Token
        return units * 1 ether;
    }

    function getUserRecords(address user)
        external
        view
        returns (EnergyRecord[] memory)
    {
        return records[user];
    }
}
