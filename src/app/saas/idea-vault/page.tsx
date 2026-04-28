'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Globe,
  PlusSquare
} from 'lucide-react';
import SovereignSidebar from '@/components/layout/SovereignSidebar';

/**
 * Opportunity Vault: The Sovereign Validation Engine (v2026.11)
 * Derived from ProvenTools 'Niche Profitability' logic.
 */
export default function IdeaVault() {
  const [activeNiche, setActiveNiche] = useState('All');

  const niches = ['All', 'Law', 'FinTech', 'E-com', 'SaaS', 'DevTools'];

  const opportunities = [
    {
      title: 'Shoe Swap (Mirror-Vision)',
      niche: 'Lifestyle',
      scores: { money: 8, demand: 7, gap: 10, budget: 6, distribution: 9 },
      description: 'P2P marketplace for the limb-different community. Mirror-Vision AI scans for precise size/wear matching.',
      mrr_potential: '$2k - $12k',
      difficulty: '3/10',
      slug: 'shoe-swap'
    },
    {
      title: 'Family Nexus (Context-Aware)',
      niche: 'Lifestyle',
      scores: { money: 7, demand: 9, gap: 10, budget: 8, distribution: 7 },
      description: 'Specialized household communication tool with geofenced tasking and context-aware GPS sync.',
      mrr_potential: '$5k - $15k',
      difficulty: '5/10',
      slug: 'family-nexus'
    },
    {
      title: 'P2P Kitchen (Live Hygiene)',
      niche: 'E-com',
      scores: { money: 9, demand: 10, gap: 9, budget: 7, distribution: 6 },
      description: 'Peer-to-peer home cooked delivery with real-time live culinary hygiene feeds.',
      mrr_potential: '$10k - $40k',
      difficulty: '7/10',
      slug: 'p2p-kitchen'
    },
    {
      title: 'Quietude Map (Aura)',
      niche: 'Travel',
      scores: { money: 6, demand: 8, gap: 10, budget: 9, distribution: 8 },
      description: 'Anti-tourist guide that maps real-time quietude and hidden local nodes using noise telemetry.',
      mrr_potential: '$3k - $10k',
      difficulty: '4/10',
      slug: 'quietude-map'
    },
    {
      title: 'Second Life (Junk Buster)',
      niche: 'SaaS',
      scores: { money: 9, demand: 9, gap: 8, budget: 6, distribution: 10 },
      description: 'Uber for Bulky Trash. AI identifies repurposing value and routes to local upcyclers.',
      mrr_potential: '$15k - $60k',
      difficulty: '6/10',
      slug: 'second-life'
    },
    {
      title: 'Ghost Guard (Biometric)',
      niche: 'Security',
      scores: { money: 10, demand: 10, gap: 9, budget: 9, distribution: 7 },
      description: 'Safe-word activated security proxy. AI initiates deterrent calls and streams biometric pulse to cloud.',
      mrr_potential: '$50k+',
      difficulty: '8/10',
      slug: 'ghost-guard'
    },
    {
      title: 'Sub-Sentry (Ghost Trim)',
      niche: 'FinTech',
      scores: { money: 10, demand: 10, gap: 7, budget: 8, distribution: 10 },
      description: 'Automated subscription liquidation. Scans dark patterns to cancel ghost accounts in one tap.',
      mrr_potential: '$8k - $25k',
      difficulty: '4/10',
      slug: 'sub-sentry'
    },
    {
      title: 'Pulse Transit (Beacon)',
      niche: 'Logistics',
      scores: { money: 5, demand: 9, gap: 10, budget: 4, distribution: 9 },
      description: 'Crowdsourced rural transit GPS. Passengers act as real-time beacons for waiting commuters.',
      mrr_potential: '$1k - $5k',
      difficulty: '2/10',
      slug: 'pulse-transit'
    },
    {
      title: 'Vibe Closet (AI Wardrobe)',
      niche: 'AI',
      scores: { money: 8, demand: 10, gap: 8, budget: 9, distribution: 9 },
      description: 'AI fashion architect that syncs actual closet inventory with weather and event sentiment.',
      mrr_potential: '$10k - $30k',
      difficulty: '6/10',
      slug: 'wardrobe-ai'
    },
    {
      title: 'Pantry Pulse (Rings)',
      niche: 'AI',
      scores: { money: 7, demand: 10, gap: 9, budget: 6, distribution: 8 },
      description: 'Logistics for kitchens. Tracks expiry rings and generates recipes based on local zero-waste logic.',
      mrr_potential: '$5k - $12k',
      difficulty: '5/10',
      slug: 'pantry-pulse'
    },
    {
      title: 'Floor Rate (Lifestyle Calc)',
      niche: 'FinTech',
      scores: { money: 6, demand: 9, gap: 9, budget: 7, distribution: 10 },
      description: 'Inverse rate calculator for freelancers. Calculates hourly floor based on lifestyle debt goals.',
      mrr_potential: '$2k - $8k',
      difficulty: '2/10',
      slug: 'floor-rate'
    }
  ];

  const filteredOps = activeNiche === 'All' ? opportunities : opportunities.filter(o => o.niche === activeNiche);

  return (
    <div className="min-h-screen bg-[#020205] text-white flex">
      <SovereignSidebar />

      <main className="flex-1 ml-72 p-12 overflow-y-auto relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <header className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-4xl font-black italic tracking-tightest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">Opportunity Vault</h1>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Validation Engine v1.1 // Proven Logic Ingress</p>
              </div>
              <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-[0.4em] text-[9px] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all active:scale-95">
                <PlusSquare size={14} /> Ingest New Idea
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-2xl w-fit">
              {niches.map(n => (
                <button 
                  key={n}
                  onClick={() => setActiveNiche(n)}
                  className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeNiche === n ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'text-white/20 hover:text-white/40'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </header>

          {/* Opportunity Grid */}
          <section className="grid grid-cols-1 gap-6">
            {filteredOps.map((op, i) => (
              <motion.div
                key={op.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-400/20 transition-all flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                   <ShieldCheck className="text-cyan-400" size={48} />
                </div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-400 px-2 py-0.5 bg-cyan-400/5 rounded border border-cyan-400/10">{op.niche}</span>
                      <span className="text-[8px] font-mono text-white/20 uppercase">ID: S-VAL-{i.toString().padStart(3, '0')}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black italic tracking-tightest uppercase group-hover:text-cyan-400 transition-colors leading-none">{op.title}</h2>
                    <p className="text-[11px] text-white/40 max-w-xl italic leading-relaxed">{op.description}</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 py-4 border-y border-white/5">
                    {[
                      { label: 'Money Flow', val: op.scores.money, icon: <DollarSign size={10} /> },
                      { label: 'Search Demand', val: op.scores.demand, icon: <Search size={10} /> },
                      { label: 'Gap Quality', val: op.scores.gap, icon: <Zap size={10} /> },
                      { label: 'Audience Budget', val: op.scores.budget, icon: <Users size={10} /> },
                      { label: 'Distribution', val: op.scores.distribution, icon: <Globe size={10} /> }
                    ].map(s => (
                       <div key={s.label} className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-white/20">{s.icon} {s.label}</div>
                          <div className="flex gap-0.5">
                            {[...Array(10)].map((_, idx) => (
                              <div key={idx} className={`h-1 flex-1 rounded-full ${idx < s.val ? 'bg-cyan-400' : 'bg-white/5'}`}></div>
                            ))}
                          </div>
                       </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="space-y-1 text-left">
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] italic">MRR Potential</div>
                        <div className="text-xl font-mono text-white tracking-tight">{op.mrr_potential}</div>
                     </div>
                     <div className="space-y-1 text-left">
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] italic">Difficulty</div>
                        <div className="text-xl font-mono text-white tracking-tight">{op.difficulty}</div>
                     </div>
                  </div>
                </div>

                <div className="w-full lg:w-48 pt-8 lg:pt-0">
                  <button className="w-full py-5 rounded-2xl border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-[9px] font-black uppercase tracking-[0.4em] transition-all group-hover:bg-cyan-500/5">
                    Run Analysis
                  </button>
                </div>
              </motion.div>
            ))}
          </section>

          <footer className="pt-8 border-t border-white/5 text-[9px] font-black uppercase tracking-[1em] text-white/10 italic text-center">
            Institutional Audit Logic Sealed // SOVRA Sovereign LLC
          </footer>
        </div>
      </main>
    </div>
  );
}
