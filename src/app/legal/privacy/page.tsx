'use client';

import React from 'react';

/**
 * INSTITUTIONAL PRIVACY MATRIX (v15.0)
 * Mission: Absolute Data Sovereignty
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white p-8 md:p-24 font-sans selection:bg-cyan-glow/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <p className="text-cyan-glow text-[10px] tracking-[0.5em] uppercase mb-4 font-black opacity-60 italic">SOVRA Compliance Tranche</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-purple-500 italic">Matrix</span></h1>
          <div className="flex gap-4 items-center text-xs font-mono text-white/30 tracking-widest uppercase">
            <span>Last Updated: April 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>GDPR/CCPA/APAC Verified</span>
          </div>
        </header>

        <section className="space-y-16 leading-relaxed text-zinc-400 text-lg">
          <div className="space-y-6">
            <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-cyan-glow pl-8 py-1">01. Data Sovereignty</h2>
            <p>
              Your digital footprint within the SOVRA Sovereign LLC network is verifiably your own. We do not engage in the extraction or liquidation of personal telemetry for 3rd-party arbitrage. All data tranches captured are utilized strictly for autonomous business optimization and security handshakes.
            </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-purple-500 pl-8 py-1">02. Cryptographic Cookies</h2>
             <p>
               We utilize time-variant, cryptographic cookies to maintain the integrity of your executive session. These nodes are verifiably non-extractable and are destroyed upon session termination. Institutional performance depends on these pulses to ensure 100/100 ingress speed.
             </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-cyan-glow pl-8 py-1">03. Regional Compliance</h2>
             <p>
               This infrastructure verifiably adheres to the following regulatory tranches:
             </p>
             <ul className="list-none space-y-4 font-mono text-xs text-white/40 uppercase tracking-widest mt-8">
               <li className="flex gap-4 items-center"><span className="w-2 h-2 rounded-full bg-cyan-glow/40"></span> GDPR (Europe) - Institutional Compliance Enabled</li>
               <li className="flex gap-4 items-center"><span className="w-2 h-2 rounded-full bg-cyan-glow/40"></span> CCPA (California) - Right to Absolute Deletion</li>
               <li className="flex gap-4 items-center"><span className="w-2 h-2 rounded-full bg-cyan-glow/40"></span> PIPL (Asia-Pacific) - Regional Data Localization</li>
             </ul>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-purple-500 pl-8 py-1">04. Right of Termination</h2>
             <p>
               As a Sovereign User, you retain the absolute right to trigger a global data-sweep. Invoking this handshake verifiably scrubs all identifiable tranches from the Institutional Ledger within 24 hours of execution.
             </p>
          </div>
        </section>

        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 text-[10px] font-mono tracking-[0.5em] uppercase italic">
          <span>(c) 2026 APEX SOVEREIGN LLC</span>
          <div className="flex gap-12">
            <a href="/legal/terms" className="hover:text-cyan-glow transition-colors">Terms of Service</a>
            <a href="/legal/disclaimer" className="hover:text-cyan-glow transition-colors">Disclaimer</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
