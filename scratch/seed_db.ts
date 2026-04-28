import { SovereignDB } from '../agency/lib/db/SovereignDB';

async function main() {
  console.log('[SIA_SEED] Initiating Sovereign DB Seeding...');
  try {
    await SovereignDB.seedInstitutionalCouncil();
    console.log('[SIA_SEED] SUCCESS: Sovereign DB Seeded with 100/100 Matrix agents.');
  } catch (e) {
    console.error('[SIA_SEED] FAULT:', e);
  }
}

main();
