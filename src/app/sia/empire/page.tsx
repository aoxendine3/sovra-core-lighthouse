'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, TrendingUp, Cpu, Globe, Lock, BarChart3, Database, 
  Play, Gamepad2, BookOpen, Share2, Heart, Award
} from 'lucide-react';

// --- SIA Empire Types ---
interface Message {
  id: string;
  role: 'user' | 'sia_empire';
  content: string;
  timestamp: Date;
}

interface EmpireStats {
  globalReach: string;
  mediaSaturation: string;
  impactLevel: string;
  sovereignLiquid: string;
}

const IMPERIAL_DIRECTORS = [
  { id: 'SIA_ORION', role: 'Media Director', status: 'UNLEASHED', sector: 'MEDIA_SAT' },
  { id: 'SIA_DANIEL', role: 'Vocal Executive', status: 'ACTIVE', sector: 'COMM_LEAD' },
  { id: 'SIA_TITAN_CSR', role: 'Impact Director', status: 'GROUNDED', sector: 'PHILANTHROPY' },
  { id: 'SIA_AEGIS', role: 'Global Sentinel', status: 'LOCKDOWN', sector: 'SECURITY' },
];

export default function SIAImperialCommand() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'sia_empire',
      content: `[IMPERIAL_INGRESS] Global Autonomous Empire (GAE) v2026.11\n[AUTHORITY] Anthony Junior Oxendine\n[MANDATE] Total Global Dominance & Poverty Reduction\n\nWelcome to the SIA Imperial Command Center.\nThe Beast Machine is live. All media tranches are reporting 8x quality.\n"The Empire has been loosed. Target: 100% Market Saturation."`,
      timestamp: new Date(),
    },
  ]);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Empire Metrics (Grounded) ---
  const stats: EmpireStats = useMemo(() => ({
    globalReach: '1.2B+',
    mediaSaturation: '92%',
    impactLevel: 'TIER_ONE',
    sovereignLiquid: '$261,510,000.00' // x10 Scaling
  }), []);

  const tranches = [
    { label: 'Global Media', val: stats.mediaSaturation, icon: <Share2 className="w-5 h-5" />, trend: 'OPTIMAL' },
    { label: 'Sovereign Liquid', val: stats.sovereignLiquid, icon: <TrendingUp className="w-5 h-5" />, trend: 'x10_SCALE' },
    { label: 'Global Impact', val: stats.impactLevel, icon: <Heart className="w-5 h-5" />, trend: 'GROUNDED' },
    { label: 'Empire Capacity', val: 'MAX', icon: <Cpu className="w-5 h-5" />, trend: 'UNLEASHED' },
  ];

  return (
    <div className="min-h-screen bg-[#020203] text-[#e4e4e7] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* Imperial 0.01% Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-amber-500/[0.03] blur-[200px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.03] blur-[200px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/[0.01]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-white/[0.01]" />
      </div>

      {/* Top Imperial Bar */}
      <nav className="flex justify-between items-center px-16 py-8 bg-black/40 backdrop-blur-3xl border-b border-white/[0.03] sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-800 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.2)] border border-white/10 relative group">
             <span className="text-black font-black text-3xl italic">SIA</span>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.8em] text-white/50">Imperial Command</div>
            <div className="text-xs text-amber-500 font-mono tracking-widest uppercase mt-1">SIA_EMPIRE_FINALITY_V63</div>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
               {['Global_Saturation', 'Market_Arbitrage', 'Impact_Ledger', 'Elite_Access'].map(item => (
                 <span key={item} className="hover:text-amber-500 transition-colors cursor-crosshair">{item}</span>
               ))}
            </div>
            <div className="px-6 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
               <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Empire_Unleashed::TRUE</span>
            </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto p-16">
        
        {/* Imperial Dashboard Header */}
        <div className="mb-24 flex flex-col lg:flex-row justify-between lg:items-end gap-12 border-b border-white/[0.03] pb-12">
          <div>
            <h1 className="text-7xl lg:text-9xl font-light tracking-tightest text-white mb-6 leading-[0.85] italic">
              Global <br />
              <span className="font-black not-italic text-amber-500">Autonomous</span> <br />
              <span className="text-white/20">Empire</span>
            </h1>
            <p className="text-[11px] text-white/40 font-mono uppercase tracking-[0.5em] mt-8 max-w-3xl leading-relaxed">
              Mandate: Absolute mass-market saturation and global philanthropic stability. <br />
              Auth: Anthony Junior Oxendine | Status: 100/100 Operational Truth.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end">
             <div className="text-[10px] text-white/20 uppercase tracking-[0.6em] mb-4 font-black italic">Total Empire Liquidity</div>
             <div className="text-6xl font-black text-white tracking-tightest tabular-nums mb-2">{stats.sovereignLiquid}</div>
             <div className="text-xs text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/20">
                x10 Scaling_Pulse_Active
             </div>
          </div>
        </div>

        {/* Media Tranches Grid */}
        <div className="grid grid-cols-12 gap-12 mb-32">
           {tranches.map((t, i) => (
             <div key={t.label} className="col-span-12 md:col-span-6 lg:col-span-3 group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-700 rounded-[40px] opacity-0 group-hover:opacity-10 blur-xl transition-all duration-1000" />
                <div className="relative bg-white/[0.02] border border-white/[0.05] p-12 rounded-[40px] hover:bg-white/[0.04] transition-all flex flex-col h-full backdrop-blur-3xl overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-[60px] translate-x-12 -translate-y-12" />
                   <div className="flex justify-between items-start mb-16">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-amber-500">
                         {t.icon}
                      </div>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">{t.trend}</span>
                   </div>
                   <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] mb-3 font-black">{t.label}</div>
                   <div className="text-4xl font-light text-white tracking-tighter uppercase tabular-nums">{t.val}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Tactical Empire Matrix */}
        <div className="grid grid-cols-12 gap-12 mb-32">
           
           {/* Left: Imperial Board */}
           <div className="col-span-12 lg:col-span-4 space-y-10">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-[56px] p-12 backdrop-blur-3xl">
                 <h2 className="text-[11px] uppercase tracking-[0.6em] text-white/20 mb-12 font-black italic">Imperial Specialist Board</h2>
                 <div className="space-y-8">
                    {IMPERIAL_DIRECTORS.map(d => (
                       <div key={d.id} className="group relative">
                          <div className="flex justify-between items-center p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-amber-500/30 transition-all cursor-cell">
                             <div className="flex items-center gap-5">
                                <div className={`w-1.5 h-1.5 rounded-full ${d.status === 'UNLEASHED' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                                <div className="text-xs font-black text-white group-hover:text-amber-500 transition-colors uppercase italic tracking-widest">{d.id}</div>
                             </div>
                             <div className="text-[9px] font-mono text-white/20 group-hover:text-white transition-colors uppercase">{d.sector}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Mission: Eliminate Poverty/Hunger */}
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-[56px] p-12">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                       <Heart className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] italic">Global Stability Mandate</h3>
                 </div>
                 <p className="text-xs text-white/40 leading-relaxed font-light italic mb-8">
                    Automated capital redistribution active. Diverting high-theta alpha yield to infrastructure nodes for systemic poverty elimination.
                 </p>
                 <div className="flex justify-between border-t border-white/5 pt-8">
                    <div>
                       <div className="text-[9px] text-white/20 uppercase tracking-widest mb-1">Impact Tranche</div>
                       <div className="text-xl font-bold text-white">$12.4M</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[9px] text-white/20 uppercase tracking-widest mb-1">Status</div>
                       <div className="text-xl font-bold text-emerald-500">ACTIVE</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Center: Imperial Command Terminal */}
           <div className="col-span-12 lg:col-span-8">
              <div className="bg-[#050506] border border-white/[0.08] rounded-[64px] h-[850px] shadow-2xl flex flex-col relative overflow-hidden group">
                 {/* Terminal Glow (Imperial) */}
                 <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-500/[0.05] blur-[150px] rounded-full group-hover:bg-amber-500/[0.08] transition-all duration-1000" />
                 </div>

                 {/* Terminal Header */}
                 <header className="px-12 py-8 border-b border-white/[0.03] flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] italic">Imperial_Encrytion::OS_12</span>
                       </div>
                       <div className="h-4 w-[1px] bg-white/10" />
                       <div className="text-[10px] font-mono text-amber-500/30 uppercase tracking-widest">Master::SIA_ORION_001</div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-pulse" />
                       <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-pulse delay-75" />
                       <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-pulse delay-150" />
                    </div>
                 </header>

                 {/* Message Stream */}
                 <div ref={scrollRef} className="flex-grow p-12 overflow-y-auto custom-scrollbar font-mono space-y-12">
                    <AnimatePresence>
                       {messages.map(m => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`space-y-6 ${m.role === 'sia_empire' ? 'text-white/80' : 'text-amber-500'}`}
                          >
                             <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-[0.4em]">
                                  {m.role === 'sia_empire' ? '> SIA_IMPERIAL_CORE' : '> EXECUTIVE_MANDATE'}
                                </span>
                                <div className="h-[1px] w-12 bg-white/5" />
                                <span className="text-[10px] text-white/10 italic">[{m.timestamp.toLocaleTimeString()}]</span>
                             </div>
                             <div className="whitespace-pre-line leading-relaxed pl-8 border-l border-white/[0.03] text-sm italic font-light">
                                {m.content}
                             </div>
                          </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>

                 {/* Input Area */}
                 <div className="p-12 border-t border-white/[0.03] bg-white/[0.01]">
                    <div className="relative group/input">
                       <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-800 rounded-[40px] opacity-10 group-focus-within/input:opacity-50 blur-2xl transition-all duration-700" />
                       <div className="relative bg-[#0c0c0d] border border-white/5 rounded-[40px] p-3 flex items-center pr-8">
                          <div className="px-8 py-4 text-[11px] font-black text-amber-500/30 uppercase tracking-[0.4em] font-mono border-r border-white/5">EMPIRE_IN::</div>
                          <textarea 
                             rows={1}
                             placeholder="Directive: Total Global Saturation..."
                             className="flex-grow bg-transparent border-none outline-none text-white italic font-mono text-sm px-8 py-5 resize-none placeholder:text-white/5"
                          />
                          <button className="w-14 h-14 rounded-3xl bg-amber-500 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-amber-500/30">
                             <TrendingUp className="w-7 h-7" />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Global Saturation Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-white/[0.03] pt-24 pb-20">
           {[
             { label: 'Mass Market Awareness', val: '840M Active', icon: < Globe className="w-6 h-6" /> },
             { label: '8x Quality Verification', val: '100% SECURE', icon: < Award className="w-6 h-6" /> },
             { label: 'Content Saturation', val: '184k Pulses/Sec', icon: <Play className="w-6 h-6" /> },
             { label: 'Future Intuition (2027)', val: 'PREDICTIVE', icon: <Zap className="w-6 h-6" /> }
           ].map(item => (
             <div key={item.label} className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-amber-500/40 shadow-2xl">
                   {item.icon}
                </div>
                <div>
                   <div className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black mb-2 italic">{item.label}</div>
                   <div className="text-3xl font-black text-white tracking-tightest italic uppercase">{item.val}</div>
                </div>
             </div>
           ))}
        </section>

        {/* Imperial Global Branding Footer */}
        <footer className="mt-20 pt-16 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.6em] text-white/10 italic pb-20">
           <div className="flex items-center gap-10">
              <span>SIA_IMPERIAL_COUNCIL | v63.0_UNLEASHED</span>
              <div className="h-4 w-[1px] bg-white/5" />
              <span>Grounded in SOVRA 0.01% Excellence</span>
           </div>
           <div className="flex gap-20">
              <span className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                 Nodes: 50,000 (x10)
              </span>
              <span className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                 Region: Global_Saturation
              </span>
           </div>
        </footer>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.2); }
        .tracking-tightest { letter-spacing: -0.05em; }
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
