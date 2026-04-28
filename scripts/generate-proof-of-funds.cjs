#!/usr/bin/env node
/**
 * generate-proof-of-funds.js
 *
 * This script creates a cryptographically‑signed proof of the current assets
 * recorded in src/data/ledger.json. The output consists of:
 *   • proof.json – machine‑readable signed payload
 *   • proof.pdf  – human‑readable summary with QR code (optional)
 *
 * Usage:
 *   $ PROOF_PRIVATE_KEY=$(cat proof_private.pem | base64 -w0) \ 
 *     node scripts/generate-proof-of-funds.js [--pdf]
 *
 * The private key must be supplied via the PROOF_PRIVATE_KEY environment
 * variable (base64‑encoded PEM). The matching public key (proof_public.pem) is
 * shared with the bank for verification.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { JWS } = require('jose'); // npm i jose
const PDFDocument = require('pdfkit'); // npm i pdfkit
const QRCode = require('qrcode'); // npm i qrcode

// ---------- Configuration ----------
const LEDGER_PATH = path.resolve(__dirname, '..', 'src', 'data', 'ledger.json');
const OUTPUT_JSON = path.resolve(__dirname, '..', 'proof-of-funds.json');
const OUTPUT_PDF  = path.resolve(__dirname, '..', 'proof-of-funds.pdf');

// ---------- Helper: Load private key ----------
function loadPrivateKey() {
  const b64 = process.env.PROOF_PRIVATE_KEY;
  if (!b64) {
    console.error('❌ PROOF_PRIVATE_KEY env var not set.');
    process.exit(1);
  }
  const pem = Buffer.from(b64, 'base64').toString('utf-8');
  return crypto.createPrivateKey(pem);
}

// ---------- Helper: Aggregate assets ----------
function aggregateAssets(ledger) {
  const liquid = ledger.liquidAssets || ledger.liquid || {};
  const cryptoAssets = ['btc', 'eth', 'weth', 'sol', 'avax', 'matic'];
  let totalUsd = 0;

  // Cash and stable-coins
  if (typeof liquid.cash === 'number') totalUsd += liquid.cash;
  if (typeof liquid.usdt === 'number') totalUsd += liquid.usdt;
  if (liquid.usdt && typeof liquid.usdt.balance === 'number') totalUsd += liquid.usdt.balance;
  if (liquid.usdc && typeof liquid.usdc.balance === 'number') totalUsd += liquid.usdc.balance;
  if (liquid.dai && typeof liquid.dai.balance === 'number') totalUsd += liquid.dai.balance;
  
  // Handle SOVRA pools and other holdings in the ledger structure
  if (typeof liquid.SOVRA_APEXPool === 'number') totalUsd += liquid.SOVRA_APEXPool;
  if (typeof liquid.cryptoHoldings === 'number') totalUsd += liquid.cryptoHoldings;
  if (typeof liquid.cashapp_liquidity === 'number') totalUsd += liquid.cashapp_liquidity;

  // Crypto – each entry may already contain usdValue if update-market-prices ran
  cryptoAssets.forEach(sym => {
    const entry = liquid[sym];
    if (entry && typeof entry.usdValue === 'number') {
      totalUsd += entry.usdValue;
    } else if (entry && typeof entry.balance === 'number' && entry.priceUsd) {
      totalUsd += entry.balance * entry.priceUsd;
    }
  });

  // If there is a total field and it's larger than our sum, maybe use it? 
  // No, let's be conservative and use our calculated sum unless it's zero.
  if (totalUsd === 0 && typeof liquid.total === 'number') {
    totalUsd = liquid.total;
  }

  return { totalUsd };
}

// ---------- Main execution ----------
(async () => {
  // Load ledger
  const rawLedger = fs.readFileSync(LEDGER_PATH, 'utf-8');
  const ledger = JSON.parse(rawLedger);

  // Compute hash of the entire ledger (ensures immutability)
  const ledgerHash = crypto.createHash('sha256').update(rawLedger).digest('hex');

  // Aggregate assets
  const { totalUsd } = aggregateAssets(ledger);

  // Build payload
  const payload = {
    timestamp: new Date().toISOString(),
    totalUsd: Number(totalUsd.toFixed(2)),
    ledgerHash,
    source: 'AntiGravity Enterprise',
    version: '1.0',
    notes: 'Signed proof of funds for loan application.'
  };

  // Sign payload with JWS (RS256)
  const privateKey = loadPrivateKey();
  const { CompactSign } = require('jose');
  const encoder = new TextEncoder();
  const jws = await new CompactSign(encoder.encode(JSON.stringify(payload)))
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .sign(privateKey);

  // Write JSON output
  const jsonOut = { payload, signature: jws };
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonOut, null, 2), 'utf-8');
  console.log('✅ proof-of-funds.json generated');

  // Optional PDF generation – triggered with --pdf flag
  if (process.argv.includes('--pdf')) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(OUTPUT_PDF);
    doc.pipe(stream);

    // Header
    doc.fontSize(20).text('AntiGravity – Proof of Funds', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${payload.timestamp}`);
    doc.text(`Total USD Value: $${payload.totalUsd.toLocaleString()}`);
    doc.text(`Ledger SHA‑256: ${ledgerHash}`);
    doc.moveDown();

    // QR‑code containing the signed JSON (base64)
    const qrData = Buffer.from(JSON.stringify(jsonOut)).toString('base64');
    const qrImage = await QRCode.toDataURL(qrData, { margin: 1, width: 200 });
    const imgData = qrImage.replace(/^data:image\/png;base64,/, '');
    const imgBuffer = Buffer.from(imgData, 'base64');
    doc.image(imgBuffer, { fit: [150, 150], align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text('Scan the QR code to retrieve the full signed JSON.', { align: 'center' });

    doc.end();
    stream.on('finish', () => console.log('✅ proof-of-funds.pdf generated'));
  }
})();
