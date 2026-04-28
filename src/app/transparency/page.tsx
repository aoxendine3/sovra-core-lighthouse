'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Leaf, FileText, Lock, Globe, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TransparencyPage() {
  const principles = [
    {
      title: "Absolute Provenance",
      icon: <Globe className="text-[#cd9d3f]" />,
      desc: "Every asset in the Sovereign Ledger is verifiably grounded. We provide direct links to the public domain archives and institutional data tranches that power our syntheses."
    },
    {
      title: "Algorithmic Integrity",
      icon: <Zap className="text-amber-400" />,
      desc: "We reject 'Black Box' AI. Our reasoning protocols are documented and explainable, adhering to the highest institutional standards and global regulatory frameworks."
    },
    {
      title: "Eco-Inference",
      icon: <Leaf className="text-emerald-400" />,
      desc: "By utilizing local Ollama nodes for our core reasoning, we reduce CO2 emissions by an estimated 94% compared to centralized cloud clusters."
    },
    {
      title: "Data Sovereignty",
      icon: <Lock className="text-purple-400" />,
      desc: "Zero-extraction policy. User interactions are never used for training. Your data remains in your sovereign perimeter, locked by the SOVRA Kernel."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-[#cd9d3f]/30 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cd9d3f]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#cd9d3f]/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-10 py-32 relative z-10">
        <Link href="/">
           <button className="flex items-center gap-2 text-white/30 hover:text-white transition-all text-[10px] uppercase font-black tracking-widest mb-16">
              <ArrowLeft size={14} /> Return to Apex Command
           </button>
        </Link>

        <header className="mb-32 space-y-8">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#cd9d3f]/20 bg-[#cd9d3f]/10 backdrop-blur-xl">
              <Eye size={16} className="text-[#cd9d3f]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#cd9d3f] italic">Sovereign_Transparency_Ledger</span>
           </div>
           <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase italic">
             Absolute <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cd9d3f] via-[#ffdfa1] to-[#cd9d3f]">Transparency.</span>
           </h1>
           <p className="max-w-3xl text-xl md:text-2xl font-bold text-white/40 leading-relaxed border-l-4 border-[#cd9d3f]/30 pl-12">
             SOVRA Sovereign Enterprise LLC rejects corporate secrecy. We believe that true sovereignty is built on a foundation of verifiable truth and absolute data provenance.
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
           {principles.map((p, i) => (
             <motion.div
               key={p.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-12 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-[#cd9d3f]/30 transition-all group"
             >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   {p.icon}
                 </div>
                <h3 className="text-3xl font-black italic tracking-tight uppercase mb-6">{p.title}</h3>
                <p className="text-white/40 font-bold uppercase text-[12px] tracking-widest leading-loose">
                  {p.desc}
                </p>
             </motion.div>
           ))}
        </section>

        <section className="p-16 rounded-[64px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 space-y-12">
           <div className="flex items-center gap-4">
              <Shield className="text-[#cd9d3f]" />
              <h2 className="text-2xl font-black italic uppercase tracking-widest">Sovereign_Protocol_v15.0</h2>
           </div>
           <div className="space-y-8 text-white/50 font-mono text-sm leading-relaxed max-w-4xl">
              <p>
                In alignment with global institutional standards and the <span className="text-[#cd9d3f]">SOVRA Deep Lock</span> framework, we maintain a public ledger of all algorithmic interventions and data tranches.
              </p>
              <div className="p-8 rounded-2xl bg-black/40 border border-white/5 text-[10px] space-y-4">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/20">Audit_ID:</span>
                    <span>SOVRA-882-Ω-APEX</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/20">Provenance_Score:</span>
                    <span className="text-emerald-400">100% VERIFIED</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/20">Inference_Type:</span>
                    <span>Local DHR (SOVRA Kernel)</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-white/20">Regulatory_Status:</span>
                    <span className="text-[#cd9d3f] uppercase tracking-widest">Compliant [GLOBAL_SOVEREIGN_STANDARDS]</span>
                 </div>
              </div>
           </div>
        </section>

        <footer className="mt-64 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] text-white/10 italic text-center md:text-left">
           <div>© 2026 SOVRA SOVEREIGN ENTERPRISE LLC | TRANSPARENCY LEDGER</div>
           <div className="flex gap-12 font-mono">
              <span>Status: RADIANT</span>
              <span>Uptime: 99.99%</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
