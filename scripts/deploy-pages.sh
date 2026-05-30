#!/usr/bin/env bash
set -euo pipefail
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT/frontend"
npm run build
cd out
git init -q
git checkout -B gh-pages
git add .
git commit -m "Update GitHub Pages build" -q
git push -f "https://x-access-token:${GITHUB_TOKEN}@github.com/AleksandrAstapchenia/vibe-casino.git" gh-pages
echo "https://aleksandrastapchenia.github.io/vibe-casino/"
