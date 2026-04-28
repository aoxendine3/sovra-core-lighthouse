import { SOVRADB } from '@/lib/db/SOVRADB';

/**
 * Enterprise Setup: Multi-Store Registration
 * Direct Handover of Vivian's login credentials to the Sovereign Ledger.
 */
async function setupStores() {
  const stores = [
    { url: 'https://stunningchoicemart.shop', niche: 'General/Arbitrage', email: 'co.trendzone@gmail.com' },
    { url: 'https://qualitygeek.shop', niche: 'Tech/Productivity', email: 'co.trendzone@gmail.com' },
    { url: 'https://elegantmodish.shop', niche: 'Lifestyle/Aesthetics', email: 'co.trendzone@gmail.com' }
  ];

  for (const store of stores) {
    await SOVRADB.registerStore(store.url, store.niche, store.email);
  }
}

setupStores();
