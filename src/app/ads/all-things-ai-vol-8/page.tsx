import React from 'react';
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

export const metadata = {
  title: 'SOVRA Institutional Briefing: All Things AI: Vol 8',
  description: 'Absolute operational deployment briefing for All Things AI: Vol 8.'
};

export default function AdLandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 selection:bg-cyan-500/30 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center md:text-left">
           <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Institutional Protocol Alpha Verified</span>
           </div>
           <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">
              All Things AI: Vol 8
           </h1>
           <p className="text-secondary uppercase tracking-[0.5em] text-[10px] opacity-40">System Node: SOVRA_GENESIS_PULSE</p>
        </header>

        <main className="relative">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="glass-panel p-12 rounded-[50px] border border-white/5 bg-white/[0.02] shadow-2xl relative z-10 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8 opacity-60">
                 <Globe className="w-5 h-5 text-cyan-500" />
                 <span className="text-xs font-mono tracking-widest uppercase">Global Market Saturation Active</span>
              </div>
              
              <div className="prose prose-invert prose-p:text-xl prose-p:leading-relaxed prose-p:text-white/80 max-w-none">
                 <p>Detailed breakdown and synthesis of the latest AI breakthroughs, Volume 8.</p>
                 <p>This is the definitive synthesis for the eBook sector. Grounded in the SOVRA Sovereign framework, this asset provides an unfair advantage in the cognitive arbitrage landscape.</p>
              </div>
              
              <div className="mt-20 flex flex-col items-center gap-8">
                 <button className="group relative px-16 py-7 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    Secure Ingress Now
                 </button>
                 
                 <div className="flex items-center gap-10 opacity-30">
                    <div className="flex items-center gap-2">
                       <Lock className="w-3 h-3" />
                       <span className="text-[9px] uppercase tracking-widest">End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Zap className="w-3 h-3" />
                       <span className="text-[9px] uppercase tracking-widest">Instant Fulfillment</span>
                    </div>
                 </div>
              </div>
           </div>
        </main>

        <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20 text-[9px] font-mono uppercase tracking-[0.4em]">
           <span>© 2026 SOVRA Sovereign LLC // Node_Exascale</span>
           <div className="flex gap-8">
              <span>Privacy Protocol</span>
              <span>Terms of Autonomy</span>
           </div>
        </footer>
      </div>
    </div>
  );
}