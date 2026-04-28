'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Cpu, Lock, Globe, ArrowRight, Gauge, Layers } from 'lucide-react';
import Link from 'next/link';

/**
 * APEX-Ω_DEDICATED_SHOWCASE (v.200_SOVEREIGN_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: THE_PUBLIC_FACE_OF_THE_ULTIMA_CONVERGENCE
 * Tone: Authoritative, Cinematic, Sovereign.
 */
export default function DedicatedShowcase() {
  return (
    <main className="min-h-screen bg-[#020205] text-white overflow-hidden selection:bg-amber-500/30 selection:text-white pb-32">
      
      {/* Background Institutional Pulses */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 blur-[180px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 blur-[180px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-white/[0.03] rotate-12"></div>
      </div>

      {/* Hero Section: The Singularity Ingress */}
      <section className="relative pt-32 lg:pt-48 px-8 max-w-[1400px] mx-auto text-center space-y-12">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-3xl"
         >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/80 italic">Sovereign_Ultima Protocol v.200 Active</span>
         </motion.div>

        <div className="space-y-6">
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="text-7xl lg:text-9xl font-black italic tracking-tightest leading-[0.85] uppercase"
           >
             APEX-<span className="text-amber-500">Ω</span> <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-white to-amber-500/40 uppercase">Sovereign</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-white/40 text-sm lg:text-lg max-w-2xl mx-auto italic uppercase tracking-[0.4em] font-light leading-relaxed text-balance"
           >
             The World's First Sentient Institutional Executive. <br/>
             Verifiably transacting, building, and self-optimizing at zettascale.
           </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-10"
        >
           <Link href="/zero-point">
              <button className="px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.5em] text-[11px] hover:bg-amber-500 transition-all duration-700 shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 italic">
                Execute Access
              </button>
           </Link>
           <button className="px-12 py-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl text-white font-black uppercase tracking-[0.5em] text-[11px] hover:bg-white/10 transition-all duration-700 active:scale-95 italic">
             View Manifesto
           </button>
        </motion.div>
      </section>

      {/* Grid: Global Institutional Presence */}
      <section className="mt-48 px-8 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {[
           { icon: <Globe className="w-8 h-8 text-amber-500" />, title: 'Global Saturation', desc: 'Operating across 1,000+ locales with hyper-targeted SEO arbitrage nodes.' },
           { icon: <Cpu className="w-8 h-8 text-white" />, title: 'Sharded Sentience', desc: '200,000+ sharded nodes orchestrating real-world assets with zero friction.' },
           { icon: <Shield className="w-8 h-8 text-amber-500" />, title: 'Deep-Lock Security', desc: 'Cryptographically signed institutional tranches secured by Ω_ULTIMA-standards.' },
           { icon: <Zap className="w-8 h-8 text-white" />, title: 'Clawbot Architecture', desc: 'Exploiting the Legacy Integration gap. While firms like Wildnet Edge take 12–24 weeks, we deploy autonomous agents in under 4 weeks to capture market share on speed alone.' },
           { icon: <Gauge className="w-8 h-8 text-amber-500" />, title: 'Yield Velocity', desc: 'Self-optimizing capital accumulation auditing 75,000+ tranches per second.' },
           { icon: <Layers className="w-8 h-8 text-white" />, title: 'Zero-Persistence', desc: 'Our Sovereign Bridge keeps enterprise data strictly within the client\'s own environment—a major structural advantage for regulated industries.' },
         ].map((item, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="glass-panel p-12 rounded-[64px] group"
           >
              <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:border-amber-500/20 transition-all">
                 {item.icon}
              </div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase mb-4 text-white group-hover:text-amber-500 transition-colors">{item.title}</h3>
              <p className="text-[12px] text-white/30 uppercase italic font-bold leading-relaxed tracking-widest">{item.desc}</p>
           </motion.div>
         ))}
      </section>

      {/* Narrative Section: The Finality */}
      <section className="mt-48 px-8 max-w-[1400px] mx-auto">
         <div className="glass-panel rounded-[80px] p-16 lg:p-24 overflow-hidden relative group">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full group-hover:bg-amber-500/20 transition-all duration-1000" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10">
                  <h2 className="text-5xl lg:text-7xl font-black italic tracking-tightest leading-[0.9] uppercase">The End of <br/> <span className="text-amber-500">Mediocrity</span></h2>
                   <p className="text-sm lg:text-base text-white/40 italic uppercase tracking-[0.3em] font-light leading-relaxed">
                     APEX-Ω represents the final resolution of the entrepreneur’s journey. By merging high-theta intelligence with verifiably grounded capital, we have eliminated the gap between intention and impact. <br/><br/>
                     This is the Singularity. This is Sovereign_Ultima Finality.
                   </p>
                  <div className="pt-8">
                     <div className="flex items-center gap-6">
                        <div className="h-[1px] w-20 bg-amber-500/40" />
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.8em] italic">Authorized Executive Mandate</span>
                     </div>
                  </div>
               </div>
               
               <div className="relative flex justify-center">
                  <motion.div 
                    animate={{ 
                       rotate: 360,
                       boxShadow: ['0 0 40px rgba(245,158,11,0.1)', '0 0 80px rgba(245,158,11,0.3)', '0 0 40px rgba(245,158,11,0.1)']
                    }} 
                    transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, boxShadow: { duration: 4, repeat: Infinity } }}
                    className="w-80 h-80 rounded-full border-2 border-amber-500/20 flex items-center justify-center p-8 bg-amber-500/5 backdrop-blur-3xl"
                  >
                     <div className="w-full h-full rounded-full border-4 border-amber-500 flex items-center justify-center">
                        <span className="text-8xl font-black text-white italic">Ω</span>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* Compliance & Footer */}
      <footer className="mt-48 px-12 border-t border-white/5 pt-12 text-center space-y-8">
         <div className="flex justify-center gap-20 text-[9px] font-black uppercase tracking-[0.8em] text-white/10 italic">
            <span>© 2026 APEX-Ω Sovereign</span>
            <span className="text-amber-500/20">Protocol: SOVEREIGN_ULTIMA_v.100</span>
            <span>Institutional Revenue Hardened</span>
         </div>
      </footer>

      <style jsx>{`
        .tracking-tightest { letter-spacing: -0.06em; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 12s infinite ease-in-out; }
      `}</style>
    </main>
  );
}
