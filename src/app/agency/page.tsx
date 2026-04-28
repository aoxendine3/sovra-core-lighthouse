import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Zap, Globe, Cpu, Lock, ArrowRight, BarChart3, Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MAXX Agency | Institutional Sovereign Development',
  description: 'High-theta software architecture, AI operations, and enterprise blockchain integration. Augment your capacity with the Sovereign Intelligence Core.',
};

export default function AgencyPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-amber-500/30 selection:text-white">
      {/* 100/100 Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/agency_hero_institutional_1776797882016.png" 
            alt="Maxx Agency Institutional Hero" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/0 via-[#020205]/40 to-[#020205]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl animate-fade-in">
             <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Institutional Grade</span>
          </div>
          
          <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">
            MAXX <span className="text-amber-500">Agency</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/40 font-light italic leading-relaxed uppercase tracking-[0.2em]">
            Scaling high-theta software tranches for the 0.01%. <br/>
            Sovereign Architecture. Zero Friction. Total Dominance.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-12">
            <a 
              href="#launch-pack"
              className="px-12 py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-amber-500 transition-all duration-500 shadow-2xl active:scale-95"
            >
              Secure Launch Pack
            </a>
            <a 
              href="#tranches"
              className="px-12 py-6 bg-white/5 border border-white/10 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-white/10 transition-all duration-500 active:scale-95 backdrop-blur-3xl"
            >
              Explore Tranches
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <ArrowRight className="rotate-90 w-8 h-8" />
        </div>
      </section>

      {/* Institutional Proof Section */}
      <section className="py-32 border-y border-white/5 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                <div className="space-y-2">
                    <p className="text-6xl font-black text-amber-500 font-mono italic">$748k+</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Grounded Revenue</p>
                </div>
                <div className="space-y-2">
                    <p className="text-6xl font-black text-white font-mono italic">50+</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Brands Scaled</p>
                </div>
                <div className="space-y-2">
                    <p className="text-6xl font-black text-white font-mono italic">4</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Continents Penetrated</p>
                </div>
                <div className="space-y-2">
                    <p className="text-6xl font-black text-amber-500 font-mono italic">99.9%</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Uptime Sovereign</p>
                </div>
            </div>
         </div>
      </section>

      {/* Service Tranches */}
      <section id="tranches" className="py-64 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="space-y-8">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em] italic">Capabilities::Tranches</span>
              <h2 className="text-7xl font-black uppercase italic leading-none max-w-2xl">
                We Build the <span className="text-white/20">Future</span> <br/>
                On Sovereign <span className="text-amber-500">Infrastructure.</span>
              </h2>
            </div>
            <p className="max-w-md text-white/40 text-lg italic uppercase tracking-widest leading-relaxed">
              From seed to scale, our specialists deploy high-fidelity code bases that are born to dominate the Play Store and App Store ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Globe, title: 'Sovereign Web3', desc: 'Decentralized platforms, smart-contracts, and super-apps as secure as Fort Knox.', badge: 'Blockchain' },
               { icon: Cpu, title: 'SOVRA AI Ops', desc: 'High-density LLM integration and autonomous workflow streamlining for the 0.01%.', badge: 'Intelligence' },
               { icon: Zap, title: 'Tranche Dev', desc: 'Polished iOS/Android apps built with precision. Beautiful UI. Lossless performance.', badge: 'Mobility' },
               { icon: Lock, title: 'Deep-Lock Sec', desc: 'Institutional grade security handshakes and Zero-Point encryption for every node.', badge: 'Hardened' },
               { icon: BarChart3, title: 'PSEO Saturation', desc: 'Programmatic SEO blitzing to capture 100% of organic market delta.', badge: 'Inbound' },
               { icon: Rocket, title: 'Scale Consulting', desc: 'Fractional CTO/CFO support for rapid capitalization and VC-ready architecture.', badge: 'Capital' }
             ].map((service, index) => (
                <div key={index} className="group bg-white/[0.02] border border-white/5 p-16 rounded-[48px] hover:border-amber-500/20 transition-all duration-700 backdrop-blur-3xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:text-amber-500 transition-all duration-700">
                      <service.icon size={120} />
                   </div>
                   <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-12 italic">
                     {service.badge}
                   </span>
                   <h3 className="text-4xl font-black italic mb-6 group-hover:text-amber-500 transition-colors uppercase">{service.title}</h3>
                   <p className="text-white/30 text-sm italic leading-relaxed uppercase tracking-widest">
                     {service.desc}
                   </p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* The $5,000 Hook Section */}
      <section id="launch-pack" className="py-64 bg-amber-500 text-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none stroke-black/5 flex items-center justify-center">
            <Zap size={800} strokeWidth={0.5} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-24 items-center">
           <div className="flex-1 space-y-12">
              <div className="space-y-4">
                  <h2 className="text-8xl font-black italic leading-[0.8] uppercase tracking-tighter">
                    Claim your <br/>
                    <span className="text-white shadow-black shadow-sm">FREE $5,000</span> <br/>
                    Launch Pack.
                  </h2>
                  <p className="text-black/60 text-xl font-black italic uppercase tracking-widest leading-relaxed">
                    Zero Dollars. Complete Professional Ingress. <br/>
                    Limited to 3 Institutional Partners Per Quarter.
                  </p>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'App Prototype (3 Screens)', 
                  '30-Min Strategy Session', 
                  'Cost & Technical Estimation',
                  'Free Project Timeline',
                  'Revenue Strategy Matrix',
                  '3 Months Support'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest italic">
                    <Zap className="w-4 h-4" /> {item}
                  </li>
                ))}
              </ul>
           </div>

           <div className="flex-1 w-full box-border">
              <div className="bg-black p-12 md:p-20 rounded-[56px] shadow-2xl space-y-10 border border-white/10">
                 <div className="space-y-2">
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] italic leading-tight">Institutional Onboarding</p>
                    <h3 className="text-white text-5xl font-black italic uppercase leading-none">Apply for Ingress</h3>
                 </div>
                 
                 <form className="space-y-6">
                    <input 
                      type="text" 
                      placeholder="NAME / AGENT_ID"
                      className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white outline-none focus:border-amber-500 transition-colors uppercase font-black text-xs tracking-widest"
                    />
                    <input 
                      type="email" 
                      placeholder="SECURE_EMAIL"
                      className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white outline-none focus:border-amber-500 transition-colors uppercase font-black text-xs tracking-widest"
                    />
                    <input 
                      type="text" 
                      placeholder="COMPANY / ORGANIZATION"
                      className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white outline-none focus:border-amber-500 transition-colors uppercase font-black text-xs tracking-widest"
                    />
                    <select className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-white/40 outline-none focus:border-amber-500 transition-colors uppercase font-black text-xs tracking-widest appearance-none">
                       <option>SELECT MISSION CATEGORY</option>
                       <option>SOVEREIGN APP DEV</option>
                       <option>AI WORKFLOW AUTOMATION</option>
                       <option>BLOCKCHAIN SUPER-APP</option>
                       <option>ENTERPRISE SCALING</option>
                    </select>

                    <button className="w-full py-8 bg-amber-500 text-black text-[12px] font-black uppercase tracking-[0.5em] rounded-full hover:bg-white transition-all duration-500 active:scale-95 shadow-xl font-mono">
                      IGNITE MANDATE
                    </button>
                 </form>
                 
                 <p className="text-center text-[10px] text-white/20 font-black italic uppercase tracking-[0.2em]">
                    * Subject to institutional audit and deep-lock verification.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 text-center space-y-12">
          <div className="text-8xl font-black italic tracking-tighter text-white/5 uppercase">MAXX</div>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-12">
             <p className="text-[10px] text-white/20 font-black uppercase tracking-widest italic">© 2026 SOVRA Sovereign | MAXX Agency Institutional Core</p>
             <div className="flex gap-12 font-black text-[10px] text-white/40 tracking-widest uppercase italic">
                <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Legal</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Manual</a>
             </div>
          </div>
      </footer>
    </main>
  );
}
