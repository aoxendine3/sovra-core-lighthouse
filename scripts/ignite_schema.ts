import { SOVRADB } from '../agency/lib/db/SOVRADB';

async function ignite() {
  console.log('[SOVRADB] IGNITION PULSE: Initializing Sovereign Ledger...');
  try {
    const db = await SOVRADB.getInstance();
    console.log('[SOVRADB] IGNITION_SUCCESS: Sovereign Registry is verifiably anchored.');
    process.exit(0);
  } catch (e) {
    console.error('[SOVRADB] IGNITION_FAULT: Sovereign Registry failed to ignite.', e);
    process.exit(1);
  }
}

ignite();
