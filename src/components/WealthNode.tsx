/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * MODULE: Wealth Node (Liquidity Anchor)
 * VERSION: v2026.11_APEX
 * ──────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';

interface WealthNodeProps {
  amount: number;
  status?: string;
}

export const WealthNode: React.FC<WealthNodeProps> = ({ amount, status = 'AWAITING_CLAIM' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group overflow-hidden rounded-[40px] border border-[#00F0FF]/20 bg-[#00F0FF]/5 backdrop-blur-2xl p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00F0FF]/60 mb-2 italic">Found Capital Node</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-[#00F0FF] opacity-40">$</span>
            <h4 className="text-5xl font-black italic tracking-tighter text-[#E5E7EB]">
              {amount.toLocaleString()}
            </h4>
          </div>
        </div>
        
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 mb-4 animate-pulse">
            <Landmark size={12} className="text-[#00F0FF]" />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#00F0FF]">{status}</span>
          </div>
          <p className="text-[9px] text-[#E5E7EB]/40 uppercase tracking-widest italic font-bold">State & Federal Assets</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
        <button className="flex-1 py-3 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[9px] font-bold uppercase tracking-widest text-[#00F0FF] hover:bg-[#00F0FF]/20 transition-all">
          Generate Claim Docs
        </button>
        <button className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 transition-all">
          Audit Discovery
        </button>
      </div>
    </motion.div>
  );
};
