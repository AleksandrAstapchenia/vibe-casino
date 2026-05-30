# Vibe Casino — Ethereum Sepolia

On-chain verifiable crypto casino for the [Vibe-Code Challenge](https://t.me/ryazhenkacustomers). Coin flip on **Ethereum Sepolia** with MetaMask, internal balance, and Etherscan-auditable events.

## Stack choice: Ethereum Sepolia

| Why Ethereum | Why not Solana (for this deadline) |
|---|---|
| MetaMask + wagmi/RainbowKit = fastest wallet UX polish | Anchor/Rust learning curve eats polish time |
| Etherscan verification judges expect | Devnet faucets + program deploy more friction |
| Native ETH — no custom token | |
| `block.prevrandao` RNG in 1 tx | |
| Foundry deploy + test in minutes | |

**Game:** Coin flip (50/50, **1.95× payout**, **2.5% house edge**)

**On-chain verifiability:**
- Deposits → `Deposited` event + contract balance ↑
- Play → `CoinFlipPlayed` with `entropy`, `resultHeads`, `won`, `payout`
- Withdraw → `Withdrawn` event + ETH transfer to wallet
- Contract address visible in UI → full audit on [Sepolia Etherscan](https://sepolia.etherscan.io)

## What works

- [x] MetaMask connect (RainbowKit)
- [x] Wrong-network guard + switch to Sepolia
- [x] Deposit Sepolia ETH into casino balance
- [x] Coin flip (heads/tails) from internal balance
- [x] Withdraw back to wallet
- [x] Explorer links for contract + every tx
- [x] House edge + bankroll displayed
- [x] Error states (validation, rejected tx)

## What doesn't (yet)

- [ ] Chainlink VRF (using `prevrandao` — fine for testnet, documented tradeoff)
- [ ] Mobile WalletConnect deep polish
- [ ] On-chain game history UI (events are on Etherscan)
- [ ] Multiple games

## Quick start

### 1. Contracts

```bash
# Install Foundry: curl -L https://foundry.paradigm.xyz | bash && foundryup
forge test
cp .env.example .env   # set PRIVATE_KEY + RPC
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

Fund deployer with Sepolia ETH: [Google faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) or [Alchemy faucet](https://www.alchemy.com/faucets/ethereum-sepolia).

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_CASINO_ADDRESS=<deployed address>
# NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<from cloud.walletconnect.com>
npm run dev
```

Deploy to Vercel: set root directory `frontend`, add env vars, deploy.

## Hardest unknown (for Loom)

**`block.prevrandao` as RNG on a testnet casino** — understanding that VRF is ideal but adds latency + oracle setup; for 48h, prevrandao + emitted `entropy` gives single-tx UX with explorer-verifiable outcomes. Document the trust model honestly in README.

## Next steps

1. Chainlink VRF v2.5 on Sepolia for provably fair randomness
2. Second game (dice / limbo) sharing same balance contract
3. Index `CoinFlipPlayed` events for in-app history
4. Bankroll analytics dashboard for house edge verification

## AI tools (bonus)

- **Worked:** Scaffold (Foundry + Next.js), ABI wiring, Tailwind layout, README structure, test fixes with `vm.prevrandao`
- **Didn't:** Blind contract deploy (still needs manual key + faucet); WalletConnect project ID must be human-created

## Project structure

```
├── src/CryptoCasino.sol      # Core contract
├── script/Deploy.s.sol       # Sepolia deploy
├── test/CryptoCasino.t.sol   # Foundry tests
└── frontend/                 # Next.js + wagmi + RainbowKit
```

## License

MIT
