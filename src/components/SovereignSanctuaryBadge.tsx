'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * SOVEREIGN SANCTUARY BADGE
 * Mandate: Institutional verification of system integrity on every page.
 */
export default function SovereignSanctuaryBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
       <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="relative bg-zinc-950/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-2xl"
       >
          <div className="relative">
             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />
             <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
          </div>
          <div className="flex flex-col">
             <span className="text-[10px] font-black tracking-widest text-[#F5F5F7] uppercase">SOVRA APEX VERIFIED</span>
             <span className="text-[8px] font-mono text-cyan-500/70 tracking-tighter uppercase whitespace-nowrap">Passport ID: SOVRA-SVR-2026 | Matrix Level 10</span>
          </div>
       </motion.div>
    </div>
  );
}
