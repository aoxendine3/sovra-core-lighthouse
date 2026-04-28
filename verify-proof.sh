#!/usr/bin/env bash
set -euo pipefail

# -------------------------------------------------
# 1️⃣ Verify ledger hash matches the proof
# -------------------------------------------------
# We calculate the hash of the current ledger and compare it to the one in the proof.
LEDGER_FILE="src/data/ledger.json"
PROOF_FILE="proof-of-funds.json"

if [ ! -f "$LEDGER_FILE" ]; then
  echo "❌ Error: $LEDGER_FILE not found."
  exit 1
fi

if [ ! -f "$PROOF_FILE" ]; then
  echo "❌ Error: $PROOF_FILE not found. Run generate-proof-of-funds.js first."
  exit 1
fi

LEDGER_HASH=$(openssl dgst -sha256 "$LEDGER_FILE" | awk '{print $2}')
PROOF_HASH=$(jq -r '.payload.ledgerHash' "$PROOF_FILE")

if [ "$LEDGER_HASH" = "$PROOF_HASH" ]; then
  echo "✅ Ledger hash matches."
else
  echo "❌ Ledger hash MISMATCH!"
  echo "Current Ledger Hash: $LEDGER_HASH"
  echo "Hash in Proof:      $PROOF_HASH"
  exit 1
fi

# -------------------------------------------------
# 2️⃣ Verify total USD matches ledger numbers
# -------------------------------------------------
# We sum up the liquid assets from the ledger and compare to the proof's total.
TOTAL_LEDGER=$(jq -r '
  (.liquidAssets // .liquid) | (
    .cash
    + (.usdt.balance // .usdt // 0)
    + (.usdc.balance // .usdc // 0)
    + (.dai.balance // .dai // 0)
    + (.SOVRA_APEXPool // 0)
    + (.cryptoHoldings // 0)
    + (.cashapp_liquidity // 0)
    + (.btc.usdValue // 0)
    + (.eth.usdValue // 0)
    + (.weth.usdValue // 0)
    + (.sol.usdValue // 0)
    + (.avax.usdValue // 0)
    + (.matic.usdValue // 0)
  )
' "$LEDGER_FILE" | bc -l)

PROOF_TOTAL=$(jq -r '.payload.totalUsd' "$PROOF_FILE")

# Format to 2 decimal places for comparison
F_TOTAL_LEDGER=$(printf "%.2f" "$TOTAL_LEDGER")
F_PROOF_TOTAL=$(printf "%.2f" "$PROOF_TOTAL")

if [ "$F_TOTAL_LEDGER" = "$F_PROOF_TOTAL" ]; then
  echo "✅ Total USD matches ($F_PROOF_TOTAL)."
else
  echo "❌ Total USD MISMATCH!"
  echo "Sum from Ledger: $F_TOTAL_LEDGER"
  echo "Total in Proof:  $F_PROOF_TOTAL"
  exit 1
fi

# -------------------------------------------------
# 3️⃣ Verify RSA signature (needs the public key)
# -------------------------------------------------
PUBLIC_KEY_FILE="proof_public.pem"
if [ ! -f "$PUBLIC_KEY_FILE" ]; then
  echo "❌ Error: $PUBLIC_KEY_FILE not found."
  exit 1
fi

# We use node to verify the signature using the 'jose' library
npm i jose@latest > /dev/null 2>&1

node - <<'NODE'
const fs = require('fs');
const { jwtVerify, importSPKI } = require('jose');
const crypto = require('crypto');

async function verify() {
  try {
    const publicKeyPem = fs.readFileSync('proof_public.pem', 'utf-8');
    const publicKey = await importSPKI(publicKeyPem, 'RS256');
    const proof = JSON.parse(fs.readFileSync('proof-of-funds.json', 'utf-8'));

    const { payload } = await jwtVerify(proof.signature, publicKey, { 
      algorithms: ['RS256'] 
    });

    console.log('✅ Signature valid.');
    console.log(`   Signed Timestamp: ${payload.timestamp}`);
    console.log(`   Signed Total USD: $${payload.totalUsd.toLocaleString()}`);
  } catch (e) {
    console.error('❌ Signature verification failed:', e.message);
    process.exit(1);
  }
}

verify();
NODE
