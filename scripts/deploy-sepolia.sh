#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  cp .env.example .env
fi

# shellcheck disable=SC1091
source .env

DEPLOYER="${DEPLOYER_ADDRESS:-}"
if [[ -z "$DEPLOYER" && -n "${PRIVATE_KEY:-}" ]]; then
  DEPLOYER="$(cast wallet address "$PRIVATE_KEY")"
fi

if [[ -z "$DEPLOYER" ]]; then
  echo "Missing PRIVATE_KEY in .env"
  exit 1
fi

echo "Deployer: $DEPLOYER"
echo "Waiting for Sepolia balance..."

for i in $(seq 1 120); do
  BAL="$(cast balance "$DEPLOYER" --rpc-url "$SEPOLIA_RPC_URL" 2>/dev/null || echo 0)"
  if [[ "$BAL" != "0" ]]; then
    echo "Funded: $(cast from-wei "$BAL") ETH"
    break
  fi
  if [[ "$i" -eq 1 ]]; then
    echo "Fund this address via faucet: $DEPLOYER"
    echo "  https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
    echo "  https://www.alchemy.com/faucets/ethereum-sepolia"
  fi
  sleep 5
done

BAL="$(cast balance "$DEPLOYER" --rpc-url "$SEPOLIA_RPC_URL")"
if [[ "$BAL" == "0" ]]; then
  echo "Timed out waiting for Sepolia ETH."
  exit 1
fi

forge script script/Deploy.s.sol \
  --rpc-url "$SEPOLIA_RPC_URL" \
  --broadcast \
  -vvv

LATEST="$(find broadcast/Deploy.s.sol -name 'run-latest.json' | head -1)"
if [[ -n "$LATEST" ]]; then
  ADDR="$(python3 - <<'PY' "$LATEST"
import json, sys
data = json.load(open(sys.argv[1]))
for tx in data.get("transactions", []):
    if tx.get("contractName") == "CryptoCasino":
        print(tx["contractAddress"])
        break
PY
)"
  if [[ -n "$ADDR" ]]; then
    echo "CASINO_ADDRESS=$ADDR"
    mkdir -p frontend
    cat > frontend/.env.local <<EOF
NEXT_PUBLIC_CASINO_ADDRESS=$ADDR
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:-b4c8e2f1a9d7436e8f0c2b5a7e1d9342}
EOF
  fi
fi
