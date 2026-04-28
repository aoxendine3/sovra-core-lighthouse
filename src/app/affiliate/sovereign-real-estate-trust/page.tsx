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
              Institutional Asset: Asset Management
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            SOVEREIGN REAL ESTATE TRUST<br /> 
            <span className="text-[#c5a059] opacity-50">BY APEX SOVEREIGN</span>
          </h1>
          <div className="max-w-2xl text-xl text-white/40 leading-relaxed italic">
            We invite you to participate in a paradigm-shifting investment opportunity, reserved exclusively for the most discerning and sophisticated individuals. The Sovereign Real Estate Trust offers direct access to offshore high-yield commercial property tranches and luxury developments, previously inaccessible to the general market. By partnering with us, you will gain unparalleled insights into the global real estate landscape, allowing you to make informed investment decisions that align with your exceptional standards.<br /><br />Through our proprietary network, you will have the ability to invest in a curated selection of high-end properties, yielding significant returns through a diversified portfolio of commercial and residential assets. Our comprehensive research and analysis ensure that every investment decision is grounded in scientific rigor and tempered by an unwavering commitment to excellence. With a 5% commission structure, we offer a compelling opportunity for like-minded individuals to coalesce their wealth and secure a privileged position within the rarefied world of high-net-worth investing.
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
               href="https://cj.com/luxury-real-estate"
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
