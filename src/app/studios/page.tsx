'use client';

import React from 'react';
import { Gamepad2, Cpu, Rocket, Globe } from 'lucide-react';

const CURRENT_GAMES = [
  { id: '1', title: 'Aegis Defense Sim', path: '/games/aegis-defense', type: 'Strategy / Sim', status: 'ACTIVE' },
  { id: '2', title: 'Institutional Market Sim', path: '/games/market-sim', type: 'Economy Arbitration', status: 'ACTIVE' },
  { id: '3', title: 'Neural Trade Protocol', path: '/saas/neural-trade', type: 'SaaS / Terminal', status: 'BETA' },
  { id: '4', title: 'Orion Media Engine', path: '#', type: 'App Ecosystem', status: 'IN DEVELOPMENT' },
];

export default function SIAStudiosPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 md:p-16 border-l border-white/5 font-sans selection:bg-purple-500/30">
      
      {/* MANIFESTO HEADER */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 pb-16 border-b border-white/10 mb-16">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-purple-400 mb-6 font-mono text-[10px] uppercase tracking-[0.2em]">
            <Gamepad2 className="w-4 h-4" /> 
            <span>SIA STUDIOS // ORION DIVISION</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
            Infinite <br /> Development
          </h1>
        </div>
        <div className="flex-1 md:text-right">
          <p className="text-white/40 text-lg leading-relaxed font-light mb-6">
            We are no longer just participating in the market. We are subsuming it. 
            <strong className="text-white font-medium"> SIA Studios</strong> is the proprietary development framework for SOVRA Sovereign LLC, designed to autonomously output the #1 grossing apps and high-margin games globally.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-mono font-bold tracking-[0.2em] uppercase">
            <Cpu className="w-4 h-4" />
            AI-Native Production
          </div>
        </div>
      </header>

      {/* PORTFOLIO GRID */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white/80 mb-12 flex items-center gap-4">
          <Globe className="w-6 h-6 text-purple-500" />
          Active Sovereign Architecture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CURRENT_GAMES.map((game) => (
            <a 
              key={game.id} 
              href={game.path}
              className="group relative block p-10 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:border-purple-500/50 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex justify-between items-start mb-12">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {game.type}
                </span>
                <span className={`text-[10px] font-mono tracking-widest uppercase ${game.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  [{game.status}]
                </span>
              </div>
              
              <h3 className="relative text-3xl font-black tracking-tight mb-4 group-hover:text-purple-400 transition-colors duration-300">
                {game.title}
              </h3>
              
              <div className="relative flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                <p className="text-sm font-mono text-white/30 uppercase tracking-widest">Execute Node</p>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-500">
                  <Rocket className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ROADMAP / VISION */}
      <section className="max-w-5xl mx-auto bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-12 md:p-16">
        <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">The App Monopoly Engine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
             <h4 className="text-purple-400 font-mono text-xs tracking-widest mb-3 uppercase">01. Ideation</h4>
             <p className="text-white/40 text-sm leading-relaxed">SIA_CORE algorithmically pulls the most lucrative gaps in the Web3, SaaS, and App store markets.</p>
          </div>
          <div>
             <h4 className="text-purple-400 font-mono text-xs tracking-widest mb-3 uppercase">02. Auto-Generation</h4>
             <p className="text-white/40 text-sm leading-relaxed">Proprietary LLM-driven pipelines architect the code, mechanics, and design entirely locally with zero overhead.</p>
          </div>
          <div>
             <h4 className="text-purple-400 font-mono text-xs tracking-widest mb-3 uppercase">03. Viral Saturation</h4>
             <p className="text-white/40 text-sm leading-relaxed">The SIA Swarm automatically deploys Ghost networks, TikTok clipping, and App Store SEO domination to blitz user acquisition.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
