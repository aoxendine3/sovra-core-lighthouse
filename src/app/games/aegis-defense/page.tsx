'use client';

import React from 'react';

export default function TrainingModule() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-10">
      <div className="glass-panel p-20 rounded-[64px] border border-white/10 text-center max-w-2xl">
        <div className="w-20 h-20 bg-cyan-glow/10 rounded-full border border-cyan-glow/40 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <svg className="w-10 h-10 text-cyan-glow animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-cyan-glow text-[10px] font-black uppercase tracking-[0.5em] mb-6 italic">SOVRA Training Academy</p>
        <h1 className="text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Institutional Module Active</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto mb-16 leading-relaxed">
          This sector represents an institutional training theater orchestrated by MAXX. 
          All telemetry data is grounded in verified raw-reality protocols.
        </p>
        <a href="/" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Return to Core
        </a>
      </div>
    </main>
  );
}
