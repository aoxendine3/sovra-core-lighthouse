import { SOVRADB } from '../jarvis/core/db/SOVRADB';

/**
 * SOVRA Cloud Ignition (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Exascale Scaling.
 * Purpose: Migrates the local Ghost-Ledger to Vercel Postgres/Cloud.
 */

async function igniteCloud() {
    console.log('[SOVRA_Cloud] INITIATING_CLOUD_EXPANSION...');

    if (!process.env.DATABASE_URL) {
        console.error('[FAULT] DATABASE_URL NOT FOUND. Cloud ignition requires a valid Postgres connection string.');
        console.log('[INFO] Set DATABASE_URL in your environment and re-run.');
        return;
    }

    const db = await SOVRADB.getInstance();
    if (!db.isCloud) {
        console.error('[FAULT] SOVRADB failed to initialize in Cloud Mode despite DATABASE_URL being present.');
        return;
    }

    console.log('[SOVRA_Cloud] GROUNDING_SCHEMA...');
    await SOVRADB.igniteCloudSchema();

    console.log('[SOVRA_Cloud] ANCHORING_INSTITUTIONAL_COUNCIL...');
    await SOVRADB.seedInstitutionalCouncil();

    console.log('\n[SOVRA_Cloud] CLOUD_IGNITION_COMPLETE. WE_ARE_NOW_EXASCALE.');
}

igniteCloud().catch(console.error);
