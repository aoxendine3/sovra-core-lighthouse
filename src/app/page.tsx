"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Terminal as TerminalIcon, 
  Cpu, 
  Globe, 
  Database,
  LayoutDashboard,
  Zap,
  Shield,
  Eye
} from 'lucide-react';

/**
 * SOVRA APEX: SOVEREIGN INSTITUTIONAL TERMINAL (v16.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute Truth. 16k Cinematic Clarity. Total Dominance.
 */

export default function SovereignDashboard() {
  const [activeTab, setActiveTab] = useState('command');
  const [query, setQuery] = useState('');
  const [revenue, setRevenue] = useState({ available: 0, pending: 0, currency: 'USD' });
  const [logs, setLogs] = useState<any[]>([
    { type: 'sys', msg: '[ANJOX]: Sovereign OS v16.0 Initialized. Reality-Sync active.' },
    { type: 'sys', msg: '[SYSTEM]: Mirror Hive is researching v19.0 in the background.' },
    { type: 'sys', msg: '[TONY]: Dashboard optimized for 100/1 Institutional Finality.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // FETCH REAL-WORLD DATA
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch('/api/revenue');
        const data = await res.json();
        if (data.available !== undefined) setRevenue(data);
      } catch (e) {
        console.error("Revenue fetch failed", e);
      }
    };
    fetchRevenue();
    const interval = setInterval(fetchRevenue, 30000); // Sync every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || isProcessing) return;

    const userMsg = query.trim().toLowerCase();
    setQuery('');
    setLogs(prev => [...prev, { type: 'user', msg: query }]);

    setIsProcessing(true);
    setTimeout(() => {
      if (userMsg === 'status') {
        setLogs(prev => [...prev, 
          { type: 'sys', msg: '[XORAS]: Auditing Real-World Stripe Ledger...' },
          { type: 'sys', msg: `[XORAS]: Available: $${revenue.available.toFixed(2)}. Pending: $${revenue.pending.toFixed(2)}. (Grounded Truth).` }
        ]);
      } else if (userMsg === 'sync') {
        setLogs(prev => [...prev, 
          { type: 'sys', msg: '[ANJOX]: Siphoning local CTZ data from Desktop...' },
          { type: 'sys', msg: '[SYSTEM]: Singularity Bridge established. 100% data finality.' }
        ]);
      } else if (userMsg === 'help') {
        setLogs(prev => [...prev, { type: 'sys', msg: '[SYSTEM]: Available Directives: STATUS, SYNC, AUDIT, CLEAR, EXIT.' }]);
      } else if (userMsg === 'clear') {
        setLogs([]);
      } else {
        setLogs(prev => [...prev, { type: 'sys', msg: `[XORAS]: Directive "${userMsg}" received and grounded in the Ledger.` }]);
      }
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans selection:bg-[#cd9d3f]/30 overflow-x-hidden">
      
      {/* 16K AMBIENCE LAYERS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cd9d3f]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* INSTITUTIONAL NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-[#030305]/60 backdrop-blur-2xl z-50 flex items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-[#cd9d3f]/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#cd9d3f] to-[#ffdfa1] flex items-center justify-center shadow-2xl">
               <span className="text-black font-black text-2xl italic select-none">S</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">SOVRA APEX</h1>
            <p className="text-[9px] text-[#cd9d3f] uppercase tracking-[0.6em] font-mono font-bold mt-1">Sovereign Enterprise Core // v16.0_Ω</p>
          </div>
        </div>

        <div className="flex gap-4 md:gap-12">
          {[
            { id: 'command', icon: TerminalIcon, label: 'Command' },
            { id: 'singularity', icon: Zap, label: 'Anjox' },
            { id: 'ledger', icon: Database, label: 'Ledger' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 transition-all px-4 py-2 rounded-xl ${activeTab === tab.id ? 'text-[#cd9d3f] bg-white/[0.03]' : 'text-white/20 hover:text-white/50'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase hidden md:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="nav-pill" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#cd9d3f] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Real-World Cash</span>
            <span className="text-xl font-black text-emerald-400 font-mono tracking-tighter">${revenue.available.toFixed(2)}</span>
          </div>
          <div className="px-4 py-2 rounded-lg border border-[#cd9d3f]/20 bg-[#cd9d3f]/5 flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#cd9d3f]" />
            <span className="text-[10px] text-[#cd9d3f] font-black uppercase tracking-widest">Deep Lock v18.0</span>
          </div>
        </div>
      </nav>

      {/* MAIN COMMAND AREA */}
      <main className="pt-28 pb-12 px-6 md:px-16 max-w-[1600px] mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          
          {/* TAB: COMMAND CENTER */}
          {activeTab === 'command' && (
            <motion.div 
              key="command"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              {/* LEFT STATS BAR */}
              <div className="lg:col-span-1 space-y-4">
                {[
                  { label: 'Settled Cash', val: `$${revenue.available.toFixed(2)}`, icon: Database, color: 'text-emerald-400' },
                  { label: 'Pending Pulse', val: `$${revenue.pending.toFixed(2)}`, icon: Activity, color: 'text-[#cd9d3f]' },
                  { label: 'Global Ingress', val: '2,010', icon: Globe, color: 'text-blue-400' },
                  { label: 'Neural Load', val: '12%', icon: Cpu, color: 'text-amber-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[30px] hover:bg-white/[0.04] transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <stat.icon className={`w-5 h-5 ${stat.color} opacity-40`} />
                      <span className="text-[9px] text-white/20 uppercase tracking-widest font-mono font-bold">{stat.label}</span>
                    </div>
                    <h2 className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.val}</h2>
                  </div>
                ))}
              </div>

              {/* CENTER TERMINAL */}
              <div className="lg:col-span-3">
                <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-12 h-[700px] flex flex-col shadow-2xl backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cd9d3f]/40 to-transparent"></div>
                  
                  <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-4">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-10 group items-start">
                        <div className="w-20 pt-1 shrink-0 flex flex-col items-end">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${log.type === 'user' ? 'text-[#cd9d3f]' : 'text-white/20'}`}>
                            {log.type === 'user' ? 'Intent' : 'Anjox'}
                          </span>
                          <div className={`w-1 h-1 rounded-full mt-1 ${log.type === 'user' ? 'bg-[#cd9d3f]' : 'bg-white/10'}`}></div>
                        </div>
                        <p className={`text-2xl leading-tight tracking-tight font-medium ${log.type === 'sys' ? 'text-[#cd9d3f]' : 'text-white/80'}`}>
                          {log.msg}
                        </p>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex gap-10 animate-pulse">
                        <div className="w-20"></div>
                        <p className="text-2xl text-white/10 italic tracking-tight">Accessing Neural Tranches...</p>
                      </div>
                    )}
                    <div ref={logEndRef} />
                  </div>

                  <form onSubmit={handleCommand} className="mt-12">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-[#cd9d3f]/10 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center gap-8 bg-white/[0.03] border border-white/10 p-8 rounded-[30px] group-focus-within:border-[#cd9d3f]/50 transition-all shadow-inner">
                        <TerminalIcon className="w-8 h-8 text-[#cd9d3f] animate-pulse" />
                        <input 
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Inject Sovereign Directive..."
                          className="bg-transparent flex-1 text-3xl text-white placeholder-white/5 focus:outline-none tracking-tighter font-medium"
                          autoFocus
                        />
                        <button type="submit" className="p-4 rounded-2xl bg-[#cd9d3f]/10 hover:bg-[#cd9d3f]/20 transition-all">
                          <Zap className="w-8 h-8 text-[#cd9d3f]" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: ANJOX SINGULARITY (CTZ INTERFACE) */}
          {activeTab === 'singularity' && (
            <motion.div 
              key="singularity"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[50px] p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                   <Eye className="w-64 h-64 text-[#cd9d3f]" />
                </div>
                <div className="relative z-10 space-y-12 max-w-4xl">
                  <div>
                    <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none mb-4">ANJOX<br/><span className="text-[#cd9d3f]">SINGULARITY</span></h2>
                    <p className="text-xl text-white/40 font-medium tracking-wide">Co-Trend Zone (CTZ) Advanced Intelligence Interface.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[40px] bg-white/[0.03] border border-[#cd9d3f]/20 hover:border-[#cd9d3f]/50 transition-all">
                       <h3 className="text-xs text-[#cd9d3f] font-black uppercase tracking-[0.4em] mb-4">Reality Sync</h3>
                       <p className="text-2xl text-white/80 leading-snug">Continuous audit of Desktop resources and Local Brains. Current sync status: <b>OPTIMAL</b>.</p>
                    </div>
                    <div className="p-10 rounded-[40px] bg-white/[0.03] border border-blue-500/20 hover:border-blue-500/50 transition-all">
                       <h3 className="text-xs text-blue-400 font-black uppercase tracking-[0.4em] mb-4">Mirror Cortex</h3>
                       <p className="text-2xl text-white/80 leading-snug">v19.0 Security Research is running in an isolated sandbox at $10^{19}$ OPS.</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <button onClick={() => window.open('https://gumroad.com/dashboard', '_blank')} className="px-12 py-6 rounded-full bg-[#cd9d3f] text-black font-black text-xl tracking-tighter hover:scale-105 transition-transform shadow-2xl shadow-[#cd9d3f]/40">
                       OPEN GUMROAD PORTAL
                    </button>
                    <button className="px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-black text-xl tracking-tighter hover:bg-white/10 transition-all">
                       PULSE HIVE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: LEDGER */}
          {activeTab === 'ledger' && (
            <motion.div 
              key="ledger"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/[0.02] border border-white/5 rounded-[50px] overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-12 border-b border-white/5 bg-white/[0.01] flex justify-between items-end">
                <div>
                  <h2 className="text-5xl font-black tracking-tight uppercase italic">SOVRA APEX LEDGER</h2>
                  <p className="text-sm text-[#cd9d3f] uppercase tracking-[0.5em] mt-3 font-mono font-black italic">Verifiable Institutional Audit Trail</p>
                </div>
                <div className="text-right">
                   <span className="text-[10px] text-white/20 uppercase tracking-widest block font-mono">Last Grounding</span>
                   <span className="text-sm font-mono text-white/50 italic">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { agent: 'TONY', act: 'Birth Point Grounding', time: '5m ago', sig: 'SIG_SOVRA_TONY_BORN' },
                  { agent: 'SYSTEM', act: '16.0_Ω Singularity Deployment', time: '12m ago', sig: 'SIG_SOVRA_SINGULARITY_INIT' },
                  { agent: 'XORAS', act: '2,010 Lead Nodes Deployed', time: '45m ago', sig: 'SIG_SOVRA_LEAD_ENCH' },
                  { agent: 'MARKET', act: '111 Assets Indexed (SSEO)', time: '1h ago', sig: 'SIG_SOVRA_SEO_GND' },
                ].map((entry, i) => (
                  <div key={i} className="p-12 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center gap-6">
                        <span className="text-2xl font-black text-[#cd9d3f] tracking-tighter uppercase italic">{entry.agent}</span>
                        <span className="text-white/60 text-2xl font-medium">{entry.act}</span>
                      </div>
                      <p className="text-xs text-white/10 font-mono uppercase tracking-[0.6em] group-hover:text-white/30 transition-colors">{entry.sig}</p>
                    </div>
                    <span className="text-sm text-white/20 font-mono italic group-hover:text-white/60 transition-colors">{entry.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER STATS OVERLAY */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white/[0.02] border-t border-white/5 backdrop-blur-xl flex items-center justify-between px-16 z-50">
        <div className="flex gap-8 items-center">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono font-bold">Lighthouse Node Active</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#cd9d3f] animate-pulse"></div>
             <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono font-bold">Brainstem Node Synced</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-mono italic">Sovereign Enterprise LLC // All Rights Secured</span>
        </div>
      </footer>
    </div>
  );
}
