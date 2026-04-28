'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SOVRAStoreLayout from '@/components/retail/SOVRAStoreLayout';
import { ShoppingCart, Star, Zap, ArrowRight, ShieldCheck, Globe, Cpu } from 'lucide-react';

const SHOPIFY_ASSETS = [
  { id: 'S1', name: 'Elite Ergo-Station Δ', price: 1250.00, category: 'Tech', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800', rating: 5.0 },
  { id: 'S2', name: 'Omni-Lume Ambient Node', price: 185.00, category: 'Home', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: 'S3', name: 'Aegis Bio-Metric Pad', price: 450.00, category: 'Security', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
];

export default function ShopifyPage() {
  return (
    <SOVRAStoreLayout>
      <div className="relative min-h-screen">
        
        {/* Shopify Hero Node */}
        <section className="relative pt-64 pb-32 px-10 md:px-20 overflow-hidden">
           {/* Ambient Golds */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cd9d3f]/5 blur-[150px] rounded-full pointer-events-none" />
           
           <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="space-y-12"
             >
               <div className="inline-flex items-center gap-4 bg-white/[0.02] border border-white/5 px-6 py-2 rounded-full backdrop-blur-xl">
                  <span className="w-2 h-2 bg-[#cd9d3f] rounded-full animate-pulse shadow-[0_0_10px_#cd9d3f]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#cd9d3f]/60 italic font-mono">Institutional_Hardware_v2.0</span>
               </div>
               
               <h1 className="leading-tight">
                 Exascale <br/><span className="gold-gradient italic">Hardware.</span>
               </h1>
               
               <p className="text-white/40 text-xl font-medium leading-relaxed max-w-xl italic border-l border-[#cd9d3f]/20 pl-8">
                 Premium artifact tranches verifiably grounded in the Sovereign Ledger. Absolute operational finality.
               </p>
               
               <div className="flex gap-6 pt-6">
                  <a 
                    href="https://co-trendzone.myshopify.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-16 py-6 bg-[#cd9d3f] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-full hover:bg-white hover:scale-105 transition-all shadow-2xl active:scale-95 italic"
                  >
                    Enter Shopify Gateway
                  </a>
               </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative"
             >
                <div className="aspect-square rounded-[64px] bg-white/[0.02] border border-white/5 overflow-hidden relative group">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(205,157,63,0.05),_transparent_70%)]" />
                   <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1200" alt="Hero Asset" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
                   <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/60 to-transparent">
                      <div className="flex justify-between items-end">
                         <div className="space-y-2">
                            <p className="text-[#cd9d3f] text-[9px] font-black uppercase tracking-[0.5em] font-mono">Master_Tranche</p>
                            <h3 className="text-3xl font-syne font-black text-white italic tracking-tighter uppercase leading-none">SOVRA-X <br/>Workspace</h3>
                         </div>
                         <div className="text-right space-y-1">
                            <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">Index_Val</p>
                            <p className="text-2xl font-black text-white italic">$12,500.00</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="absolute -bottom-8 -left-8 p-6 glass-panel !rounded-3xl border-[#cd9d3f]/20">
                   <ShieldCheck className="w-8 h-8 text-[#cd9d3f]" />
                </div>
             </motion.div>
           </div>
        </section>

        {/* Shopify Catalog */}
        <section className="py-48 px-10 md:px-20 border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-10">
                 <div className="space-y-6">
                    <p className="text-[#cd9d3f] text-[10px] font-black tracking-[0.5em] uppercase italic font-mono">Catalog_Tranches</p>
                    <h2 className="italic tracking-tighter text-white uppercase italic leading-none">Verified Artifacts</h2>
                 </div>
                 <div className="px-8 py-3 rounded-full border border-[#cd9d3f]/20 text-[9px] font-black text-[#cd9d3f] uppercase tracking-[0.4em] italic bg-[#cd9d3f]/5">
                    Institutional_Grade_100/1
                 </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {SHOPIFY_ASSETS.map((asset, i) => (
                    <motion.div 
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-8 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-[#cd9d3f]/30 transition-all duration-700 relative overflow-hidden"
                    >
                       <div className="aspect-square rounded-[32px] overflow-hidden mb-10 bg-black relative">
                          <img src={asset.image} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-40 group-hover:opacity-80" />
                       </div>

                       <div className="flex justify-between items-start mb-6">
                          <div className="space-y-2">
                             <h3 className="text-xl font-black text-white italic tracking-tight uppercase leading-tight group-hover:text-[#cd9d3f] transition-colors">{asset.name}</h3>
                             <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{asset.category}</p>
                          </div>
                          <span className="text-[9px] font-black text-[#cd9d3f]/60 uppercase tracking-[0.2em] border border-[#cd9d3f]/20 px-4 py-1 rounded-full italic font-mono">v1.2</span>
                       </div>

                       <div className="flex justify-between items-center pt-8 border-t border-white/5">
                          <p className="text-2xl font-black text-white italic tracking-tighter">${asset.price.toFixed(2)}</p>
                          <a 
                            href="https://co-trendzone.myshopify.com" 
                            target="_blank" 
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#cd9d3f] hover:border-[#cd9d3f] transition-all group-hover:scale-110 duration-500"
                          >
                             <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                          </a>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </SOVRAStoreLayout>
  );
}
