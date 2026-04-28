'use client';

import React, { useState, useEffect } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Key, 
  Fingerprint, 
  Activity, 
  Cpu,
  Verified,
  AlertTriangle
} from 'lucide-react';

const SECURITY_NODES = [
  { id: 'AEGIS-X', sector: 'Handshake_Oracle', status: 'LOCKED', integrity: '100%', threats: 0 },
  { id: 'SIG-GHOST', sector: 'JSON_Ghost_Ledger', status: 'LOCKED', integrity: '100%', threats: 0 },
  { id: 'NFT-SENT', sector: 'Asset_Verification', status: 'MONITORING', integrity: '98%', threats: 2 },
  { id: 'IP-LOCKED', sector: 'Identity_Cloak', status: 'LOCKED', integrity: '100%', threats: 0 },
];

export default function AegisSecurityDashboard() {
  const [handshakeKey, setHandshakeKey] = useState('AEGIS_777_APEX');
  const [isRotating, setIsRotating] = useState(false);

  const rotateKey = () => {
    setIsRotating(true);
    setTimeout(() => {
      setHandshakeKey(`AEGIS_${Math.random().toString(16).slice(2, 10).toUpperCase()}_Ω`);
      setIsRotating(false);
    }, 2000);
  };

  return (
    <SovereignLayout>
      <div className="min-h-screen">
        
        {/* Cinematic Header — Security Front */}
        <header className="mb-24 flex justify-between items-end">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-4 bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-full">
                 <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_#00F0FF]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-glow italic">AEGIS_SECURITY_FRONT_v1.0</span>
              </div>
              <h1 className="text-7xl font-black italic tracking-tightest leading-none text-white uppercase italic">
                Sovereign <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-white">Integrity</span>
              </h1>
              <p className="text-white/40 text-lg font-bold leading-relaxed border-l-2 border-cyan-glow/30 pl-10 italic uppercase tracking-widest max-w-2xl">
                SOVRA Zero-Point Deep Locking and NFT Sentinel verification. Verifiably secured via the Sovereign Security Agent (v1.0_SOVRA).
              </p>
           </div>
           
           <button 
             onClick={rotateKey}
             className="px-12 py-6 bg-cyan-glow text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-white transition-all shadow-[0_15px_40px_rgba(0,240,255,0.2)] active:scale-95 italic flex items-center gap-4"
           >
             <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
             Rotate Sovereign Key
           </button>
        </header>

        {/* Security Performance Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-24">
           {[
             { label: 'Deep Lock Status', val: 'GROUNDED', sub: 'Zero Extraction Vectors', icon: Lock, color: 'text-cyan-glow' },
             { label: 'Agent Consensus', val: '100%', sub: 'Verification Absolute', icon: ShieldCheck, color: 'text-white' },
             { label: 'Threat Mitigation', val: 'APEX', sub: 'Sentinel Protocols Active', icon: ShieldAlert, color: 'text-cyan-glow' },
             { label: 'Identity Obfuscation', val: 'MAX', sub: 'IP Ghosting Active', icon: Eye, color: 'text-white' },
           ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group shadow-2xl"
              >
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8 italic">{stat.label}</p>
                    <div className="flex items-center gap-6">
                       <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                       <span className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.val}</span>
                    </div>
                    <p className="text-[9px] font-bold text-white/10 mt-6 uppercase tracking-widest italic">{stat.sub}</p>
                 </div>
                 <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-[60px]" />
              </motion.div>
           ))}
        </div>

        {/* Security Command Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* Aegis Sentinel Fleet */}
           <div className="xl:col-span-8 space-y-10">
              <div className="flex justify-between items-center mb-8 px-6">
                 <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.6em] italic">Aegis Sentinel Fleet Status</h2>
                 <div className="flex gap-4">
                    <span className="text-[9px] font-black text-cyan-glow bg-cyan-glow/5 px-4 py-1.5 rounded-full border border-cyan-glow/10 italic">DEEP_LOCK_v1.0</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                 {SECURITY_NODES.map((node, i) => (
                    <motion.div 
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-cyan-glow/20 transition-all flex flex-col md:flex-row justify-between items-center gap-10 group"
                    >
                       <div className="flex items-center gap-10">
                          <div className="w-16 h-16 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center">
                             <Fingerprint className="w-6 h-6 text-cyan-glow group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 italic">{node.id} // SECURE</p>
                             <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{node.sector}</h3>
                          </div>
                       </div>
                       
                       <div className="flex gap-16 items-center">
                          <div className="text-center">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Integrity</p>
                             <p className="text-xl font-black text-cyan-glow italic">{node.integrity}</p>
                          </div>
                          <div className="text-center">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Threats</p>
                             <p className={`text-xl font-black italic ${node.threats > 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{node.threats}</p>
                          </div>
                          <div className={`px-6 py-2 rounded-full border font-black text-[9px] uppercase tracking-widest italic ${node.status === 'LOCKED' ? 'border-cyan-glow/30 text-cyan-glow shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-white/10 text-white/20'}`}>
                             {node.status}
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Authorization Pulse & Handshake */}
           <div className="xl:col-span-4 space-y-12">
              <div className="glass-panel p-12 rounded-[56px] border border-cyan-glow/20 bg-cyan-glow/[0.02] shadow-[0_0_80px_rgba(0,240,255,0.05)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-glow/10 blur-[100px]" />
                 <div className="flex justify-between items-center mb-12 relative z-10">
                    <h3 className="text-xs font-black text-cyan-glow uppercase tracking-[0.5em] italic leading-none">Authorization_Handshake</h3>
                    <Verified className="w-5 h-5 text-cyan-glow animate-pulse" />
                 </div>
                 
                 <div className="space-y-10 relative z-10">
                    <div className="p-8 rounded-[40px] bg-black/40 border border-white/5 flex flex-col items-center gap-6 text-center">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic">Current Temporal Key</p>
                       <p className="text-2xl font-black text-white font-mono tracking-widest break-all italic">{handshakeKey}</p>
                       <div className="flex gap-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
                          <span className="text-[9px] font-bold text-cyan-glow/40 uppercase tracking-widest italic">ROTATING_IN_45S</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none border-b border-white/5 pb-4">Security_Incidents</p>
                       {[
                         { msg: 'Unauthorized extraction vector detected from 192.x.x.x. Vector zeroed in 3.5s.', type: 'critical' },
                         { msg: 'Spectral jitter detected in global sync. Handshake recalibrated.', type: 'info' }
                       ].map((inc, i) => (
                          <div key={i} className="flex gap-4 group">
                             <div className={`shrink-0 w-1.5 h-6 rounded-full ${inc.type === 'critical' ? 'bg-red-500 shadow-[0_0_10px_#EF4444]' : 'bg-cyan-glow shadow-[0_0_10px_#00F0FF]'}`} />
                             <p className="text-[11px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase italic leading-tight">{inc.msg}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] flex items-center justify-between group">
                 <div className="space-y-2">
                    <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.5em] italic">Encryption Load</h3>
                    <p className="text-3xl font-black text-white italic tracking-tighter uppercase group-hover:text-cyan-glow transition-colors">APEX-Ω</p>
                 </div>
                 <Key className="w-10 h-10 text-white/10 group-hover:text-cyan-glow group-hover:rotate-45 transition-all" />
              </div>

              {/* Lockdown Trigger */}
              <button className="w-full py-10 bg-red-500/10 border-2 border-red-500/20 rounded-[48px] flex flex-col items-center gap-4 group hover:bg-red-500 hover:border-red-400 transition-all">
                 <AlertTriangle className="w-10 h-10 text-red-500 group-hover:text-white group-hover:scale-110 transition-all" />
                 <span className="text-[12px] font-black text-red-500 group-hover:text-white uppercase tracking-[0.8em] italic">Absolute Lockdown</span>
              </button>
           </div>

        </div>

      </div>
    </SovereignLayout>
  );
}

const RefreshCw = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
);
