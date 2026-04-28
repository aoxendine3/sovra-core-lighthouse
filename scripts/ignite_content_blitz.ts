import { AuthorAgent } from '../agency/lib/agents/AuthorAgent.ts';
import fs from 'fs';
import path from 'path';

async function igniteContentBlitz() {
  console.log('--- [APEX SOVEREIGN LLC: CONTENT_BLITZ_IGNITION] ---');
  
  const author = new AuthorAgent();
  const niches = [
    'AI_Sovereignty',
    'DeFi_Liquidity_Engines',
    'Post_Quantum_Cryptography',
    'Autonomous_Lead_Saturation',
    'The_SOVRA_Protocol'
  ];

  const libraryDir = path.resolve(process.cwd(), 'public/library');
  if (!fs.existsSync(libraryDir)) fs.mkdirSync(libraryDir, { recursive: true });

  for (const niche of niches) {
    console.log(`[Blitz] Generating Strategic Whitepaper for "${niche}"...`);
    try {
      const manuscript = await author.draftFullManuscript(niche);
      const filePath = path.join(libraryDir, `${niche.toLowerCase()}.md`);
      fs.writeFileSync(filePath, manuscript);
      console.log(`[Blitz] ✅ Exported: ${filePath}`);
    } catch (err) {
      console.error(`[Blitz] ❌ Failed for ${niche}:`, err);
    }
  }

  console.log('--- [CONTENT_BLITZ_COMPLETE] ---');
  console.log('All intellectual property assets have been synced to the Sovereign Store.');
}

igniteContentBlitz().catch(console.error);
