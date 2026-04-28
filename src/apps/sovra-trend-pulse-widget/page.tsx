'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, PieChart, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * SOVRA Trend Pulse Widget (v.100_SOVEREIGN_ULTIMA)
 * Monetization: Affiliate-Driven + Institutional Settlement
 * MISSION: Ω_EXASCALE_SOVEREIGNTY (v.100_SOVEREIGN_ULTIMA)
 */

interface MetricPulse {
  grossRevenue: number;
  eliteNodeCount: number;
  institutionalLeads: number;
  totalClicks: number;
  cloudHealth: string;
  governanceSync: string;
}

export default function TrendPulseWidget() {
  const [metrics, setMetrics] = useState<MetricPulse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        const token = await generateHandshake();
        const res = await fetch('/api/metrics', {
            headers: { 'X-SOVRA-DEEP-LOCK': token }
        });
        const data = await res.json();
        setMetrics(data);
      } catch (e) {
        console.error('[TrendPulse] Sync Fault:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPulse();
    const interval = setInterval(fetchPulse, 30000);
    return () => clearInterval(interval);
  }, []);

  const trends = [
    { name: 'Sovereign_Ultima Yield', roi: metrics ? `+$${(metrics.grossRevenue / 100).toFixed(1)}k` : '+450%', trendColor: 'text-amber-500', icon: <Zap className="w-5 h-5" /> },
    { name: 'Institutional Nodes', roi: metrics ? metrics.nodes?.toLocaleString() : '50,000', trendColor: 'text-white', icon: <Globe className="w-5 h-5" /> },
    { name: 'Deep Lock Status', roi: '100/100', trendColor: 'text-amber-500', icon: <Lock className="w-5 h-5" /> }
  ];

  const handleAuthorize = async (trendName: string) => {
    const token = await generateHandshake();
    // Institutional Settlement Bridge
    alert(`Settling Tranche: ${trendName}... Synchronizing with Notion Hub.`);
    await fetch('/api/institutional/sync-notion', { 
        method: 'POST', 
        headers: { 'X-SOVRA-DEEP-LOCK': token } 
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans flex items-center justify-center selection:bg-cyan-500/30 selection:text-white overscroll-none overflow-hidden">
      
      {/* Ambient Sovereign Layers */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.08)_0%,transparent_40%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.04)_0%,transparent_40%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full p-[1px] rounded-[64px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl shadow-[0_100px_200px_rgba(0,0,0,1)] relative group"
      >
        <div className="bg-[#0a0a0b]/80 rounded-[63px] p-12 md:p-16 space-y-12 relative z-10">
          
          <header className="space-y-8">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.8em] text-amber-500 font-black italic">
               <div className="flex items-center gap-3">
                  <Lock className="w-3 h-3" />
                  <span>Sovereign_Ultima_Pulse</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_15px_#f59e0b] ${metrics ? 'bg-amber-500' : 'bg-white/20'}`}></div>
                  <span>{metrics ? 'Grounded' : 'Connecting'}</span>
               </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none transition-all duration-700">
                SOVRA <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-white/40">Sovereign_Ultima</span>
              </h1>
              <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-black italic pl-1 pt-4">Terminal v.100 | Elite 0.001%</p>
            </div>
          </header>

          <section className="space-y-4">
            {trends.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
                onClick={() => handleAuthorize(t.name)}
                className="flex justify-between items-center p-8 bg-white/[0.01] rounded-[40px] border border-white/5 hover:border-cyan-400/20 transition-all duration-500 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex gap-6 items-center relative z-10">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-amber-500/10 transition-all text-amber-500/40 group-hover:text-amber-500">
                      {t.icon}
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] font-black text-white group-hover:text-amber-500 transition-colors uppercase italic tracking-widest">{t.name}</p>
                     <p className="text-[8px] text-white/10 uppercase tracking-widest font-mono italic">Trace_0{i+1}</p>
                   </div>
                </div>

                <div className="text-right relative z-10">
                  <p className={`text-3xl font-black ${t.trendColor} italic tracking-tighter tabular-nums`}>{t.roi}</p>
                </div>
              </motion.div>
            ))}
          </section>

          <footer className="pt-8 border-t border-white/5 flex flex-col items-center gap-10">
             <div className="grid grid-cols-2 w-full gap-4">
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 text-center">
                   <div className="text-[9px] text-white/20 uppercase tracking-widest mb-1 italic">Cloud_Health</div>
                   <div className="text-xs font-black text-amber-500 uppercase italic">{metrics?.cloudHealth || 'CALIBRATING'}</div>
                </div>
                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 text-center">
                   <div className="text-[9px] text-white/20 uppercase tracking-widest mb-1 italic">Notion_Sync</div>
                   <div className="text-xs font-black text-white uppercase italic">{metrics?.governanceSync || 'STANDBY'}</div>
                </div>
             </div>

             <button 
                onClick={() => handleAuthorize('GLOBAL_SETTLEMENT')}
                className="w-full py-6 rounded-[32px] bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] italic hover:bg-amber-500 transition-all duration-500 shadow-2xl active:scale-95 group flex items-center justify-center gap-4"
             >
                Authorize Settlement
                <Zap className="w-4 h-4" />
             </button>
          </footer>
        </div>
      </motion.div>

      <style jsx>{`
        .text-cyan-glow { color: #22d3ee; }
      `}</style>
    </div>
  );
}
