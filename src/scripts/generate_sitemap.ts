import fs from 'fs';
import path from 'path';

/**
 * Sovereign Sitemap Generator (v1.0_SOVRA)
 * Mandate: Absolute Search Dominance.
 * 
 * This script generates a sitemap.xml indexing all 111 Sovereign Products 
 * to ensure 100% search engine visibility.
 */
async function generateSitemap() {
  const csvPath = path.resolve(process.cwd(), 'shopify_import.csv');
  const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  const baseUrl = 'https://sovra-sovereign.myshopify.com';

  console.log('--- SITEMAP GENERATION: INITIATING ---');

  try {
    const rawData = fs.readFileSync(csvPath, 'utf8');
    const lines = rawData.split('\n').filter(l => l.trim() !== '');
    const products = lines.slice(1);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add Homepage
    xml += `  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>\n`;

    for (const p of products) {
      const parts = p.split(',');
      const handle = parts[0];
      if (handle) {
        xml += `  <url><loc>${baseUrl}/products/${handle}</loc><priority>0.8</priority></url>\n`;
      }
    }

    xml += '</urlset>';

    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    fs.writeFileSync(sitemapPath, xml);
    console.log(`[Sitemap] GROUNDED: ${products.length} products indexed at /public/sitemap.xml`);

  } catch (e) {
    console.error('[Sitemap] FATAL_FAULT:', e);
  }
}

generateSitemap();
