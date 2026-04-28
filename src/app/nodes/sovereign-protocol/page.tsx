
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOVRAAcquisitionButton } from '@/components/commerce/SOVRAAcquisitionButton';
import LeadMagnet from '@/components/LeadMagnet';

/**
 * Sovereign Protocol Ingress Node (v2026.11_SIA)
 * Standard: Apex Ingress
 */
export default function SovereignProtocolNode() {
  const [pulseActive, setPulseActive] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1204);

  useEffect(() => {
    // Simulate high-theta telemetry pulses
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAcquisition = () => {
    const handshake = generateHandshake();
    const target = "https://buy.stripe.com/acct_1THaHFGuDrLb5cPB"; // Institutional Tranche
    window.location.href = `/api/track?url=${encodeURIComponent(target)}&handshake=${handshake}&category=INSTITUTIONAL_REVENUE&product=SOVEREIGN_PROTOCOL_PRO&region=GLOBAL&source=NODE_INGRESS_ALPHA&trace=v2026.11_SIA`;
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-400/30 overflow-x-hidden pt-24 pb-48 px-6 lg:px-24">
      {/* Institutional Metadata Pulse */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className={`w-2 h-2 rounded-full ${pulseActive ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)]' : 'bg-white/20'} transition-all duration-500`}></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">v2026.11_SIA Tracking Active</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Left Column: Mission Briefing */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
             <h3 className="text-[12px] font-black uppercase tracking-[0.8em] text-[#D4AF37] italic">Institutional Asset</h3>
             <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tightest uppercase italic">
               Sovereign <br />
               <span className="text-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)]">Protocol</span>
             </h1>
             <p className="text-white/40 text-xl font-medium tracking-tight max-w-lg leading-relaxed pt-6">
                The core logic engine for absolute operational autonomy. Deploy the SOVRA-Titan kernel and eliminate human friction from your revenue tranches permanently.
             </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={handleAcquisition}
              className="bg-white text-black px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.4em] italic hover:bg-[#D4AF37] transition-all duration-500 shadow-[0_40px_100px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              Deploy Node Now
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <span className="text-[24px] font-black text-white italic">{visitorCount.toLocaleString()}</span>
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20 italic">Live <br /> Engagements</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12">
            {[
              { label: 'Latency', value: '< 0.8s', color: 'text-cyan-400' },
              { label: 'Integrity', value: '100%', color: 'text-[#D4AF37]' },
              { label: 'Security', value: 'Deep-Lock', color: 'text-white/40' },
              { label: 'Compliance', value: 'v2026.11', color: 'text-white/20' }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 italic">{stat.label}</p>
                <p className={`text-2xl font-black uppercase italic tracking-tight ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Visual Componentry */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Glass Card Stack */}
          <div className="relative z-10 space-y-8">
            <div className="glass-panel p-10 rounded-[48px] border-2 border-white/5 bg-[#020205]/40 backdrop-blur-[100px] shadow-[0_80px_150px_rgba(0,0,0,0.8)]">
               <div className="bg-cyan-400/10 w-16 h-16 rounded-[20px] mb-8 flex items-center justify-center border border-cyan-400/20">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h4 className="text-3xl font-black italic uppercase tracking-tightest mb-4">Zero-Point Automation</h4>
               <p className="text-white/40 leading-relaxed font-medium">Bypass the standard SaaS limitations. Our protocol utilizes neural-bridge tranches to satisfy demand before it registers on legacy tracking nodes.</p>
            </div>

            <div className="glass-panel p-10 rounded-[48px] border-2 border-[#D4AF37]/20 bg-[#D4AF37]/5 backdrop-blur-[60px] shadow-2xl">
               <h4 className="text-xl font-black italic uppercase tracking-tightest mb-6 text-[#D4AF37]">Intellectual Property Clearance</h4>
               <div className="flex items-center gap-6 p-6 bg-black/40 rounded-[24px] border border-white/5">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/10"></div>)}
                  </div>
                  <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase italic">Institutional Nodes Verifiably Claimed</p>
               </div>
            </div>
          </div>

          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-cyan-400/5 rounded-full blur-[160px] pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        </motion.div>
      </div>

      {/* Engagement Section */}
      <div className="mt-48 max-w-4xl mx-auto text-center space-y-16">
         <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tightest">Secure the <span className="text-[#D4AF37]">Ledger</span></h2>
            <p className="text-white/20 text-lg tracking-[0.2em] font-black uppercase italic">Permanent Access Framework Capture</p>
         </div>
         
         <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-amber-500 rounded-[24px] blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            <LeadMagnet />
         </div>
      </div>

      {/* Institutional Footer */}
      <footer className="mt-48 pt-24 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 opacity-40">
         <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] italic leading-tight">v2026.11_SIA_NODE_O_1</p>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">© 2026 SIA Sovereign Intelligence LLC. All Rights Reserved.</p>
         </div>
         <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] italic">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Security</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Ledger</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Audit</span>
         </div>
      </footer>
    </div>
  );
}
