'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Shield, DollarSign } from 'lucide-react';

/**
 * TREASURY_MATRIX (v48.6_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mode: OBSIDIAN_AMBER_GLASS
 * Mandate: Absolute Capital Transparency for the 0.01% Elite.
 * Standard: v2026_ELITE_SETTLEMENT.
 */

interface TreasuryPosition {
  symbol: string;
  qty: number;
  marketPrice: number;
  pnl: number;
  pnlPercent: number;
}

interface TreasuryWidgetProps {
  totalEquity?: number;
  liquidCash?: number;
  positions?: TreasuryPosition[];
  status?: string;
}

export const TreasuryWidget: React.FC<TreasuryWidgetProps> = ({
  totalEquity = 0,
  liquidCash = 0,
  positions = [],
  status = 'SYNC_ACTIVE'
}) => {
  return (
    <div className="bg-[#08080a] p-10 rounded-[56px] border border-white/5 relative overflow-hidden group h-full shadow-2xl">
      {/* HUD Scan Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none opacity-20" />
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-all duration-1000" />

      <div className="relative z-10 flex flex-col h-full space-y-10">
        {/* Institutional Header HUD */}
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <Shield className="w-4 h-4 text-amber-500/60" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/60 font-mono italic">Capital Matrix</h3>
            </div>
            <h2 className="text-4xl font-black tracking-tightest text-white uppercase italic">Sovereign Treasury</h2>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]" />
            <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">{status}</span>
          </div>
        </div>

        {/* Magnitude Display */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col py-6"
        >
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.6em] mb-4 italic">Total Institutional Net Equity</p>
          <div className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none flex items-start gap-2">
            <span className="text-3xl mt-2 text-amber-500 font-mono">$</span>
            {totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </motion.div>

        {/* Liquidity Shards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] group/shard relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/shard:opacity-100 transition-opacity" />
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 italic flex items-center gap-2">
               <DollarSign className="w-3 h-3 text-amber-500" />
               Settled Capital
            </p>
            <p className="text-2xl font-black text-white tracking-tighter tabular-nums">${liquidCash.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] group/shard relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-glow/5 opacity-0 group-hover/shard:opacity-100 transition-opacity" />
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 italic flex items-center gap-2">
               <Zap className="w-3 h-3 text-cyan-glow" />
               Buying Power
            </p>
            <p className="text-2xl font-black text-cyan-glow tracking-tighter tabular-nums">${(liquidCash * 4).toLocaleString()}</p>
          </div>
        </div>

        {/* Pulse Tranches */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center px-2">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Liquid Tranches</p>
             <div className="h-[1px] flex-1 bg-white/5 mx-6" />
          </div>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {positions.length > 0 ? (
              positions.map((pos) => (
                <div key={pos.symbol} className="flex justify-between items-center p-6 bg-white/[0.03] border border-white/5 rounded-[32px] hover:border-amber-500/20 transition-all duration-500 group/pos">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/pos:bg-amber-500 group-hover/pos:text-black transition-all">
                      <span className="text-xs font-black italic uppercase">{pos.symbol.slice(0, 3)}</span>
                    </div>
                    <div>
                      <p className="text-base font-black text-white uppercase tracking-tight italic">{pos.symbol}</p>
                      <p className="text-[9px] font-mono text-white/30 uppercase mt-0.5">{pos.qty} UNITS PULSED</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-white italic tabular-nums">${(pos.qty * pos.marketPrice).toLocaleString()}</p>
                    <div className={`flex items-center justify-end gap-1 text-[10px] font-mono font-black ${pos.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {pos.pnl >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {pos.pnlPercent}%
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 border border-dashed border-white/10 rounded-[40px] text-center bg-white/[0.01]">
                <Cpu className="w-8 h-8 text-white/10 mx-auto mb-6" />
                <p className="text-[11px] uppercase font-black text-white/10 tracking-[0.4em] italic">Awaiting Institutional Settlement...</p>
              </div>
            )}
          </div>
        </div>

        {/* Executive Action Trigger */}
        <div className="pt-6">
            <button className="w-full py-8 bg-amber-500 text-black font-black text-[11px] rounded-[32px] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.5em] shadow-[0_20px_60px_rgba(245,158,11,0.2)] flex items-center justify-center gap-4 group/btn italic">
                <span>Execute Capital Maneuver</span>
                <TrendingUp className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};
