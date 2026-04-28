import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data/cj_exports');
const AFFILIATE_PAGES_DIR = path.resolve(process.cwd(), 'src/app/affiliate');
const OLLAMA_API = 'http://localhost:11434/api/generate';

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(AFFILIATE_PAGES_DIR)) fs.mkdirSync(AFFILIATE_PAGES_DIR, { recursive: true });

// Live Fire Targets if CSV is empty
const DEFAULT_TARGETS = [
  { id: '1001', name: 'CrowdStrike Falcon Enterprise', category: 'cybersecurity', payout: '$1,500', link: 'https://cj.com/link/cs-1001' },
  { id: '1002', name: 'SAP S/4HANA Cloud', category: 'enterprise-erp', payout: '$2,200', link: 'https://cj.com/link/sap-1002' },
  { id: '1003', name: 'Palantir Foundry Data Platform', category: 'data-analytics', payout: '$3,500', link: 'https://cj.com/link/palantir-1003' },
];

async function queryOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    });
    
    if (!response.ok) throw new Error(`Ollama API returned ${response.status}`);
    
    const data = await response.json();
    return data.response.trim();
  } catch (e) {
    console.warn('⚠️ [LIVE_FIRE] Local Llama 3.2 unreachable. Using Sovereign Fallback Strategy.');
    return "This product represents the absolute institutional tier of enterprise software. Verifiably Compliant (v1.0_SOVRA).";
  }
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function compileNextJsPage(product: any, copy: string) {
  const slug = generateSlug(product.name);
  const targetDir = path.join(AFFILIATE_PAGES_DIR, slug);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const pagePath = path.join(targetDir, 'page.tsx');
  
  // Create a stunning dark-mode/glassmorphic template integrating the LLM copy
  const tsxContent = `
import React from 'react';
import { ShieldCheck, TrendingUp, Lock } from 'lucide-react';

export const metadata = {
  title: '${product.name} - Enterprise Deployment | SOVRA',
  description: 'Institutional analysis and deployment architecture for ${product.name}.'
};

export default function AffiliateNodePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8 md:p-24 selection:bg-amber-500/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Verifiably Compliant (v1.0_SOVRA)</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
              ${product.name}
           </h1>
           <p className="text-sm font-mono text-white/40 uppercase tracking-widest border-l-2 border-amber-500 pl-4">
              Category: ${product.category.replace('-', ' ')} | Target Yield: ${product.payout}
           </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-8">
              <div className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.02] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full" />
                 <h2 className="text-sm font-black text-white/60 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Institutional Intelligence Report</h2>
                 <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/70 max-w-none">
                    <p>${copy.replace(/\n/g, '<br/>')}</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-8 rounded-[40px] border border-amber-500/20 bg-amber-500/[0.02] flex flex-col items-center text-center space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.05)]">
                 <Lock className="w-12 h-12 text-amber-500" />
                 <div>
                    <h3 className="text-2xl font-black italic tracking-tight uppercase">Initiate Deployment</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Zero-Trust Routing Active</p>
                 </div>
                 
                 <div className="flex justify-between items-center w-full my-4 text-xs font-mono uppercase tracking-widest text-amber-500/70">
                   <span>Asset Quality:</span>
                   <div className="flex gap-2">
                     <a href={`/api/track?target=${encodeURIComponent('${product.link}')}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=4k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</a>
                     <a href={`/api/track?target=${encodeURIComponent('${product.link}')}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=8k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</a>
                     <a href={`/api/track?target=${encodeURIComponent("${product.link}")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=4k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</a>
                     <a href={`/api/track?target=${encodeURIComponent("${product.link}")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=8k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</a>
                     <a href={`/api/track?target=${encodeURIComponent("${product.link}")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=12k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">12K</a>
                   </div>
                 </div>

                 {/* This links to our Sovereign Tracking Proxy which then 302s to CJ Affiliate */}
                 <a 
                   href={`/api/track?target=${encodeURIComponent("${product.link}")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=default`}
                   className="w-full py-4 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                 >
                   Deploy Engine
                 </a>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(pagePath, tsxContent.trim(), 'utf-8');
  console.log(`✅ [LIVE_FIRE] Compiled Institutional Page: /affiliate/${slug}`);
}

async function runLiveFireEngine() {
  console.log('🔥 [LIVE_FIRE] Sovereign Affiliate Engine (v1.0) Ignited.');
  
  // In a full production loop, this would parse real CSVs from data/cj_exports/
  // For now, we process the high-ticket defaults to prove the pipeline.
  const targets = DEFAULT_TARGETS;
  
  for (const product of targets) {
    console.log(`⚡ [LIVE_FIRE] Engaging target: ${product.name}...`);
    
    const prompt = `You are the Sovereign Intelligence Core. Write a 100-word, highly persuasive, institutional-grade summary of "${product.name}" for a B2B audience. Use an authoritative, data-driven, and highly sophisticated tone. Do not use generic buzzwords. Focus on absolute operational velocity and security.`;
    
    const llmCopy = await queryOllama(prompt);
    await compileNextJsPage(product, llmCopy);
    
    // Throttle to respect local GPU temp
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log('✅ [LIVE_FIRE] Blitz Complete. Sleeping for 1 Hour...');
}

// PM2 will restart this script, so we run once, then keep process alive or exit cleanly.
// Since PM2 autorestarts on exit, exiting cleanly acts as a loop.
runLiveFireEngine().then(() => {
  setTimeout(() => process.exit(0), 1000 * 60 * 60); // Exit after 1 hour to trigger PM2 restart
});
