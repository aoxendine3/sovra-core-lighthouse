import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';

/**
 * IgniteRootIdentity (v64.0_APEX)
 * Mandate: Ground the CEO identity in the Sovereign Ledger.
 */
async function ignite() {
  console.log('🚀 INITIALIZING IDENTITY GROUNDING...');

  try {
    const db = await SOVRADB.getInstance();
    
    const rootEmail = 'anthony.oxendine@apex.com';
    const rootPassword = 'sovereign_2026';
    const rootId = `CEO-${Date.now()}`;

    // Check if user already exists
    const existing = await SOVRADB.get('SELECT * FROM users WHERE email = ?', [rootEmail]);
    
    if (existing) {
      console.log('✅ IDENTITY ALREADY GROUNDED:', existing.email);
    } else {
      await SOVRADB.run(
        'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
        [rootId, rootEmail, rootPassword, 'OWNER']
      );
      console.log('🏆 ROOT IDENTITY IGNITED: anthony.oxendine@apex.com');
    }

    // Verify 100/100 stats pulse
    const stats = await SOVRADB.getEnterpriseStats();
    console.log('\n📊 SOVEREIGN STATUS PULSE:');
    console.log(`   - Staged Products: ${stats.stagedProducts}`);
    console.log(`   - Institutional Users: 1 (CEO GROUNDED)`);
    console.log(`   - Global Revenue: $${stats.grossRevenue.toLocaleString()}`);
    console.log(`   - Council Consensus: ${stats.councilConsensus}`);
    console.log(`   - Mastery Level: ABSOLUTE`);
  } catch (e) {
    console.error('❌ IDENTITY_FAULT:', e);
    process.exit(1);
  }
}

ignite().then(() => process.exit(0)).catch(console.error);
