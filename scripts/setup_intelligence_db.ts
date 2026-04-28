import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * SETUP_INTELLIGENCE_DB (v1.0_EXASCALE)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Provision high-fidelity storage for Doctoral Syntheses.
 */
async function setup() {
    const db = await SOVRADB.getInstance();
    
    console.log('[Setup] Provisioning sovereign_intelligence_library...');
    
    await db.run(`
        CREATE TABLE IF NOT EXISTS sovereign_intelligence_library (
            id SERIAL PRIMARY KEY,
            source_url TEXT NOT NULL,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            synthesis TEXT NOT NULL,
            executive_summary TEXT NOT NULL,
            top_assets JSONB NOT NULL,
            theta_rating DECIMAL(3,2) DEFAULT 5.0,
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log('[Setup] Database provisioned successfully.');
    process.exit(0);
}

setup().catch(err => {
    console.error('[Setup Error]', err);
    process.exit(1);
});
