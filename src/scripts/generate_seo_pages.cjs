const fs = require('fs');
const path = require('path');

/**
 * SOVRA SEO Page Generator (v1.5_Ω) - JS Version
 */

const CSV_PATH = path.join(process.cwd(), 'shopify_import.csv');
const OUTPUT_DIR = path.join(process.cwd(), 'src/app/store');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function parseCSV(content) {
  const lines = content.split('\n');
  const headers = lines[0].split(',');
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index]?.replace(/^"|"$/g, '').trim();
    });
    results.push(entry);
  }
  return results;
}

const products = parseCSV(fs.readFileSync(CSV_PATH, 'utf-8'));

products.slice(0, 10).forEach((product) => {
  const slug = product.Handle;
  const bodyHtml = JSON.stringify(product['Body (HTML)']);
  const pageContent = `
import React from 'react';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans">
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 opacity-40 font-mono text-[10px] tracking-widest uppercase">
            SOVRA // STORE // ${product.Type}
          </div>
          <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">${product.Title}</h1>
          <div className="flex items-center gap-6 mb-12">
            <span className="text-3xl font-bold text-[#cd9d3f]">$${product['Variant Price']}</span>
            <span className="px-4 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest opacity-60">
              In Stock: ${product['Variant Inventory Qty']}
            </span>
          </div>
          
          <div className="prose prose-invert max-w-none mb-16" dangerouslySetInnerHTML={{ __html: ${bodyHtml} }}>
          </div>

          <a 
            href="#" 
            className="inline-block px-12 py-6 bg-[#cd9d3f] text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all shadow-[0_20px_40px_rgba(205,157,63,0.3)]"
          >
            Buy Now
          </a>

          <div className="mt-24 pt-12 border-t border-white/5 opacity-20 text-[10px] font-mono tracking-widest uppercase">
            Verifiably Compliant (v1.5_Ω_NOBOO) // Handshake: NOBOO_SOVEREIGN
          </div>
        </div>
      </main>
    </div>
  );
}
  `;

  const productDir = path.join(OUTPUT_DIR, slug);
  if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });
  fs.writeFileSync(path.join(productDir, 'page.tsx'), pageContent);
  console.log('Generated SEO page for: ' + slug);
});

console.log('SEO Saturation Cycle Complete.');
