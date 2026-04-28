'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { name: 'AceableAgent', desc: 'Industry-leading online real estate pre-licensing courses.', link: 'https://www.aceableagent.com', score: '99/100', category: 'Education' },
  { name: 'FarmTogether', desc: 'Institutional-grade farmland investment and wealth building.', link: 'https://www.farmtogether.com', score: '98/100', category: 'Investment' },
  { name: 'PropStream', desc: 'Elite property data and analytics for high-volume investors.', link: 'https://www.propstream.com', score: '97/100', category: 'Analytics' },
  { name: 'Architectural Designs', desc: 'Premium architectural home plans for development.', link: 'https://www.architecturaldesigns.com', score: '95/100', category: 'Construction' }
];

export default function RealEstateAffiliate() {
  return (
    <main className="min-h-screen bg-[#050508] text-white p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <p className="text-cyan-glow text-[10px] font-black uppercase tracking-[0.8em] mb-4 italic">SOVRA Sovereign LLC | Growth Tranche</p>
          <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-none mb-8">
            Real Estate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-indigo-500">Liquidity Matrix</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl font-light leading-relaxed italic border-l-2 border-cyan-glow/40 pl-8">
            Strategic affiliation with high-theta real estate infrastructure. These nodes are verifiably compliant with the SOVRA v2026.11 security standard.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:border-cyan-glow/40 transition-all group"
            >
              <div className="flex justify-between items-start mb-10">
                <span className="px-4 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/30">{p.category}</span>
                <span className="text-cyan-glow text-[11px] font-black italic tracking-widest uppercase">{p.score}_SIGNAL</span>
              </div>
              <h3 className="text-4xl font-black italic italic mb-4 uppercase">{p.name}</h3>
              <p className="text-white/40 text-sm mb-12 italic leading-relaxed">{p.desc}</p>
              <a 
                href={`/api/track?product=${p.name}&handshake=APEX_SOVEREIGN`}
                className="inline-block px-12 py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-cyan-glow hover:text-black transition-all"
              >
                Establish Access
              </a>
            </motion.div>
          ))}
        </div>
        
        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center">
           <div className="text-[10px] font-black uppercase tracking-[1em] text-white/10 text-center italic">
             Absolute Sovereign Posture — Verifiably Compliant (v2026.11_APEX)
           </div>
        </footer>
      </div>
    </main>
  );
}
