'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight, Shield, Zap, Globe, Cpu } from 'lucide-react';

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white">
      
      {/* Institutional Hero — SOVRA Sovereign Ingress */}
      <section className="relative pt-64 pb-48 px-10 md:px-20 text-center overflow-hidden">
         {/* Professional Hero Image */}
         <div className="absolute inset-0 z-0">
           <img src="/assets/hero.png" alt="SOVRA Infrastructure" className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205]" />
         </div>

         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="relative z-10 max-w-6xl mx-auto"
         >
           <div className="flex flex-col items-center gap-6 mb-20">
             <img src="/assets/logo.png" alt="SOVRA" className="w-24 h-24 mb-4" />
             <p className="text-[#cd9d3f] text-[11px] font-black tracking-[0.8em] uppercase italic animate-pulse">
               SOVRA Sovereign — Global Command Node
             </p>
             <div className="w-12 h-[2px] bg-[#cd9d3f] shadow-[0_0_15px_rgba(205,157,63,0.5)]"></div>
           </div>
           
           <h1 className="text-8xl md:text-[11rem] font-black tracking-tightest mb-20 leading-[0.8] text-white uppercase italic">
              SOVRA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cd9d3f] via-white to-white/40">Commerce</span>
           </h1>
           
           <p className="text-white/40 text-xl md:text-2xl max-w-4xl mx-auto mb-24 font-bold leading-relaxed border-l-2 border-[#cd9d3f]/30 pl-10 italic uppercase tracking-widest text-left">
             Elite hardware optimization and high-fidelity tech tranches. Verifiably synchronized via the SOVRA OS Retail Engine (v1.1_SOVRA).
           </p>
         </motion.div>
      </section>

      {/* Sector Selection — SOVRA Hub */}
      <section className="max-w-7xl mx-auto px-10 md:px-20 py-48 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5">
         
         {/* Shopify Sector */}
         <motion.div 
           whileHover={{ y: -10 }}
           className="group p-16 rounded-[80px] bg-[#050508] border border-white/5 hover:border-[#cd9d3f]/40 transition-all duration-700 relative overflow-hidden flex flex-col justify-between shadow-3xl"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-[#cd9d3f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 space-y-12">
               <div className="w-20 h-20 rounded-[32px] bg-[#cd9d3f]/10 border border-[#cd9d3f]/20 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#cd9d3f]" />
               </div>
               <div>
                  <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">Shopify <br/>Hub</h2>
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest italic leading-relaxed">Automated high-theta logistics. Secure commerce channel verifiably bridged to sovra-sovereign.myshopify.com.</p>
               </div>
               <Link href="/store/shopify">
                  <button className="w-full py-8 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-[#cd9d3f] hover:text-white transition-all shadow-2xl italic group-hover:scale-105">
                     Initialize Shopify
                  </button>
               </Link>
            </div>
         </motion.div>

         {/* Gumroad Sector */}
         <motion.div 
           whileHover={{ y: -10 }}
           className="group p-16 rounded-[80px] bg-[#050508] border border-white/5 hover:border-white/20 transition-all duration-700 relative overflow-hidden flex flex-col justify-between shadow-3xl"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 space-y-12">
               <div className="w-20 h-20 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white/40" />
               </div>
               <div>
                  <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">Gumroad <br/>Tranche</h2>
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest italic leading-relaxed">Algorithmically vetted digital assets and infrastructure. Extracted directly from the global discovery grid.</p>
               </div>
               <Link href="/store/gumroad">
                  <button className="w-full py-8 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all shadow-2xl italic group-hover:scale-105">
                     Query Ledger
                  </button>
               </Link>
            </div>
         </motion.div>

      </section>

    </div>
  );
}
