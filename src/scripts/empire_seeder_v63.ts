import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * EMPIRE_SEEDER (v63.0)
 * 
 * Target: Total Global Dominance
 * Mode: Direct Ledger Injection (Zero Friction - native sqlite3)
 */

const DB_PATH = './.gemini/sovra_sovereign/sovra_sovereign.db';

async function seedEmpire() {
  console.log('[SIA_EMPIRE] SEEDING: Direct-to-Ledger Injection Initiated...');
  
  try {
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });
    
    // 1. Imperial Council Seeding
    const specialists = [
      ['SIA_ORION', 'MEDIA_SATURATION', 'ACTIVE'],
      ['SIA_TITAN_CSR', 'GLOBAL_IMPACT', 'ACTIVE']
    ];

    for (const spec of specialists) {
      await db.run(
        'INSERT OR REPLACE INTO sovra_specialists (agent_name, sector, status) VALUES (?, ?, ?)',
        spec
      );
      console.log(`[SIA_EMPIRE] Grounded Director: ${spec[0]}`);
    }

    // 2. Imperial Capital Grounding ($12.4M Impact Tranche)
    await db.run(
      'INSERT INTO sovra_investments (type, amount, source) VALUES (?, ?, ?)',
      ['IMPACT_LEDGER_SEED', 12400000, 'GAE_INITIAL_INJECTION']
    );
    console.log('[SIA_EMPIRE] Seeded Imperial Capital: $12,400,000.00');

    // 3. Loose the Empire (Kernel Mode Flag)
    await db.run(
      'INSERT INTO sovra_agent_logs (agent_name, activity, status) VALUES (?, ?, ?)',
      ['APEX_EXECUTIVE', 'EMPIRE_UNLEASHED_V63_FINAL', 'SUCCESS']
    );
    console.log('[SIA_EMPIRE] SUCCESS: Empire is loosed. Total Global Dominance mode ACTIVE.');

    await db.close();
    process.exit(0);
  } catch (error) {
    console.error('[SIA_EMPIRE] SEED_FAULT:', error);
    process.exit(1);
  }
}

seedEmpire();
