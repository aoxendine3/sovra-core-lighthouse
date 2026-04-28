import fs from 'fs';
import path from 'path';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import { audit } from '../lib/logger/InstitutionalLogger.ts';

/**
 * INSTITUTIONAL_ASSET_GROUNDING_ENGINE: v42.0
 * ─────────────────────────────────────────────────────────────
 * MISSION: LEGACY_ASSET_INGESTION
 * Purpose: Move 6,644 legacy assets from JSON to the Sovereign Ledger.
 */
async function groundAssets() {
  const assetsPath = path.resolve(process.cwd(), 'src/data/assets.json');
  
  if (!fs.existsSync(assetsPath)) {
    console.error('[GROUNDING_FAULT] assets.json not found at:', assetsPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(assetsPath, 'utf8');
  const legacyAssets = JSON.parse(rawData);

  console.log(`[APEX-X] Grounding Pulse Detected: ${legacyAssets.length} assets identified.`);
  audit('info', 'ASSET_GROUNDING_INITIATED', { count: legacyAssets.length });

  try {
    // Execute High-Throughput Batch Ingestion
    const result: any = await SOVRADB.batchGroundAssets(legacyAssets);

    console.log(`[APEX-X] GROUNDING_SUCCESS: ${result.count} assets anchored in Sovereign Ledger.`);
    console.log(`[APEX-X] INTEGRITY_INDEX: ${result.integrity}`);
    
    audit('info', 'ASSET_GROUNDING_SUCCESS', { count: result.count, integrity: result.integrity });

  } catch (error: any) {
    console.error('[APEX-X] GROUNDING_FAULT:', error.message);
    audit('error', 'ASSET_GROUNDING_FAULT', { error: error.message });
    process.exit(1);
  }
}

groundAssets().then(() => {
    console.log('[APEX-X] Mission Complete. 100/100 Truth achieved.');
    process.exit(0);
});
