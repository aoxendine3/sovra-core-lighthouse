'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SensoryPulse } from '@/components/sovereign/SensoryPulse';
import { Terminal, Shield, Zap, TrendingUp, Cpu, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * XORA SOVEREIGN COMMAND CENTER (v1.0_PROTOTYPE)
 * 🏛️ The Standalone Interface for the Sovereign Owner.
 */
export default function CommandCenter() {
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] XORA_COMMAND_OS_v1.0_BOOTED...', '[SECURITY] DEEP_LOCK_ACTIVE']);
  const [input, setInput] = useState('');
  const [revenueData, setRevenueData] = useState([
    { time: '12:00', amount: 45 },
    { time: '12:30', amount: 189 },
    { time: '13:00', amount: 342 },
    { time: '13:30', amount: 512 },
    { time: '14:00', amount: 789 },
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newLogs = [...logs, `> ${input}`];
    
    // Simulate Command Logic
    if (input.toLowerCase() === 'pulse') {
      newLogs.push('[SYSTEM] ANALYZING_INFRASTRUCTURE...');
      newLogs.push('[SYSTEM] ALL_TRANCHES_OPTIMAL_10X_VELOCITY');
    } else if (input.toLowerCase() === 'agents') {
      newLogs.push('[SYSTEM] ACTIVE_AGENTS: AEGIS, ALPHA, BLITZ, GHOST');
    } else {
      newLogs.push(`[SYSTEM] COMMAND_RECOGNIZED: EXEC_CHAIN_INITIATED_${input.toUpperCase()}`);
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-mono flex flex-col h-screen overflow-hidden">
      {/* 🏛️ HEADER / STATUS BAR */}
      <header className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-[#00f0ff] rounded flex items-center justify-center text-black font-black">X</div>
          <div>
            <h1 className="text-sm font-black italic uppercase tracking-widest">XORA_COMMAND_CENTER</h1>
            <p className="text-[10px] text-slate-500">v1.0_STANDALONE_SOVEREIGN</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Sovereign_Wallet</p>
            <p className="text-xs font-black text-[#00f0ff]">$12,432.89</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">System_Velocity</p>
            <p className="text-xs font-black text-green-400">10.4x</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* 📟 LEFT COLUMN: TERMINAL & TELEMETRY */}
        <div className="col-span-8 flex flex-col space-y-6 overflow-hidden">
          {/* TERMINAL */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl flex-1 flex flex-col overflow-hidden relative">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-[#00f0ff]" />
                <span className="text-[10px] font-black uppercase tracking-widest">System_Console</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-2 text-xs">
              {logs.map((log, i) => (
                <div key={i} className={`${log.startsWith('>') ? 'text-[#00f0ff]' : 'text-slate-400'}`}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <form onSubmit={handleCommand} className="p-4 bg-slate-900/50 border-t border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="text-[#00f0ff] font-black">{'>'}</span>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-[#00f0ff] text-xs placeholder:text-slate-700"
                  placeholder="Awaiting Command..."
                  autoFocus
                />
              </div>
            </form>
          </div>

          {/* TELEMETRY CHART */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl h-48 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp size={14} className="text-[#00f0ff]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Revenue_Ingress_Pulse</span>
              </div>
              <span className="text-[10px] text-green-400 font-bold">+24% Δ</span>
            </div>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <Line type="monotone" dataKey="amount" stroke="#00f0ff" strokeWidth={2} dot={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }}
                    itemStyle={{ color: '#00f0ff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 🛡️ RIGHT COLUMN: SENSORY & AGENT CONTROL */}
        <div className="col-span-4 flex flex-col space-y-6">
          {/* SENSORY PULSE */}
          <div className="h-64">
            <SensoryPulse active={true} status="APEX_ACTIVE" />
          </div>

          {/* AGENT CONTROL PANEL */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl flex-1 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Cpu size={14} className="text-[#00f0ff]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Agent_Control_Matrix</span>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'AEGIS', status: 'SHIELDING', icon: Shield },
                { name: 'ALPHA', status: 'SCOURING', icon: Zap },
                { name: 'BLITZ', status: 'BLASTING', icon: Activity },
                { name: 'GHOST', status: 'GOVERNING', icon: Cpu },
              ].map((agent) => (
                <div key={agent.name} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <agent.icon size={12} className="text-[#00f0ff]" />
                    <span className="text-[10px] font-black tracking-widest">{agent.name}</span>
                  </div>
                  <span className="text-[8px] font-bold text-green-400 uppercase tracking-tighter">{agent.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📜 FOOTER */}
      <footer className="mt-6 flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-slate-600 font-bold border-t border-slate-800 pt-4">
        <div>© 2026 APEX SOVEREIGN COMMAND • STANDALONE_NODE_01</div>
        <div className="flex space-x-4">
          <span className="text-[#00f0ff]">DEEP_LOCK_ESTABLISHED</span>
          <span>SYSTEM_STABLE</span>
        </div>
      </footer>
    </div>
  );
}
