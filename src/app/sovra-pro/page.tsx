'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Globe, Cpu, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function SovraProPage() {
  const gumroadUrl = "https://trendsetter445.gumroad.com/l/sovra-sovereign-protocol-—-pro-mastery";

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-[#cd9d3f]/30">
      
      {/* HERO SECTION — INSTITUTIONAL INGRESS */}
      <section className="relative pt-64 pb-32 px-6 md:px-20 text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[900px] bg-[#cd9d3f]/10 rounded-full blur-[250px] opacity-60 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center gap-6 mb-12">
            <span className="text-[#cd9d3f] text-[11px] font-black tracking-[0.8em] uppercase italic bg-[#cd9d3f]/10 px-4 py-2 rounded-full border border-[#cd9d3f]/20">
              Tier-0 Sovereign Infrastructure
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tightest leading-[0.85] mb-12 uppercase italic">
            SOVRA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cd9d3f] via-white to-white/40">
              PRO MASTERY
            </span>
          </h1>
          
          <p className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed italic">
            The absolute authority in global asset security. Verifiably eliminate failure capacity with the 2026.11 Sovereign Protocol.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.3em] rounded-full hover:bg-[#cd9d3f] hover:text-white transition-all shadow-[0_20px_50px_rgba(205,157,63,0.3)] italic"
              >
                Harden Enterprise — $188
              </motion.button>
            </a>
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest italic">
              <Lock className="w-4 h-4" />
              mTLS Secure Ingress Enabled
            </div>
          </div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES — THE DECAGON SHIELD */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Shield, 
              title: "Global Army Strategy", 
              desc: "The complete institutional framework for exascale asset orchestration." 
            },
            { 
              icon: Lock, 
              title: "Zero-Point Deep Lock", 
              desc: "Implementation code for impermeable digital and physical perimeters." 
            },
            { 
              icon: Zap, 
              title: "Institutional Yield", 
              desc: "Perpetual revenue engine verifiably grounded in truth-anchored data." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[40px] bg-[#050508] border border-white/5 hover:border-[#cd9d3f]/30 transition-all duration-500 group"
            >
              <item.icon className="w-12 h-12 text-[#cd9d3f] mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed italic">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE MANUSCRIPT — CHAPTER BREAKDOWN */}
      <section className="py-32 px-6 md:px-20 bg-[#050508]/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 border-l-8 border-[#cd9d3f] pl-8">
              THE SOVRA <br/>MANUSCRIPT
            </h2>
            <p className="text-white/40 font-bold uppercase tracking-[0.2em] italic">Institutional Delivery Manifest v2026.11</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {[
              "Six-Chapter Global Army Strategic Manuscript",
              "Zero-Point Deep Lock Implementation Code",
              "Perpetual Institutional Yield Revenue Engine",
              "Private Council Discord Ingress",
              "Automated v2026.11 Protocol Pulses",
              "SOVRA Professional License Included"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <CheckCircle2 className="w-6 h-6 text-[#cd9d3f] shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                <span className="text-lg font-bold uppercase italic tracking-wide text-white/80 group-hover:text-white transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCY — TIME IS NON-RENEWABLE */}
      <section className="py-48 px-6 md:px-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#cd9d3f]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Cpu className="w-16 h-16 text-white/20 mx-auto mb-12" />
          <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tightest leading-none mb-12">
            Time is the only <br/>
            <span className="text-[#cd9d3f]">non-renewable asset.</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-bold uppercase tracking-widest italic mb-16 max-w-2xl mx-auto">
            Don't wait for external providers to fail; verifiably eliminate the capacity for failure today.
          </p>
          
          <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
            <button className="px-16 py-8 bg-[#cd9d3f] text-white font-black uppercase text-[11px] tracking-[0.5em] rounded-full hover:bg-white hover:text-black transition-all shadow-3xl italic group relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-4">
                Initialize Ingress <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </a>
        </div>
      </section>

    </div>
  );
}
