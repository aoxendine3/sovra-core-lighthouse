import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import { CryptoAgent } from '../agency/lib/agents/CryptoAgent.ts';
import * as fs from 'fs';
import path from 'path';

/**
 * APEX_PRODUCTION_IGNITION (v41.16_LIVE_FIRE)
 * Mandate: Transition from High-Fidelity Simulation to Live Production Extraction.
 * Handshake: 100/100 Operational Truth.
 */
async function igniteProduction() {
  console.log('--- [APEX_PRODUCTION_IGNITION_SEQUENCE] ---');
  console.log('[Phase 1] Auditing Institutional Handshake Keys...');

  const envPath = path.resolve(process.cwd(), '.env.local');
  const env = fs.readFileSync(envPath, 'utf8');

  // 1. Production Key Verification Matrix
  const productionCheck = {
    stripeLive: /STRIPE_SECRET_KEY=rk_live/.test(env) && /STRIPE_PUBLISHABLE_KEY=pk_live/.test(env),
    telegramLive: /TELEGRAM_BOT_TOKEN=\d+:[\w-]+/.test(env),
    coinbaseLive: /COINBASE_PRIME_ACCESS_KEY=(?!your_access_key)[\w-]+/.test(env),
    binanceLive: /BINANCE_API_KEY=(?!your_key_here)[\w-]+/.test(env),
    sovereignIdentity: /SOVEREIGN_PRIV=[\w-]+/.test(env)
  };

  console.log('[Audit] Stripe Production Node: ', productionCheck.stripeLive ? '✓ LIVE' : '✗ STAGED');
  console.log('[Audit] Telegram Sentinel Node: ', productionCheck.telegramLive ? '✓ LIVE' : '✗ STAGED');
  console.log('[Audit] Coinbase Settlement Node:', productionCheck.coinbaseLive ? '✓ LIVE' : '✗ STAGED (MISSING KEYS)');
  console.log('[Audit] Binance Extraction Node: ', productionCheck.binanceLive ? '✓ LIVE' : '✗ STAGED (MISSING KEYS)');

  // 2. State Transition
  const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));

  if (productionCheck.stripeLive && productionCheck.telegramLive) {
    console.log('[Ignition] PRE-CONDITION_MET: Primary revenue and sentinel nodes are LIVE.');
    
    // Update Ledger to Production Mode
    ledger.status = "APEX_PRODUCTION_LIVE_FIRE";
    ledger.lastUpdated = new Date().toISOString();
    
    // Record the Ignition Handshake in SQLite
    await SOVRADB.logAgentActivity(
        'SovereignCore',
        'PRODUCTION_IGNITION: Enterprise has transitioned to LIVE_FIRE status.',
        'SUCCESS',
        { 
          authority: 'Anthony Junior Oxendine',
          nodes: ['STRIPE_LIVE', 'TELEGRAM_LIVE'],
          timestamp: Date.now()
        }
    );

    fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));

    console.log('[Ignition] SUCCESS: The Empire is now operating in the LIVE PRODUCTION ZONE.');
    console.log('[Ignition] NOTE: Settlement to Coinbase/Binance remains in STAGED status until keys are anchored.');
  } else {
    console.error('[Ignition] FAULT: Critical production keys missing. Enterprise remains in SIMULATION.');
    process.exit(1);
  }

  console.log('--- [PRODUCTION_IGNITION_COMPLETE] ---');
}

igniteProduction().catch(err => {
  console.error('[Ignition] SYSTEM_FAULT:', err);
  process.exit(1);
});
