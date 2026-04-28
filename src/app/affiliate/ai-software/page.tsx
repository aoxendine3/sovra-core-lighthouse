'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { name: 'Altium Designer', desc: 'Industrial-grade PCB design and AI hardware orchestration.', link: 'https://www.altium.com', score: '99/100', category: 'Hardware' },
  { name: 'ABBYY Document AI', desc: 'Enterprise-scale intelligent document processing and automation.', link: 'https://www.abbyy.com', score: '98/100', category: 'Cognition' },
  { name: 'Acronis Cyber Protect', desc: 'AI-powered proactive data protection and cybersecurity.', link: 'https://www.acronis.com', score: '98/100', category: 'Security' },
  { name: '1Password Enterprise', desc: 'Institutional password management for secure growth.', link: 'https://www.1password.com', score: '97/100', category: 'Privacy' }
];

export default function AISoftwareAffiliate() {
  return (
    <main className="min-h-screen bg-[#050508] text-white p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <p className="text-cyan-glow text-[10px] font-black uppercase tracking-[0.8em] mb-4 italic">SOVRA Sovereign LLC | Cognitive Tranche</p>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none mb-8">
            AI Software <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-glow">Singularity Matrix</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl font-light leading-relaxed italic border-l-2 border-purple-500/40 pl-8">
            High-theta software nodes engineered for institutional scaling. Verifiably grounded in the SOVRA v13.0 Singularity standard.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:border-purple-500/40 transition-all group overflow-hidden relative"
            >
              <div className="relative z-10 flex justify-between items-start mb-10">
                <span className="px-4 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/30">{p.category}</span>
                <span className="text-purple-400 text-[11px] font-black italic tracking-widest uppercase">{p.score}_SIGNAL</span>
              </div>
              <h3 className="relative z-10 text-4xl font-black italic italic mb-4 uppercase">{p.name}</h3>
              <p className="relative z-10 text-white/40 text-sm mb-12 italic leading-relaxed">{p.desc}</p>
              <a 
                href={`/api/track?product=${p.name.replace(' ', '_')}&handshake=APEX_SOVEREIGN`}
                className="relative z-10 inline-block px-12 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_50px_rgba(168,85,247,0.1)]"
              >
                Sync Node
              </a>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
        
        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center">
           <div className="text-[10px] font-black uppercase tracking-[1em] text-white/10 text-center italic">
             Absolute Sovereign Posture — SOVRA Core (v13.0_SINGULARITY)
           </div>
        </footer>
      </div>
    </main>
  );
}
