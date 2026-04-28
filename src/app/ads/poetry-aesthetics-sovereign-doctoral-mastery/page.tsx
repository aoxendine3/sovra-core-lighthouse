import React from 'react';
import { ShieldCheck, TrendingUp, Lock } from 'lucide-react';

export const metadata = {
  title: 'SOVRA Institutional Briefing: Poetry & Aesthetics: Sovereign Doctoral Mastery',
  description: 'Absolute operational deployment briefing for Poetry & Aesthetics: Sovereign Doctoral Mastery.'
};

export default function AdLandingPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white p-8 md:p-24 selection:bg-amber-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Institutional Handshake Verified</span>
           </div>
           <h1 className="text-6xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
              Poetry & Aesthetics: Sovereign Doctoral Mastery
           </h1>
        </header>

        <main className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full" />
           <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed max-w-none">
              [APEX_PRIME_EMERGENCY_DRAFT] Topic: <br/>[APEX_PRIME_CONTENT_DIRECTIVE]<br/>MANDATE: Absolute Market Saturation<br/>TONE: Ultra-premium obsidian p... Data grounding active.
           </div>
           
           <div className="mt-12 flex flex-col items-center">
              <a 
                href={`/api/track?target=${encodeURIComponent('https://gumroad.com/l/sovra-doc-642')}&handshake=APEX&category=AD_SATURATION`}
                className="px-12 py-5 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(245,158,11,0.2)]"
              >
                Get SOVRA Access
              </a>
              <p className="mt-6 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">SOVRA Sovereign LLC • Secure Deployment Node</p>
           </div>
        </main>
      </div>
    </div>
  );
}