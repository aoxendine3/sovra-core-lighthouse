"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function EliteProductPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sovereign Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#c5a059]/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-[10px] font-black uppercase tracking-widest border border-[#c5a059]/20">
              Institutional Asset: Private Aviation
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            GLOBAL JET CHARTER PULSE<br /> 
            <span className="text-[#c5a059] opacity-50">BY APEX SOVEREIGN</span>
          </h1>
          <div className="max-w-2xl text-xl text-white/40 leading-relaxed italic">
            To distinguished members of the global elite, we present an unparalleled solution for your discerning travel needs: Global Jet Charter Pulse. This pioneering platform enables instant institutional booking for mid-size to heavy private jets, granting unfettered access to a curated fleet of bespoke aircraft tailored to your most exacting requirements. With a global reach that transcends borders and time zones, you can navigate the skies with unparalleled convenience and sophistication.<br /><br />By partnering with Global Jet Charter Pulse, you will unlock a 3% margin on every booking, ensuring a substantial return on investment for your esteemed institutions. Our meticulous research and expert curation have elevated the standards of private aviation, guaranteeing an unparalleled level of service, security, and exclusivity. You are not merely choosing an aircraft – you are orchestrating a bespoke experience that reflects your stature and distinction. Join the ranks of the most discerning individuals and institutions, who demand nothing but the best, and discover the art of effortless luxury in the skies.
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="glass-panel p-12 border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-white/20 mb-8">Strategic Mandate</h3>
            <p className="text-lg leading-relaxed text-white/80">
              This asset is verifiably prioritized for the top 0.01% global ingress. 
              Execution standard: v2026.11_APEX.
            </p>
          </div>
          
          <div className="flex flex-col justify-center gap-4">
             <a 
               href="https://cj.com/private-jets"
               className="w-full py-6 rounded-2xl bg-[#c5a059] text-black font-black text-center text-lg hover:brightness-110 transition-all shadow-[0_20px_40px_-10px_#c5a05950]"
             >
               ACQUIRE INSTITUTIONAL ACCESS
             </a>
             <p className="text-center text-[10px] uppercase tracking-widest opacity-20">
               Direct Attribution via Sovereign Tracking Proxy
             </p>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 flex justify-between items-center opacity-20 text-[10px] tracking-[0.3em] uppercase">
          <span>© 2026 APEX SOVEREIGN LLC</span>
          <span>Verified Protocol Output [60.0]</span>
        </footer>
      </main>
    </div>
  );
}
