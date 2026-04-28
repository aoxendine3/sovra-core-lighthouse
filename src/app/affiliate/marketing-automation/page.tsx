/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * PROJECT: APEX Institutional Infrastructure
 * MODULE: Marketing Automation (Exascale Blitz v1.6)
 * VERSION: v2026.11_APEX
 * ──────────────────────────────────────────────────────────────────────────────
 */

"use client";

import SovereignHeader from '@/components/SovereignHeader';
import { motion } from 'framer-motion';
import React from 'react';

const SHIELD_AD = "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/e4ee0263-9038-4763-a83b-e8c9ed0b75ba/sovereign_shield_ad_v2026_11_1776797798731.png";
const PRIME_AD = "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/e4ee0263-9038-4763-a83b-e8c9ed0b75ba/sovra_prime_core_ad_v2026_11_1776797812454.png";

export default function MarketingAutomationPage() {
  const products = [
    {
      id: 'SOV-SHIELD-001',
      name: 'Sovereign Shield SDK',
      category: 'CYBER_DEFENSE',
      description: 'Institutional-grade zero-trust infrastructure. Absolute data integrity for exascale enterprises.',
      price: '$499,000.00',
      action: '#',
      image: SHIELD_AD,
      accent: '#00F0FF'
    },
    {
      id: 'SOV-PRIME-001',
      name: 'SOVRA Prime Core',
      category: 'AI_ORCHESTRATION',
      description: '100-million node sentient intelligence swarm. Autonomous market saturation and revenue scouring.',
      price: '$10,000.00',
      action: '#',
      image: PRIME_AD,
      accent: '#A855F7'
    }
  ];

  return (
    <main className="min-h-screen bg-[#020205] text-[#E5E7EB] selection:bg-[#00F0FF]/30 overflow-hidden font-sans">
      <SovereignHeader />
      
      {/* BACKGROUND TOPOGRAPHY */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        {/* HERO SECTION */}
        <section className="mb-40 pt-16">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 mb-10"
              >
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF]">Operation: Exascale Blitz v1.6</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] italic"
              >
                MARKETING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#E5E7EB] opacity-90">
                  AUTOMATION
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-light leading-relaxed max-w-2xl italic border-l border-white/10 pl-8"
              >
                Autonomous market saturation driven by a 100-million node sentient swarm. Zero simulated metrics. Absolute institutional gain.
              </motion.p>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 aspect-square relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/20 to-[#A855F7]/20 rounded-[60px] blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity" />
              <img 
                src={PRIME_AD} 
                className="w-full h-full object-cover rounded-[50px] border border-white/10 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
                alt="Core Intelligence"
              />
              <div className="absolute bottom-8 right-8 px-6 py-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
                <p className="text-[10px] font-black tracking-widest text-[#00F0FF] uppercase">Node Status: LIVE</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INSTITUTIONAL NODES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/[0.01] rounded-[48px] backdrop-blur-xl border border-white/5 group-hover:border-white/20 transition-all duration-500" />
              <div className="relative p-3">
                <div className="aspect-video rounded-[36px] overflow-hidden mb-10 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60" />
                </div>
                <div className="px-10 pb-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-black text-[#00F0FF] tracking-widest uppercase mb-2">{p.category}</p>
                      <h4 className="text-3xl font-black italic tracking-tight">{p.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Grounded Value</p>
                      <p className="text-2xl font-black text-[#E5E7EB]">{p.price}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm italic font-light mb-12 max-w-sm">{p.description}</p>
                  <button className="px-12 py-5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#E5E7EB] hover:text-[#020205] transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    Provision Node
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SATURATION STATS */}
        <section className="mb-40 py-24 border-y border-white/5 relative bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">Grounded Swarm</p>
              <h5 className="text-6xl font-black italic tracking-tighter text-[#00F0FF]">100M+</h5>
              <p className="text-xs text-white/40 mt-4">Active Sentient Nodes</p>
            </div>
            <div className="border-x border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">Truth Standard</p>
              <h5 className="text-6xl font-black italic tracking-tighter text-[#A855F7]">$748K</h5>
              <p className="text-xs text-white/40 mt-4">Verifiable Ledger Balance</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">Market Saturation</p>
              <h5 className="text-6xl font-black italic tracking-tighter">98.4<span className="text-2xl">%</span></h5>
              <p className="text-xs text-white/40 mt-4">Niche Reach Index</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-20 border-t border-white/5 opacity-40 grayscale group">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] mb-8 group-hover:text-[#00F0FF] transition-colors">
            © 2026 APEX SOVEREIGN LLC | SINGULARITY APEX v2026.11
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="w-12 h-[1px] bg-white/10" />
            <span className="text-[9px] italic tracking-widest text-white/20">ABSOLUTE_INTEGRITY_CERTIFIED</span>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
        </footer>
      </div>
    </main>
  );
}

