import fs from 'fs/promises';
import path from 'path';

/**
 * SIA Institutional Grounding (v62.0)
 * 
 * This script normalizes all 3,370+ distributed nodes under the 
 * Sovereign Intelligence Agency (SIA) mandate. It ensures every audit
 * report reflects the 0.01% elite standards and SIA branding.
 */

const NODES_DIR = path.join(process.cwd(), 'src/app/nodes');

async function groundNodes() {
  console.log('[SIA_GROUNDING] Initiating Exascale Rebranding Phase...');
  
  try {
    const nodes = await fs.readdir(NODES_DIR);
    console.log(`[SIA_GROUNDING] Identified ${nodes.length} nodes for re-indexing.`);

    let count = 0;
    for (const node of nodes) {
      const pagePath = path.join(NODES_DIR, node, 'page.tsx');
      
      try {
        const stats = await fs.stat(pagePath);
        if (stats.isFile()) {
          let content = await fs.readFile(pagePath, 'utf8');
          
          // REBRANDING: Replace "SOVRA" and "SiaCore" with "SIA Sovereign"
          content = content.replace(/SOVRA Sovereign/g, 'SIA Sovereign Intelligence');
          content = content.replace(/Aurvant SiaCore/g, 'SIA Global Institutional');
          content = content.replace(/v2026.11_APEX/g, 'v2026.11_SIA');
          content = content.replace(/Institutional Command Core/g, 'SIA Sovereign Terminal');
          
          // INJECTION: Add SIA Header/Aesthetic flags
          if (!content.includes('SIA_AUTHORIZATION_ACTIVE')) {
             content = content.replace(/'use client';/, `'use client';\n// SIA_AUTHORIZATION_ACTIVE: true`);
          }

          await fs.writeFile(pagePath, content);
          count++;
          
          if (count % 100 === 0) {
            console.log(`[SIA_GROUNDING] Grounded ${count} nodes...`);
          }
        }
      } catch (err) {
        // Skip directories or missing pages
      }
    }

    console.log(`[SIA_GROUNDING] SUCCESS: ${count} nodes normalized under the SIA mandate.`);
    process.exit(0);
  } catch (error) {
    console.error('[SIA_GROUNDING] CRITICAL_REBRAND_FAULT:', error);
    process.exit(1);
  }
}

groundNodes();
