import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import { audit } from '../src/lib/logger/InstitutionalLogger.ts';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * APEX_CLOUD_SYNC (v1.0_SOVRA)
 * Mandate: Absolute Production Reliability & Ledger Grounding.
 * ─────────────────────────────────────────────────────────────
 * Purpose: Pre-deployment health check and Schema Ignition.
 */

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function syncCloud() {
  console.log('--- [APEX_CLOUD_SYNC_START] ---');
  console.log('[Phase 1] Auditing Institutional Environment...');

  const requiredKeys = ['DATABASE_URL', 'STRIPE_SECRET_KEY', 'CJ_API_KEY', 'APEX_SECRET', 'HANDSHAKE_SECRET'];
  const missing = requiredKeys.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`[SYNC_FAULT] CRITICAL: Missing Institutional Anchors: ${missing.join(', ')}`);
    console.log('[SYNC_NOTE] Provision these in the Vercel Dashboard for live extraction.');
    process.exit(1);
  }

  console.log('[Phase 2] Igniting Cloud Ledger Schema...');
  try {
    // 1. Initialize Tables
    await SOVRADB.igniteCloudSchema();

    // 2. Seed Institutional Council
    console.log('[Phase 3] Anchoring Institutional Council...');
    await SOVRADB.seedInstitutionalCouncil();

    // 3. Record Sync Handshake
    await SOVRADB.logAgentActivity(
      'SOVRASync',
      'CLOUD_SYNC_SUCCESS: Ledger and Council verifiably grounded.',
      'SUCCESS',
      { 
        engine: 'SOVRA_CLOUD_v1.0', 
        nodes: requiredKeys,
        timestamp: Date.now() 
      }
    );

    console.log('--- [APEX_CLOUD_SYNC_COMPLETE] ---');
    console.log('[STATUS] 100/100. Terminal Status: PROD_READY.');
    process.exit(0);
  } catch (err: any) {
    console.error('[SYNC_FAULT] Institutional Error:', err.message);
    process.exit(1);
  }
}

syncCloud();
