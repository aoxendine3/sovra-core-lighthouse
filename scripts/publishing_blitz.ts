import { AuthorAgent } from '../agency/lib/agents/AuthorAgent.ts';
import fs from 'fs';
import path from 'path';

async function executePublishingBlitz() {
  const author = new AuthorAgent();
  const topic = "SOVRA Sovereign Protocol";

  console.log(`[Blitz] Initializing publishing blitz for: ${topic}`);
  
  const manuscript = await author.draftFullManuscript(topic);
  
  const outputPath = path.resolve(process.cwd(), 'src/data/manuscripts/sovereign_protocol.md');
  const dir = path.dirname(outputPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, manuscript);
  
  console.log(`[Blitz] ✅ Manuscript published to: ${outputPath}`);
  console.log(`[Blitz] Asset is now ready for institutional resale.`);
}

executePublishingBlitz().catch(console.error);
