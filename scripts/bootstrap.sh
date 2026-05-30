#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.foundry/bin:$PATH"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  OUT=$(cast wallet new)
  echo "$OUT"
  ADDR=$(echo "$OUT" | awk '/Address:/ {print $2}')
  PK=$(echo "$OUT" | awk '/Private key:/ {print $3}' | sed 's/^0x//')
  cat > .env <<EOF
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=$PK
HOUSE_SEED_ETH=1000000000000000000
DEPLOYER_ADDRESS=$ADDR
EOF
fi

# shellcheck disable=SC1091
source .env
DEPLOYER="${DEPLOYER_ADDRESS:-$(cast wallet address "$PRIVATE_KEY")}"
WALLETCONNECT_ID="${NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:-c4f8b2e1d7a9460f9b3e2c1d8a7f6e5b}"

echo "Deployer: $DEPLOYER"
BAL="$(cast balance "$DEPLOYER" --rpc-url "$SEPOLIA_RPC_URL")"
echo "Balance: $(cast from-wei "$BAL") ETH"

if [[ "$BAL" == "0" ]]; then
  export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
  node scripts/claim-faucet.mjs "$DEPLOYER" || true
  sleep 25
  BAL="$(cast balance "$DEPLOYER" --rpc-url "$SEPOLIA_RPC_URL")"
fi

if [[ "$BAL" == "0" ]]; then
  echo "No Sepolia ETH yet for $DEPLOYER"
  exit 1
fi

forge script script/Deploy.s.sol --rpc-url "$SEPOLIA_RPC_URL" --broadcast -vvv

LATEST="$(find broadcast/Deploy.s.sol -name 'run-latest.json' | head -1)"
ADDR="$(python3 - <<PY
import json
from pathlib import Path
p = Path("$LATEST")
data = json.loads(p.read_text())
for tx in data.get("transactions", []):
    if tx.get("contractName") == "CryptoCasino":
        print(tx["contractAddress"])
        break
PY
)"

cat > frontend/.env.local <<EOF
NEXT_PUBLIC_CASINO_ADDRESS=$ADDR
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=$WALLETCONNECT_ID
EOF

echo "Deployed: $ADDR"
echo "https://sepolia.etherscan.io/address/$ADDR"
