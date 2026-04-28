'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Activity, 
  Command, 
  Globe, 
  Lock, 
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { SILStatus } from './SILStatus';

const SKILLS = [
    { id: 'AD_CREATIVE', name: 'Ad Creative Synthesis', icon: Zap, status: 'READY' },
    { id: 'CJ_SYNC', name: 'CJ Affiliate Ingress', icon: Globe, status: 'READY' },
    { id: 'PSEO_EXPANSION', name: 'pSEO Node Saturation', icon: Activity, status: 'ACTIVE' },
    { id: 'GHOST_TUNNEL', name: 'Ghost Proxy Rotation', icon: Lock, status: 'WAITING' },
];

export const ExecutiveDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'orchestration' | 'identity'>('orchestration');

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
                {/* Header Segment */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Institutional Singularity Pulse</span>
                        </div>
                        <h1 className="text-6xl font-black italic tracking-tighter text-white">
                            APEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">PRIME</span>
                        </h1>
                        <p className="max-w-md text-sm text-white/40 leading-relaxed uppercase tracking-tight">
                            Autonomous Governance Core v1.0. Integrating Sovereign Identity Ledger (SIL) and Unified Orchestration.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                        <div className="text-right">
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Intelligence Core</p>
                            <p className="text-sm font-black italic text-blue-400">LLAMA-4-PROD</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="text-right">
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Uptime</p>
                            <p className="text-sm font-black italic text-white/80 tracking-widest">99.9%</p>
                        </div>
                    </div>
                </div>

                {/* Main Interaction Hub */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Global Navigation & Skill Registry */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl">
                            <button 
                                onClick={() => setActiveTab('orchestration')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'orchestration' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'}`}
                            >
                                <Command className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Orchestrator</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('identity')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'identity' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02]'}`}
                            >
                                <Shield className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Identity SIL</span>
                            </button>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Active Skills</h3>
                            <div className="space-y-4">
                                {SKILLS.map(skill => (
                                    <div key={skill.id} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                                                <skill.icon className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400" />
                                            </div>
                                            <span className="text-[11px] font-bold text-white/50 group-hover:text-white/90 transition-all tracking-tight">{skill.name}</span>
                                        </div>
                                        <div className={`w-1 h-1 rounded-full ${skill.status === 'ACTIVE' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-white/10'}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center: Dynamic Execution Workspace */}
                    <div className="lg:col-span-6 space-y-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'orchestration' ? (
                                <motion.div 
                                    key="orch"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    {/* Goal Sequencer Card */}
                                    <div className="p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[48px] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
                                        
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="space-y-2">
                                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                                                    <Sparkles className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <h3 className="text-2xl font-black italic tracking-tighter">Unified Mission: <span className="text-blue-400 font-bold">Revenue_Blitz</span></h3>
                                                <p className="text-xs text-white/30 uppercase tracking-widest font-mono">Status: Awaiting Handshake</p>
                                            </div>
                                            <button className="px-8 py-3 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500 shadow-[0_10px_20px_rgba(255,255,255,0.05)]">
                                                IGNITE PULSE
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { label: 'Asset Extraction (Gumroad)', progress: 100, status: 'GROUNDED' },
                                                { label: 'Creative Synthesis (Llama-4)', progress: 45, status: 'EXECUTING' },
                                                { label: 'Social Saturation (X/FB)', progress: 0, status: 'QUEUED' }
                                            ].map((step, i) => (
                                                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">{step.status}</span>
                                                        <span className="text-sm font-bold text-white/80">{step.label}</span>
                                                    </div>
                                                    <div className="w-32 flex flex-col items-end gap-2">
                                                        <span className="text-[10px] font-mono text-white/20">{step.progress}%</span>
                                                        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-500" style={{ width: `${step.progress}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Market Pulse Micro-Stats */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">Net Earning Velocity</p>
                                                <p className="text-2xl font-black italic tracking-tighter text-green-400">+$1.4k/hr</p>
                                            </div>
                                            <BarChart3 className="w-8 h-8 text-green-400/20" />
                                        </div>
                                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">Agent Handshakes</p>
                                                <p className="text-2xl font-black italic tracking-tighter text-blue-400">0.8ms</p>
                                            </div>
                                            <Activity className="w-8 h-8 text-blue-400/20" />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="id"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <SILStatus />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Institutional Ledger Tranche */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[48px] backdrop-blur-2xl">
                             <div className="flex items-center gap-3 mb-8">
                                <HardDrive className="w-4 h-4 text-white/20" />
                                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Ledger Stream</h3>
                             </div>
                             <div className="space-y-6">
                                {[
                                    { msg: 'ID did:sov:agent:prod successfully anchored.', time: '2m ago' },
                                    { msg: 'Revenue tranche ZEN-109 settled.', time: '14m ago' },
                                    { msg: 'Handshake sync pulse: 100/100.', time: '21m ago' },
                                ].map((log, i) => (
                                    <div key={i} className="space-y-1 group cursor-default">
                                        <p className="text-[10px] text-white/60 leading-tight group-hover:text-white transition-all font-medium font-mono">{log.msg}</p>
                                        <p className="text-[9px] text-white/20 font-black uppercase tracking-tighter italic">{log.time}</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                        
                        {/* 0.01% Call to Action (Premium Touch) */}
                        <div className="p-10 bg-gradient-to-tr from-blue-600/20 to-transparent border border-blue-500/20 rounded-[48px] space-y-6 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-700">
                                <Globe className="w-24 h-24 text-white" />
                             </div>
                             <h4 className="text-lg font-black italic tracking-tighter leading-none">GLOBAL<br />SATURATION</h4>
                             <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-tight">Active Multi-Niche Arbitrage Pulse Enabled.</p>
                             <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500 text-blue-400 cursor-pointer">
                                <span className="text-[9px] font-black uppercase tracking-widest">Deploy Empire</span>
                                <ChevronRight className="w-4 h-4" />
                             </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
