import { InstitutionalTreasury } from '../../agency/lib/core/InstitutionalTreasury.ts';
import dotenv from 'dotenv';
import path from 'path';

// Force-load institutional environment
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * SETTLE_HANDSHAKE (v20.0 - APEX)
 * Mandate: Verifiable Wealth Settlement.
 * Executes a $0.50 strike to trigger the physical settlement bridge.
 */
async function executeHandshake() {
  console.log('--- [APEX_SETTLE_HANDSHAKE_IGNITION] ---');
  
  const result = await InstitutionalTreasury.lockInCapture(
    'Institutional_Handshake_Pulse', 
    0.50,
    { type: 'HANDSHAKE', workers: 100000, mastery: '10x' }
  );

  if (result.success) {
    console.log('[Handshake] SUCCESS: Pulse grounded and bridge triggered.');
  } else {
    console.error('[Handshake] FAULT:', result.error);
  }

  console.log('--- [HANDSHAKE_COMPLETE] ---');
}

executeHandshake().catch(err => {
  console.error('[Handshake] CRITICAL_FAULT:', err);
  process.exit(1);
});
