import type { Metadata } from 'next';
import { SOVRAAcquisitionButton } from '@/components/commerce/SOVRAAcquisitionButton';
import { Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Institutional ai accessories | SOVRA Sovereign LLC',
  description: 'Global Global tech tranche. Strategic high-yield hardware tranches. Secured via the Sovereign Node. Zero friction.',
};

const products = [
  {
    "name": "Pro Smart LED",
    "description": "Wifi-enabled smart lights.",
    "price": "$35.99",
    "keywords": "ai-accessories smart lights"
  },
  {
    "name": "Ergo Stand",
    "description": "Premium aluminum stand.",
    "price": "$29.99",
    "keywords": "ai-accessories laptop stand"
  },
  {
    "name": "Ultra Cam 4K",
    "description": "4K AI tracking camera.",
    "price": "$149.99",
    "keywords": "ai-accessories 4k camera"
  }
];

export default function aiaccessoriesENPage() {

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden relative selection:bg-cyan-glow/30">
      {/* Institutional Design system */}
      <div className="bg-grid-premium" />
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <header className="text-center mb-24 space-y-8">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
             <span className="w-2 h-2 bg-cyan-glow rounded-full animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">SOVRA Sovereign LLC</span>
          </div>
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Institutional <br/><span className="text-gradient-cyan">AI ACCESSORIES</span>
          </h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed italic">
            Strategic high-yield hardware tranches. Secured via the Sovereign Node. Zero friction.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product: any, idx: number) => (
            <div key={idx} className="glass-apex p-10 group hover:scale-[1.02] transition-all duration-700">
               <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] font-black tracking-widest text-cyan-glow uppercase px-4 py-1.5 rounded-full bg-cyan-glow/5 border border-cyan-glow/10">
                    Tranche EN
                  </span>
                  <Activity className="w-5 h-5 text-white/10 group-hover:text-cyan-glow animate-pulse" />
               </div>
               
               <h3 className="text-3xl font-black italic mb-6 tracking-tight group-hover:text-cyan-glow transition-colors">{product.name}</h3>
               <p className="text-white/40 text-sm leading-relaxed mb-10 min-h-[4.5em] italic">{product.description}</p>
               
               <div className="flex justify-between items-center pt-8 border-t border-white/5">
                 <span className="text-3xl font-black text-white font-mono italic">{product.price}</span>
                 <SOVRAAcquisitionButton 
                   keywords={product.keywords}
                   category="AFFILIATE_REVENUE"
                   source="AI-ACCESSORIES"
                   label="DEPLOY NODE"
                 />
               </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center opacity-20">
         <p className="text-[8px] uppercase tracking-[0.5em] font-black italic">© 2026 APEX SOVEREIGN LLC | GLOBAL SATURATION NODE</p>
      </footer>
    </main>
  );
}
