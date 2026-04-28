#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Full sandbox validation for the AntiGravity repo
# ------------------------------------------------------------
# 1. Install dependencies (read‑only, no changes to package files)
# 2. Lint & TypeScript check
# 3. Refresh market prices
# 4. Run Ollama health test
# 5. Generate the AnimAI comic (book + video)
# 6. Build all productivity PWAs
# ------------------------------------------------------------

echo "\n=== Installing deps (npm ci) ==="
npm ci

echo "\n=== Linting ==="
npm run lint || { echo "Lint failed"; exit 1; }

echo "\n=== TypeScript type‑check ==="
npx tsc --noEmit || { echo "TS check failed"; exit 1; }

echo "\n=== Updating market prices ==="
npm run update-market-prices

echo "\n=== Ollama health check ==="
npx ts-node xoras/core/ai/test-ollama.ts || { echo "Ollama health check failed"; exit 1; }

echo "\n=== Generating AnimAI comic ==="
npm run generate-comic || { echo "Comic generation failed"; exit 1; }

echo "\n=== Building productivity apps ==="
npm run build-apps || { echo "App build failed"; exit 1; }

echo "\n✅ Sandbox validation completed successfully."
