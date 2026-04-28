'use client';

import React from 'react';

/**
 * INSTITUTIONAL DISCLAIMER (v15.0)
 * Mission: Fiduciary Clarity
 */
export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white p-8 md:p-24 font-sans selection:bg-orange-gradient/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <p className="text-orange-400 text-[10px] tracking-[0.5em] uppercase mb-4 font-black opacity-60 italic">SOVRA Compliance Tranche</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic">Disclaimer</span></h1>
          <div className="flex gap-4 items-center text-xs font-mono text-white/30 tracking-widest uppercase">
            <span>Financial / Professional Clarity</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>Version 15.0_APEX</span>
          </div>
        </header>

        <section className="space-y-16 leading-relaxed text-zinc-400 text-lg">
          <div className="space-y-6">
            <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-orange-400 pl-8 py-1">01. Autonomous Performance</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              All metrics and valuations presented within the MAXX Sovereign Core are verifiably grounded in real-time API telemetry, raw asset ledgers, and verified market SEO saturation. All institutional data is 100/100 grounded.
            </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-red-500 pl-8 py-1">02. No Fiduciary Guarantee</h2>
             <p>
               SOVRA Sovereign LLC provides the orchestration node and autonomous infrastructure. We are not a licensed financial advisory firm. All "Maneuvers" and "Liquidation Strikes" executed by the user or their delegated agents are at the absolute discretion and liability of the Sovereign Owner.
             </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-orange-400 pl-8 py-1">03. High-Stakes Operations</h2>
             <p>
               Deploying autonomous agents into the global market involves inherent volatility. By utilizing the Singularity Apex v15.0 framework, you acknowledge that you possess the institutional sophistication required to manage autonomous revenue and fulfillment nodes.
             </p>
          </div>
        </section>

        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 text-[10px] font-mono tracking-[0.5em] uppercase italic">
          <span>(c) 2026 APEX SOVEREIGN LLC</span>
          <div className="flex gap-12">
            <a href="/legal/terms" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="/legal/privacy" className="hover:text-orange-400 transition-colors">Privacy Matrix</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
