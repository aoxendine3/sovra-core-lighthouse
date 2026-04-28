'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, AlertTriangle, Activity } from 'lucide-react';

/**
 * SINGULARITY_PULSE_LEDGER (v48.6)
 * ─────────────────────────────────────────────────────────────
 * Mode: OBSIDIAN_PULSE_HUD
 * Mandate: Absolute Telemetry Truth for the SOVRA Empire.
 */

interface LogEntry {
  id: string;
  timestamp: string;
  agent: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'security';
}

export const LogFeed = ({ logs }: { logs: LogEntry[] }) => {
  const displayedLogs = useMemo(() => (logs || []).slice(0, 50), [logs]);

  const config = {
    info: { color: 'text-white/20', icon: <Activity className="w-3 h-3" />, label: 'SYSTEM_PULSE' },
    success: { color: 'text-cyan-glow', icon: <Zap className="w-3 h-3" />, label: 'MISSION_SUCCESS' },
    warning: { color: 'text-amber-500', icon: <AlertTriangle className="w-3 h-3" />, label: 'EXECUTIVE_ALERT' },
    error: { color: 'text-red-500', icon: <Activity className="w-3 h-3" />, label: 'RUNTIME_FAULT' },
    security: { color: 'text-amber-500 font-black tracking-widest', icon: <Shield className="w-3 h-3" />, label: 'SENTINEL_GATE' }
  };

  return (
    <div className="bg-[#050505] border border-white/5 rounded-[56px] flex flex-col h-full overflow-hidden shadow-2xl relative group">
      
      {/* HUD Header */}
      <div className="px-10 py-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center relative z-10">
        <div className="flex items-center gap-5">
          <div className="relative">
             <div className="w-3 h-3 rounded-full bg-cyan-glow animate-ping opacity-20 absolute inset-0" />
             <div className="w-3 h-3 rounded-full bg-cyan-glow shadow-[0_0_10px_#00f0ff]" />
          </div>
          <div className="space-y-1">
             <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-glow italic leading-none">Singularity_Pulse</h3>
             <p className="text-[9px] text-white/20 font-black uppercase tracking-widest italic mt-0.5">Telemetry Ledger v48.6</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-3">
              <Terminal className="w-3 h-3 text-white/40" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] italic">Buffer_Sync: ACTIVE</span>
           </div>
        </div>
      </div>

      {/* Logic Stream */}
      <div className="flex-1 overflow-y-auto px-10 py-10 space-y-4 custom-scrollbar bg-black/40 relative z-10">
        <AnimatePresence initial={false}>
          {displayedLogs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-8 hover:bg-white/[0.02] p-5 rounded-[32px] border border-transparent hover:border-white/5 transition-all duration-700 group relative overflow-hidden"
            >
              {/* Status Indicator */}
              <div className="pt-1.5 flex flex-col items-center">
                 <div className={`w-1 h-8 rounded-full transition-all ${log.type === 'error' || log.type === 'security' ? 'bg-red-500 animate-pulse' : 'bg-white/5 group-hover:bg-amber-500/20'}`} />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${config[log.type].color}`}>
                        {config[log.type].icon}
                        {config[log.type].label}
                     </span>
                     <div className="h-[1px] w-4 bg-white/10" />
                     <span className="text-[9px] font-mono text-white/10 italic">NODE::{log.agent.toUpperCase()}</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/10 tracking-widest uppercase italic group-hover:text-amber-500/40 transition-colors">
                    {milliTime(log.timestamp)}
                  </span>
                </div>
                
                <p className={`text-[12px] leading-relaxed transition-all ${log.type === 'error' ? 'text-red-500 font-bold' : 'text-white/60 group-hover:text-white/90 italic'}`}>
                   {log.message}
                </p>
              </div>

              {/* HUD Hover Effect */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Frequency Scanner Scanline */}
      <div className="h-[2px] w-full bg-white/5 relative">
         <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-glow/20 to-transparent"
         />
      </div>
    </div>
  );
};

function milliTime(ts: string) {
    if (!ts.includes(':')) return ts;
    const parts = ts.split(':');
    return `${parts[1]}:${parts[2]}`;
}
