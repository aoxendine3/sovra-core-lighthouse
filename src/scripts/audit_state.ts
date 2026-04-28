import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

async function audit() {
    const db = await SOVRADB.getInstance();
    
    console.log('─── INSTITUTIONAL STATE AUDIT ───');
    
    // 1. Database Connectivity
    try {
        await db.pool.query('SELECT NOW()');
        console.log('[Audit] SOVRADB: ONLINE (Neon Postgres)');
    } catch (err) {
        console.error('[Audit] SOVRADB: OFFLINE', err);
    }

    // 2. Recent Agent Activity
    const { rows: logs } = await db.pool.query('SELECT agent_name, activity, status, timestamp FROM sovra_agent_logs ORDER BY timestamp DESC LIMIT 20');
    console.log('\n[Audit] Recent Agent Activity:');
    console.table(logs);

    // 3. Security Handshake Configuration
    console.log('\n[Audit] Security Handshake:');
    console.log(`- HANDSHAKE_SECRET: ${process.env.HANDSHAKE_SECRET ? 'SET (Hardened)' : 'MISSING'}`);
    console.log(`- SYSTEM_MODE: ${process.env.SYSTEM_MODE}`);
    
    // 4. Lead Grounding Integrity
    const { rows: leads } = await db.pool.query('SELECT COUNT(*) as total FROM sovra_leads');
    console.log(`\n[Audit] Lead Grounding: ${leads[0].total} records identified.`);

    process.exit(0);
}

audit();
