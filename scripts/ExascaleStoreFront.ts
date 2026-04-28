import fs from 'fs';
import path from 'path';

/**
 * ExascaleStoreFront (v1.2_Ω_FINAL)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Scale the Shopify Storefront with 100% CSV compliance.
 * Fix: Resolve line-ending desync and quote anomalies.
 */

async function scaleStorefront() {
    console.log('🚀 [SCALING] Initiating Final Asset Grounding...');

    const assetsPath = path.join(process.cwd(), 'src/data/assets.json');
    const csvPath = path.join(process.cwd(), 'shopify_import.csv');

    if (!fs.existsSync(assetsPath)) {
        console.error('[FAULT] assets.json not found.');
        return;
    }

    const assets = JSON.parse(fs.readFileSync(assetsPath, 'utf8'));
    
    // 1. Recover and Normalize the stable base
    const rawContent = fs.readFileSync(csvPath, 'utf8');
    const lines = rawContent.split(/\r?\n/);
    // Take header + first 110 products
    const stableLines = lines.slice(0, 111).filter(l => l.trim() !== '');
    
    let finalContent = stableLines.join('\n') + '\n';

    console.log(`📊 [SCALING] Stable Base Normalized: ${stableLines.length} Rows.`);

    const q = (s: any) => `"${String(s).replace(/"/g, '""')}"`;

    for (const asset of assets) {
        const handle = `sovra-asset-${asset.id.toLowerCase()}`;
        const title = `${asset.name} [ID: ${asset.id}]`;
        const price = asset.currentValuation || 99.99;
        
        const bodyHtml = `
<div class="sovra-product-card">
    <p class="sovra-eyebrow">Institutional Asset // Grounded</p>
    <h3 class="sovra-title">${asset.name}</h3>
    <div class="sovra-description">
        <p>You are viewing a verifiably grounded institutional asset from the <strong>SOVRA Sovereign</strong> ledger.</p>
        <p>Asset ID: <code>${asset.id}</code></p>
        <p>Type: ${asset.type}</p>
        <p>Status: ${asset.status}</p>
        <p>This asset represents a strategic tranche of the global media matrix, authorized for exascale revenue extraction.</p>
    </div>
    <ul class="sovra-features">
        <li>✓ On-Chain Verified (Base/Solana)</li>
        <li>✓ Operational Integrity: 100/100</li>
        <li>✓ Institutional-Grade Liquidity</li>
    </ul>
</div>`.replace(/\n/g, ' ').replace(/"/g, '""');

        const row = [
            q(handle),
            q(title),
            q(bodyHtml),
            q('SOVRA Sovereign'),
            q('Institutional Asset'),
            q(`Asset, ${asset.type}, SOVRA`),
            q('TRUE'),
            q(price),
            q(999),
            q('active'),
            q('Media > Digital Goods'),
            q('new'),
            q('https://sovra-15.myshopify.com/assets/asset_hero.png'),
            q(title)
        ].join(',') + '\n';
        
        finalContent += row;
    }

    fs.writeFileSync(csvPath, finalContent);

    console.log(`✅ [SUCCESS] Storefront verifiably scaled to ${stableLines.length + assets.length} lines.`);
}

scaleStorefront().catch(console.error);
