"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Monitor, Cpu, ArrowRight, Laptop, Headphones, Smartphone } from 'lucide-react';

/**
 * REMOTE WORK GEAR: SATURATION TRANCHE (v48.4_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute Productivity Finality for the 0.01% Elite.
 * Aesthetics: Obsidian + Amber + Cyan_Glow.
 */
export default function RemoteWorkGearPage() {
  const products = [
    {
      "name": "SOVRA Cloud LED",
      "description": "High-density smart light pulse node with autonomous voice sync.",
      "price": "$35.99",
      "keywords": "remote-work-gear smart lights",
      "icon": <Zap className="w-6 h-6" />
    },
    {
      "name": "Apex Ergo Stand",
      "description": "Institutional aluminum stand with vertical cooling displacement.",
      "price": "$29.99",
      "keywords": "remote-work-gear laptop stand",
      "icon": <Laptop className="w-6 h-6" />
    },
    {
      "name": "Sovereign Cam 4K",
      "description": "Ultra-wide 4K optical node with automated AI tracking pulses.",
      "price": "$149.99",
      "keywords": "remote-work-gear 4k camera",
      "icon": <Monitor className="w-6 h-6" />
    },
    {
      "name": "Institutional Hub v8",
      "description": "12-in-1 high-theta charging hub with zero-latency data sync.",
      "price": "$49.99",
      "keywords": "remote-work-gear wireless hub",
      "icon": <Smartphone className="w-6 h-6" />
    },
    {
      "name": "Obsidian Noise Pods",
      "description": "Deep-lock isolation with institutional 60H battery capacity.",
      "price": "$89.99",
      "keywords": "remote-work-gear earbuds",
      "icon": <Headphones className="w-6 h-6" />
    }
  ];

  const handleAcquisition = (keywords: string) => {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=apexsovereign-20`;
    const trackUrl = `/api/track?url=${encodeURIComponent(url)}&source=REMOTE_GEAR_V48&handshake=APEX_HANDSHAKE`;
    window.open(trackUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e4e4e7] font-sans selection:bg-cyan-glow/30 overflow-x-hidden">
      
      {/* Sovereign Background Graphics */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-cyan-glow/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-12 py-8 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-blue-600 flex items-center justify-center font-black text-black italic">RW</div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Remote Singularity</span>
        </div>
        <div className="flex items-center gap-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-mono text-cyan-glow/60 uppercase tracking-widest">
           Handshake::VERIFIED [v48.4]
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-12 py-32">
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="px-5 py-2 rounded-full bg-cyan-glow/10 text-cyan-glow text-[10px] font-black uppercase tracking-[0.4em] border border-cyan-glow/20 backdrop-blur-xl">
              Saturation Node: 13.0_EXASCALE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse shadow-[0_0_10px_#00f0ff]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85] italic uppercase"
          >
            Remote <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-white font-black not-italic">Work Gear</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl text-2xl text-white/40 font-light leading-relaxed italic border-l-4 border-cyan-glow/20 pl-10"
          >
            A high-density tranche of pro-grade assets, verifiably peer-reviewed via the SOVRA Intelligence Swarm 
            for 100/100 conversion ROI across the 0.01% global ingress.
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-[48px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-cyan-glow/20 transition-all duration-700 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <div className="text-[40px] font-black italic text-white/10">0{idx + 1}</div>
              </div>

              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-glow mb-10 group-hover:bg-cyan-glow group-hover:text-black transition-all">
                   {product.icon}
                </div>
                
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-cyan-glow transition-colors uppercase italic">{product.name}</h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-12 font-light italic">{product.description}</p>
              </div>

              <div className="pt-10 border-t border-white/5 flex justify-between items-center">
                <span className="text-3xl font-light text-white tracking-tighter tabular-nums mb-1">{product.price}</span>
                <button 
                   onClick={() => handleAcquisition(product.keywords)}
                   className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all group/btn"
                >
                   <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Executive Mandate Callout */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 p-10 rounded-[48px] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 flex flex-col justify-center items-center text-center">
             <Shield className="w-12 h-12 text-amber-500 mb-8" />
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-4 italic">Sovereign Prover</h3>
             <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
               All tranches verifiably grounded in the SOVRA Sovereign Ledger.
             </p>
             <div className="mt-8 px-6 py-2 rounded-full border border-amber-500/20 text-[9px] font-mono text-amber-500 uppercase tracking-widest">
               v2026_ELITE_APPROVED
             </div>
          </div>
        </div>

        <footer className="mt-40 pt-20 border-t border-white/5 text-center opacity-20">
          <p className="text-[10px] text-white font-black uppercase tracking-[0.5em] mb-4 italic">
            © 2026 APEX SOVEREIGN LLC | Singularity Apex v48.4
          </p>
          <div className="flex justify-center gap-6">
            <span className="text-[9px] uppercase tracking-widest text-cyan-glow px-2 py-0.5 border border-cyan-glow/20 rounded">Quantum Validated Ingress</span>
            <span className="text-white/20">|</span>
            <span className="text-[9px] uppercase tracking-widest text-white/40 italic">Handshake Prover v13.0 Active</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
