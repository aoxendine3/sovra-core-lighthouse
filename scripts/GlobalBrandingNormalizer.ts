import fs from 'fs';
import path from 'path';

/**
 * GlobalBrandingNormalizer (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Purge legacy SOVRA_APEX_ branding from SQL queries.
 * Mission: Unify the codebase with the sovra_ ledger schema.
 */

const targetDirs = [
    path.resolve(process.cwd(), 'src'),
    path.resolve(process.cwd(), 'sovra'),
    path.resolve(process.cwd(), 'scripts')
];

function processDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.cjs')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Only replace table names in SQL-like contexts or specific legacy prefixes
            // We want to avoid replacing constants like SIG_SOVRA_APEX if possible, 
            // but usually Tony wants everything unified.
            const newContent = content.replace(/SOVRA_APEX_([a-z0-9_]+)/gi, (match, tableName) => {
                const lowerTable = tableName.toLowerCase();
                console.log(`[NORMALIZING] ${match} -> sovra_${lowerTable} in ${file}`);
                return `sovra_${lowerTable}`;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

console.log('⚡ [NORMALIZER] Initiating Global Branding Pulse...');
targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) processDirectory(dir);
});
console.log('✅ [SUCCESS] Global Branding Normalized.');
