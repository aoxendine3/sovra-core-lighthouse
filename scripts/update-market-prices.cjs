// scripts/update-market-prices.js
/**
 * Update liquid asset USD valuations in src/data/ledger.json using CoinGecko.
 * It reads the current ledger, fetches live prices for supported assets, and
 * writes back the ledger with added `usdValue` fields under each asset.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const LEDGER_PATH = path.resolve(__dirname, '..', 'src', 'data', 'ledger.json');

// Mapping from ledger key to CoinGecko ID
const COINGECKO_MAP = {
  eth: 'ethereum',
  btc: 'bitcoin',
  usdt: 'tether',
  usdc: 'usd-coin',
  dai: 'dai',
  matic: 'polygon',
  sol: 'solana',
  avax: 'avalanche-2',
  weth: 'weth',
  usdt_bridge: 'tether', // same price as USDT
};

function fetchPrices(ids) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  const raw = fs.readFileSync(LEDGER_PATH, 'utf-8');
  const ledger = JSON.parse(raw);
  const liquid = ledger.liquidAssets || ledger.liquid || {};

  const ids = Object.keys(liquid)
    .filter((k) => COINGECKO_MAP[k])
    .map((k) => COINGECKO_MAP[k]);

  console.log('Fetching live prices for:', ids.join(', '));
  const priceData = await fetchPrices([...new Set(ids)]);

  let totalUsd = 0;
  for (const [key, balance] of Object.entries(liquid)) {
    const cgId = COINGECKO_MAP[key];
    if (!cgId) continue; // skip assets we don't price
    const price = priceData[cgId]?.usd || 0;
    
    // Handle both raw numbers and object balances
    const currentBalance = typeof balance === 'object' ? balance.balance : balance;
    const usdValue = Number(currentBalance) * price;
    
    liquid[key] = {
      balance: currentBalance,
      usdValue: Number(usdValue.toFixed(2)),
      priceUsd: price,
    };
    totalUsd += usdValue;
  }

  // Also include the fixed cash/pool/holdings in totalUsd for the ledger-wide total
  if (liquid.cash) totalUsd += liquid.cash;
  if (liquid.SOVRA_APEXPool) totalUsd += liquid.SOVRA_APEXPool;
  if (liquid.cryptoHoldings) totalUsd += liquid.cryptoHoldings;
  if (liquid.cashapp_liquidity) totalUsd += liquid.cashapp_liquidity;

  if (ledger.liquidAssets) {
    ledger.liquidAssets = liquid;
  } else {
    ledger.liquid = liquid;
  }
  
  ledger.totalLiquidUsd = Number(totalUsd.toFixed(2));
  ledger.lastPriceUpdate = new Date().toISOString();

  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + '\n', 'utf-8');
  console.log('✅ Ledger updated with live USD values. Total liquid USD:', ledger.totalLiquidUsd);
})();
