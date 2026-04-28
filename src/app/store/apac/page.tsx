'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Shield, Cpu } from 'lucide-react';

/**
 * GHOST_STORE: APAC_LOCALIZED_VARIANT (v1.0_Δ)
 * ─────────────────────────────────────────────────────────────
 * MISSION: HIGH_SPEED_MOBILE_CONVERSION
 * TARGET: ASIAN_PENINSULA & SURROUNDING REGIONS
 */
export default function APACStorePage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white p-6 font-sans overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full" />
      </div>

      <header className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-gold flex items-center justify-center">
             <Cpu className="w-5 h-5 text-black" />
          </div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase">SOVRA_APAC</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-accent-gold opacity-60">
           <Globe className="w-3 h-3" /> 
           <span>NETWORK_ACTIVE: TOKYO_HK_SG</span>
        </div>
      </header>

      <section className="space-y-12 relative z-10">
        <div className="space-y-4">
           <h1 className="text-4xl font-black italic tracking-tightest leading-none">THE_AGENTIC_ERA_IS_HERE</h1>
           <p className="text-white/40 text-[12px] leading-relaxed max-w-xs">
              Absolute mastery over the digital landscape. Grounded intelligence for the Sovereign Enterprise.
           </p>
        </div>

        {/* High-Velocity Product Card */}
        <div className="glass-panel p-8 rounded-[30px] border-accent-gold/20 bg-gradient-to-br from-accent-gold/10 to-transparent">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <span className="text-[9px] uppercase tracking-[0.3em] text-accent-gold font-black">Featured_Volume</span>
                 <h2 className="text-2xl font-black italic uppercase">AI_Strategy_V1</h2>
              </div>
              <div className="text-xl font-bold">$47.00</div>
           </div>
           
           <ul className="space-y-3 mb-8">
              {[
                { icon: <Zap className="w-3 h-3" />, text: 'Instant_Digital_Ingress' },
                { icon: <Shield className="w-3 h-3" />, text: 'Zero_Point_Security_Verification' },
                { icon: <Cpu className="w-3 h-3" />, text: 'Quad_Doctorate_Context' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-widest opacity-60">
                   <span className="text-accent-gold">{item.icon}</span>
                   {item.text}
                </li>
              ))}
           </ul>

           <button className="w-full py-5 bg-accent-gold text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-[0_0_30px_rgba(205,157,63,0.3)] hover:scale-[1.02] transition-all">
              Initiate_Checkout
           </button>
        </div>

        {/* Global Pulse Ticker */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
           {['SINGAPORE', 'TOKYO', 'SEOUL', 'HONG_KONG'].map((city) => (
             <div key={city} className="glass-panel px-6 py-3 rounded-full border-white/5 bg-white/5 whitespace-nowrap">
                <span className="text-[9px] font-black tracking-widest opacity-40">{city}_PULSE: 100/1</span>
             </div>
           ))}
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-white/5 opacity-20 text-[8px] uppercase tracking-[0.6em] text-center italic">
         © 2026 Sovereign LLC — Absolute Autonomy
      </footer>
    </main>
  );
}
