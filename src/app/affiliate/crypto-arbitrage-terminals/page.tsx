import React from 'react';
import { Shield, Zap, TrendingUp, Monitor } from 'lucide-react';

export default function AffiliateNode() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 text-emerald-400 mb-6 font-mono text-xs uppercase tracking-widest">
            <Shield className="w-4 h-4" /> 
            <span>SIA_CORE VERIFIED YIELD NODE</span>
            <span className="ml-auto opacity-50">YIELD: Recurring SaaS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">Best Bloomberg Alternatives for Crypto</h1>
        </header>

        <section className="glass-panel p-10 bg-white/[0.02] border border-white/5 space-y-8 rounded-3xl">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-[#d4af37]">Institutional Grade Arbitration</h2>
          <p className="text-xl text-white/50 font-light leading-relaxed">
            These assets have been algorithmically vetted by SIA_CORE for maximum alpha generation in 2026. 
            Deploy structural advantages against legacy markets safely and efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[1, 2, 3, 4].map(i => (
               <a 
                 key={i} 
                 href={`/api/track?slug=${'crypto-arbitrage-terminals'}&rank=${i}`}
                 className="block p-8 border border-white/10 hover:border-emerald-400/50 bg-white/5 rounded-2xl transition-all group"
               >
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-xs uppercase tracking-widest font-black text-white/30 group-hover:text-emerald-400">Option 0{i}</span>
                    <TrendingUp className="w-5 h-5 text-white/20 group-hover:text-emerald-400" />
                 </div>
                 <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Premium Asset {i}</h3>
                 <p className="text-sm text-white/40">Guaranteed highest institutional yield.</p>
               </a>
            ))}
          </div>
        </section>

        <footer className="pt-24 pb-8 flex justify-between items-center text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">
          <span>Operated by SOVRA Sovereign LLC</span>
          <span>Zero-Persistence Active // SIA_CORE</span>
        </footer>
      </div>
    </div>
  );
}