import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';

// Institutional Config (v2026.11_APEX)
const OLLAMA_HOST = 'http://localhost:11434';
const OLLAMA_MODEL = 'llama3.2';
const TRACKING_PROXY = '/api/track';

interface CJProduct {
  name: string;
  description: string;
  price: string;
  buyUrl: string;
  category: string;
}

async function generateInstitutionalCopy(productName: string, description: string): Promise<{name: string, summary: string, keywords: string[]}> {
  const prompt = `Rewrite this product for SOVRA Sovereign LLC Institutional Market. 
Product: ${productName}
Raw Description: ${description}
Brand Voice: Extremely premium, data-driven, industrial futurism (v2026.11_APEX).
Return exactly in JSON format: { "name": "Institutional Name", "summary": "1-sentence high-theta summary", "keywords": ["key1", "key2"] }`;

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false })
    });
    const data = await response.json();
    const match = data.response.match(/\{[\s\S]*?\}/);
    return JSON.parse(match[0]);
  } catch (e) {
    return { name: productName, summary: description.slice(0, 100), keywords: ['Institutional'] };
  }
}

async function ingestCJ(csvPath: string) {
  console.log(`[APEX_INGEST] Igniting Massive Scale Pulse for ${csvPath}...`);
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvContent, { columns: true, skip_empty_lines: true });

  for (const record of records) {
    const rawName = record.Product_Name || record.product_name || record.name;
    const rawDesc = record.Description || record.description || record.long_description;
    const rawUrl = record.Affiliate_URL || record.buy_url || record.url;
    
    if (!rawName) {
      console.warn(`[APEX_INGEST] Skipping record with missing name: ${JSON.stringify(record)}`);
      continue;
    }

    console.log(`[APEX_INGEST] Forging Asset: ${rawName}...`);
    const elite = await generateInstitutionalCopy(rawName, rawDesc);
    
    // Build Page Template (V8.4 Standard)
    const slug = rawName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const pageContent = `
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: '${elite.name} | SOVRA Sovereign LLC',
  description: '${elite.summary}',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="${elite.name}"
      summary="${elite.summary}"
      price="${record.price || '$99.00'}"
      buyUrl="${rawUrl}"
      category="${record.category || 'GENERAL_REVENUE'}"
      handshake="APEX_SOVEREIGN"
    />
  );
}
`;

    const dir = path.join(process.cwd(), 'src/app/nodes', slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
    console.log(`[APEX_INGEST] Node live at /nodes/${slug}`);

    // GROUND IN SOVEREIGN LEDGER
    const db = await SOVRADB.getInstance();
    await db.run(
      'INSERT INTO sovra_products (name, category, price, seller, url, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [elite.name, record.category || 'GENERAL_REVENUE', record.price || '$99.00', record.manufacturer || 'Institutional Partner', rawUrl, 'ACTIVE', elite.summary]
    );
    console.log(`[APEX_INGEST] Grounded in Sovereign Ledger: ${elite.name}`);
  }
}

// Pass CSV path as argument
const targetCsv = process.argv[2] || 'products.csv';
if (fs.existsSync(targetCsv)) {
  ingestCJ(targetCsv);
} else {
  console.warn(`[APEX_INGEST] Target CSV ${targetCsv} not found in physical storage.`);
}
