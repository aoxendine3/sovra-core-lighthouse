'use client';

import React, { useState } from 'react';
import { generateHandshake } from '@/lib/auth/Handshake';
import { motion } from 'framer-motion';

import { SensoryPulse } from '@/components/sovereign/SensoryPulse';

/**
 * SOVEREIGN AGENT RENTAL MARKETPLACE (v18.0_APEX)
 * 🏛️ Absolute Autonomy. Disruptive Pricing. Elite Capacity.
 */
export default function AgentRentalPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const agents = [
    // ... (rest of the code remains same)
  ];

  const handleHire = async (agentId: string) => {
    // ... (rest of the code remains same)
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#00f0ff] selection:text-[#020617]">
      {/* 🏛️ HERO SECTION */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">
              HIRE <span className="text-[#00f0ff]">SOVEREIGN</span> AGENTS
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mb-8">
              Deploy elite-class agentic intelligence for a fraction of the market cost. 
              No subscriptions. Just pure execution.
            </p>
            <div className="flex space-x-4">
               <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black italic uppercase tracking-widest text-[#00f0ff]">
                  v18.0_UNIFIED_ACTIVE
               </div>
               <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black italic uppercase tracking-widest text-slate-400">
                  APEX_SOVEREIGN_LLC
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full h-[400px]"
          >
            <SensoryPulse active={loading !== null} status={loading ? 'ENCRYPTING_LEASE' : 'APEX_READY'} />
          </motion.div>
        </div>
      </section>

      {/* 📊 AGENT CATALOG */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ y: -10 }}
              className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl pointer-events-none transition-opacity group-hover:opacity-30"
                style={{ backgroundColor: agent.color }}
              />
              
              <div>
                <div className="text-4xl mb-4">{agent.icon}</div>
                <h3 className="text-2xl font-black italic mb-2 tracking-tight">{agent.name}</h3>
                <p className="text-[#00f0ff] text-sm font-bold uppercase mb-4 tracking-widest">{agent.role}</p>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{agent.description}</p>
                
                <div className="space-y-2 mb-8">
                  {agent.tranches.map((t) => (
                    <div key={t} className="flex items-center text-xs font-medium text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: agent.color }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-slate-500 line-through text-sm">{agent.marketPrice}</span>
                  <span className="text-3xl font-black italic text-white">{agent.ourPrice}</span>
                </div>

                <button
                  onClick={() => handleHire(agent.id)}
                  disabled={loading !== null}
                  className="w-full bg-white text-black py-4 rounded-xl font-black italic uppercase tracking-widest transition-all hover:bg-[#00f0ff] active:scale-95 disabled:opacity-50"
                >
                  {loading === agent.id ? 'DEPLOYING...' : 'HIRE NODE'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛡️ DEEP LOCK FAQ */}
      <section className="bg-slate-900/50 py-24 px-6 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black italic tracking-tighter mb-12 text-center">SOVEREIGN GOVERNANCE</h2>
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <h4 className="text-[#00f0ff] font-bold uppercase text-xs tracking-widest mb-2">v18.0_Handshake</h4>
              <p className="text-slate-300 font-light">Every agent lease is verifiably secured by our unitary handshake protocol. Your data never leaves our sovereign sandbox.</p>
            </div>
            <div className="border-b border-slate-800 pb-6">
              <h4 className="text-[#00f0ff] font-bold uppercase text-xs tracking-widest mb-2">Disruptive Pricing</h4>
              <p className="text-slate-300 font-light">We leverage local LLM + WASM Brick hybrid execution to drive costs down by 90%, passing the savings directly to you.</p>
            </div>
            <div className="border-b border-slate-800 pb-6">
              <h4 className="text-[#00f0ff] font-bold uppercase text-xs tracking-widest mb-2">Zero-Trust Execution</h4>
              <p className="text-slate-300 font-light">Agents run in isolated OS-level sandboxes with SIGKILL termination protocols active at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📜 FOOTER */}
      <footer className="py-12 px-6 text-center text-slate-500 text-xs uppercase tracking-widest font-medium">
        © 2026 APEX SOVEREIGN LLC • ALL RIGHTS RESERVED • v18.0_UNIFIED
      </footer>
    </div>
  );
}
