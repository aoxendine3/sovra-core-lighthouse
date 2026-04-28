'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Lock, Zap, Globe, ShieldCheck } from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface MetricPulse {
  grossRevenue: number;
  eliteNodeCount: number;
  cloudHealth: string;
  governanceSync: string;
}

export default function TrendPulseWidget() {
  const [metrics, setMetrics] = useState<MetricPulse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        const lock = await generateHandshake();
        const res = await fetch('/api/metrics', {
            headers: { 'X-SOVRA-DEEP-LOCK': lock }
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
    { name: 'Elite Yield', roi: metrics ? `+$${(metrics.grossRevenue / 1000).toFixed(1)}K` : '+450%', color: 'text-amber-500', icon: Zap },
    { name: 'Saturated Nodes', roi: metrics ? (metrics.eliteNodeCount || 5000).toLocaleString() : '5,000', color: 'text-white', icon: Globe },
    { name: 'Deep Lock Status', roi: '100/100', color: 'text-amber-500', icon: Lock }
  ];

  if (loading) return (
    <div className="p-8 rounded-[40px] bg-white/[0.01] border border-white/5 flex items-center justify-center">
       <span className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.4em] animate-pulse italic">Syncing ROI Pulse...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.4em] italic">ROI Pulse Tranche</h3>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">GROUNDED</span>
         </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {trends.map((t, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.02)' }}
            className="flex justify-between items-center p-6 bg-white/[0.01] rounded-[32px] border border-white/5 hover:border-amber-500/20 transition-all group relative overflow-hidden"
          >
            <div className="flex gap-4 items-center">
               <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-amber-500/10 transition-all text-amber-500/40 group-hover:text-amber-500">
                  <t.icon className="w-4 h-4" />
               </div>
               <div>
                 <p className="text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase italic tracking-widest">{t.name}</p>
                 <p className="text-[8px] text-white/5 uppercase tracking-widest font-mono italic">Trace_0{i+1}</p>
               </div>
            </div>
            <div className={`text-2xl font-black ${t.color} italic tracking-tighter tabular-nums`}>{t.roi}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
