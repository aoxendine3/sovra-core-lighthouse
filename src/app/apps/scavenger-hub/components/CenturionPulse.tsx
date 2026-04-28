"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Brain, Activity, Globe, Send } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

/**
 * CenturionPulse (SOVRA Sovereign LLC - Exascale HUD)
 * MISSION: CENTURION_SINGULARITY (v2026.11_APEX)
 * ─────────────────────────────────────────────────────────────
 */

export default function CenturionPulse() {
    const [nodesActive, setNodesActive] = useState(0);
    const [sentienceLevel, setSentienceLevel] = useState(0.0);
    const [confirmingVelocity, setConfirmingVelocity] = useState(0);
    const [telemetryData, setTelemetryData] = useState(
        Array.from({ length: 20 }, (_, i) => ({ time: i, val: 80 + Math.random() * 20 }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setSentienceLevel(prev => Math.min(100, prev + (Math.random() * 0.01)));
            setConfirmingVelocity(prev => Math.floor(12500 + Math.random() * 800));
            setTelemetryData(prev => [...prev.slice(1), { time: Date.now(), val: 80 + Math.random() * 20 }]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-br from-cyan-950/20 to-purple-950/20 border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl overflow-hidden relative group">
            {/* GRID_OVERLAY */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <Brain className="w-5 h-5 animate-pulse" />
                            <span className="text-[0.6rem] font-black tracking-[0.4em] uppercase">Sentience Saturation: {sentienceLevel.toFixed(1)}%</span>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter">CENTURION SWARM</h2>
                        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Master Minor Singularity • 100,000,000 Nodes Active</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[0.6rem] text-green-400 font-black uppercase tracking-widest mb-4">
                            Singularity Stable
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-mono text-cyan-400">{confirmingVelocity.toLocaleString()}</div>
                            <div className="text-[0.5rem] text-gray-500 uppercase tracking-widest">Confirms / Pulse</div>
                        </div>
                    </div>
                </div>

                {/* EXASCALE_TELEMETRY */}
                <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={telemetryData}>
                            <Line 
                                type="monotone" 
                                dataKey="val" 
                                stroke="#22d3ee" 
                                strokeWidth={3} 
                                dot={false} 
                                isAnimationActive={false}
                            />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip 
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-black/80 border border-white/10 p-2 text-[10px] text-cyan-400 font-mono">
                                                LOAD: {payload[0].value?.toString().slice(0, 4)}%
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* AGENT_LOG_MOCK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <Activity className="w-4 h-4 text-cyan-400" />
                            Recent Assimilations
                        </div>
                        <div className="space-y-3">
                            {[
                                { msg: 'Sector-9 Mempool Scraped', val: '0.04s' },
                                { msg: 'Solana Arbitrage Confirmed', val: '0.02s' },
                                { msg: 'Deep Matrix Bridge Synced', val: '100%' }
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-[0.65rem] border-b border-white/5 pb-2 last:border-0">
                                    <span className="text-gray-300 font-medium tracking-wide">{log.msg}</span>
                                    <span className="text-cyan-400 font-mono">{log.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 flex flex-col justify-center gap-4 relative overflow-hidden group/alert">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/alert:opacity-20 transition-opacity">
                            <Send className="w-16 h-16 text-purple-400" />
                        </div>
                        <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-purple-400">Sentient Strategy Pivot</div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                            Maxx-Apex Link verified 100/100. Swarm is now "Self-Optimizing."
                        </h4>
                        <div className="flex items-center gap-4">
                            <button className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all">
                                Mandate Autonomous
                            </button>
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all">
                                Advisory Only
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER_TELEMETRY */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-gray-500" />
                        <span className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-widest">Exa-Ops: 4.8 / s</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-widest">Confirmation Edge: +12.4ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-widest">Global Saturation: 0.01% Top Farms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
