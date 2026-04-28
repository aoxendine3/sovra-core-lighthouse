'use client';

import React from 'react';

/**
 * INSTITUTIONAL COOKIE PROTOCOL (v15.0)
 * Mission: Zero-Friction Handshake Clarity
 */
export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white p-8 md:p-24 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <p className="text-purple-400 text-[10px] tracking-[0.5em] uppercase mb-4 font-black opacity-60 italic">SOVRA Compliance Tranche</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-glow italic">Protocol</span></h1>
          <div className="flex gap-4 items-center text-xs font-mono text-white/30 tracking-widest uppercase">
            <span>Cryptographic Node Pacing</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>GDPR COMPLIANT</span>
          </div>
        </header>

        <section className="space-y-16 leading-relaxed text-zinc-400 text-lg">
          <div className="space-y-6">
            <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-purple-400 pl-8 py-1">01. Cryptographic Handshakes</h2>
            <p>
              SOVRA Sovereign LLC utilize cryptographic "cookies" to verifiably authorize your executive ingress. These are not tracking beacons; they are ephemeral cryptographic proofs that your node is authenticated to interact with the Institutional Core.
            </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-cyan-glow pl-8 py-1">02. Ephemeral Storage</h2>
             <p>
               All cookie tranches are verifiably ephemeral. They maintain no persistent identifiable metadata beyond the duration of your active session. Upon session termination or deep-lock engagement, all nodes are verifiably purged from your browser storage.
             </p>
          </div>

          <div className="space-y-6">
             <h2 className="text-white font-black text-3xl tracking-tight uppercase italic border-l-4 border-purple-400 pl-8 py-1">03. Custom Pacing</h2>
             <p>
               As a Sovereign User, you have the right to de-authorize these cookies. However, disabling the cryptographic handshake will result in an immediate "Ingress Block," as our autonomous agents require these proofs to verifiably sign all interactions.
             </p>
          </div>
        </section>

        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 text-[10px] font-mono tracking-[0.5em] uppercase italic">
          <span>(c) 2026 APEX SOVEREIGN LLC</span>
          <div className="flex gap-12">
            <a href="/legal/terms" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="/legal/privacy" className="hover:text-purple-400 transition-colors">Privacy Matrix</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
