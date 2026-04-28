'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * APEX_LOCKDOWN_STATUS (v60.0_SENTINEL)
 * ─────────────────────────────────────────────────────────────
 * MISSION: ABSOLUTE_SOVEREIGNTY_INDICATOR
 * Mode: CYAN_GLOW_OBSIDIAN
 */
interface LockdownStatusProps {
  owner?: string;
  isLocked?: boolean;
  isAway?: boolean;
  onToggle?: () => void;
}

export default function LockdownStatus({ 
  owner = "APEX_EXECUTIVE", 
  isLocked = true, 
  isAway = true,
  onToggle 
}: LockdownStatusProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative overflow-hidden p-12 rounded-[56px] bg-white/5 border border-white/10 backdrop-blur-3xl transition-all duration-1000 shadow-[0_60px_150px_rgba(0,0,0,0.9)]"
    >
      
      {/* Institutional Background Glow */}
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 pointer-events-none transition-all duration-1000 ${isAway ? 'bg-cyan-glow' : 'bg-purple-500'}`} />

      <div className="relative z-10 space-y-12">
        <header className="flex justify-between items-center border-b border-white/10 pb-10">
          <div className="space-y-3">
             <p className="text-cyan-glow text-[10px] font-black tracking-[0.6em] uppercase italic opacity-60">Status Protocol v60.0_APEX [ABSOLUTE]</p>
             <h3 className="text-5xl font-black text-white uppercase italic tracking-tightest leading-[0.9]" dangerouslySetInnerHTML={{ __html: isAway ? "SOVRA <br/>Sentry" : isLocked ? "Institutional <br/>Lockdown" : "Executive <br/>Access" }} />
          </div>
          
          <div 
            onClick={isAway ? undefined : onToggle}
            className={`flex items-center gap-4 px-8 py-3 rounded-2xl border transition-all duration-700 cursor-pointer shadow-2xl ${
              isAway ? 'bg-cyan-glow/10 border-cyan-glow/30 text-cyan-glow' : 
              isLocked ? 'bg-green-500/10 border-green-500/30 text-green-500' : 
              'bg-red-500/10 border-red-500/30 text-red-500'
            }`}
          >
            <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${isAway ? 'bg-cyan-glow' : isLocked ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] italic">
              {isAway ? 'STBY::SOVEREIGN' : isLocked ? 'WALL::ACTIVE' : 'ACCESS::OPEN'}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/5 group-hover:border-cyan-glow/20 transition-all duration-700">
             <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Executive ID</p>
             <div className="text-3xl font-black text-white italic tracking-tightest uppercase mb-4">{owner}</div>
             <p className="text-[11px] text-white/40 leading-relaxed font-light italic border-t border-white/5 pt-6">
                Status: {isAway ? "OWNER_AWAY. Institutional proxy active via CoreKernel." : "Executive proxy identified and verifiably audited."}
             </p>
          </div>

          <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/5 group-hover:border-cyan-glow/20 transition-all duration-700">
             <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Heartbeat Pulse</p>
             <div className={`text-3xl font-black italic tracking-tightest uppercase mb-4 ${isAway ? 'text-cyan-glow' : 'text-white/40'}`}>
               {isAway ? "GROUNDED" : "STBY"}
             </div>
             <p className="text-[11px] text-white/40 leading-relaxed font-light italic border-t border-white/5 pt-6">
                {isAway ? "Stealth Protocol active. All tranches encrypted and verifiably persistent." : "Manual supervision required for high-theta tranches."}
             </p>
          </div>
        </div>

        {/* Real-time Telemetry Indicators */}
        <footer className="flex justify-center gap-12 pt-10 border-t border-white/5 opacity-50">
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse shadow-[0_0_8px_#00f0ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-glow/40 italic">Handshake_Sync</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse shadow-[0_0_8px_#00f0ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-glow/40 italic">Threat_Ledger_Edge</span>
           </div>
        </footer>
      </div>
    </motion.div>
  );
}
