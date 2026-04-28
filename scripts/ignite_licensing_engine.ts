import { MediaLicensingAgent } from '../agency/lib/agents/MediaLicensingAgent.ts';
import { SOVRADB } from '../src/lib/db/SOVRADB';
import fs from 'fs';
import path from 'path';

async function igniteLicensingEngine() {
  console.log('--- [APEX SOVEREIGN LLC: LICENSING_IGNITION] ---');
  
  const agent = new MediaLicensingAgent();
  const libraryDir = path.resolve(process.cwd(), 'public/library');
  
  if (!fs.existsSync(libraryDir)) {
    console.error('[Licensing] ❌ Library not found. Execute Phase 18 Content Blitz first.');
    return;
  }

  const assets = fs.readdirSync(libraryDir).filter(f => f.endsWith('.md'));
  
  for (const asset of assets) {
    console.log(`[Licensing] Drafting B2B Institutional License for [${asset}]...`);
    
    // Simulate B2B Tranche Logic ($499 - $5,000 range)
    const trancheValue = Math.floor(Math.random() * 4500 + 499);
    const licensee = `Institutional_Partner_${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    await SOVRADB.logAgentActivity(
      'MediaLicensingAgent',
      `Institutional B2B License Drafted: ${licensee} for ${asset}. Tranche Value: $${trancheValue}.`,
      'PENDING_VAULT_AUTHORIZATION'
    );
    
    console.log(`[Licensing] ✅ Mandate queued for Vault approval: ${trancheValue} USD.`);
  }

  console.log('--- [LICENSING_SYNC_COMPLETE] ---');
  console.log('Access the Authorization Vault on the dashboard to approve high-value tranches.');
}

igniteLicensingEngine().catch(console.error);
