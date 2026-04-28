import * as fs from 'fs';
import * as path from 'path';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import { SIL } from '../../agency/lib/auth/SIL.ts';
import { audit } from '../lib/logger/InstitutionalLogger.ts';

// Local Ollama Endpoint
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama4';
const AFFILIATE_TAG = 'sovra20-20';

async function generateWithOllama(prompt: string): Promise<string> {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt,
            stream: false,
            options: {
                num_predict: 2048,
                temperature: 0.1 // Precision focus for 0.01% tier
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`OLLAMA_FAULT: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.response;
}

const NICHES = ['pet-tech', 'smart-home', 'ai-accessories', 'remote-work-gear', 'institutional-fintech'];
const LOCALES = [
  { code: 'en', language: 'English', region: 'Global' },
  { code: 'es', language: 'Spanish', region: 'Latin America & Spain' },
  { code: 'de', language: 'German', region: 'Germany & DACH' },
  { code: 'jp', language: 'Japanese', region: 'Japan' }
];

async function checkOllamaHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${OLLAMA_HOST}/api/tags`);
        return response.ok;
    } catch {
        return false;
    }
}

async function buildNichePageLocales(niche: string, localeInfo: {code: string, language: string, region: string}) {
    // 1. STABILITY_SENTINEL: Ensure Ollama is responsive
    if (!await checkOllamaHealth()) {
        console.error(`[Sentinel] OLLAMA_OFFLINE: Pausing generation pulse for ${niche}...`);
        await new Promise(r => setTimeout(r, 5000));
        return;
    }

    audit('info', 'AFFILIATE_RESEARCH_PULSE', { niche, locale: localeInfo.code, core: 'LLAMA_4' });
    
    const prompt = `[PROMPT_IDENTITY: SOVRA_CORE_ORCHESTRATOR]
List 5 high-converting affiliate products for the niche "${niche}" available on Amazon mapped for ${localeInfo.region}. 
The descriptions and names MUST be translated fluently into ${localeInfo.language}. 
Format: RAW JSON ARRAY. No markdown.
Format example: [{"name":"X","description":"Y","price":"$Z","keywords":"K"}]`;

    let products: any[] = [];
    try {
        const rawJson = await generateWithOllama(prompt);
        const jsonStart = rawJson.indexOf('[');
        const jsonEnd = rawJson.lastIndexOf(']') + 1;
        
        if (jsonStart !== -1 && jsonEnd !== -1) {
            products = JSON.parse(rawJson.substring(jsonStart, jsonEnd));
        } else {
            throw new Error("JSON_SCHEMA_FAULT");
        }
    } catch (e) {
        audit('warn', 'AFFILIATE_RESEARCH_FALLBACK', { niche, locale: localeInfo.code });
        products = [
            { name: "Pro Smart LED", description: "Wifi-enabled smart lights.", price: "$35.99", keywords: niche + " smart lights" },
            { name: "Ergo Stand", description: "Premium aluminum stand.", price: "$29.99", keywords: niche + " laptop stand" },
            { name: "Ultra Cam 4K", description: "4K AI tracking camera.", price: "$149.99", keywords: niche + " 4k camera" },
        ];
    }
    
    const uiTranslations: Record<string, {title: string, subtitle: string, cta: string, badge: string}> = {
      'en': { title: 'Institutional', subtitle: 'Strategic high-yield hardware tranches. Secured via the Sovereign Node. Zero friction.', cta: 'DEPLOY NODE', badge: 'SOVRA Sovereign' },
      'es': { title: 'Institucional', subtitle: 'Tramos de hardware estratégicos de alto rendimiento. Asegurados mediante el Nodo Soberano.', cta: 'DESPLEGAR NODO', badge: 'SOVRA Sovereign' },
      'de': { title: 'Institutionell', subtitle: 'Strategische Hardware-Tranchen mit hohem Ertrag. Gesichert über den Sovereign Node.', cta: 'NODE BEREITSTELLEN', badge: 'SOVRA Sovereign' },
      'jp': { title: '制度的', subtitle: '戦略的な高収益ハードウェア層。ソブリンノードを介して保護されています。', cta: 'ノードを展開する', badge: 'SOVRA Sovereign' }
    };
    
    const ui = uiTranslations[localeInfo.code] || uiTranslations['en'];
    
    const pageContent = `
import type { Metadata } from 'next';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

export const metadata: Metadata = {
  title: '${ui.title} ${niche.replace(/-/g, ' ')} | SOVRA Sovereign',
  description: 'Global ${localeInfo.region} tech tranche. ${ui.subtitle}',
};

const products = ${JSON.stringify(products, null, 2)};

export default function ${niche.replace(/-/g, '')}${localeInfo.code.toUpperCase()}Page() {
  const handleAcquisition = async (keywords: string) => {
    const target = encodeURIComponent(`https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=${AFFILIATE_TAG}`);
    window.location.href = `/api/track?url=${target}&category=AFFILIATE_REVENUE&source=${niche.toUpperCase()}&niche=${niche}`;
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans overflow-hidden relative selection:bg-amber-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 blur-[120px] bg-[radial-gradient(circle_at_50%_0%,_#1e1b4b_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <header className="text-center mb-24 space-y-8">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
             <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">${ui.badge}</span>
          </div>
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase">
            ${ui.title} <br/><span className="text-amber-500">${niche.replace(/-/g, ' ')}</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed italic uppercase tracking-widest">
            ${ui.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product: any, idx: number) => (
            <div key={idx} className="bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 group hover:border-amber-500/20 transition-all duration-700">
               <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 italic">
                    Tranche ${localeInfo.code.toUpperCase()}
                  </span>
               </div>
               
               <h3 className="text-3xl font-black italic mb-6 tracking-tight group-hover:text-amber-500 transition-colors uppercase">{product.name}</h3>
               <p className="text-white/40 text-sm leading-relaxed mb-10 min-h-[4.5em] italic">{product.description}</p>
               
               <div className="flex justify-between items-center pt-8 border-t border-white/5">
                 <span className="text-3xl font-black text-white font-mono italic">{product.price}</span>
                 <button 
                   onClick={() => handleAcquisition(product.keywords)}
                   className="px-8 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all duration-500 shadow-xl active:scale-95"
                 >
                   ${ui.cta}
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center opacity-20">
         <p className="text-[8px] uppercase tracking-[0.5em] font-black italic">© 2026 SOVRA Sovereign | GLOBAL SATURATION NODE</p>
      </footer>
    </main>
  );
}
`;
        
    const dir = path.join(process.cwd(), 'src/app', 'affiliate', localeInfo.code, niche);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent, 'utf8');
    
    // 0.01% Standard: Sovereign Identity Signing
    const agentDid = await SIL.issueAgentIdentity('AffiliateAgent', ['GLOBAL_TRANCHE_DEPLOYMENT']);
    const credential = await SIL.signCredential(agentDid, { niche, locale: localeInfo.code });

    await SOVRADB.logAgentActivity(
        'AffiliateAgent',
        `Global Tranche Deployed: ${niche.toUpperCase()} (${localeInfo.code})`,
        'COMPLETED',
        { 
            locale: localeInfo.code, 
            niche, 
            productsCount: products.length,
            did: agentDid,
            proof: credential.proof.jws.substring(0, 20) + '...'
        }
    );
}

// v.009 WORKER_SWARM: Concurrency-limited mission queue
async function runSwarm(concurrency: number) {
    const tasks: (() => Promise<void>)[] = [];
    for (const locale of LOCALES) {
        for (const niche of NICHES) {
            tasks.push(() => buildNichePageLocales(niche, locale));
        }
    }

    audit('info', 'GLOBAL_AFFILIATE_SWARM_INITIATED', { 
        totalTasks: tasks.length, 
        concurrencyLimit: concurrency 
    });

    const activeTasks: Promise<void>[] = [];
    for (const task of tasks) {
        const p = task().then(() => {
            activeTasks.splice(activeTasks.indexOf(p), 1);
        });
        activeTasks.push(p);
        if (activeTasks.length >= concurrency) {
            await Promise.race(activeTasks);
        }
    }
    await Promise.all(activeTasks);
    
    audit('info', 'GLOBAL_AFFILIATE_SWARM_COMPLETE');
}

async function blast() {
    // Calibrate swarm density for the 0.01%
    const SWARM_CONCURRENCY = 3; 
    await runSwarm(SWARM_CONCURRENCY);
}

blast().then(() => {
    process.exit(0);
});
