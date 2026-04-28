'use client';

import React from 'react';
import Image from 'next/image';

/**
 * SOVRA Alpha Lander: BigCommerce Enterprise Strike (v2026.11)
 * High-Theta, Institutional Design for Google Ads Arbitrage.
 */
export default function BigCommerceAlphaPage() {
  const trackConversion = (channel: string) => {
    console.log(`[SOVRATracker] Pulse Recorded: AD_SATURATION | Channel: ${channel} | Handshake: APEX`);
    window.location.href = 'https://www.bigcommerce.com/solutions/enterprise/?utm_source=apex_sovereign&utm_medium=google_ads&utm_campaign=alpha_strike';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      {/* Navigation Pulse */}
      <nav className="border-b border-white/10 px-8 py-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-sm flex items-center justify-center font-bold text-xs">ZS</div>
          <span className="text-sm tracking-widest font-light opacity-80 uppercase">SOVRA Sovereign LLC</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] font-medium uppercase opacity-50">
          <a href="#" className="hover:opacity-100 transition-opacity">Global Tranche</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Asset Governance</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Node Network</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10" />
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content Block */}
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-full">
              <span className="text-[10px] tracking-widest font-bold text-cyan-400 uppercase italic">Institutional Protocol Active</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Elevate E-commerce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-500">
                Complexity at Scale.
              </span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              Unlock the full potential of your enterprise operations with <strong>BigCommerce Enterprise</strong>. 
              Built for high-volume B2B scaling and headless architecture, our solutions ensure zero-friction 
              growth across global market tranches.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => trackConversion('SEARCH_ALPHA')}
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors"
              >
                Zero-Friction Handshake
              </button>
              <button 
                className="px-8 py-4 border border-white/20 font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-colors"
              >
                Institutional Briefing
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold">100/100</div>
                <div className="text-[10px] tracking-widest uppercase opacity-40">Uptime Precision</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Multi-Node</div>
                <div className="text-[10px] tracking-widest uppercase opacity-40">Storefront Governance</div>
              </div>
            </div>
          </div>

          {/* Asset Mask */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <img 
                src="/Users/ajoxendine68/.gemini/sovra_sovereign/brain/e4ee0263-9038-4763-a83b-e8c9ed0b75ba/bigcommerce_alpha_mockup_1776737076240.png" 
                alt="BigCommerce Enterprise Mockup"
                className="object-cover w-full h-full grayscale-[0.2] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-white/5 py-12 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="text-[10px] tracking-widest uppercase opacity-30">
            &copy; 2026 APEX SOVEREIGN LLC | SECURE COMMERCE UNIT
          </div>
          <div className="flex gap-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase opacity-50">SiaCore Network: Grounded</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
