'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * APEX Header
 * Mandate: Unified Institutional Navigation across all Sovereign avenues.
 * Aesthetic: Top 1% Luxury Elite (Glassmorphism + Neon Cyan).
 */
export default function ApexHeader() {
  const navItems = [
    { name: 'Dashboard', href: '/jarvis' },
    { name: 'Sovereign Store', href: '/store' },
    { name: 'Identity', href: '/jarvis' },
    { name: 'Enterprise', href: '/enterprise/aegis' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
             <div className="absolute inset-0 bg-cyan-500 rounded-lg blur-lg opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative w-full h-full bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center font-black text-cyan-500 text-xs">M</div>
          </div>
          <span className="font-black tracking-[0.2em] text-[10px] uppercase text-white group-hover:text-cyan-400 transition-colors">SOVRA APEX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full cursor-pointer group"
          >
             <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase group-hover:text-white">Elite Access</span>
          </motion.div>
        </div>

        <div className="md:hidden flex items-center">
           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
        </div>
      </div>
    </nav>
  );
}
