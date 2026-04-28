import React from 'react';
import { Shield, Target, Activity, Lock } from 'lucide-react';

export default function SaturationPage() {
  const productLink = "/api/track?target=https%3A%2F%2Fwww.cj.com&handshake=SOVRA_SOVEREIGN&category=SATURATION_NODE";

  return (
    <div className="min-h-screen bg-[#050508] text-white p-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center space-y-12">
        <Shield className="w-20 h-20 text-amber-500 mx-auto animate-pulse" />
        <h1 className="text-6xl font-black uppercase tracking-tighter italic">DEX Infrastructure Solution Node 318</h1>
        <p className="text-2xl text-white/40 font-bold italic leading-relaxed">
          "The definitive institutional standard for DEX Infrastructure in the Singularity era."
        </p>
        
        <div className="glass-panel p-8 rounded-[40px] border border-amber-500/20 bg-amber-500/[0.02] flex flex-col items-center space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.05)]">
           <Lock className="w-12 h-12 text-amber-500" />
           <div className="flex gap-4 text-xs font-mono uppercase tracking-widest text-amber-500/70">
             <span>Asset Fidelity:</span>
             <a href={`${productLink}&q=4k`} className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</a>
             <a href={`${productLink}&q=8k`} className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</a>
             <a href={`${productLink}&q=12k`} className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">12K</a>
           </div>

           <a 
             href={`${productLink}&q=default`}
             className="w-full py-6 px-12 bg-amber-500 text-black font-black uppercase tracking-[0.5em] rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
           >
             Deploy Solution
           </a>
        </div>
      </div>
    </div>
  );
}