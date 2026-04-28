'use client';

import React, { useState, useEffect } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Factory, 
  Truck, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Settings,
  Warehouse,
  Boxes,
  Database
} from 'lucide-react';

const INDUSTRIAL_TRANCHES = [
  { id: 'T-808', sector: 'Logistics_Alpha', progress: 92, status: 'NOMINAL', latency: '24ms' },
  { id: 'T-909', sector: 'Supply_Chain_Omega', progress: 85, status: 'SYNCING', latency: '48ms' },
  { id: 'T-707', sector: 'Industrial_Forge', progress: 100, status: 'GROUNDED', latency: '12ms' },
  { id: 'T-101', sector: 'SAP_Process_Automation', progress: 78, status: 'ACTIVE', latency: '110ms' },
];

export default function IndustrialOracleDashboard() {
  return (
    <SovereignLayout>
      <div className="min-h-screen">
        
        {/* Cinematic Header — Industrial Front */}
        <header className="mb-24 flex justify-between items-end">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10B981]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">INDUSTRIAL_ORACLE_FRONT_v1.0</span>
              </div>
              <h1 className="text-7xl font-black italic tracking-tightest leading-none text-white uppercase italic">
                Supply Chain <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">Alpha</span>
              </h1>
              <p className="text-white/40 text-lg font-bold leading-relaxed border-l-2 border-emerald-500/30 pl-10 italic uppercase tracking-widest max-w-2xl">
                SAP Build Process Automation and institutional hardware grounding. Verifiably synchronized via the Sovereign Delivery Node (v1.0_SOVRA).
              </p>
           </div>
           
           <div className="flex gap-4">
              <button className="px-16 py-8 bg-white text-black font-black uppercase text-[12px] tracking-[0.5em] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 italic">
                Initialize SAP_SYNC
              </button>
           </div>
        </header>

        {/* Industrial Performance Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-24">
           {[
             { label: 'Process Velocity', val: '3.5s', sub: 'Per Tranche Cycle', icon: Activity, color: 'text-emerald-400' },
             { label: 'Supply Integrity', val: '100/100', sub: 'Absolute Grounding', icon: ShieldCheck, color: 'text-white' },
             { label: 'Automation Depth', val: 'EXASCALE', sub: 'SAP Build Saturation', icon: Cpu, color: 'text-emerald-400' },
             { label: 'Delivery Radius', val: 'Global', sub: 'Institutional Reach', icon: Truck, color: 'text-white' },
           ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group shadow-2xl"
              >
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8 italic">{stat.label}</p>
                    <div className="flex items-center gap-6">
                       <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                       <span className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.val}</span>
                    </div>
                    <p className="text-[9px] font-bold text-white/10 mt-6 uppercase tracking-widest italic">{stat.sub}</p>
                 </div>
                 <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-[60px]" />
              </motion.div>
           ))}
        </div>

        {/* Industrial Command Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* Active Process Tranches */}
           <div className="xl:col-span-8 space-y-10">
              <div className="flex justify-between items-center mb-8 px-6">
                 <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.6em] italic">Institutional Process Tranches</h2>
                 <div className="flex gap-4">
                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/5 px-4 py-1.5 rounded-full border border-emerald-500/10 italic">SYNC_NOMINAL</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                 {INDUSTRIAL_TRANCHES.map((tranche, i) => (
                    <motion.div 
                      key={tranche.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 transition-all flex flex-col md:flex-row justify-between items-center gap-10 group"
                    >
                       <div className="flex items-center gap-10">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                             <Factory className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 italic">{tranche.id} // VERIFIED</p>
                             <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{tranche.sector} Hub</h3>
                          </div>
                       </div>
                       
                       <div className="flex gap-16 items-center">
                          <div className="w-48 space-y-4">
                             <div className="flex justify-between text-[8px] font-black uppercase text-white/20 italic">
                                <span>Automation_Depth</span>
                                <span>{tranche.progress}%</span>
                             </div>
                             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${tranche.progress}%` }}
                                  className="h-full bg-emerald-500 shadow-[0_0_10px_#10B981]"
                                />
                             </div>
                          </div>
                          <div className="text-center">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Latency</p>
                             <p className="text-xl font-black text-emerald-400 italic">{tranche.latency}</p>
                          </div>
                          <div className={`px-6 py-2 rounded-full border font-black text-[9px] uppercase tracking-widest italic ${tranche.status === 'NOMINAL' ? 'border-emerald-500/30 text-emerald-400' : 'border-white/10 text-white/20 animate-pulse'}`}>
                             {tranche.status}
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Warehouse & Logistics Feed */}
           <div className="xl:col-span-4 space-y-12">
              <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] flex flex-col items-center gap-8 group py-16">
                 <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center relative">
                    <Warehouse className="w-10 h-10 text-white/20 group-hover:text-emerald-400 transition-colors" />
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping" />
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 italic">Global_Stock_Status</p>
                    <p className="text-5xl font-black text-white italic tracking-tighter uppercase">HEAVY</p>
                 </div>
              </div>

              <div className="glass-panel p-12 rounded-[56px] border border-emerald-500/20 bg-emerald-500/[0.02] shadow-[0_0_80px_rgba(16,185,129,0.05)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[100px]" />
                 <div className="flex justify-between items-center mb-12 relative z-10">
                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.5em] italic">Sovereign_Logistics_Pulse</h3>
                    <Truck className="w-5 h-5 text-emerald-500 animate-pulse" />
                 </div>
                 
                 <div className="space-y-8 relative z-10">
                    {[
                      { node: 'LOG-Ω', msg: 'Elite Tech tranche verifiably grounded in the North American sector.', time: '5m' },
                      { node: 'SAP-SYNC', msg: 'Institutional process automation pulse nominal. High-theta calibration complete.', time: '12m' },
                      { node: 'FORGE-7', msg: 'Ground-ledger audit finalized for industrial warehouse tranches.', time: '28m' }
                    ].map((log, i) => (
                       <div key={i} className="flex gap-6 group cursor-pointer border-l-2 border-white/5 hover:border-emerald-500/30 pl-6 transition-all py-2">
                          <div className="space-y-1">
                             <div className="flex gap-4 items-center mb-1">
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{log.node}</span>
                                <span className="text-[8px] font-bold text-white/10 uppercase">{log.time}</span>
                             </div>
                             <p className="text-[11px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase italic leading-tight">{log.msg}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="mt-12 pt-10 border-t border-white/5 flex gap-4">
                    <Boxes className="w-5 h-5 text-emerald-500" />
                    <p className="text-[10px] font-mono text-white/10 leading-relaxed uppercase tracking-widest italic">
                       Enterprise process automation verifiably secure.
                    </p>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </SovereignLayout>
  );
}
