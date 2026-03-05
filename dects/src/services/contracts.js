/**
 * Smart Contract Addresses and ABIs
 */

// =================== CONTRACT ADDRESSES ===================
// UPDATE THESE WITH YOUR DEPLOYED CONTRACT ADDRESSES

export const CONTRACT_ADDRESSES = {
  ENERGY_TOKEN: process.env.REACT_APP_TOKEN_ADDRESS || "0x...",
  ENERGY_CREDIT: process.env.REACT_APP_CREDIT_ADDRESS || "0x...",
  MARKETPLACE: process.env.REACT_APP_MARKETPLACE_ADDRESS || "0x...",
  BILLING: process.env.REACT_APP_BILLING_ADDRESS || "0x..."
};

// =================== ERC20 ABI (Token) ===================
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function"
  }
];

// =================== ENERGY CREDIT ABI ===================
export const ENERGY_CREDIT_ABI = [
  {
    name: "submitEnergy",
    type: "function",
    inputs: [
      { name: "user", type: "address" },
      { name: "unitsProduced", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    name: "getUserRecords",
    type: "function",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "tuple[]" }],
    stateMutability: "view"
  }
];

// =================== MARKETPLACE ABI ===================
export const MARKETPLACE_ABI = [
  {
    name: "listTokens",
    type: "function",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "price", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    name: "buyTokens",
    type: "function",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [],
    stateMutability: "payable"
  },
  {
    name: "listings",
    type: "function",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "id", type: "uint256" },
      { name: "seller", type: "address" },
      { name: "tokenAmount", type: "uint256" },
      { name: "price", type: "uint256" },
      { name: "active", type: "bool" }
    ],
    stateMutability: "view"
  }
];

// =================== BILLING MANAGER ABI ===================
export const BILLING_ABI = [
  {
    name: "redeemTokens",
    type: "function",
    inputs: [
      { name: "user", type: "address" },
      { name: "billAmount", type: "uint256" },
      { name: "tokenAmount", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    name: "getBills",
    type: "function",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "tuple[]" }],
    stateMutability: "view"
  }
];
