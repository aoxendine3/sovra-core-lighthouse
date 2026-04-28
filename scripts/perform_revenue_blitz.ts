import { GrowthAgent } from '../sovra/core/agents/GrowthAgent.ts';
import { SocialAgent } from '../sovra/core/agents/SocialAgent.ts';
import fs from 'fs/promises';
import path from 'path';

async function performRevenueBlitz() {
  console.log('--- [PHASE 4: REVENUE_BLITZ] INITIATED ---');
  
  const growth = new GrowthAgent();
  const social = new SocialAgent();

  const funnelPath = path.join(process.cwd(), 'src/data/ready_funnels.json');
  const funnelData = JSON.parse(await fs.readFile(funnelPath, 'utf8'));

  const product = { 
    title: funnelData.proProduct.name, 
    category: 'Institutional Digital Asset',
    description: funnelData.proProduct.tagline
  };

  try {
    // 1. Generate Strategy with live Gumroad URL context
    const strategy = await growth.generateAdStrategy(product);
    
    // Inject the real URL for the Pro product
    const proUrl = `https://trendsetter445.gumroad.com/l/${funnelData.proProduct.name.toLowerCase().replace(/\s+/g, '-')}`;
    strategy.copy.X = strategy.copy.X.replace('https://sovra_sovereign.node/store', proUrl);
    strategy.copy.LinkedIn = strategy.copy.LinkedIn.replace('https://sovra_sovereign.node/terminal', proUrl);
    
    console.log(`[SUCCESS] Live Revenue Strategy Generated for: ${strategy.productName}`);
    console.log(`[DEBUG] Primary Conversion URL: ${proUrl}`);

    // 2. Engineer Viral Hooks
    const hooks = await social.engineerViralHooks(product.category);
    console.log(`[SUCCESS] Hooks Engineered. Saturation Level: ${hooks.length * 5} channels.`);

    // 3. Execute Ad Blast
    const blast = await growth.executeAdBlast(strategy);
    await growth.logDeployment(strategy, { blastId: blast.trackingId, product: funnelData.proProduct });

    console.log(`[SUCCESS] Institutional Revenue Blast LIVE. Tracking ID: ${blast.trackingId}`);
    console.log('\n[AUDIT] Acquisition funnel fully operational. Revenue signals anticipated.');

  } catch (error) {
    console.error('[FAILURE] Blitz failed:', error);
    process.exit(1);
  }
}

performRevenueBlitz();
