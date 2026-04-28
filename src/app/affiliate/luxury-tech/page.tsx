'use client';

import React from 'react';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, ArrowRight, CheckCircle2, Globe, Lock } from 'lucide-react';

// metadata would be in layout or a separate file for client-side pages in older next
// but we defined it in the plan.

const assets = [
  {
    id: 'aegis-quantum',
    name: 'Aegis Quantum Firewall',
    description: 'AI-driven security node for private estates. Real-time interception of global signal tranches.',
    price: '$4,500',
    features: ['Quantum Intercept', '0.01ms Latency', 'Sovereign Encryption'],
    icon: <Shield className="w-10 h-10 text-amber-500" />
  },
  {
    id: 'sovra-biolink',
    name: 'Sovereign Bio-Link',
    description: 'Real-time biometric health tracking node. Seamless integration with institutional life-preservation tranches.',
    price: '$1,850',
    features: ['Institutional Vitals', 'Neural Integration', '24/7 Aegis Monitoring'],
    icon: <Zap className="w-10 h-10 text-amber-500" />
  },
  {
    id: 'elite-command',
    name: 'Elite Node Command Station',
    description: 'Modular exascale workstation for the 0.01%. Absolute performance for sovereign asset orchestration.',
    price: '$12,000',
    features: ['64-Core Neural Engine', 'Liquid Obsidian Cooling', 'Dual Sovereign Uplink'],
    icon: <Cpu className="w-10 h-10 text-amber-500" />
  }
];

export default function LuxuryTechNode() {
  const trackAcquisition = (assetId: string) => {
    const handshakeId = `SOVRA-TECH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const target = encodeURIComponent(`https://shop.anti-gravity.app/luxury-tech/${assetId}`);
    window.location.href = `/api/track?url=${target}&event=AFFILIATE_SATURATION&category=LUXURY_TECH&handshake=${handshakeId}`;
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-amber-500/30 overflow-hidden relative">
      
      {/* Sovereign Foreground Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] bg-amber-500/5 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <header className="text-center mb-32 space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-3xl shadow-2xl">
             <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_15px_#f59e0b]" />
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60 italic leading-none">SOVRA Sovereign — Institutional Asset Tranche</span>
          </div>
          
          <h1 className="text-8xl md:text-[160px] font-black italic tracking-tightest leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 uppercase select-none">
            LUXURY <br/><span className="text-amber-500">TECH</span>
          </h1>
          
          <p className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed italic uppercase tracking-widest">
            "Pro-grade analysis and deployment of high-theta luxury assets. Verifiably cleared for institutional orchestration by SOVRA Sovereign."
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-10 pt-10">
             <div className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                <Globe className="w-4 h-4" /> Global Ingress Active
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                <Lock className="w-4 h-4" /> Zero-Trust Handshake
             </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {assets.map((asset, idx) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="glass-panel p-12 rounded-[64px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-amber-500/20 transition-all duration-700 group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="mb-12 relative z-10 w-20 h-20 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-700">
                  {asset.icon}
               </div>
               
               <h3 className="text-4xl font-black italic mb-6 tracking-tighter group-hover:text-amber-500 transition-colors uppercase leading-tight">{asset.name}</h3>
               <p className="text-white/40 text-[13px] leading-relaxed mb-12 italic font-medium uppercase tracking-wide min-h-[4.5em]">{asset.description}</p>
               
               <ul className="space-y-5 mb-16 relative z-10">
                  {asset.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-[11px] text-white/60 font-black uppercase tracking-widest">
                       <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
                       {f}
                    </li>
                  ))}
               </ul>
               
               <div className="flex justify-between items-center pt-10 border-t border-white/5 mt-auto relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">COMMITMENT</p>
                    <span className="text-3xl font-black text-white italic tracking-tighter tabular-nums">{asset.price}</span>
                  </div>
                  <button 
                    onClick={() => trackAcquisition(asset.id)}
                    className="px-8 py-5 bg-amber-500 text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(245,158,11,0.1)] active:scale-95 flex items-center gap-3"
                  >
                    Authorize <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>
          ))}
        </section>

        <footer className="pt-20 border-t border-white/5 text-center opacity-30 pb-20">
           <div className="mb-10 flex items-center justify-center gap-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.8em]">Institutional Trace</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20"></div>
           </div>
           <p className="text-[9px] uppercase tracking-[0.5em] font-black italic max-w-2xl mx-auto leading-loose text-white/60">
              Verifiably Compliant (v1.0_SOVRA). © 2026 SOVRA Sovereign | Global Institutional Saturation Node. All rights reserved.
           </p>
        </footer>

      </div>
    </main>
  );
}
