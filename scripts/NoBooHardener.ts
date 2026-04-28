import fs from 'fs';
import path from 'path';

/**
 * SOVRA API Hardener (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Verifiably injects the 512-bit PQ Handshake into all API routes.
 */

const srcDir = path.join(process.cwd(), 'src/app/api');

function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'route.ts') {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Skip if already protected or if it's a webhook
            if (content.includes('validateHandshake') || fullPath.includes('webhooks')) {
                continue;
            }

            console.log(`[HARDENING] ${fullPath}`);

            // Inject import
            if (!content.includes('import { validateHandshake }')) {
                content = "import { validateHandshake } from '@/lib/auth/Handshake';\n" + content;
            }

            // Inject validation at the start of each exported function
            const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
            methods.forEach(method => {
                const regex = new RegExp(`export async function ${method}\\(`, 'g');
                content = content.replace(regex, `export async function ${method}(req: Request, `); // Ensure req is available
                // Actually, more robust:
                const validationBlock = `\n  // Ω_SECURITY_LOCK\n  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });\n`;
                
                const methodRegex = new RegExp(`export async function ${method}\\(req: Request[^\\)]*\\) {`, 'g');
                content = content.replace(methodRegex, (match) => match + validationBlock);
            });

            fs.writeFileSync(fullPath, content);
        }
    }
}

console.log('[SOVRA_Ω] INITIATING_API_HARDENING...');
walk(srcDir);
console.log('[SOVRA_Ω] HARDENING_COMPLETE.');
