"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Zap, TrendingUp, Gem, Activity, AlertCircle } from 'lucide-react';
import MintingModule from './components/MintingModule';
import TrendRadar from './components/TrendRadar';
import CenturionPulse from './components/CenturionPulse';

/**
 * ScavengerHub (SOVRA Sovereign LLC - Reclamation HUD)
 * MISSION: QUANTUM_SCAVENGE (v2026.11_APEX)
 * ─────────────────────────────────────────────────────────────
 * Viewport: 4k/Institutional Ultra
 */

export default function ScavengerHub() {
    const [swarmActive, setSwarmActive] = useState(true);
    const [reclaimedValue, setReclaimedValue] = useState(0.00);
    const [findings, setFindings] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (swarmActive) {
                // Simulation of 1M node pulse
                setReclaimedValue(prev => prev + (Math.random() * 0.05));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [swarmActive]);

    return (
        <div className="min-h-screen bg-[#050505] text-[#e5e7eb] font-sans selection:bg-cyan-500/30">
            {/* BACKGROUND_APEX_TOPOGRAPHY */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('/assets/bg-apex.png')] bg-cover mix-blend-overlay" />
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />

            <div className="relative z-10 p-8 max-w-7xl mx-auto space-y-8">
                {/* HERO_SECTION */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Shield className="w-5 h-5" />
                            <span className="text-xs font-bold tracking-[0.3em] uppercase">Operation: SOVRA Scavenger</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-white">SCAVENGER HUB</h1>
                        <p className="text-gray-400 mt-2 max-w-xl">
                            Coordinating 1,000,000 scraping "Minors" for the legal reclamation of abandoned digital tranches and crypto revenue.
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-[0.6rem] text-gray-500 uppercase tracking-widest mb-1">Total Reclaimed Value</div>
                        <div className="text-4xl font-mono text-cyan-400 tabular-nums">
                            ${reclaimedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </header>

                {/* CENTURION_SINGULARITY_TELEMETRY */}
                <div className="space-y-8">
                    <CenturionPulse />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <MintingModule />
                        </div>
                        <div className="md:col-span-2">
                            <TrendRadar />
                        </div>
                    </div>
                </div>

                {/* RECLAMATION_LOGS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/2">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Gem className="w-5 h-5 text-cyan-400" />
                                Asset Findings
                            </h2>
                            <button className="text-xs text-gray-500 hover:text-white transition-colors">View All</button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {findings.map((f, i) => (
                                <div key={i} className="p-6 hover:bg-white/2 transition-colors flex justify-between items-center">
                                    <div>
                                        <div className="text-sm font-bold">{f.source}</div>
                                        <div className="text-[0.65rem] uppercase tracking-widest text-gray-500 mt-1">{f.type}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-mono text-white">${f.value.toFixed(2)}</div>
                                        <div className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full mt-1 ${f.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {f.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-cyan-500/10 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Zap className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-yellow-400 mb-4 font-bold text-sm tracking-widest uppercase">
                                <AlertCircle className="w-4 h-4" />
                                Maxx Master Alert
                            </div>
                            <h3 className="text-3xl font-black text-white leading-tight mb-4">
                                Scavenger Swarm approaching 100/100 saturation in Sector-7.
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                The swarm has identified a high-affinity "Dead-Drop" tranche in the California Escheatment ledger. Total value estimated at $45,000+. Mandate ignite?
                            </p>
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors">Ignite Reclamation</button>
                        </div>
                    </div>
                </div>

                {/* INSTITUTIONAL_FOOTER */}
                <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[0.6rem] uppercase tracking-[0.2em] gap-4">
                    <div>© 2026 Sovereign LLC / SOVRA Singularity / SOVRA</div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 border border-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            System Active (Node-1M)
                        </span>
                        <span>Pulse: EXASCALE_V2</span>
                        <span>Grounded: Neon Cloud</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
