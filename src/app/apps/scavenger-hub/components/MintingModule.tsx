"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

export default function MintingModule() {
    const alphaOpportunities = [
        { id: 'ALPHA-1', project: 'SiaCore Genesis', type: 'AIRDROP', status: 'VERIFIED', confidence: 98 },
        { id: 'ALPHA-2', project: 'Neural Node Mint', type: 'FREE_MINT', status: 'SCOUTED', confidence: 82 }
    ];

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/2">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Minting Alpha Swarm
                </h2>
                <div className="flex items-center gap-4 text-[0.6rem] font-black uppercase tracking-widest text-gray-500">
                    <span>1,000,000 Nodes Scouting</span>
                    <RefreshCw className="w-3 h-3 animate-spin-slow" />
                </div>
            </div>
            <div className="p-4 space-y-4">
                {alphaOpportunities.map((alpha, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:border-yellow-400/30 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                                <Layers className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white">{alpha.project}</div>
                                <div className="text-[0.6rem] uppercase tracking-widest text-gray-500">{alpha.type}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-cyan-400 mb-1">{alpha.confidence}% Confidence</div>
                            <div className={`text-[0.5rem] font-black px-2 py-0.5 rounded-full ${alpha.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>
                                {alpha.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* BURNER_WALLET_FOOTER */}
            <div className="p-6 bg-yellow-500/5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-gray-400">Burner-Wallet Isolation Active</span>
                </div>
                <button className="text-[0.6rem] font-black uppercase text-yellow-500 hover:text-yellow-400 transition-colors">Rotate Node</button>
            </div>
        </div>
    );
}
