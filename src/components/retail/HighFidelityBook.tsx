'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HighFidelityBookProps {
  title: string;
  coverImage?: string;
  author?: string;
}

export const HighFidelityBook: React.FC<HighFidelityBookProps> = ({ title, author }) => {
  return (
    <div className="perspective-1000 group relative w-48 h-64 mx-auto">
      <motion.div 
        whileHover={{ rotateY: -30, x: -10 }}
        className="relative w-full h-full transition-all duration-700 preserve-3d"
      >
        {/* Front Cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-r-lg border border-white/10 shadow-2xl z-10 overflow-hidden">
           <div className="p-6 h-full flex flex-col justify-between border-l-4 border-[#cd9d3f]/20">
              <div className="space-y-2">
                 <p className="text-[8px] font-black text-[#cd9d3f] uppercase tracking-widest italic opacity-60">XORAS Sovereign Brief</p>
                 <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none text-white">{title}</h4>
              </div>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{author || 'XORAS_CORE'}</p>
           </div>
           {/* Decorative spine shadow */}
           <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/40 shadow-inner" />
        </div>

        {/* Spine */}
        <div className="absolute top-0 bottom-0 -left-4 w-4 bg-[#111] rounded-l-sm border border-white/5 transform-style-3d origin-right -rotate-y-90 flex items-center justify-center">
           <p className="text-[6px] font-black text-white/10 uppercase tracking-widest -rotate-90 whitespace-nowrap">{title}</p>
        </div>

        {/* Pages (Thickness) */}
        <div className="absolute top-1 bottom-1 right-0 w-2 bg-zinc-200 rounded-r-sm transform-style-3d origin-left rotate-y-90 shadow-inner opacity-20" />
      </motion.div>
      
      {/* Dynamic Floor Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/40 blur-2xl rounded-full scale-y-50 group-hover:scale-x-110 transition-transform duration-700" />
    </div>
  );
};
