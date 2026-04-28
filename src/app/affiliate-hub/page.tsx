'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, BarChart3, Rocket, Cpu, Lock, Terminal, CheckCircle2 } from 'lucide-react';

const METRICS = [
  { label: 'Annual Impressions', value: '1.24B+', sub: 'Global Reach' },
  { label: 'Conversion Density', value: '4.8%', sub: 'Avg. Yield' },
  { label: 'pSEO Niche Nodes', value: '50+', sub: 'Saturation' },
  { label: 'Data Accuracy', value: '100/100', sub: 'SOVRA Standard' }
];

const NICHES = [
  'Real Estate Arbitrage', 'AI SaaS Productivity', 'Cyber-Defense 2026', 
  'FinTech Liquidity', 'D2C Sensory Tech', 'Institutional Crypto',
  'Industrial E-Commerce', 'Medical Precision Tech', 'Sustainable Infrastructure'
];

export default function AffiliateHub() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020205] text-white selection:bg-cyan-glow selection:text-black overflow-x-hidden shadow-mesh">
      {/* Institutional Scan-line */}
      <div className="scan-line opacity-20" />

      <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-glow status-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-glow italic">SOVRA Sovereign LLC | Publisher Node</span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tightest uppercase serif-sia_core leading-none">
            Publisher <br />
            <span className="text-white">Authority</span>
          </h1>
          
          <p className="max-w-2xl text-white/40 text-lg font-light leading-relaxed italic border-x border-white/5 px-12">
            The epicenter of the high-theta affiliate matrix. SOVRA Sovereign LLC orchestrates a federated swarm of conversion nodes designed for absolute market saturation.
          </p>
        </motion.div>
      </header>

      {/* Metrics Matrix */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="glass-apex p-10 flex flex-col items-center text-center space-y-4 group"
            >
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">{m.label}</p>
              <div className="text-5xl font-black text-white italic tracking-tighter group-hover:text-cyan-glow transition-colors">{m.value}</div>
              <p className="text-[9px] font-black text-cyan-glow/40 uppercase tracking-widest">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Niche Portfolio */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="glass-apex p-12 overflow-hidden bg-white/[0.01]">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-gold-sia_core">Institutional <br />Niche Portfolio</h2>
              <p className="text-[12px] font-black text-white/20 uppercase tracking-[0.5em] italic leading-none">Global pSEO Saturation Registry</p>
            </div>
            <div className="hidden md:block text-[10px] font-black text-white/10 uppercase tracking-[1em] italic">V13.0 Singularity</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NICHES.map((n, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-all group"
              >
                <div className="w-8 h-[1px] bg-white/10 group-hover:bg-cyan-glow transition-all" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all">{n}</span>
                <CheckCircle2 size={12} className="ml-auto text-cyan-glow/20 group-hover:text-cyan-glow opacity-0 group-hover:opacity-100 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Node */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
              High-Theta <br />
              <span className="text-cyan-glow">Infrastructure</span>
            </h2>
            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Quantum-Safe Handshaking', desc: 'Ed25519 hybrid proofs for all API ingress.' },
                { icon: Globe, title: 'Global pSEO Mesh', desc: 'Autonomous page generation across 50+ languages.' },
                { icon: Terminal, title: 'Maxx OS Core', desc: 'Real-time orchestration of the federated publisher swarm.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:border-cyan-glow/40 transition-all h-fit">
                    <item.icon className="text-cyan-glow" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-widest italic mb-1">{item.title}</h3>
                    <p className="text-sm text-white/40 italic font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-square glass-apex bg-cyan-glow/[0.02] border-cyan-glow/20 flex items-center justify-center relative overflow-hidden group">
                <Cpu size={120} className="text-cyan-glow/10 group-hover:text-cyan-glow transition-all duration-1000 rotate-45 group-hover:rotate-0" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-center">
                  <div className="text-[10px] font-black text-cyan-glow uppercase tracking-[0.5em] italic animate-pulse">Core_Singularity_V13.0_Active</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="relative mt-40 pt-20 pb-32 px-6 border-t border-white/5 z-10 bg-[#020205]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-6">
            <div className="text-2xl font-black italic uppercase tracking-tighter serif-sia_core">SOVRA Sovereign LLC</div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium italic leading-relaxed">
              Global Headquarters: Wyoming Institutional Sector <br />
              Registration: [SOVEREIGN_V2026.11]
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[1em] italic">Compliance Nodes</h4>
            <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest text-white/40 italic hover:text-white cursor-pointer">
              <span>Privacy Assurance Protocol</span>
              <span>Institutional Terms of Flow</span>
              <span>Affiliate Disclosure (Singularity V13.0)</span>
            </div>
          </div>

          <div className="space-y-6 text-right md:text-right">
             <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em] italic">Network Certification</div>
             <div className="flex justify-end gap-6 items-center grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                <Rocket className="text-white" size={32} />
                <BarChart3 className="text-white" size={32} />
                <Lock className="text-white" size={32} />
             </div>
             <p className="text-[8px] text-white/10 uppercase tracking-widest mt-8">Copyright © 2026 SOVRA Sovereign LLC. All Rights Reserved. Grounded on Singularity.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
