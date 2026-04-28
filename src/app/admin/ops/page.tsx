'use client';

import React, { useState, useEffect } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Terminal as TerminalIcon,
  Layers,
  Zap
} from 'lucide-react';

/**
 * SOVEREIGN OPS HUB (v16.0)
 * Mission: Institutional Fulfillment & Ledger Management
 */
export default function OpsSpace() {
  const [logs, setLogs] = useState([
    { id: '1', agent: 'SENTINEL', msg: 'Fulfillment pulse executed for node [SOL_APEX].', type: 'success' },
    { id: '2', agent: 'TREASURY', msg: 'Sharded Routing active: Mercury Global cleared $24K tranche.', type: 'info' },
    { id: '3', agent: 'LEDGER', msg: 'Node integrity handshake verified at 1ms latency.', type: 'success' },
    { id: '4', agent: 'GHOST', msg: 'Phantom proxy bridge established for Asian Peninsula ingress.', type: 'info' },
  ]);

  return (
    <SovereignLayout>
      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">SOVEREIGN <span className="text-cyan-glow">OPS</span></h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Institutional Fulfillment & Node Orchestration</p>
          </div>
          <div className="flex gap-4">
             <div className="glass-apex px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
                <Layers className="w-4 h-4 text-cyan-glow animate-pulse" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Ops Integrity: 100/100</span>
             </div>
          </div>
        </div>
      </header>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        
        {/* Ledger & Sentinel Controls */}
        <div className="xl:col-span-8 space-y-12">
           <div className="glass-panel p-10 rounded-[64px] border border-white/5 bg-white/[0.01] relative overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center">
                      <Database className="w-6 h-6 text-cyan-glow" />
                   </div>
                   <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">Institutional Ledger</h3>
                </div>
                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download Audit</button>
              </div>

              <div className="space-y-4">
                 {[
                   { ref: 'ZEN-104', amount: '+$425,250.00', status: 'SETTLED', node: 'MERCURY_GLOBAL' },
                   { ref: 'ZEN-103', amount: '-$17,796.88', status: 'REINVESTED', node: 'CRYPTO_APEX' },
                   { ref: 'ZEN-102', amount: '+$25,250.00', status: 'SETTLED', node: 'SUTTON_5715' },
                 ].map((entry, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-white/[0.04] transition-all">
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-mono text-white/20">{entry.ref}</span>
                          <span className={`text-sm font-black italic tracking-tight ${entry.amount.startsWith('+') ? 'text-cyan-glow' : 'text-white'}`}>{entry.amount}</span>
                       </div>
                       <div className="flex items-center gap-8">
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{entry.node}</span>
                          <span className="text-[8px] font-black px-3 py-1 rounded-full border border-white/10 text-white/40 italic">{entry.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-10 rounded-[64px] border border-white/5 bg-white/[0.01]">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">Fulfillment Sentinel</h3>
                 <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest animate-pulse">PULSE: OK</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { label: 'Mercury Payout Node', status: 'GROUNDED', density: '100%', color: 'text-cyan-glow' },
                   { label: 'Sutton Cache Node', status: 'ACTIVE', density: '84%', color: 'text-purple-500' },
                 ].map((sentinel, i) => (
                    <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-6">
                       <div className="flex justify-between items-start">
                          <div className="space-y-1">
                             <p className="text-[11px] font-black text-white italic tracking-widest uppercase">{sentinel.label}</p>
                             <p className={`text-[9px] font-bold ${sentinel.color} uppercase tracking-[0.2em]`}>{sentinel.status}</p>
                          </div>
                          <Cpu className={`w-5 h-5 ${sentinel.color}`} />
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: sentinel.density }}
                            transition={{ duration: 2 }}
                            className={`h-full ${sentinel.color.replace('text-', 'bg-')}`} 
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Tactical Log Sidebar */}
        <div className="xl:col-span-4 space-y-12">
            <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] flex flex-col items-center gap-8 justify-center text-center">
               <div className="w-16 h-16 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center animate-pulse">
                  <Zap className="w-8 h-8 text-cyan-glow" />
               </div>
               <div className="space-y-2">
                  <h4 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">B2B RENTAL PULSE</h4>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] leading-none">Autonomous Fulfillment Engaged</p>
               </div>
               <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-glow hover:text-white transition-all">TRIGGER RETRY</button>
            </div>

            <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01]">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">Agent Activity</h3>
                <div className="space-y-8">
                   {logs.map((log) => (
                      <div key={log.id} className="flex gap-6 items-start">
                         <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${log.type === 'success' ? 'bg-cyan-glow' : 'bg-purple-500'} animate-pulse`} />
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">{log.agent}</p>
                            <p className="text-[10px] text-white/20 uppercase italic leading-relaxed">{log.msg}</p>
                         </div>
                      </div>
                   ))}
                </div>
            </div>
        </div>
      </div>
    </SovereignLayout>
  );
}
