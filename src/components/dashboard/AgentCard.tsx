import React from 'react';
import { motion } from 'framer-motion';

interface AgentCardProps {
  role: string;
  name: string;
  status: 'active' | 'idle' | 'executing' | 'lockdown';
  description: string;
  lastAction?: string;
}

/**
 * APEX_AGENT_CARD: v31.0_SOVRA
 * ─────────────────────────────────────────────────────────────
 * MISSION: AGENTIC_TELEMETRY_DISPLAY
 * Style: SOVEREIGN_GOLD_GLASS
 */
export const AgentCard = ({ role, name, status, description, lastAction }: AgentCardProps) => {
  const statusConfig = {
    active: { color: 'text-accent-gold', bg: 'bg-accent-gold/10', border: 'border-accent-gold/30', label: 'ONLINE_ACTIVE' },
    idle: { color: 'text-white/20', bg: 'bg-white/5', border: 'border-white/10', label: 'STANDBY_SYNC' },
    executing: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', label: 'EXECUTING_PULSE' },
    lockdown: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'PERIMETER_LOCK' },
  };

  const config = statusConfig[status];

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[40px] border border-white/5 flex flex-col gap-6 group transition-all duration-700 hover:border-accent-gold/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${status === 'active' || status === 'executing' ? 'bg-accent-gold shadow-[0_0_10px_rgba(205,157,63,0.8)] animate-pulse' : 'bg-white/10'}`}></span>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black leading-none">{role}</h3>
          </div>
          <h2 className="text-2xl font-black tracking-tightest text-white italic truncate max-w-[200px] uppercase">{name}</h2>
        </div>
        <div className={`px-4 py-1.5 rounded-xl text-[9px] uppercase font-black border ${config.bg} ${config.border} ${config.color} ${status === 'executing' ? 'animate-pulse' : ''} tracking-[0.2em]`}>
          {config.label}
        </div>
      </div>
      
      <p className="text-[12px] text-white/40 leading-relaxed font-medium min-h-[48px] italic relative z-10">
        {description}
      </p>

      {lastAction && (
        <div className="mt-4 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/10 uppercase tracking-[0.3em] font-black mb-1.5">Telemetry Trace</span>
            <span className="text-[11px] text-accent-gold/60 font-mono font-black truncate max-w-[160px] tracking-[0.1em]">{lastAction}</span>
          </div>
          <div className="opacity-20 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-accent-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};
