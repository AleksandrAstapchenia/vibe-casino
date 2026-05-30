import { type Abi } from "viem";

export const CASINO_ADDRESS = (process.env.NEXT_PUBLIC_CASINO_ADDRESS ??
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const SEPOLIA_CHAIN_ID = 11155111;

export const casinoAbi = [
  {
    type: "function",
    name: "deposit",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "withdraw",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "playCoinFlip",
    stateMutability: "nonpayable",
    inputs: [
      { name: "choiceHeads", type: "bool" },
      { name: "betAmount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "balances",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "MIN_BET",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "MAX_BET",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "houseBalance",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "CoinFlipPlayed",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "betAmount", type: "uint256", indexed: false },
      { name: "choiceHeads", type: "bool", indexed: false },
      { name: "resultHeads", type: "bool", indexed: false },
      { name: "won", type: "bool", indexed: false },
      { name: "payout", type: "uint256", indexed: false },
      { name: "entropy", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "Deposited",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "newBalance", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "Withdrawn",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "newBalance", type: "uint256", indexed: false },
    ],
  },
] as const satisfies Abi;

export const MIN_BET_ETH = 0.001;
export const MAX_BET_ETH = 0.1;
export const PAYOUT_MULTIPLIER = 1.95;
export const HOUSE_EDGE_PERCENT = 2.5;

export function explorerTxUrl(hash: string) {
  return `https://sepolia.etherscan.io/tx/${hash}`;
}

export function explorerAddressUrl(address: string) {
  return `https://sepolia.etherscan.io/address/${address}`;
}
