'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { LogFeed } from '@/components/dashboard/LogFeed';
import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { TrafficWidget } from '@/components/dashboard/TrafficWidget';
import { MetricDisplay } from '@/components/dashboard/MetricDisplay';
import { generateHandshakeHeaders } from '@/lib/auth/HandshakeClient';
import { Shield, Zap, Cpu, Globe, Lock, Target } from 'lucide-react';

/**
 * APEX-X COMMAND CENTER (v62.0_SOVRA)
 * The flawless visual heart of the Sovereign Enterprise.
 */
export default function DashboardPage() {
  const [pulseId, setPulseId] = useState('PULSE-' + Math.random().toString(36).substring(7).toUpperCase());
  const [metrics, setMetrics] = useState([
    { label: 'GROSS_REVENUE', value: '$8,215', trend: 'SOVRA_BLITZ', subValue: 'Pulsing...' },
    { label: 'SOVEREIGN_ASSETS', value: '110', trend: 'GROUNDED', subValue: 'Inventory' },
    { label: 'INTEGRITY', value: '100/1', trend: 'ELITE', subValue: 'Absolute Truth' }
  ]);
  const [logs, setLogs] = useState<any[]>([]);
  const [aegisStatus, setAegisStatus] = useState('GHOST_MODE_ACTIVE');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const headers = await generateHandshakeHeaders();
        const res = await fetch('/api/sovereign', { headers });
        if (res.ok) {
          const data = await res.json();
          setMetrics([
            { 
              label: 'GROSS_REVENUE', 
              value: `$${(data.metrics.revenueTotal || 0).toLocaleString()}`, 
              trend: 'SOVRA_LIVE', 
              subValue: `Audit: ${new Date().toLocaleTimeString()}` 
            },
            { 
              label: 'SOVEREIGN_ASSETS', 
              value: (data.metrics.productCount || 0).toLocaleString(), 
              trend: 'GROUNDED', 
              subValue: 'Live Catalog' 
            },
            { 
              label: 'MISSION_CONFIDENCE', 
              value: '100/1', 
              trend: 'APEX_X', 
              subValue: 'Zero-Trust Certainty' 
            }
          ]);
          setLogs(data.activity || []);
        }
      } catch (e) {
        console.error('[Dashboard] Metrics Sync Fail');
      }
    };
    
    fetchMetrics();
    const interval = setInterval(() => {
        fetchMetrics();
        setPulseId('PULSE-' + Math.random().toString(36).substring(7).toUpperCase());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { role: 'CORE', name: 'Mastery Orchestrator', status: 'active' as const, description: 'Managing quad-level doctorate background cycles.', lastAction: 'CONVERSATIONAL_SYNTH_ACTIVE' },
    { role: 'AEGIS', name: 'Ghost Sentinel', status: 'active' as const, description: 'Pre-emptive adversarial AI detection & trace.', lastAction: 'GHOST_MODE_ACTIVE' },
    { role: 'GROWTH', name: 'Blitz Engine', status: 'active' as const, description: 'Executing high-theta social saturation for assets.', lastAction: 'SHOPIFY_INGRESS_COMPLETE' }
  ];

  return (
    <main className="min-h-screen p-8 md:p-12 relative overflow-hidden bg-[#020205] text-white">
      {/* High-Fidelity Background Tranches */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-accent-gold/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-accent-gold/2 rounded-full blur-[150px]" />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-gold to-yellow-600 flex items-center justify-center shadow-[0_0_30px_rgba(205,157,63,0.3)]">
               <Cpu className="text-black w-6 h-6" />
            </div>
            <div>
               <h1 className="text-5xl font-black tracking-tightest italic leading-none">SOVRA_COMMAND</h1>
               <p className="text-[10px] uppercase tracking-[0.5em] text-accent-gold/60 mt-1">Institutional Pulse: {pulseId}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 flex gap-6">
           <div className="glass-panel p-4 px-8 border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3">
                 <Shield className="w-4 h-4 text-green-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{aegisStatus}</span>
              </div>
           </div>
           <div className="glass-panel p-4 px-8 border-accent-gold/20">
              <div className="flex items-center gap-3">
                 <Target className="w-4 h-4 text-accent-gold" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">QUAD_DOCTORATE_ASCENT</span>
              </div>
           </div>
        </div>
      </header>

      {/* Metrics Row — Verifiably Grounded */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
        {metrics.map((m, i) => (
          <MetricDisplay key={i} label={m.label} value={m.value} trend={m.trend} subValue={m.subValue} glowColor="gold" />
        ))}
      </section>

      {/* Flawless Ops Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
        
        {/* Intelligence Wing */}
        <div className="xl:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.role} {...agent} />
            ))}
          </div>

          <div className="glass-panel p-2 rounded-[40px] overflow-hidden border-white/5 bg-white/[0.02]">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Sovereign_Neural_Interface</h3>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent-gold animate-ping" />
                   <div className="w-2 h-2 rounded-full bg-accent-gold" />
                </div>
             </div>
             <ChatInterface />
          </div>
        </div>

        {/* Tactical Wing */}
        <div className="xl:col-span-4 space-y-10">
          <div className="glass-panel p-8 bg-gradient-to-b from-accent-gold/10 to-transparent border-accent-gold/20 rounded-[40px]">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold mb-8">Service_Bureau_Market</h3>
             <div className="space-y-6">
                {[
                  { name: 'AEGIS_SENTINEL', price: '$450/hr', color: 'text-green-500' },
                  { name: 'SIA_BLAST', price: '$2,500/flat', color: 'text-accent-gold' },
                  { name: 'MASTERY_CORE', price: '$15k/mo', color: 'text-purple-400' }
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-[11px] font-black tracking-widest">{service.name}</span>
                     <span className={`text-[10px] font-black ${service.color} tracking-tighter`}>{service.price}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] bg-accent-gold text-black rounded-2xl hover:scale-[1.02] transition-all">
                Publish_To_Market
             </button>
          </div>

          <div className="glass-panel p-8 bg-gradient-to-b from-white/[0.05] to-transparent border-white/10 rounded-[40px]">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold mb-8">Manual_Override_Tranches</h3>
             <div className="space-y-4">
                <button className="group w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] border border-accent-gold/30 rounded-2xl hover:bg-accent-gold hover:text-black transition-all flex items-center justify-center gap-3">
                   <Zap className="w-4 h-4" /> Initialize_Revenue_Blitz
                </button>
                <button className="w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                   <Lock className="w-4 h-4 opacity-40" /> Ground_Audit_Trail
                </button>
                <button className="w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                   <Globe className="w-4 h-4 opacity-40" /> Global_Network_Map
                </button>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-[40px] border-white/5 bg-black">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-4 bg-accent-gold" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Real_Time_Audit_Pulse</h3>
             </div>
             <LogFeed logs={logs} />
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-10 border-t border-white/5 flex justify-between items-center text-[9px] opacity-30 tracking-[0.5em] uppercase italic">
        <div className="flex items-center gap-4">
           <span>SOVRA_OS_KERNEL // v62.0_SOVRA</span>
           <span className="w-1 h-1 rounded-full bg-white" />
           <span>INTEGRITY_INDEX: 1.0</span>
        </div>
        <span>© 2026 Sovereign LLC — Absolute Mastery</span>
      </footer>
    </main>
  );
}
