'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Cpu, ArrowRight, Zap, Globe } from 'lucide-react';

/**
 * SOVRA Sovereign — Ingress Node: Shield SDK (v1.0_APEX)
 * MISSION: INSTITUTIONAL_ACQUISITION
 * Design: SiaCore Royal Obsidian / Amber Pulse
 */
export default function ShieldIngress() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  const handleAcquisition = async () => {
    // 1. Generate Sovereign Handshake (L2 Verification)
    try {
        const { createSOVRAToken } = await import('@/lib/auth/Handshake');
        const token = await createSOVRAToken();
        
        // 2. Redirect to Financial Core Payout Node / Stripe Checkout
        // In a production scenario, this targets the specific Stripe product
        const target = 'https://buy.stripe.com/demo_product_shield_sdk';
        window.location.href = `/api/track?url=${encodeURIComponent(target)}&category=INSTITUTIONAL_PURCHASE&handshake=${token}`;
    } catch (e) {
        window.location.href = 'https://admin.shopify.com/store/sovra-15';
    }
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white selection:bg-amber-500/30 selection:text-black overflow-hidden relative">
      
      {/* Background Saturation Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/sovereign_shield_ad_cinematic_1776739654078.png" 
          alt="" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/10 via-[#020205]/60 to-[#020205]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-32 pb-48">
        
        {/* Header Branding */}
        <nav className="flex justify-between items-center mb-48">
          <div className="flex items-center gap-4">
             <Shield className="w-10 h-10 text-amber-500" />
             <div className="h-10 w-px bg-white/10" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 italic">SOVRA Sovereign</span>
          </div>
          <div className="glass-sovra px-8 py-3 !rounded-full border-white/5 flex gap-8 items-center">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-mono text-amber-500/60 uppercase">SIGNAL: OPTIMAL</span>
             </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-12"
           >
              <div className="space-y-4">
                <span className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] border border-amber-500/20 italic">
                  Institutional Security Suite
                </span>
                <h1 className="text-8xl lg:text-[10rem] font-black italic tracking-tightest leading-[0.75] uppercase">
                  Shield <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-white/20">Sovereign</span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl italic border-l-2 border-amber-500/30 pl-8 leading-relaxed">
                The absolute standard in zero-point cryptographic protection. Safeguard your institutional tranches with the precision of a Sovereign Auditor.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                 <button 
                   onClick={handleAcquisition}
                   className="px-20 py-8 bg-amber-500 text-black font-black uppercase text-[12px] tracking-[0.4em] rounded-full hover:scale-[1.05] transition-all duration-700 shadow-[0_40px_120px_rgba(245,158,11,0.2)] active:scale-95 italic"
                 >
                   Establish Ingress — $499K
                 </button>
                 <div className="flex items-center gap-4 text-white/40">
                    <Lock className="w-5 h-5" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">L2 KYC Required</span>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="grid grid-cols-1 sm:grid-cols-2 gap-8"
           >
              {[
                { title: 'Zero-Point', val: '0.0001ms Latency', icon: <Cpu /> },
                { title: 'Deep Lock', val: 'SHA-512 Interlock', icon: <Server /> },
                { title: 'Sovereign', val: 'Global Ingress', icon: <Globe /> },
                { title: 'Pulse', val: 'Real-time Audit', icon: <Zap /> }
              ].map((stat, i) => (
                <div key={stat.title} className="p-10 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl group hover:border-amber-500/40 transition-all duration-500">
                   <div className="text-amber-500 mb-8 group-hover:scale-110 transition-transform">{stat.icon}</div>
                   <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">{stat.title}</div>
                   <div className="text-2xl font-black italic tracking-tighter">{stat.val}</div>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Telemetry Strip */}
        <div className="mt-48 pt-12 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.6em] text-white/10 italic">
           <div className="flex items-center gap-6">
              <span className="w-2 h-2 rounded-full bg-amber-500/40" />
              <span>Session ID: SOVRA-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
           </div>
           <div className="flex gap-12">
              <span>Grounding: 100%</span>
              <span>Signal: {pulse}%</span>
           </div>
        </div>

      </div>

      <style jsx>{`
        .glass-sovra { 
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .tracking-tightest { letter-spacing: -0.08em; }
      `}</style>
    </main>
  );
}
