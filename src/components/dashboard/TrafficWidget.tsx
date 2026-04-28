'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';
import { 
  Activity, 
  Zap, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  TrendingUp,
  BarChart3,
  MousePointer2
} from 'lucide-react';

/**
 * SOVRA_TRAFFIC_WIDGET (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: GLOBAL_INGRESS_OVERLOOK
 * Aesthetic: PRESTIGE_OBSIDIAN (Amber/Black)
 */
export function TrafficWidget() {
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [marketingPulse, setMarketingPulse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const lock = await generateHandshake();
        const telemetryRes = await fetch('/api/analytics', { headers: { 'X-SOVRA-DEEP-LOCK': lock } });

        if (telemetryRes.ok) {
           const telemetry = await telemetryRes.json();
           setTrafficData(telemetry.clicks || []);
           setMarketingPulse(telemetry.stats || {});
        }
      } catch (err) {
        console.error('[Traffic] Telemetry Fault');
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalTranches = trafficData.length * 2010;
  const velocity = trafficData.filter(c => Date.now() - new Date(c.timestamp).getTime() < 3600000).length * 10;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] hover:border-amber-500/30 transition-all relative overflow-hidden group shadow-2xl"
    >
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-scan-line" />

      <div className="flex justify-between items-start mb-12">
        <div className="space-y-2">
           <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-500 italic">Agency Ingress Pulse</h3>
           <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] italic">Grounding: {marketingPulse?.heartbeatStatus || 'PULSE_NULL'}</p>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]" />
           <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">Live_Agency</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mb-12">
         <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.01] space-y-3 relative overflow-hidden">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Institutional Leads</p>
            <div className="text-4xl font-black text-white italic tracking-tighter flex items-baseline gap-2">
               {loading ? '...' : marketingPulse?.institutionalLeads || 0}
               <span className="text-[10px] text-amber-500 font-black italic">Leads</span>
            </div>
            <MousePointer2 className="absolute -right-4 -bottom-4 w-16 h-16 text-white/5 rotate-12" />
         </div>
         <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.01] space-y-3 relative overflow-hidden">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Pipeline Value</p>
            <div className="text-4xl font-black text-amber-500 italic tracking-tighter flex items-baseline gap-2">
               {loading ? '...' : `$${((marketingPulse?.pipelineValue || 0) / 1000).toFixed(0)}k`}
               <span className="text-[10px] text-white/20 font-black italic">Target</span>
            </div>
            <BarChart3 className="absolute -right-4 -bottom-4 w-16 h-16 text-amber-500/5 -rotate-12" />
         </div>
      </div>

      <div className="space-y-10">
         <div className="space-y-4">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic text-white/30">
               <span>Ingress Velocity (1h Pulse)</span>
               <span className="text-amber-500">+{velocity} PULSE/H</span>
            </div>
            <div className="flex gap-2 h-6 items-end">
               {[40, 60, 30, 80, 50, 90, 45, 70, 55, 85, 40, 60, 75, 50, 95, 30].map((v, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${v}%` }}
                   className={`flex-1 rounded-t-lg transition-colors ${v > 80 ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-white/5'}`}
                 />
               ))}
            </div>
         </div>

         <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest italic">
                  <Globe className="w-3.5 h-3.5" />
                  Source Tranches
               </div>
               <div className="flex flex-wrap gap-2">
                  {['APP', 'AI', 'W3', 'OPS'].map(reg => (
                    <span key={reg} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black italic">{reg}</span>
                  ))}
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-[9px] font-black text-white/30 uppercase tracking-widest italic">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  Ledger Protection
               </div>
               <div className="px-5 py-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-[10px] font-black text-amber-500 uppercase tracking-widest italic flex items-center justify-between">
                  <span>AEGIS_ENCRYPTED</span>
                  <Activity className="w-3 h-3 animate-pulse" />
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
