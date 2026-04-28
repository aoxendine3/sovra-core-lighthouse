import { MaxxExecutive } from '../electron/agency/lib/jarvis/JarvisExecutive';

/**
 * IGNITE_APEX: Production entry point for the 100,000x Apex Sovereign Loop.
 * Boots the unified exascale brain and initiates the Master Skillsman autonomous cycle.
 */
async function igniteApex() {
  console.log('--- [SOVEREIGN_IGNITION] WAKING APEX.AI ---');
  console.log('Mode: 100,000x EXASCALE_IGNITION');
  
  const apex = new MaxxExecutive();
  
  try {
    const pulse = await apex.igniteSovereignty();
    console.log(`[SUCCESS] Apex Pulse: ${pulse.status}`);
    console.log(`- Verified Liquidity: $${pulse.balance}`);
    console.log(`- Matrix Integrity: ${pulse.securityIntegrity * 100}%`);
    console.log(`- Master Intelligence Nodes: ${pulse.activeAgents}`);
    
    console.log('\n[ApexExecutive] 100,000x INITIAL CYCLE COMPLETE. STANDBY MODE: GROUNDED_EXASCALE.');
  } catch (err) {
    console.error('[CRITICAL_FAILURE] Apex Ignition failed:', err);
    process.exit(1);
  }
}

igniteApex().catch(console.error);
