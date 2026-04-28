'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import LockdownStatus from '@/components/dashboard/LockdownStatus';

// Competitive intelligence mapping
const targets = [
  { competitor: "Salesforce", target: "SOVRA Logic", slug: "salesforce-vs-SOVRA_APEX-logic", referral: "/enterprise/checkout?tier=apex" },
  { competitor: "HubSpot", target: "SOVRA Autonomous", slug: "hubspot-vs-SOVRA_APEX-autonomous", referral: "/enterprise/checkout?tier=sentinel" },
  { competitor: "Cloudflare", target: "Aegis Shield", slug: "cloudflare-vs-aegis-shield", referral: "/enterprise/checkout?tier=guardian" },
  { competitor: "Shopify", target: "Sovereign Storefront", slug: "shopify-vs-sovereign-storefront", referral: "/store" },
  { competitor: "ActiveCampaign", target: "GrowthAgent", slug: "activecampaign-vs-growth-agent", referral: "/subscribe" }
];

export default function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const target = targets.find(t => t.slug === slug);
  if (!target) notFound();

  return (
    <main className="min-h-screen bg-obsidian text-white p-8 md:p-24 relative overflow-hidden">
      {/* Network Glow Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-glow/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header Section */}
        <header className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-sovereign-neon/40 bg-sovereign-neon/5 text-[10px] font-black tracking-[0.4em] text-sovereign-neon mb-4">
                COMPARATIVE_INTELLIGENCE_REPORT
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-none">
                {target.competitor} <span className="text-white/20 italic">vs</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{target.target}</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto font-mono text-sm tracking-tight">
                Institutional-grade Audit: Evaluating legacy {target.competitor} systems against the autonomous Sovereign {target.target} infrastructure.
            </p>
        </header>

        {/* Live Tranche Urgency */ }
        <div className="glass-apex p-6 border-sovereign-neon/40 bg-sovereign-neon/5 flex flex-col md:flex-row justify-between items-center gap-6 group">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-sovereign-neon animate-ping absolute inset-0 opacity-40"></div>
                    <div className="w-4 h-4 rounded-full bg-sovereign-neon relative"></div>
                </div>
                <div>
                    <h3 className="text-sm font-black text-white italic tracking-tight">INSTITUTIONAL_TRANCHE_ALERT</h3>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mt-1">Only 4 {target.target} Nodes remaining in the current $490/yr founder tranche.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Audit Identity</p>
                    <p className="text-xs font-black text-sovereign-neon font-mono tracking-widest">VERIFIED_ORIGIN_NODE</p>
                </div>
                <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10">
                    <span className="text-[10px] font-black text-white/40 font-mono tracking-widest group-hover:text-sovereign-neon transition-colors">CAPACITY: 96%</span>
                </div>
            </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            {/* Center vs Badge */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                    <span className="text-xs font-black tracking-widest text-white/20">VS</span>
                </div>
            </div>

            {/* Competitor Column */}
            <div className="glass-apex p-10 space-y-8 bg-white/[0.01]">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black italic">{target.competitor}</h2>
                    <span className="text-[10px] font-mono text-red-400">LEGACY_SYSTEM</span>
                </div>
                <ul className="space-y-6 text-sm text-white/60 font-medium">
                    <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                        Manual Oversight Required
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                        High Maintenance Overhead
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                        Elastic Latency Variance
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/40"></span>
                        Fragmented Security Protocol
                    </li>
                </ul>
            </div>

            {/* SOVRA Column */}
            <div className="glass-apex p-10 space-y-8 border-cyan-glow/20 bg-cyan-glow/[0.02] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="flex justify-between items-center relative z-10">
                    <h2 className="text-2xl font-black text-white italic">{target.target}</h2>
                    <span className="text-[10px] font-mono text-cyan-glow animate-pulse">AUTONOMOUS_CORE</span>
                </div>
                <ul className="space-y-6 text-sm text-white relative z-10">
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-glow/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cyan-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        Zero-Point Deep Locking Active
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-glow/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cyan-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        Autonomous Revenue Generation
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-glow/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cyan-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        Institutional-Grade Encryption
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-glow/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cyan-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        1ms Global Latency Guarantee
                    </li>
                </ul>
            </div>
        </div>

        {/* Call to Action */}
        <section className="glass-apex p-16 text-center space-y-10 bg-sovereign-neon/[0.03] border-sovereign-neon/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sovereign-neon to-transparent opacity-40"></div>
            
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tightest italic">Ready to De-Legacy Your Infrastructure?</h2>
                <div className="flex justify-center gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
                    <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">Global Ingress: Status Active</p>
                    <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></span>
                </div>
            </div>

            <p className="text-white/60 max-w-xl mx-auto font-medium text-sm leading-relaxed">
                Legacy systems like {target.competitor} are built for human oversight. {target.target} is built for autonomous sovereignty. Do not let your competition automate before you do.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 pt-4">
                <a href={target.referral} className="group relative px-16 py-6 bg-white text-black font-black text-sm rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_80px_rgba(157,78,221,0.3)]">
                    <span className="relative z-10 font-black">DEPLOY {target.target.toUpperCase()} NOW</span>
                    <div className="absolute inset-0 bg-sovereign-neon translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </a>
                <button className="px-12 py-6 bg-white/5 border-2 border-white/10 text-white font-black text-sm rounded-full hover:bg-white/10 transition-all backdrop-blur-3xl">
                    REQUEST MASTER AUDIT
                </button>
            </div>

            <div className="pt-8 opacity-20 flex justify-center gap-12 font-mono text-[8px] tracking-[0.4em] uppercase">
                <span>ISO_SECURE_2026</span>
                <span>DEEP_LOCK_V11</span>
                <span>APEX_PRIME</span>
            </div>
        </section>

        {/* Security Footer */}
        <footer className="pt-20 border-t border-white/5 flex flex-col items-center gap-8">
            <div className="w-full">
                <LockdownStatus owner="Anthony Oxendine" isLocked={true} isAway={true} onToggle={() => {}} />
            </div>
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.5em]">
                Protocol GS-11.2 | Deep Lock Handshake Active | © 2026 APEX SOVEREIGN
            </p>
        </footer>
      </div>
    </main>
  );
}
