import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

async function ignite() {
    console.log('--- [APEX_CLOUD_IGNITION] ---');
    try {
        await SOVRADB.igniteCloudSchema();
        console.log('✓ Cloud Schema Unified.');
        
        await SOVRADB.seedInstitutionalCouncil();
        console.log('✓ Institutional Council Anchored.');
        
        console.log('--- [IGNITION_COMPLETE] ---');
        process.exit(0);
    } catch (err) {
        console.error('CRITICAL_IGNITION_FAULT:', err);
        process.exit(1);
    }
}

ignite();
