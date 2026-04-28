'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MAXX SOVEREIGN COMMAND CENTER
 * Aesthetics: Institutional Premium | Glassmorphism | Zero-Friction
 */
export default function MaxxDashboard() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState({
    liquidity: 0.00,
    assets: 2670.00,
    integrity: 100,
    activeAgents: 48,
    threats: [] as any[],
    resources: [] as any[]
  });
  const [isIgnited, setIsIgnited] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    const win = window as any;
    if (win.jarvis) {
      win.jarvis.onLogUpdate((log: string) => {
        setLogs(prev => [log, ...prev].slice(0, 50));
      });
      win.jarvis.onStatusUpdate((s: any) => {
        setStatus(prev => ({ ...prev, ...s }));
      });
    }
  }, []);

  const handleIgnition = async () => {
    setIsIgnited(true);
    const win = window as any;
    if (win.jarvis) {
      const result = await win.jarvis.igniteMaxx();
      if (result.success) {
        setStatus(prev => ({ ...prev, ...result.status }));
      }
    } else {
      setLogs(prev => ['[Maxx] LOG: Transitioning to APEX_ACTIVE mode...', ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Premium Header */}
      <header className="flex justify-between items-center mb-12 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500 rounded-full blur-xl animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tighter uppercase">SOVRA APEX <span className="text-amber-500">Exascale Executive</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono uppercase">
             CORE: <span className="text-amber-400">100,000X_ACTIVE</span>
           </div>
           {/* New Passport Button */}
           <motion.button 
             whileHover={{ scale: 1.05 }}
             className="px-4 py-2 bg-zinc-900/80 border border-zinc-700 rounded-lg text-xs font-mono uppercase tracking-widest hover:border-amber-500 transition-colors"
           >
             Generate Sanctuary Passport
           </motion.button>
          <div className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono">
            STATUS: <span className={isIgnited ? 'text-cyan-400' : 'text-zinc-500'}>{isIgnited ? 'APEX_ACTIVE' : 'STANDBY'}</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Gauges & Pulse */}
        <div className="col-span-4 space-y-8">
          <StatusCard title="Verified Liquidity" value={`$${status.liquidity.toFixed(2)}`} sub="Real-world cash pulse" color="cyan" />
          <StatusCard title="Asset Valuation" value={`$${status.assets.toLocaleString()}`} sub="Sovereign Enterprise Worth" color="purple" />
          
          {/* Defensive Pulse Grid Visualization */}
          <div className="bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 h-64 relative overflow-hidden backdrop-blur-3xl group">
             <div className="text-[10px] text-zinc-600 font-mono mb-4 uppercase tracking-[0.2em]">Sovereign Defensive Grid</div>
             <div className="grid grid-cols-8 gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                {Array.from({ length: 64 }).map((_, i) => (
                   <motion.div 
                     key={i} 
                     className="aspect-square bg-cyan-500/20 border border-cyan-500/10 rounded-sm"
                     animate={isIgnited ? {
                        opacity: [0.2, 1, 0.2],
                        backgroundColor: ['rgba(6,182,212,0.2)', 'rgba(6,182,212,1)', 'rgba(6,182,212,0.2)']
                     } : {}}
                     transition={{ duration: 3, delay: i * 0.05, repeat: Infinity }}
                   />
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-xs font-mono ${isIgnited ? 'text-cyan-400' : 'text-zinc-700'}`}>
                  {isIgnited ? 'SCANNING_PERIMETER...' : 'MATRIX_OFFLINE'}
                </div>
             </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleIgnition}
            className={`w-full py-6 rounded-2xl font-bold text-lg transition-all duration-500 ${isIgnited ? 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed shadow-none' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.3)]'}`}
          >
            {isIgnited ? 'SOVEREIGNTY ACTIVE' : 'IGNITE SOVEREIGNTY'}
          </motion.button>
        </div>

        {/* Middle Column: Activity Stream */}
        <div className="col-span-4">
          <div className="h-full bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 overflow-hidden relative backdrop-blur-3xl">
             <div className="text-[10px] text-zinc-600 font-mono mb-4 uppercase tracking-[0.2em]">Activity Stream</div>
             <div className="space-y-4 font-mono text-xs h-[640px] overflow-y-auto pr-2 custom-scrollbar">
               <AnimatePresence>
                 {logs.map((log, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -5 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex gap-4 border-l border-zinc-800 pl-3 py-1"
                   >
                     <span className="text-zinc-600 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                     <span className="text-zinc-300 break-words">{log}</span>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Right Column: Threat Attribution & Resource Discovery */}
        <div className="col-span-4 space-y-8">
           {/* Section 1: Resource Scavenger Targets */}
           <div className="bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 relative backdrop-blur-3xl">
              <div className="text-[10px] text-zinc-600 font-mono mb-4 uppercase tracking-[0.2em]">Resource Discovery</div>
              <div className="space-y-3">
                 {status.resources.length > 0 ? (
                    status.resources.map((res, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         key={idx} 
                         className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl"
                       >
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[9px] font-mono text-cyan-400 uppercase">{res.name}</span>
                             <span className="text-[9px] font-mono text-zinc-500">{res.type}</span>
                          </div>
                          <div className="text-[11px] font-bold text-white mb-1">{res.value}</div>
                          <div className="text-[8px] text-zinc-600 font-mono uppercase tracking-widest">{res.action} AVAILABLE</div>
                       </motion.div>
                    ))
                 ) : (
                    <div className="py-10 text-center text-[10px] font-mono text-zinc-800">SCANNING_RESOURCES...</div>
                 )}
              </div>
           </div>

           {/* Section 2: Threat Attribution Feed */}
           <div className="bg-zinc-950/50 border border-zinc-900 rounded-3xl p-6 relative backdrop-blur-3xl min-h-[300px]">
              <div className="text-[10px] text-zinc-600 font-mono mb-4 uppercase tracking-[0.2em]">Attribution Feed</div>
              <div className="space-y-4">
                 {status.threats.length > 0 ? (
                    status.threats.map((threat, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         key={idx} 
                         className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
                       >
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{threat.attribution}</span>
                             <span className="text-[10px] font-mono text-zinc-600">CONF: {threat.confidence * 100}%</span>
                          </div>
                          <div className="text-xs text-zinc-400 font-mono">Trajectory deflected by Aegis Warden.</div>
                       </motion.div>
                    ))
                 ) : (
                    <div className="text-center py-20 text-zinc-800 font-mono text-xs">NO_DEFLECTIONS_LOGGED</div>
                 )}
              </div>
              
              {/* Institutional Matrix Status */}
              <div className="absolute bottom-8 left-8 right-8 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Sovereign Integrity</span>
                    <span className="text-xl font-bold text-cyan-400">{status.integrity}%</span>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function StatusCard({ title, value, sub, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-zinc-950/50 border border-zinc-900 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-3xl rounded-full -mr-12 -mt-12`} />
      <div className="text-xs text-zinc-500 font-mono mb-2 uppercase tracking-wider">{title}</div>
      <div className="text-4xl font-bold tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] text-zinc-600 uppercase font-mono">{sub}</div>
    </motion.div>
  );
}
