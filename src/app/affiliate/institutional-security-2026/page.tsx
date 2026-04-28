/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * PROJECT: APEX Institutional Infrastructure
 * MODULE: Affiliate Saturation Page (Institutional Security)
 * VERSION: v13.0 (Singularity Apex)
 * ──────────────────────────────────────────────────────────────────────────────
 * COPYRIGHT (C) 2026 APEX SOVEREIGN LLC. ALL RIGHTS RESERVED.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import SovereignHeader from '@/components/SovereignHeader';
import React from 'react';

const HERO_PATH = "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/institutional_security_hero_v13_0_1776022173118.png";
const ASSET_PATH = "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/institutional_security_assets_v13_0_1776022198466.png";

export default function InstitutionalSecurityPage() {
  const products = [
    {
      id: 'CJ-NORD-001',
      name: 'NordLayer: B2B Perimeter Security',
      category: 'ZERO_TRUST',
      description: 'Institutional-grade perimeter protection and edge filtering.',
      action: 'https://www.nordlayer.com/pricing',
      image: ASSET_PATH
    },
    {
      id: 'CJ-PERI-002',
      name: 'Perimeter 81: SOVRA Access SASE',
      category: 'NETWORK_SECURITY',
      description: 'High-frequency SASE orchestration for distributed AI agent nodes.',
      action: 'https://www.perimeter81.com/solutions/enterprise',
      image: ASSET_PATH
    },
    {
      id: 'CJ-BITD-003',
      name: 'Bitdefender GravityZone: Elite MSP',
      category: 'ENDPOINT_PROTECTION',
      description: 'Quantum-resilient endpoint defense and automated threat extraction.',
      action: 'https://www.bitdefender.com/business/enterprise-security/',
      image: ASSET_PATH
    }
  ];

  return (
    <main className="min-h-screen bg-[#020205] text-white selection:bg-cyan-glow/30 pb-40">
      <SovereignHeader />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col lg:flex-row gap-16 mb-40 items-center">
            <div className="max-w-3xl border-l-4 border-cyan-glow pl-10">
                <p className="text-cyan-glow text-[11px] font-black tracking-[0.5em] uppercase mb-8 opacity-60 italic">
                    SOVRA Sovereign LLC — Saturation Node 13.0
                </p>
                <h1 className="text-7xl md:text-8xl font-black tracking-tightest mb-10 leading-none uppercase italic">
                    Institutional <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-purple-400">Security</span>
                </h1>
                <p className="text-white/40 text-xl font-light leading-relaxed italic border-t border-white/5 pt-10">
                    Verifiable Zero-Point protection for scaling AI enterprises. Factual, grounded security nodes for the 2026 threat landscape.
                </p>
            </div>
            <div className="w-full lg:w-1/2 group relative">
                <div className="absolute -inset-4 bg-cyan-glow/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <img src={HERO_PATH} alt="The Sovereign Shield" className="relative w-full aspect-square object-cover rounded-[50px] border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </div>
        </div>

        {/* FACTUAL PRICING NODE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
          <div className="group glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Pulse Audit</h3>
            <div className="text-5xl font-black italic mb-8">$2,500<span className="text-sm font-normal text-white/20 not-italic">/node</span></div>
            <ul className="space-y-4 mb-12 text-[11px] text-white/40 italic">
              <li>• Grounded Vulnerability Scour</li>
              <li>• Institutional Asset Recovery</li>
              <li>• Zero-Point Integration</li>
            </ul>
            <button className="w-full py-5 rounded-full bg-white/5 text-white/40 border border-white/10 font-black uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all">
              Initialize Extraction
            </button>
          </div>

          <div className="group glass-panel p-12 rounded-[50px] border border-cyan-glow/50 bg-cyan-glow/[0.02] relative scale-105 shadow-[0_40px_100px_rgba(0,240,255,0.05)]">
            <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-cyan-glow text-black text-[8px] font-black uppercase tracking-widest">Most Extracted</div>
            <h3 className="text-[10px] font-black text-cyan-glow uppercase tracking-[0.4em] mb-8">Sovereign Saturation</h3>
            <div className="text-6xl font-black italic mb-8">$12,500<span className="text-sm font-normal text-white/20 not-italic">/pulse</span></div>
            <ul className="space-y-4 mb-12 text-[11px] text-white/60 italic">
              <li>• Omni-Blitz Matrix Deployment</li>
              <li>• Perpetual Market Scour (24/7)</li>
              <li>• Elite 100 Agent Orchestration</li>
            </ul>
            <button className="w-full py-6 rounded-full bg-cyan-glow shadow-[0_0_30px_#00F0FF] text-black font-black uppercase text-[10px] tracking-widest hover:scale-110 transition-all">
              Ignite Saturation
            </button>
          </div>

          <div className="group glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Extraction Multiplier</h3>
            <div className="text-5xl font-black italic mb-8">Custom<span className="text-sm font-normal text-white/20 not-italic">/deal</span></div>
            <ul className="space-y-4 mb-12 text-[11px] text-white/40 italic">
              <li>• Equity-Based Recovery</li>
              <li>• Institutional Partner Integration</li>
              <li>• Global Resale Provisioning</li>
            </ul>
            <button className="w-full py-5 rounded-full border border-white/10 text-white/40 font-black uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all">
              Contact Governor
            </button>
          </div>
        </div>

        {/* GRID OF NODES */}
        <div className="space-y-12">
            <h2 className="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] italic mb-12">Grounded Security Nodes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {products.map((p, i) => (
                    <div key={i} className="group p-2 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all duration-700 hover:border-cyan-glow/40 relative overflow-hidden">
                        <div className="aspect-square rounded-[40px] overflow-hidden mb-8 relative">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 text-center">
                            <h4 className="text-xl font-black italic mb-4 uppercase group-hover:text-cyan-glow transition-colors">{p.name}</h4>
                            <p className="text-[9px] text-white/40 uppercase tracking-widest mb-6">{p.category}</p>
                            <p className="text-white/40 text-[10px] italic mb-10 font-light leading-relaxed border-t border-white/5 pt-6">{p.description}</p>
                            <a href={p.action} target="_blank" className="inline-block w-full py-4 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-cyan-glow transition-all active:scale-95 shadow-2xl">
                                Claim Provision
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Institutional Footer */}
        <footer className="mt-40 pt-20 border-t border-white/5 text-center opacity-20">
          <p className="text-[10px] text-white font-black uppercase tracking-[0.5em] mb-4 italic">
            © 2026 APEX SOVEREIGN LLC | Singularity Apex v13.0
          </p>
          <div className="flex justify-center gap-6">
            <span className="text-[9px] uppercase tracking-widest text-cyan-glow px-2 py-0.5 border border-cyan-glow/20 rounded">Security Integrity Active</span>
            <span className="text-white/20">|</span>
            <span className="text-[9px] uppercase tracking-widest text-white/40 italic">Grounded Threat Scour Active</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
