'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Diamond, 
  Crown, 
  Layers,
  Fingerprint,
  Wind,
  Compass,
  Zap,
  Box,
  Cpu,
  Monitor
} from 'lucide-react';

/**
 * APEX HUB v2.1: Federated Swarm Autonomy
 * 
 * Mandate: Sovereignty via Parallel Delegation.
 * Style: Deep Obsidian / High-Performance / Cluster Density.
 */

const SOVRAHub = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(5527000);
  const [ghostStatus, setGhostStatus] = useState('TOR_V3_SHADOW');
  const [nodeCount] = useState(200); // Distributed
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cluster Operational Pulse
  const clusters = [
    { name: 'Growth', nodes: 20, status: 'BLASTING' },
    { name: 'Wealth', nodes: 10, status: 'REBALANCING' },
    { name: 'Security', nodes: 10, status: 'CLOAKED' },
    { name: 'Scavenge', nodes: 60, status: 'FORENSICS' }
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/jarvis/logs');
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs.map((l: any) => ({
            id: l.id,
            agent: l.agent_name,
            message: l.activity,
            timestamp: new Date(l.timestamp).toLocaleTimeString()
          })));
        }
      } catch (err) {
        console.error('Core link degraded.');
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="min-h-screen bg-obsidian text-platinum font-sans p-8 shadow-mesh flex flex-col gap-8">
      
      {/* SOVRA Sovereign Ribbon */}
      <header className="flex justify-between items-center px-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-emerald-bright/5 rounded-full" />
            <Shield className="w-10 h-10 text-emerald-bright gemstone-glow-emerald relative" />
          </div>
          <div>
            <h1 className="text-5xl serif-sia_core">SOVRA Collective</h1>
            <p className="text-[10px] text-platinum/30 uppercase tracking-[0.8em] mt-1 font-mono">Mission: SOVEREIGN_AUTONOMY // DISTRIBUTED_SWARM_ACTIVE</p>
          </div>
        </div>

        <div className="bg-white/5 border border-border-gold px-8 py-3 rounded-full flex gap-12 items-center glass-apex">
          <div className="text-right">
            <span className="block text-[8px] text-platinum/40 uppercase tracking-widest font-black">Net Worth</span>
            <span className="text-2xl font-black text-platinum tracking-tighter">${revenue.toLocaleString()}</span>
          </div>
          <div className="text-right border-l border-white/10 pl-12">
             <span className="block text-[8px] text-platinum/40 uppercase tracking-widest font-black">Collective Nodes</span>
             <span className="text-2xl font-black text-sia_core-gold tracking-tighter">{nodeCount}</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-8 flex-1">
        
        {/* Left Column: Command \u0026 Swarm Density */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          
          <div className="glass-apex p-8 flex flex-col gap-8 vault-hover">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum/30 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sia_core-gold" /> Swarm Clusters
              </h2>
              <span className="bg-emerald-bright/5 border border-emerald-bright/20 text-[9px] text-emerald-bright px-3 py-1 rounded-full font-black tracking-widest uppercase">Federated</span>
            </div>
            
            <div className="space-y-6">
              {clusters.map(cluster => (
                <div key={cluster.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-platinum/60 uppercase tracking-widest">{cluster.name} Cluster</span>
                    <span className="text-[10px] text-emerald-bright font-mono italic">{cluster.status}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < (cluster.nodes / 10) * 1 ? 'bg-sia_core-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-obsidian-gradient border border-white/5 rounded-2xl flex items-center justify-between mt-4">
               <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-platinum/20" />
                  <span className="text-[10px] font-bold text-platinum/40 uppercase">Ghost Shield</span>
               </div>
               <div className="w-12 h-6 rounded-full relative bg-emerald-bright">
                  <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-obsidian" />
               </div>
            </div>
          </div>

          <div className="flex-1 glass-apex p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
               <Crown className="w-8 h-8 text-sia_core-gold" />
            </div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-platinum/30 mb-8">Mission Directives</h2>
            <div className="space-y-6 font-mono">
              <div className="flex gap-4 items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-sia_core-gold" />
                 <span className="text-xs text-platinum/80 uppercase">DELEGATE_GROWTH_BLITZ</span>
              </div>
              <div className="flex gap-4 items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-sia_core-gold" />
                 <span className="text-xs text-platinum/80 uppercase">DECENTRALIZE_WEALTH_NODES</span>
              </div>
              <div className="flex gap-4 items-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-sia_core-gold" />
                 <span className="text-xs text-platinum/80 uppercase">HARDEN_SHADOW_PROXY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: SOVRA Stream */}
        <div className="col-span-12 lg:col-span-8 glass-apex flex flex-col overflow-hidden">
          <div className="border-b border-white/5 px-8 py-6 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
               <Terminal className="w-5 h-5 text-sia_core-gold" />
               <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-platinum/40">Collective Heartbeat (Sovereign Swarm)</h3>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-bright shadow-[0_0_8px_#00C49F] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-platinum/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-platinum/10" />
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto space-y-4 font-mono text-[13px] custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-platinum/10 italic p-4 text-center">Federating swarm missions...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex gap-6 group">
                  <span className="text-platinum/20 min-w-[100px] text-[10px] pt-1">[{log.timestamp}]</span>
                  <div className="flex-1 space-y-1">
                    <span className="block text-[10px] font-black uppercase text-platinum/40 tracking-widest">{log.agent} node</span>
                    <span className="text-platinum/80 leading-relaxed font-bold group-hover:text-emerald-bright transition-colors">{log.message}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={terminalRef} />
          </div>

          <div className="p-8 border-t border-white/5 bg-white/[0.01]">
            <div className="grid grid-cols-2 gap-8">
               <div className="flex items-center gap-4">
                  <Box className="w-5 h-5 text-platinum/20" />
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-platinum/20 font-black">SOVRA Distributed Auth</span>
                    <span className="text-[10px] text-platinum/40 italic font-mono uppercase">Node: COLLECTIVE_V2_PROD</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <Layers className="w-5 h-5 text-platinum/20" />
                  <div>
                    <span className="block text-[8px] uppercase tracking-widest text-platinum/20 font-black">Swarm Autonomy Density</span>
                    <div className="flex items-center gap-2">
                       <div className="h-1 w-20 bg-emerald-bright/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-bright" style={{ width: '120%' }} />
                       </div>
                       <span className="text-[10px] font-black text-emerald-bright underline decoration-sia_core-gold/30">120/100 READY</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global SOVRA Bar */}
      <footer className="px-4 py-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-platinum/10">
        <div className="flex gap-12">
           <span>Engine Status: AUTONOMOUS_CONTROL</span>
           <span>Distributed Sync: ACTIVE</span>
        </div>
        <div>
           \u0029 2026 APEX COLLECTIVE / Anthony Shield Autonomy
        </div>
      </footer>
    </div>
  );
};

export default SOVRAHub;
