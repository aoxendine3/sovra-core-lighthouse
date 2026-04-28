import { AuthorAgent } from '@/lib/agents/AuthorAgent';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Institutional Asset Forge: The Sovereign Protocol
 * Mobilizes the AuthorAgent to forge a 100/100 "Truth-Only" product asset pack.
 */
async function forge() {
  const author = new AuthorAgent();
  const theme = "SOVRA";
  
  console.log(`[Creator_Forge] Mobilizing AuthorAgent for 100/100 Institutional Asset: ${theme}...`);
  
  const asset = await author.generateEliteGuide(theme);
  const fullManuscript = await author.draftFullManuscript(theme);
  
  const outputDir = path.join(process.cwd(), 'src/data/assets/sovereign-protocol');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save Full Manuscript
  fs.writeFileSync(path.join(outputDir, 'manuscript.md'), fullManuscript);
  
  // Save Metadata/Prompt for Manual 100/100 Thumbnail Forge
  fs.writeFileSync(path.join(outputDir, 'metadata.json'), JSON.stringify({
    title: asset.title,
    author: asset.author,
    thumbnailPrompt: asset.thumbnailPrompt,
    timestamp: new Date().toISOString(),
    status: 'PENDING_VISUAL_FORGE'
  }, null, 2));

  console.log(`[Creator_Forge] Elite Manuscript secured at: ${outputDir}`);
  console.log(`[Creator_Forge] 100/100 Visual Prompt: ${asset.thumbnailPrompt}`);
  console.log(`[Creator_Forge] SUCCESS. Standing by for Institutional Thumbnail Forge.`);
}

forge().catch(console.error);
