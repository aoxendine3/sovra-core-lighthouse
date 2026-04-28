'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Share2, 
  Mail, 
  Shield, 
  Zap, 
  Lock,
  Globe,
  Database
} from 'lucide-react';

/**
 * SOVRA Sovereign Footer (v15.0_Ω_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: GLOBAL_LEGAL_GROUNDING
 */
export default function SOVRAFooter() {
  return (
    <footer className="w-full bg-[#050508] border-t border-white/5 pt-24 pb-12 mt-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#cd9d3f] to-[#ffdfa1] flex items-center justify-center shadow-lg shadow-[#cd9d3f]/20">
                <span className="text-black font-black text-lg italic">X</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-syne font-black text-sm uppercase tracking-tighter text-white">XORAS</span>
                <span className="text-[#cd9d3f] font-mono text-[7px] uppercase tracking-[0.4em] mt-0.5 italic font-bold">Dedicated_Autonomous_Agent</span>
              </div>
            </div>
            <p className="text-white/30 text-[10px] font-medium leading-relaxed uppercase tracking-widest italic">
              Institutional Command Core for global autonomous asset orchestration and 512-bit PQ spectral security.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:executive@sovra.ai"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-[#cd9d3f] hover:bg-white/10 hover:scale-110 transition-all border border-white/5"
              >
                <Mail className="w-4 h-4" />
              </a>
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-[#cd9d3f] hover:bg-white/10 hover:scale-110 transition-all border border-white/5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Ledger Column */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">Sovereign_Ledger</h4>
            <ul className="space-y-4">
              {['All Assets', 'Doctoral Intel', '3D / VR Systems', 'SaaS Tranches', 'Hardware Node'].map((item) => (
                <li key={item}>
                  <Link 
                    href="/store/gumroad" 
                    className="text-white/20 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-1 h-1 bg-[#cd9d3f]/40 rounded-full group-hover:scale-150 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence Column */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">Oracle_Directives</h4>
            <ul className="space-y-4">
              {['Market Oracle', 'Dominance Map', 'Desire Decoder', 'Dynamic Pricing', 'Expansion Intel'].map((item) => (
                <li key={item}>
                  <Link 
                    href="/ai-hub" 
                    className="text-white/20 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-1 h-1 bg-[#cd9d3f]/40 rounded-full group-hover:scale-150 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrity Column */}
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">Handshake_Audit</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/20 text-[9px] font-black uppercase tracking-widest italic">
                <Shield className="w-3.5 h-3.5 text-[#cd9d3f]/40" />
                Verified_Ground_Truth
              </li>
              <li className="flex items-center gap-3 text-white/20 text-[9px] font-black uppercase tracking-widest italic">
                <Database className="w-3.5 h-3.5 text-[#cd9d3f]/40" />
                SovereignDB_Active
              </li>
              <li className="flex items-center gap-3 text-white/20 text-[9px] font-black uppercase tracking-widest italic">
                <Globe className="w-3.5 h-3.5 text-[#cd9d3f]/40" />
                512-Bit_PQ_Spectral
              </li>
              <li className="flex items-center gap-3 text-white/20 text-[9px] font-black uppercase tracking-widest italic">
                <Lock className="w-3.5 h-3.5 text-[#cd9d3f]/40" />
                Zero_Trust_Protocol
              </li>
            </ul>
          </div>

        </div>

        {/* Telemetry Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">
              © 2026 XORAS SOVEREIGN ENTERPRISE LLC. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/20 hover:text-white text-[8px] font-black uppercase tracking-widest transition-colors">Privacy_Protocol</a>
              <a href="#" className="text-white/20 hover:text-white text-[8px] font-black uppercase tracking-widest transition-colors">Service_Terms</a>
            </div>
          </div>
          
          <div className="glass-panel px-6 py-2.5 !rounded-full border-white/5 bg-white/[0.01] flex gap-6 items-center">
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Latency: 0.81ms</span>
             </div>
             <div className="w-px h-3 bg-white/10"></div>
             <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-[#cd9d3f]/40" />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">Integrity: 100/1</span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
