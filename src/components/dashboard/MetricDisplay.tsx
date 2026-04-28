'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * SOVRA Metric Display (v1.0_Ω_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: QUANTIFIABLE_SOVEREIGNTY_VISUALIZATION
 * Mode: GOLD_ULTIMA_OBSIDIAN
 * 
 * Aesthetic Standard: #cd9d3f (SOVRA Gold)
 */
interface MetricDisplayProps {
  label: string;
  value: string | number;
  trend?: string;
  subValue?: string;
  glowColor?: 'gold' | 'cyan' | 'white';
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({ 
  label, 
  value, 
  trend, 
  subValue, 
  glowColor = 'gold' // Upgraded to Gold by default
}) => {
  // Use SOVRA Gold #cd9d3f
  const accentClass = glowColor === 'gold' ? 'text-[#cd9d3f]' : 'text-cyan-glow';
  const glowClass = glowColor === 'gold' ? 'bg-[#cd9d3f]' : 'bg-cyan-glow';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "circOut" } }}
      className="group relative overflow-hidden p-10 rounded-[56px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
    >
      {/* Dynamic Handshake Pulse */}
      <motion.div 
        animate={{ 
            opacity: [0.03, 0.07, 0.03],
            scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-30%] right-[-20%] w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none ${glowClass}`}
      />

      {/* Institutional Scanline Scan */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden rounded-[56px]">
         <motion.div 
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className={`w-full h-1 bg-gradient-to-b from-transparent via-[#cd9d3f]/20 to-transparent`}
         />
      </div>

      <div className="relative z-10 space-y-8">
        <header className="flex justify-between items-start">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic group-hover:text-white/40 transition-colors">{label}</p>
           {trend && (
             <div className={`px-4 py-1.5 rounded-full border border-[#cd9d3f]/20 bg-[#cd9d3f]/5 text-[#cd9d3f] text-[9px] font-black uppercase tracking-widest italic animate-pulse`}>
                {trend}
             </div>
           )}
        </header>

        <div className="space-y-2">
           <h3 className="text-6xl font-black text-white italic tracking-tightest leading-none transition-all duration-700 group-hover:scale-105 group-hover:origin-left tabular-nums">
              {value}
           </h3>
           <div className={`h-1 w-12 rounded-full transition-all duration-1000 group-hover:w-32 ${glowClass}`} />
        </div>

        {subValue && (
           <p className="text-[11px] font-medium text-white/40 leading-relaxed italic border-t border-white/5 pt-8 group-hover:text-white/60 transition-colors">
              {subValue}
           </p>
        )}
      </div>

      {/* Bottom Forensic Identity Highlight */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#cd9d3f]/40 transition-all duration-1000`} />
    </motion.div>
  );
};
