"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, BarChart3, Globe, Orbit } from 'lucide-react';

export default function TrendRadar() {
    const trends = [
        { label: 'Edge-Sovereignty Hubs', status: 'HOT', timeline: '6 Months', value: '+142%' },
        { label: 'Post-Quantum DeFi', status: 'EMERGING', timeline: '9 Months', value: '+88%' },
        { label: 'AI-Agentic Revenue', status: 'INSTITUTIONAL', timeline: '12 Months', value: '+210%' }
    ];

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl h-full flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/2">
                <h2 className="text-lg font-bold flex items-center gap-2 text-purple-400">
                    <Compass className="w-5 h-5" />
                    Maxx Trend Radar
                </h2>
                <div className="text-[0.6rem] font-black uppercase tracking-widest text-gray-500">6-12 Months Horizon</div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center gap-8">
                {trends.map((trend, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-xs font-black text-white/50 uppercase tracking-widest">{trend.timeline}</div>
                                <div className="text-xl font-bold text-white">{trend.label}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-purple-400 font-mono">{trend.value}</div>
                                <div className="text-[0.6rem] font-black uppercase text-purple-500/50">{trend.status}</div>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${95 - (i * 20)}%` }}
                                transition={{ delay: 0.5 + (i * 0.2), duration: 1.5 }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-6 border-t border-white/5 flex items-center gap-4 text-[0.6rem] uppercase tracking-widest text-gray-500">
                <Orbit className="w-4 h-4 animate-spin-slow" />
                Swarm Predictive Telemetry Verifiably Active
            </div>
        </div>
    );
}
