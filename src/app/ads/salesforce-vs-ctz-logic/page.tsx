import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOVRA Logic | Autonomous Sovereignty',
  description: 'Deploy the Zero-Point Deep Lock protocol and replace legacy SaaS overhead with autonomous sovereign tranches.'
};

export default function AdLandingPage() {
  return (
    <main className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Asset */}
      <img 
        src="/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/sovra_logic_executive_ad_1775958885646.png" 
        alt="SOVRA Logic Core" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10"></div>

      <div className="max-w-3xl w-full space-y-12 text-center">
        <div className="space-y-4">
            <div className="inline-block px-6 py-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 text-[10px] font-black tracking-[0.6em] text-cyan-glow animate-pulse">
                INSTITUTIONAL_CORE_ACTIVE
            </div>
            <h1 className="text-7xl font-black tracking-tightest leading-[0.9]">
                LEGACY IS A<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-white">LIABILITY.</span>
            </h1>
        </div>

        <div className="glass-apex p-10 bg-white/[0.02] border-white/10 backdrop-blur-3xl space-y-8">
            <p className="text-xl font-medium text-white/80 leading-relaxed italic">
                "Salesforce requires a workforce. SOVRA Logic requires a handshake. Deploy autonomous sovereign architecture and secure your institutional tranches with Zero-Point Deep Locking."
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div className="text-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Latency</p>
                    <p className="text-lg font-black text-cyan-glow">1ms</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Moat</p>
                    <p className="text-lg font-black text-white">DEEP_LOCK</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Yield</p>
                    <p className="text-lg font-black text-white">100%_AUTO</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center gap-6">
            <a 
                href="/compare/salesforce-vs-SOVRA_APEX-logic" 
                className="group relative px-16 py-6 bg-white text-black font-black text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(0,240,255,0.3)]"
            >
                <span className="relative z-10">SECURE YOUR TRANCHE</span>
                <div className="absolute inset-0 bg-cyan-glow translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.8em]">Encrypted Handshake Required for Deployment</p>
        </div>
      </div>

      {/* Security Branding */}
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
         <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping"></span>
         <span className="text-[10px] font-black tracking-[0.4em] text-white/20">APEX SOVEREIGN LLC | ANTI_GRAVITY_PROTOCOL</span>
      </footer>
    </main>
  );
}
