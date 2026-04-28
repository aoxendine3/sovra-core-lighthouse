import fs from 'fs';
import path from 'path';

/**
 * APEX Metadata Aligner (v1.0)
 * ─────────────────────────────────────────────────────────────
 * MISSION: BUILD_INTEGRITY_RESTORATION
 * Purpose: Surgical correction of Node pages to satisfy App Router constraints.
 * 1. Reverts to Server Components.
 * 2. Injects APEXAcquisitionButton.
 * 3. Restores missing icon imports.
 */

const targetDirs = [
  'src/app/affiliate',
  'src/app/elite'
];

function walk(dir: string, callback: (file: string) => void) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function migrateFile(filePath: string) {
  if (!filePath.endsWith('page.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('generateHandshake') && !content.includes('APEXAcquisitionButton')) return;

  console.log(`[MIGRATE] Processing: ${filePath}`);

  // 1. Remove 'use client'
  content = content.replace(/'use client';\n/g, '');
  content = content.replace(/'use client';/g, '');

  // 2. Fix Imports
  content = content.replace(/import { generateHandshake } from '@\/lib\/auth\/HandshakeClient';/g, '');
  content = content.replace(/import { generateHandshake } from '@\/lib\/auth\/Handshake';/g, '');
  
  if (!content.includes('APEXAcquisitionButton')) {
    content = content.replace(/import type { Metadata } from 'next';/, 
      "import type { Metadata } from 'next';\nimport { APEXAcquisitionButton } from '@/components/commerce/APEXAcquisitionButton';");
    
    // If Metadata import is different
    content = content.replace(/import { Metadata } from 'next';/, 
      "import { Metadata } from 'next';\nimport { APEXAcquisitionButton } from '@/components/commerce/APEXAcquisitionButton';");
  }

  if (!content.includes('lucide-react')) {
     content = content.replace(/import { APEXAcquisitionButton } from '@\/components\/commerce\/APEXAcquisitionButton';/,
       "import { APEXAcquisitionButton } from '@/components/commerce/APEXAcquisitionButton';\nimport { Activity } from 'lucide-react';");
  }

  // 3. Remove handleAcquisition function
  content = content.replace(/const handleAcquisition = async [\s\S]*?};/g, '');

  // 4. Replace Buttons
  // Affiliate Pattern
  content = content.replace(/<button\s+onClick=\{[^}]*\}\s+className="[^"]*"\s*>\s*([^<]*)\s*<\/button>/g, (match, label) => {
    if (label.includes('NODE') || label.includes('DEPLOY') || label.includes('BEREITSTELLEN')) {
        return `<APEXAcquisitionButton \n                   keywords={product.keywords}\n                   category="AFFILIATE_REVENUE"\n                   source="APEX_NODE"\n                   label="${label.trim()}"\n                 />`;
    }
    return match;
  });

  // Elite Pattern (uses 'p.keywords')
  content = content.replace(/<button\s+onClick=\{[^}]*\}\s+className="[^"]*"\s*>\s*([^<]*)\s*<\/button>/g, (match, label) => {
     if (label.includes('ASSET') || label.includes('DEPLOY')) {
        return `<APEXAcquisitionButton \n                   keywords={p.keywords || product.keywords}\n                   category="ELITE_ASSET"\n                   source="APEX_ELITE"\n                   label="${label.trim()}"\n                 />`;
     }
     return match;
  });

  fs.writeFileSync(filePath, content);
}

targetDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
        walk(fullPath, migrateFile);
    }
});

console.log('--- MISSION: METADATA_ALIGNMENT_COMPLETE ---');
