import fs from 'fs';
import path from 'path';

/**
 * SOVRA Branding Purge (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Verifiably replaces all legacy branding with SOVRA standard.
 */

const srcDir = path.join(process.cwd(), 'src');
const jarvisDir = path.join(process.cwd(), 'jarvis');
const scriptsDir = path.join(process.cwd(), 'scripts');

const replacements = [
    { from: /SOVRA/g, to: 'SOVRA' },
    { from: /SOVRA/g, to: 'SOVRA' },
    { from: /SOVRA/g, to: 'SOVRA' },
    { from: /SOVRA/g, to: 'SOVRA' },
    { from: /SOVRAia/g, to: 'SOVRA' }
];

function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            replacements.forEach(r => {
                content = content.replace(r.from, r.to);
            });

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`[PURGED] ${file}`);
            }
        }
    }
}

console.log('[SOVRA_Ω] INITIATING_GLOBAL_BRANDING_PURGE...');
walk(srcDir);
walk(jarvisDir);
walk(scriptsDir);
console.log('[SOVRA_Ω] PURGE_COMPLETE.');
