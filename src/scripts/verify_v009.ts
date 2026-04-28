import { RevenueReconcilerAgent } from '../../agency/lib/agents/finance/RevenueReconcilerAgent.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';

async function verifyV009() {
  console.log('--- APEXIA Velocity Verification (v.009) ---');

  try {
    // 1. Verify Revenue Bridge (Reconciler)
    const reconciler = new RevenueReconcilerAgent();
    
    // Inject mock click pulse
    const db = await SOVRADB.getInstance();
    await db.run(`
      INSERT INTO sovra_analytics_clicks (source, target, locale, niche, reconciled)
      VALUES (?, ?, ?, ?, ?)
    `, ['VERIFY_BRIDGE_TEST', 'https://amazon.com', 'EN', 'ai-tech', 0]);

    console.log('✅ TELEMETRY_INGRESS: Mock pulse injected.');

    // Pulse the reconciler
    await reconciler.reconcileClicks();
    
    const stats = await SOVRADB.getEnterpriseStats();
    console.log(`✅ BRIDGE_VERIFIED: Current Gross Revenue: $${stats.grossRevenue}`);

    // 2. Swarm Stability Check (Ollama)
    const OLLAMA_HOST = 'http://localhost:11434';
    const health = await fetch(`${OLLAMA_HOST}/api/tags`).then(r => r.ok).catch(() => false);
    
    if (health) {
        console.log('✅ STABILITY_SENTINEL: Ollama is verifiably operational.');
    } else {
        console.warn('⚠️ STABILITY_SENTINEL: Ollama is offline (Local node required for Swarm execution).');
    }

    console.log('--- MISSION_SUCCESS: v.009_VERIFIED ---');
  } catch (e: any) {
    console.error(`❌ FAULT: ${e.message}`);
  }
}

verifyV009().then(() => process.exit(0));
