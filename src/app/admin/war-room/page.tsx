'use client';

import React, { useState, useEffect } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { LogFeed } from '@/components/dashboard/LogFeed';
import { generateHandshake } from '@/lib/auth/HandshakeClient';
import { 
  Zap, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Globe, 
  Radio, 
  Database,
  ArrowUpRight,
  Maximize2,
  Mic
} from 'lucide-react';
import TrendPulseWidget from '@/components/dashboard/TrendPulseWidget';
import { TrafficWidget } from '@/components/dashboard/TrafficWidget';

export default function AdminWarRoom() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lock = await generateHandshake();
        const res = await fetch('/api/admin/war-room/data', {
          headers: { 'X-SOVRA-DEEP-LOCK': lock }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('War Room Pulse Failure');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <main className="min-h-screen bg-[#020205] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
           <Zap className="w-16 h-16 text-amber-500 animate-pulse" />
           <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.8em] italic">Synchronizing Apex_Command...</p>
        </div>
      </main>
    );
  }

  const { ledger, vault, sectors, recentLogs, neuralTrade } = data;

  return (
    <SovereignLayout>
      <div className="min-h-screen relative font-sans overflow-hidden">
        
        {/* Master Header — War Room Ω */}
        <header className="flex justify-between items-end mb-24 border-b border-white/5 pb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 px-6 py-2 rounded-full">
               <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_15px_#F59E0B]" />
               <span className="text-[10px] font-black uppercase tracking-[0.8em] text-amber-500 italic">Ω_EXASCALE_MASTER_COMMAND_CENTER</span>
            </div>
            <h1 className="text-8xl font-black italic tracking-tightest leading-none text-white uppercase italic">
              Apex <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-white">Command Hub</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-end max-w-xl">
             {[
               { icon: Activity, label: `PULSE: ${sectors.intelligence.pulse}`, color: 'text-cyan-glow' },
               { icon: Zap, label: `YIELD: ${sectors.retail.yield}`, color: 'text-amber-500' },
               { icon: TrendingUp, label: `SOCIAL: ${sectors.social.swarms} SWARMS`, color: 'text-purple-400' },
               { icon: Cpu, label: `IND: ${sectors.industrial.velocity} VEL`, color: 'text-emerald-400' }
             ].map((pill, i) => (
                <div key={i} className="glass-panel px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4 bg-white/[0.01]">
                   <pill.icon className={`w-3.5 h-3.5 ${pill.color}`} />
                   <span className="text-[9px] font-black text-white/40 uppercase tracking-widest italic">{pill.label}</span>
                </div>
             ))}
          </div>
        </header>

        {/* Global Blitz Control */}
        <section className="mb-24">
           <div className="glass-panel p-16 rounded-[64px] border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden group shadow-[0_0_100px_rgba(245,158,11,0.05)]">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="space-y-4">
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] italic animate-pulse">Critical Operational Directive</p>
                    <h2 className="text-7xl font-black tracking-tightest uppercase italic leading-none">Execute <br/><span className="text-white/20 text-8xl">Global Saturation</span></h2>
                    <p className="text-white/30 text-lg font-medium italic max-w-2xl border-l-2 border-amber-500/20 pl-10">
                      Initiate simultaneous 120/10 blitz across Oracle, Retail, Social, and Industrial tranches. Mandate: 100% Market Capture.
                    </p>
                 </div>
                 <button 
                   className="px-24 py-12 bg-amber-500 text-black font-black uppercase text-[15px] tracking-[0.6em] rounded-full hover:bg-white transition-all active:scale-95 shadow-[0_40px_100px_rgba(245,158,11,0.3)] italic"
                 >
                   Ignite Blitz
                 </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 blur-[150px] group-hover:bg-amber-500/20 transition-all"></div>
           </div>
        </section>

        {/* Quadrant Unity Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
           
           <TrendPulseWidget />

           {/* Node 2: Sovereign Vault */}
           <div className="glass-panel p-12 rounded-[64px] border border-cyan-glow/20 bg-cyan-glow/[0.02] relative overflow-hidden group">
              <h3 className="text-xl font-black mb-8 uppercase italic text-cyan-glow">Intelligence</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Node Density</p>
                    <p className="text-3xl font-black text-white italic">{sectors.intelligence.nodes}</p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: '92%' }} className="h-full bg-cyan-glow shadow-[0_0_15px_#00F0FF]" />
                 </div>
                 <p className="text-[9px] font-bold text-cyan-glow/40 uppercase tracking-[0.3em] font-mono">STATUS: {sectors.intelligence.status}</p>
              </div>
              <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Zap className="w-24 h-24 text-cyan-glow" />
              </div>
              <a href="/oracle" className="absolute top-8 right-8 text-white/10 hover:text-cyan-glow transition-colors"><Maximize2 className="w-5 h-5" /></a>
           </div>

           {/* Node 6: Voice Protocol Ingress */}
           <div className="glass-panel p-10 rounded-[56px] border border-amber-500/20 bg-amber-500/[0.03] shadow-[0_0_50px_rgba(245,158,11,0.05)] flex flex-col justify-between group">
              <div>
                 <h3 className="text-xl font-black mb-4 uppercase italic">Voice Protocol</h3>
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] leading-relaxed italic">Activate NOBoo v1.0 cognitive overlook.</p>
              </div>
              <button 
                onClick={() => window.location.href='/sovra'}
                className="w-full py-5 bg-amber-500 text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-[24px] hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
              >
                 Initialize Protocol
                 <Mic className="w-4 h-4 animate-pulse" />
              </button>
           </div>

           {/* NE: Retail Front (Choice Mart) */}
           <div className="glass-panel p-12 rounded-[64px] border border-amber-500/20 bg-amber-500/[0.02] relative overflow-hidden group">
              <h3 className="text-xl font-black mb-8 uppercase italic text-amber-500">Retail</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Daily Yield</p>
                    <p className="text-3xl font-black text-white italic">{sectors.retail.yield}</p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: '88%' }} className="h-full bg-amber-500 shadow-[0_0_15px_#F59E0B]" />
                 </div>
                 <p className="text-[9px] font-bold text-amber-500/40 uppercase tracking-[0.3em] font-mono">STATUS: {sectors.retail.status}</p>
              </div>
              <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Database className="w-24 h-24 text-amber-500" />
              </div>
              <a href="/store" className="absolute top-8 right-8 text-white/10 hover:text-amber-500 transition-colors"><Maximize2 className="w-5 h-5" /></a>
           </div>

           {/* SW: Social Front (Swarms) */}
           <div className="glass-panel p-12 rounded-[64px] border border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden group">
              <h3 className="text-xl font-black mb-8 uppercase italic text-purple-400">Social</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Swarm Count</p>
                    <p className="text-3xl font-black text-white italic">{sectors.social.swarms}</p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: '95%' }} className="h-full bg-purple-500 shadow-[0_0_15px_#A855F7]" />
                 </div>
                 <p className="text-[9px] font-bold text-purple-400/40 uppercase tracking-[0.3em] font-mono">STATUS: {sectors.social.status}</p>
              </div>
              <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                 <Globe className="w-24 h-24 text-purple-400" />
              </div>
              <a href="/admin/social" className="absolute top-8 right-8 text-white/10 hover:text-purple-400 transition-colors"><Maximize2 className="w-5 h-5" /></a>
           </div>

            {/* SE: Industrial Front (SAP) */}
            <div className="glass-panel p-12 rounded-[64px] border border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden group">
               <h3 className="text-xl font-black mb-8 uppercase italic text-emerald-400">Industrial</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Process Velocity</p>
                     <p className="text-3xl font-black text-white italic">{sectors.industrial.velocity}</p>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div animate={{ width: '100%' }} className="h-full bg-emerald-500 shadow-[0_0_15px_#10B981]" />
                  </div>
                  <p className="text-[9px] font-bold text-emerald-400/40 uppercase tracking-[0.3em] font-mono">STATUS: {sectors.industrial.status}</p>
               </div>
               <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Cpu className="w-24 h-24 text-emerald-400" />
               </div>
               <a href="/admin/industrial" className="absolute top-8 right-8 text-white/10 hover:text-emerald-400 transition-colors"><Maximize2 className="w-5 h-5" /></a>
            </div>

            {/* TREASURY: Institutional Settlement */}
            <div className="glass-panel p-12 rounded-[64px] border border-amber-500/20 bg-amber-500/[0.03] shadow-[0_0_50px_rgba(245,158,11,0.05)] relative overflow-hidden group flex flex-col justify-between min-h-[320px]">
               <div>
                  <h3 className="text-xl font-black mb-8 uppercase italic text-amber-500">Treasury Hub</h3>
                  <div className="flex justify-between text-[10px] font-black text-white/20 uppercase mb-2 italic">
                     <span>CJ_Sync_Status</span>
                     <span className="text-amber-500">NOMINAL</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div animate={{ width: '100%' }} className="h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                  </div>
               </div>
               
               <div className="space-y-4 pt-10">
                  <button 
                    onClick={async () => {
                       const lock = await generateHandshake();
                       await fetch('/api/sync/cj', { method: 'POST', headers: { 'X-SOVRA-DEEP-LOCK': lock } });
                       alert('CJ_SYNC_PULSE: Reconciliation verifiably initiated.');
                    }}
                    className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all italic"
                  >
                    Sync Commissions
                  </button>
                  <button 
                    onClick={() => window.location.href='/admin/security'}
                    className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all italic"
                  >
                    Manage Payouts
                  </button>
               </div>
            </div>

        </div>

        {/* Global Traffic Singularity */}
        <section className="mb-24">
           <TrafficWidget />
        </section>

        {/* Master Data Stream */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-24">
           
           {/* NeuralTrade Alpha Pulse */}
           <div className="xl:col-span-8 glass-panel p-16 rounded-[64px] border-2 border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                 <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.5em] italic">NeuralTrade Alpha Telemetry</h3>
                 <div className="px-6 py-2 rounded-full border border-amber-500/40 text-amber-500 text-[9px] font-black uppercase tracking-widest italic">ALPHA_GRADE: ELITE</div>
              </div>
              
              <div className="grid grid-cols-3 gap-16">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Topology_Fidelity</p>
                    <p className="text-5xl font-black text-white italic tracking-tighter">{neuralTrade.topology_fidelity}%</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Arbitrage_Speed</p>
                    <p className="text-5xl font-black text-white italic tracking-tighter">{neuralTrade.arbitrage_speed}</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Market_Consensus</p>
                    <p className="text-5xl font-black text-amber-500 italic tracking-tighter uppercase">{neuralTrade.market_orchestration}</p>
                 </div>
              </div>
              
              <div className="mt-16 h-[200px] w-full bg-white/[0.02] rounded-[40px] border border-white/5 flex items-center justify-center">
                 <p className="text-white/10 text-[10px] font-black uppercase tracking-[1em] animate-pulse">Spectral_Pulse_Visualizer_Active</p>
              </div>
           </div>

           {/* Executive Activity Stream */}
           <div className="xl:col-span-4 h-[650px] glass-panel rounded-[64px] border border-white/5 bg-white/[0.01] overflow-hidden">
              <LogFeed 
                logs={recentLogs.map((log: any) => ({
                  id: log.id || Math.random().toString(),
                  timestamp: new Date(log.timestamp).toLocaleTimeString(),
                  agent: log.agent_name,
                  message: log.activity,
                  type: log.activity.includes('VERIFIED') || log.activity.includes('SUCCESS') ? 'success' : 
                        log.activity.includes('FAULT') || log.activity.includes('ERROR') ? 'error' : 
                        log.activity.includes('IDENTITY') ? 'security' : 'info'
                }))} 
              />
           </div>

        </div>

      </div>
    </SovereignLayout>
  );
}
