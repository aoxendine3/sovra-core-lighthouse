import fs from 'fs';
import path from 'path';
import axios from 'axios';

/**
 * MISSION: ELITE_REVENUE_IGNITION (v70.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * Automates the creation of high-theta elite product pages.
 * Integrates local Llama 3.2 for zero-cost copy generation.
 */

const FEED_PATH = path.resolve(process.cwd(), 'src/data/elite_seed_feed.csv');
const APP_DIR = path.resolve(process.cwd(), 'src/app/affiliate');
const OLLAMA_URL = 'http://localhost:11434/api/generate';

interface Product {
  category: string;
  name: string;
  url: string;
  description: string;
  commission: string;
  slug: string;
}

async function generateEliteCopy(product: Product) {
  console.log(`[Llama] Generating elite-market copy for: ${product.name}...`);
  try {
    const response = await axios.post(OLLAMA_URL, {
      model: 'llama3.2',
      prompt: `Write a high-theta, institutional marketing pitch for the top 0.01% elite. 
      Product: ${product.name}
      Context: ${product.description}
      Commission: ${product.commission}
      Voice: Authoritative, Sovereign, Scientific, Elite. 
      Format: Return ONLY the pitch in 2 paragraphs. NO intro/outro.`,
      stream: false
    });
    return response.data.response;
  } catch (err) {
    console.error('[Llama] Generation fault. Falling back to baseline copy.');
    return product.description;
  }
}

function generatePageTemplate(product: Product, copy: string) {
  const accentColor = product.category.includes('Tech') || product.category.includes('Cyber') ? '#00f0ff' : '#c5a059';
  
  return `"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function EliteProductPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sovereign Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[${accentColor}]/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-[${accentColor}]/10 text-[${accentColor}] text-[10px] font-black uppercase tracking-widest border border-[${accentColor}]/20">
              Institutional Asset: ${product.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            ${product.name.toUpperCase()}<br /> 
            <span className="text-[${accentColor}] opacity-50">BY APEX SOVEREIGN</span>
          </h1>
          <div className="max-w-2xl text-xl text-white/40 leading-relaxed italic">
            ${copy.replace(/\n/g, '<br />')}
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="glass-panel p-12 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-white/20 mb-8">Strategic Mandate</h3>
            <p className="text-lg leading-relaxed text-white/80">
              This asset is verifiably prioritized for the top 0.01% global ingress. 
              Execution standard: v2026.11_APEX.
            </p>
          </div>
          
          <div className="flex flex-col justify-center gap-4">
             <a 
               href="${product.url}"
               className="w-full py-6 rounded-2xl bg-[${accentColor}] text-black font-black text-center text-lg hover:brightness-110 transition-all shadow-[0_20px_40px_-10px_${accentColor}50]"
             >
               ACQUIRE INSTITUTIONAL ACCESS
             </a>
             <p className="text-center text-[10px] uppercase tracking-widest opacity-20">
               Direct Attribution via Sovereign Tracking Proxy
             </p>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 flex justify-between items-center opacity-20 text-[10px] tracking-[0.3em] uppercase">
          <span>© 2026 APEX SOVEREIGN LLC</span>
          <span>Verified Protocol Output [60.0]</span>
        </footer>
      </main>
    </div>
  );
}
`;
}

async function ignite() {
  console.log('--- [APEX-X] IGNITING ELITE REVENUE ENGINE ---');
  
  if (!fs.existsSync(FEED_PATH)) {
    throw new Error('ELITE_FEED_MISSING: src/data/elite_seed_feed.csv not found.');
  }

  const lines = fs.readFileSync(FEED_PATH, 'utf8').split('\n').filter(Boolean).slice(1);
  console.log(`[Engine] Found ${lines.length} high-ticket tranches for ingestion.`);

  for (const line of lines) {
    const [category, name, url, description, commission] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    
    const product: Product = { category, name, url, description, commission, slug };
    const copy = await generateEliteCopy(product);
    const template = generatePageTemplate(product, copy);

    const targetDir = path.join(APP_DIR, slug);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    
    fs.writeFileSync(path.join(targetDir, 'page.tsx'), template);
    console.log(`[Engine] DEPLOYED: /affiliate/${slug}`);
  }

  console.log('--- [APEX-X] ENGINE IGNITION COMPLETE ---');
}

ignite().catch(console.error);
