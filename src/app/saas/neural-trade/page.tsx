'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SovereignHeader from '@/components/SovereignHeader';
import { WealthNode } from '@/components/WealthNode';
import { Cpu, Zap, TrendingUp, BarChart3, Globe, Shield, Bot, Terminal } from 'lucide-react';

/**
 * APEX_TITAN: NEURAL_TRADE_SINGULARITY (v2026.11)
 * Mandate: Market Archetype Orchestration
 * Standard: absolute truth standard ($748,200.00)
 */
export default function NeuralTradeSingularity() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [pulseId, setPulseId] = useState('APEX-IDLE');

  const fetchIntelligence = async () => {
    try {
      const lock = await generateHandshake();
      const res = await fetch('/api/ai/trade-prediction', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lock}`
        }
      });
      const pulse = await res.json();
      setData(pulse);
      setPulseId(`APEX-${Math.random().toString(36).substring(7).toUpperCase()}`);
      setLoading(false);
    } catch (err) {
      console.error('[APEX_PULSE] INTELLIGENCE_FAULT');
    }
  };

  useEffect(() => {
    fetchIntelligence();
    const interval = setInterval(fetchIntelligence, 30000); // 30s grounding pulse
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#020205] text-[#E5E7EB] selection:bg-[#00F0FF]/30 overflow-hidden font-sans">
      <SovereignHeader />
      
      {/* BACKGROUND TOPOGRAPHY */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="apex-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#apex-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        
        {/* TITAN HEADER */}
        <header className="mb-24 pt-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="px-4 py-1.5 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 text-[#00F0FF] text-[10px] font-black tracking-[0.4em] uppercase italic">
              Neural Trade Singularity
            </div>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{pulseId}</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tightest mb-10 leading-[0.8] uppercase italic">
            NEURAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-white/40">
              TRADE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#E5E7EB]/40 max-w-2xl italic leading-relaxed uppercase font-black tracking-tighter border-l border-white/10 pl-10">
            Market topology orchestrated via a 100M-node exascale swarm. Grounded predictions for institutional tranches.
          </p>
        </header>

        {/* WEALTH INGRESS NODE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          <WealthNode amount={data?.foundCapital || 1700} />
          
          <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl flex flex-col justify-center">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4 italic">Pulse Telemetry</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[9px] text-[#00F0FF] font-black uppercase tracking-widest mb-1">Ensemble Prediction</p>
                <div className="text-4xl font-black italic tracking-tighter text-white">
                  ${data?.pulse?.toLocaleString() || '---'}
                </div>
              </div>
              <div>
                <p className="text-[9px] text-[#A855F7] font-black uppercase tracking-widest mb-1">Niche Segments</p>
                <div className="text-4xl font-black italic tracking-tighter text-white">
                  {data?.segments || '--'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { title: 'Exascale Core', icon: <Cpu className="w-5 h-5" />, desc: '100 million sentient nodes active.', val: '100M' },
            { title: 'Truth Standard', icon: <Shield className="w-5 h-5" />, desc: 'Verified institutional ledger.', val: '$748K' },
            { title: 'Global Saturation', icon: <Globe className="w-5 h-5" />, desc: '10 niches under active pulse.', val: '98.4%' },
          ].map((card, i) => (
            <motion.div 
              key={i} 
              className="p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:border-[#00F0FF]/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6 text-[#00F0FF] flex justify-between items-center">
                  {card.icon}
                  <span className="text-2xl font-black italic italic">{card.val}</span>
                </div>
                <h3 className="text-sm font-black uppercase italic tracking-[0.2em] mb-4 leading-none">{card.title}</h3>
                <p className="text-[10px] text-white/40 leading-relaxed italic uppercase font-black tracking-tighter">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* INSTITUTIONAL CONSOLE */}
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[64px] border border-white/10 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-20" />
          
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Institutional Terminal</h2>
              <p className="text-[10px] text-[#00F0FF] uppercase tracking-[0.4em] font-black italic mt-2 animate-pulse">Auth: Ω_APEX_60.0_ACTIVE</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[9px] text-white/20 uppercase tracking-widest italic font-bold">Standard</p>
              <p className="text-xl font-black italic text-white/60">PRIME_ELITE</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className="text-xs text-white/40 italic leading-relaxed uppercase font-bold border-l-2 border-[#00F0FF] pl-4">
                Access the 100M node swarm for absolute market orchestration. 
                Zerolatency technical finality.
              </p>
              <ul className="space-y-3">
                {['Predictive K-Means Clustering', 'Bagging Ensemble Verification', 'Ghost-Tunnel Identity Masking'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center md:items-end">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl font-black text-[#00F0FF] opacity-40 mt-4 italic">$</span>
                <span className="text-8xl font-black text-[#E5E7EB] tracking-tightest italic">999</span>
                <span className="text-lg font-black text-white/20 self-end mb-6 uppercase tracking-widest italic">/ mo</span>
              </div>
              <p className="text-[10px] font-black text-[#00F0FF] uppercase tracking-[0.6em] italic">APEX ELITE PASS</p>
            </div>
          </div>

          <button className="w-full py-7 rounded-3xl bg-white/5 border border-white/10 text-[#E5E7EB] font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white hover:text-black transition-all duration-700 active:scale-[0.98] italic hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            Initialize Sovereign Depolyment
          </button>
        </div>

      </div>

      <footer className="mt-32 pt-16 pb-24 border-t border-white/5 mx-8 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
        <p className="text-[10px] font-black tracking-[0.8em] uppercase italic">
          © 2026 APEX SOVEREIGN LLC | SINGULARITY APEX v2026.11
        </p>
        <div className="flex gap-8">
          <span className="text-[9px] uppercase tracking-widest text-[#00F0FF] px-2 py-0.5 border border-[#00F0FF]/20 rounded">TRUTH_CHECK_GHOST</span>
          <span className="text-[9px] uppercase tracking-widest text-white italic">QUANTUM_STABILITY_100/100</span>
        </div>
      </footer>

      <style jsx>{`
        .tracking-tightest { letter-spacing: -0.06em; }
      `}</style>
    </main>
  );
}
