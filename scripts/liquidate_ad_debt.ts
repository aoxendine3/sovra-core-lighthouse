import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';

/**
 * DEBT_LIQUIDATION_STRIKE (v15.1)
 * Mandate: Absolute Financial Grounding.
 * MISSION: LEDGER_CALIBRATION
 */

async function liquidateAdDebt() {
  console.log('--- [APEX_DEBT_LIQUIDATION_IGNITION] ---');
  
  const db = await SOVRADB.getInstance();

  try {
    // 1. Audit current debt
    const stats = await db.get('SELECT SUM(gross_amount) as total, COUNT(*) as count FROM sovra_revenue WHERE source LIKE "BATCH_AD%"');
    console.log(`[Liquidation] AUDIT: Found ${stats.count} debt nodes totaling $${stats.total?.toFixed(2) || 0}`);

    if (stats.count === 0) {
      console.log('[Liquidation] CLEAN: No ad debt found. Singularity integrity maintained.');
      return;
    }

    // 2. Sovereign Migration
    console.log('[Liquidation] MIGRATION: Moving debt tranches to Sovereign Investments...');
    
    await db.run('BEGIN TRANSACTION');
    
    // Create table if it didn't sync yet
    await db.run(`
      CREATE TABLE IF NOT EXISTS sovra_investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        source TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migrate tranches (Absolute value = Investment amount)
    await db.run(`
      INSERT INTO sovra_investments (type, amount, source, timestamp)
      SELECT "AD_SPEND", ABS(gross_amount), source, timestamp 
      FROM sovra_revenue 
      WHERE source LIKE "BATCH_AD%"
    `);

    // Delete from Revenue Ledger
    await db.run('DELETE FROM sovra_revenue WHERE source LIKE "BATCH_AD%"');

    await db.run('COMMIT');

    const finalRevenue = await db.get('SELECT SUM(gross_amount) as total FROM sovra_revenue');
    console.log(`[Liquidation] SUCCESS: Debt liquidated. Corrected Gross Revenue: $${finalRevenue.total?.toFixed(2) || 0}`);

    await SOVRADB.logAgentActivity(
      'SovereignLedger',
      `Institutional Debt Liquidation Strike Complete. $${Math.abs(stats.total).toFixed(2)} migrated to Investments.`,
      'COMPLETED',
      { migrated: stats.count, amount: Math.abs(stats.total) }
    );

  } catch (err) {
    await db.run('ROLLBACK');
    console.error('[Liquidation] CRITICAL_FAULT:', err);
  }

  console.log('--- [LIQUIDATION_COMPLETE] ---');
}

liquidateAdDebt().catch(console.error);
