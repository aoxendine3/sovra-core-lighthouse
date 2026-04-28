'use client';

import React, { useEffect, useState } from 'react';

export default function ExecutiveDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/executive/stats');
            const json = await res.json();
            setData(json);
            setLoading(false);
        };
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-mono animate-pulse">
            IGNITING_SINGULARITY_DASHBOARD...
        </div>
    );

    const stats = data?.stats || {};

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                        ZENITH PRIME
                    </h1>
                    <p className="text-cyan-500 font-mono text-sm mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                        ABSOLUTE_AUTONOMY_PULSE_ACTIVE
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Commander</p>
                    <p className="text-xl font-light italic">Anthony Junior Oxendine</p>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard title="Gross Revenue" value={`$${stats.gross?.toLocaleString()}`} subtitle="Live Pulse Yield" color="cyan" />
                <StatCard title="Net Profit" value={`$${stats.net?.toLocaleString()}`} subtitle="Grounded Reality" color="emerald" />
                <StatCard title="Value Debt" value={`$3.25M`} subtitle="Uncaptured Equity" color="violet" />
                <StatCard title="System Integrity" value="100%" subtitle="Zero Simulation" color="amber" />
            </div>

            {/* Roadmap & Logs Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Roadmap List */}
                <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-violet-500">🗺️</span> $3.25M Roadmap
                    </h3>
                    <div className="space-y-6">
                        <RoadmapItem title="Affiliate Arbitrage" val="$500k" status="BLASTING" />
                        <RoadmapItem title="Agentic IP Licensing" val="$750k" status="PACKAGING" />
                        <RoadmapItem title="Sovereignty Consulting" val="$2.0M" status="AUDITING" />
                    </div>
                </div>

                {/* Live Activity Log */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl font-mono">
                    <h3 className="text-xl font-bold mb-6 font-sans flex items-center gap-3">
                        <span className="text-cyan-500">📡</span> Live Activity Pulse
                    </h3>
                    <div className="space-y-3 text-xs overflow-y-auto max-h-[400px] pr-4 scrollbar-hide">
                        {data?.logs?.map((log: any, i: number) => (
                            <div key={i} className="flex gap-4 border-b border-white/5 pb-2 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                                <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                                <span className="text-cyan-400">[{log.agent_name}]</span>
                                <span className="text-gray-300">{log.activity}</span>
                                <span className={`ml-auto ${log.status === 'SUCCESS' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                    {log.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Commands */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex gap-8 justify-center opacity-40">
                <span className="text-xs uppercase tracking-widest hover:text-cyan-500 cursor-pointer transition-colors">tail worker_logs</span>
                <span className="text-xs uppercase tracking-widest hover:text-cyan-500 cursor-pointer transition-colors">inspect_tonydb</span>
                <span className="text-xs uppercase tracking-widest hover:text-cyan-500 cursor-pointer transition-colors">pivot_mandate</span>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtitle, color }: any) {
    const colorMap: any = {
        cyan: 'border-cyan-500/20 text-cyan-500 bg-cyan-500/5',
        emerald: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5',
        violet: 'border-violet-500/20 text-violet-500 bg-violet-500/5',
        amber: 'border-amber-500/20 text-amber-500 bg-amber-500/5',
    };

    return (
        <div className={`p-8 rounded-3xl border ${colorMap[color]} backdrop-blur-md hover:scale-[1.02] transition-transform duration-500`}>
            <p className="text-xs uppercase tracking-widest font-bold mb-1 opacity-80">{title}</p>
            <h4 className="text-4xl font-black tracking-tight mb-1">{value}</h4>
            <p className="text-xs opacity-60 font-mono">{subtitle}</p>
        </div>
    );
}

function RoadmapItem({ title, val, status }: any) {
    return (
        <div className="group relative">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium group-hover:text-cyan-500 transition-colors">{title}</span>
                <span className="text-sm font-black tracking-tighter text-gray-400">{val}</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse`} style={{ width: '65%' }} />
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-[10px] uppercase font-bold text-violet-500">{status}</span>
                <span className="text-[10px] uppercase font-bold text-gray-600">Priority 1</span>
            </div>
        </div>
    );
}
