'use client';

import React, { useState, useEffect } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  Globe, 
  Radio, 
  Send, 
  RefreshCw,
  Search,
  ArrowUpRight,
  Share2
} from 'lucide-react';

const SATURATION_NODES = [
  { id: 'SN-01', locale: 'EN', niche: 'pet-tech', status: 'ACTIVE', yield: '12%', pages: 24 },
  { id: 'SN-02', locale: 'ES', niche: 'smart-home', status: 'ACTIVE', yield: '45%', pages: 18 },
  { id: 'SN-03', locale: 'DE', niche: 'ai-accessories', status: 'STAGING', yield: 'N/A', pages: 12 },
  { id: 'SN-04', locale: 'JP', niche: 'remote-work', status: 'ACTIVE', yield: '88%', pages: 31 },
];

export default function SocialSaturationDashboard() {
  const [isBlasting, setIsBlasting] = useState(false);
  const [activeTab, setActiveTab] = useState('swarms');

  const triggerBlast = async () => {
    setIsBlasting(true);
    // Simulation Pulse
    setTimeout(() => {
      setIsBlasting(false);
      alert('APEX_SOCIAL_PULSE: Affiliate Blast Swarm Initialized (Ollama Pulse)');
    }, 3000);
  };

  return (
    <SovereignLayout>
      <div className="min-h-screen">
        
        {/* Cinematic Header — Social Front */}
        <header className="mb-24 flex justify-between items-end">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-4 bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-full">
                 <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_15px_#A855F7]" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 italic">SOCIAL_SATURATION_FRONT_v1.0</span>
              </div>
              <h1 className="text-7xl font-black italic tracking-tightest leading-none text-white uppercase italic">
                Saturated <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Swarms</span>
              </h1>
              <p className="text-white/40 text-lg font-bold leading-relaxed border-l-2 border-purple-500/30 pl-10 italic uppercase tracking-widest max-w-2xl">
                Absolute 0.01% Viral engineering and SEO arbitrage. Synchronized via the Global Affiliate Swarm (v.009_APEX).
              </p>
           </div>
           
           <div className="flex gap-4">
              <button 
                onClick={triggerBlast}
                disabled={isBlasting}
                className="px-16 py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase text-[12px] tracking-[0.5em] rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)] active:scale-95 italic disabled:opacity-50"
              >
                {isBlasting ? 'IGNITING...' : 'IGNITE AFFILIATE BLAST'}
              </button>
           </div>
        </header>

        {/* Global Saturation Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-24">
           {[
             { label: 'Active Swarms', val: '24', icon: Users, color: 'text-purple-400' },
             { label: 'SEO Density', val: '94%', icon: Globe, color: 'text-white' },
             { label: 'Arbitrage Yield', val: '120/10', icon: TrendingUp, color: 'text-pink-400' },
             { label: 'Nodes Grounded', val: '5,000', icon: Zap, color: 'text-white' },
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
                 </div>
                 <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/5 rounded-full blur-[60px]" />
              </motion.div>
           ))}
        </div>

        {/* Main Command Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* Saturation Fleet */}
           <div className="xl:col-span-8 space-y-10">
              <div className="flex justify-between items-center mb-8 px-6">
                 <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.6em] italic">Active Saturation Fleet</h2>
                 <div className="flex gap-4">
                    <span className="text-[9px] font-black text-purple-400 bg-purple-400/5 px-4 py-1.5 rounded-full border border-purple-500/10 italic">OLLAMA_SYNCED</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                 {SATURATION_NODES.map((node, i) => (
                    <motion.div 
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all flex flex-col md:flex-row justify-between items-center gap-10 group"
                    >
                       <div className="flex items-center gap-10">
                          <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                             <Radio className="w-6 h-6 text-purple-400 group-hover:animate-pulse" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 italic">{node.id} // {node.locale}</p>
                             <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{node.niche} Satellite</h3>
                          </div>
                       </div>
                       
                       <div className="flex gap-16 items-center">
                          <div className="text-center">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Yield</p>
                             <p className="text-xl font-black text-purple-400 italic">{node.yield}</p>
                          </div>
                          <div className="text-center">
                             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Grounded_Pages</p>
                             <p className="text-xl font-black text-white italic">{node.pages}</p>
                          </div>
                          <div className={`px-6 py-2 rounded-full border font-black text-[9px] uppercase tracking-widest italic ${node.status === 'ACTIVE' ? 'border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'border-white/10 text-white/20'}`}>
                             {node.status}
                          </div>
                          <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-500 transition-all">
                             <ArrowUpRight className="w-5 h-5" />
                          </button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Viral Pulse & Engagement */}
           <div className="xl:col-span-4 space-y-12">
              <div className="glass-panel p-10 rounded-[56px] border border-purple-500/20 bg-purple-500/[0.02] shadow-[0_0_80px_rgba(168,85,247,0.05)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-[100px]" />
                 <div className="flex justify-between items-center mb-12 relative z-10">
                    <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.5em] italic">Viral_Maneuver_Log</h3>
                    <Send className="w-5 h-5 text-purple-500 animate-pulse" />
                 </div>
                 
                 <div className="space-y-8 relative z-10">
                    {[
                      { node: 'AFFILIATE-01', msg: 'Market selection for PET-TECH_EN finalized. 24 anchor tranches verifiably grounded.', time: '2m ago' },
                      { node: 'ARMY-SAT', msg: 'Army saturation pulse hit 120/10 density in Spanish markets. Lead extraction nominal.', time: '8m ago' },
                      { node: 'SEO-BLITZ', msg: 'Global arbitrage vectors recalculated. Deep theta focus shifted to JP_REMOTE.', time: '15m ago' },
                      { node: 'SENTINEL', msg: 'Ghost-Proxy tunnels verifiably secure. IP liability zeroed.', time: '22m ago' }
                    ].map((log, i) => (
                       <div key={i} className="flex gap-6 group cursor-pointer border-l-2 border-white/5 hover:border-purple-500/30 pl-6 transition-all py-2">
                          <div className="space-y-1">
                             <div className="flex gap-4 items-center mb-1">
                                <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest">{log.node}</span>
                                <span className="text-[8px] font-bold text-white/10 uppercase">{log.time}</span>
                             </div>
                             <p className="text-[11px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase italic leading-tight">{log.msg}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] flex items-center justify-between group">
                 <div>
                    <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.5em] italic mb-4">Army Pulse</h3>
                    <p className="text-4xl font-black text-white italic tracking-tighter uppercase transition-all group-hover:text-purple-400">5.2K</p>
                    <p className="text-[9px] font-black text-white/10 uppercase tracking-widest mt-2 italic">Active Saturation Workers</p>
                 </div>
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-white/20 group-hover:rotate-180 transition-transform duration-1000" />
                 </div>
              </div>
           </div>

        </div>

      </div>
    </SovereignLayout>
  );
}
