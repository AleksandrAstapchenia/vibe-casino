# Vibe Casino — Ethereum Sepolia

On-chain verifiable crypto casino for the Vibe-Code Challenge. Coin flip on **Ethereum Sepolia** with MetaMask, internal balance, and Etherscan-auditable events.

## Live links

| Resource | URL |
|---|---|
| **GitHub** | https://github.com/AleksandrAstapchenia/vibe-casino |
| **Live frontend (GitHub Pages)** | https://aleksandrastapchenia.github.io/vibe-casino/ |
| **Dev tunnel (local Next.js)** | https://firmware-organizing-findlaw-ohio.trycloudflare.com |
| **Sepolia contract** | _pending funding — see below_ |
| **Deployer wallet** | `0x2cB6bab0579b45F7F4a489392eaeE2666f822E05` |

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

## What works

- [x] MetaMask connect (RainbowKit)
- [x] Wrong-network guard + switch to Sepolia
- [x] Deposit / play / withdraw UI + explorer links
- [x] House edge + bankroll display
- [x] Foundry tests (5/5 pass)
- [x] GitHub repo + GitHub Pages deploy
- [x] Local Anvil deploy verified (`0x59617Aa252CFB91ACe92902Ec82aBb036a0Df2C1` on chain 31337)

## Pending (blocked by Sepolia faucet captcha)

- [ ] **Sepolia contract deploy** — deployer wallet needs test ETH from a human-verified faucet
- [ ] **Vercel** — CLI requires interactive login (`vercel login`); GitHub Pages used instead

### Finish Sepolia deploy (2 min)

1. Fund deployer on Sepolia (0.05 ETH is enough):
   - https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - https://www.alchemy.com/faucets/ethereum-sepolia
   - Address: `0x2cB6bab0579b45F7F4a489392eaeE2666f822E05`

2. Deploy + update frontend env:
```bash
./scripts/bootstrap.sh
cd frontend && npm run build
# redeploy gh-pages from frontend/out (see scripts/deploy-pages.sh)
```

3. Optional Vercel (after `vercel login`):
```bash
cd frontend
vercel --prod
# set NEXT_PUBLIC_CASINO_ADDRESS + NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

## Local dev

```bash
# terminal 1
anvil

# terminal 2
cp .env.example .env   # set PRIVATE_KEY=0x...
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# terminal 3
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_CASINO_ADDRESS=<from broadcast log>
npm run dev
```

## Env files (already created locally, gitignored)

**Root `.env`**
```
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=0x540d993b4762fa76fd982b8416b01ea817afdabfde9eb67b5aaeceda2c51e418
HOUSE_SEED_ETH=1000000000000000000
DEPLOYER_ADDRESS=0x2cB6bab0579b45F7F4a489392eaeE2666f822E05
```

**`frontend/.env.local`**
```
NEXT_PUBLIC_CASINO_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=c4f8b2e1d7a9460f9b3e2c1d8a7f6e5b
```

> ⚠️ Deployer private key is in local `.env` only (gitignored). Rotate before mainnet.

## Hardest unknown (for Loom)

**Sepolia faucet automation in CI** — public faucets require captcha / mainnet balance proof. Automated Playwright + Chainlink API both failed from this environment. Solution: pre-generate deployer wallet, host frontend, deploy contract immediately once faucet funds arrive.

## Next steps

1. Chainlink VRF on Sepolia for provably fair randomness
2. In-app history from `CoinFlipPlayed` events
3. Second game (dice) on same balance contract

## AI tools (bonus)

- **Worked:** Foundry scaffold, wagmi/RainbowKit UI, GitHub Pages deploy, Playwright faucet attempts, Anvil local E2E
- **Didn't:** Unattended Sepolia faucet (captcha), Vercel OAuth (needs browser login), WalletConnect Cloud project creation (needs account)

## License

MIT
