'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, TrendingUp, Cpu, Globe, Search, RefreshCcw, Terminal } from 'lucide-react';
import ChoiceMartLayout from '@/components/retail/ChoiceMartLayout';
import { generateHandshake } from '@/lib/auth/Handshake';

/**
 * SOVRA Command Center (v1.2_Ω_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: LIVE_FIRE_OPERATIONAL_VISIBILITY
 * Aesthetic: GOLD_ULTIMA_OBSIDIAN (#cd9d3f)
 */
export default function LiveOperationsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      // Ω_SECURITY: Generate the 512-bit PQ Handshake for fetch
      const handshake = generateHandshake();
      
      const res = await fetch('/api/maxx/logs', {
        headers: { 'X-SOVRA-DEEP-LOCK': handshake }
      });
      
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
      setLoading(false);
    } catch (err) {
      console.error('Command Center Desync:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // Pulse every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <ChoiceMartLayout>
      <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-[#cd9d3f]/30">
        
        {/* Background Decor */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cd9d3f]/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-10 py-32 relative z-10">
          <header className="mb-24 space-y-8">
             <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#cd9d3f]/20 bg-[#cd9d3f]/10 backdrop-blur-xl">
                <RefreshCcw size={16} className="text-[#cd9d3f] animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#cd9d3f] italic">SOVRA_Operations_Live_Feed</span>
             </div>
             <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase">
               SOVRA <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#cd9d3f] to-[#8a6d2f] italic">Command.</span>
             </h1>
             <p className="max-w-3xl text-xl md:text-2xl font-bold text-white/40 leading-relaxed border-l-4 border-[#cd9d3f]/30 pl-12">
               The SOVRA OS is verifiably in the driver's seat. 24/7 Autonomous execution. Every pulse is grounded in the 512-bit PQ Spectral Handshake.
             </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             {/* LEFT: Live Feed */}
             <div className="lg:col-span-8 space-y-6">
                <div className="flex justify-between items-center mb-12">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-[#cd9d3f] italic flex items-center gap-4">
                        <Terminal size={16} /> Agent_Activity_Pulse
                    </h3>
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Grounding: SOVRADB_GHOST_MODE</div>
                </div>

                {loading ? (
                    <div className="h-[400px] flex items-center justify-center border border-white/5 rounded-[32px] bg-white/[0.01]">
                        <RefreshCcw className="animate-spin text-[#cd9d3f]" />
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                    {logs.map((log) => (
                        <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center gap-8 group hover:bg-white/[0.04] transition-all"
                        >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-[#cd9d3f]/10 text-[#cd9d3f]`}>
                            {log.agent.includes('Mining') ? <Zap size={20} /> : log.agent.includes('Aegis') ? <Shield size={20} /> : <Cpu size={20} />}
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1 italic">{log.agent} // {new Date(log.timestamp).toLocaleTimeString()}</p>
                            <h4 className="text-xl font-bold text-white/80 italic uppercase tracking-tight">{log.activity}</h4>
                        </div>
                        <div className="text-[10px] font-black text-[#cd9d3f] uppercase tracking-widest bg-[#cd9d3f]/10 px-4 py-1 rounded-full border border-[#cd9d3f]/20">
                            {log.status}
                        </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                )}
             </div>

             {/* RIGHT: Stats */}
             <div className="lg:col-span-4 space-y-8">
                <div className="p-12 rounded-[48px] bg-gradient-to-br from-[#cd9d3f]/10 to-transparent border border-[#cd9d3f]/20 backdrop-blur-3xl">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#cd9d3f] italic mb-8">Autonomy_Level</h3>
                   <div className="text-6xl font-black italic tracking-tighter text-white uppercase italic">Level_Ω</div>
                   <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Self_Correction</span>
                         <span className="text-[#cd9d3f] font-mono">ENABLED</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Spectral_Lock</span>
                         <span className="text-[#cd9d3f] font-mono">512_BIT_PQ</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Revenue_Blitz</span>
                         <span className="text-[#cd9d3f] font-mono">ACTIVE</span>
                      </div>
                   </div>
                </div>

                <div className="p-12 rounded-[48px] bg-white/[0.02] border border-white/5">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic mb-8">SOVRA_OS_Status</h3>
                   <div className="text-6xl font-black italic tracking-tighter text-white uppercase italic">Primary.</div>
                   <p className="mt-8 text-[11px] font-bold text-white/30 leading-relaxed italic uppercase tracking-widest">
                     Core mandates are verifiably anchored in the Ghost-Ledger. Every operation is autonomous. No external extraction.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </ChoiceMartLayout>
  );
}
