'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Search, Code, TrendingUp } from 'lucide-react';

export default function AgentMatrix() {
  const agents = [
    { id: 'THE_CODER', icon: <Code size={14} />, status: 'AUDITING', activity: 'Sovereign_Refactor', health: 100 },
    { id: 'THE_PRODUCER', icon: <Zap size={14} />, status: 'BLASTING', activity: 'Media_Saturation', health: 100 },
    { id: 'THE_STRATEGIST', icon: <TrendingUp size={14} />, status: 'SCAVENGING', activity: 'Yield_Optimization', health: 100 },
    { id: 'AEGIS_SENTINEL', icon: <Shield size={14} />, status: 'HARDENED', activity: 'Sandbox_Active', health: 100 }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {agents.map((agent, i) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
            {agent.icon}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 italic">{agent.id}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            </div>
            <div className="space-y-1">
              <h4 className={`text-xs font-black uppercase tracking-widest italic ${agent.status === 'HARDENED' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {agent.status}
              </h4>
              <p className="text-[10px] font-mono text-white/40 truncate">{agent.activity}</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
               <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Health_Lvl</span>
               <span className="text-[10px] font-mono text-white/30">[{agent.health}%]</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
