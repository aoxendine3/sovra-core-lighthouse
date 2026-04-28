'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  Zap, 
} from 'lucide-react';

/**
 * SOVRA Sovereign Store Layout (v2.0_Ω_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute Aesthetic Dominance.
 */

export default function SOVRAStoreLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-white font-inter selection:bg-[#cd9d3f]/30">
      
      {/* 1. ANNOUNCEMENT PROTOCOL */}
      <div className="fixed top-0 inset-x-0 bg-[#cd9d3f] text-black text-center py-2 px-4 text-[9px] font-black uppercase tracking-[0.6em] relative overflow-hidden z-[120]">
        <motion.div 
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap flex items-center gap-12"
        >
          <span>System Status: 100/1 Operational</span>
          <Zap className="w-3 h-3" />
          <span>New Institutional Assets Grounded Daily</span>
          <Shield className="w-3 h-3" />
          <span>Sovereign Fulfillment Active Globally</span>
          <Globe className="w-3 h-3" />
        </motion.div>
      </div>

      {/* 2. MAIN CONTENT (Header/Footer handled by RootLayout) */}
      <main className="relative pt-20">
        {children}
      </main>
    </div>
  );
}
