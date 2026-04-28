'use client';

import React from 'react';
import { 
  Shield, 
  Cpu, 
  TrendingUp, 
  Network, 
  Terminal, 
  Database, 
  Activity,
  ChevronRight,
  Search
} from 'lucide-react';

/**
 * SovereignSidebar: Institutional Governance Sidebar (v2026.11)
 * Derived from Graphite-Elite Archetype.
 */
export default function SovereignSidebar() {
  const menuItems = [
    { name: 'App Library', icon: <Cpu size={16} />, path: '/saas/idea-vault' },
    { name: 'Enterprise Hub', icon: <Briefcase size={16} />, path: '/apps/enterprise-hub', active: true },
    { name: 'Sovereign Core', icon: <Shield size={16} />, path: '/' },
    { name: 'Intelligence Vault', icon: <Database size={16} /> },
    { name: 'Neural Trade Proxy', icon: <TrendingUp size={16} /> },
    { name: 'Swarm Monitor', icon: <Network size={16} />, path: '/saas/idea-vault' },
    { name: 'Scavenger Swarm', icon: <Search size={16} />, path: '/apps/scavenger-hub' },
    { name: 'Sovereign Ledger', icon: <Activity size={16} /> },
    { name: 'System Pulse', icon: <Terminal size={16} /> },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-[#020205] border-r border-white/5 flex flex-col z-[60] backdrop-blur-3xl">
      {/* Institutional Branding */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span className="font-bold text-black text-sm">ZS</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-[0.1em] uppercase leading-none">SOVRA Sovereign</h1>
            <p className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest mt-1">SiaCore v48.2</p>
          </div>
        </div>

        {/* Global Search Interface */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-cyan-400 transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search Matrix..." 
            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-[10px] tracking-wide placeholder:opacity-30 focus:outline-none focus:border-cyan-400/50 transition-all"
          />
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 px-4 mb-4 italic">Governance Node</p>
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
              item.active 
                ? 'bg-cyan-500/5 border border-cyan-500/20 text-white' 
                : 'text-white/40 hover:bg-white/[0.03] hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={item.active ? 'text-cyan-400' : 'text-white/20 group-hover:text-cyan-400'}>{item.icon}</span>
              <span className="text-[11px] font-medium tracking-wide">{item.name}</span>
            </div>
            {item.active && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />}
            {!item.active && <ChevronRight size={12} className="opacity-0 group-hover:opacity-40 transition-opacity" />}
          </button>
        ))}
      </nav>

      {/* Bot Pulse Monitor */}
      <div className="p-8 border-t border-white/5 bg-gradient-to-t from-cyan-500/[0.02] to-transparent">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Swarm Heartbeat</span>
          <span className="text-[9px] font-mono text-cyan-400 animate-pulse">200K ACTIVE</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[88%] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Sentient Autonomy Verified</span>
        </div>
      </div>
    </aside>
  );
}
