'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface InstitutionalPageProps {
  name: string;
  summary: string;
  price: string;
  buyUrl: string;
  category: string;
}

export const InstitutionalPage = ({ name, summary, price, buyUrl, category }: InstitutionalPageProps) => {
  const handleAcquisition = async () => {
    const handshake = await generateHandshake();
    const target = encodeURIComponent(buyUrl);
    window.location.href = `/api/track?url=${target}&handshake=${handshake}&category=${category}&trace=v2026.11_APEX`;
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-glow/30 overflow-hidden relative">
      {/* Institutional Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-cyan-glow)_1px,_transparent_1px)] bg-[length:40px_40px] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-glow/10 rounded-full blur-[160px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-32 md:py-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-12"
        >
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
            <span className="w-1.5 h-1.5 bg-cyan-glow rounded-full status-pulse shadow-[0_0_10px_#00FFFF]"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60 italic">SOVRA Sovereign LLC</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 italic">
            {name.toUpperCase()}
          </h1>

          <div className="glass-apex p-12 !rounded-[48px] border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-10 relative group">
             <div className="scan-line" />
             
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black tracking-[0.4em] text-cyan-glow uppercase bg-cyan-glow/5 px-4 py-1.5 rounded-full border border-cyan-glow/10">
                   Tranche: {category.toUpperCase()}
                </span>
                <span className="text-3xl font-black font-mono text-white/90">{price}</span>
             </div>

             <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed text-left border-l-2 border-cyan-glow/20 pl-8">
               {summary}
             </p>

             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={handleAcquisition}
               className="w-full py-8 bg-white text-black rounded-[24px] font-black text-[12px] uppercase tracking-[0.8em] hover:bg-cyan-glow transition-all duration-500 shadow-2xl relative overflow-hidden"
             >
               <span className="relative z-10">Deploy Node Authorization</span>
             </motion.button>

             <div className="flex justify-center gap-8 pt-6 opacity-20">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">ID: APEX_INV_PROT</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/30">VERIFIED: v2026.11_APEX</span>
             </div>
          </div>
        </motion.div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center opacity-20">
         <p className="text-[8px] uppercase tracking-[0.5em] font-black italic">© 2026 APEX SOVEREIGN LLC | ABSOLUTE MARKET DOMINANCE</p>
      </footer>
    </main>
  );
};
