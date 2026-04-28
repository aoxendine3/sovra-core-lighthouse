'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Menu, 
  X, 
  Command, 
  Search, 
  Store, 
  Cpu, 
  Terminal as TerminalIcon,
  Globe,
  Activity
} from 'lucide-react';

/**
 * SOVRA Sovereign Header (v15.0_Ω_PRO)
 * ─────────────────────────────────────────────────────────────
 * Mode: ADAPTIVE_GLASS_FINALITY
 */

const navItems = [
  { name: 'Terminal', href: '/', icon: TerminalIcon },
  { name: 'AI Oracle', href: '/ai-hub', icon: Cpu },
  { name: 'Voice', href: '/sovra-voice', icon: Activity },
  { name: 'Ledger', href: '/store/gumroad', icon: Store },
  { name: 'Infrastructure', href: '/store/shopify', icon: Globe },
];

export default function SOVRAHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (!pathname || (pathname.startsWith('/admin') && !pathname.includes('war-room'))) {
    return null;
  }

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="fixed top-0 inset-x-0 z-[110] bg-gradient-to-r from-[#cd9d3f] to-[#ffdfa1] text-black py-2 px-6 text-center shadow-2xl">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] italic flex items-center justify-center gap-3">
          <span className="animate-pulse">✨</span> Welcome to SOVRA Sovereign — Institutional Intelligence & Asset Dominance
        </span>
      </div>

      <header 
        className={`fixed inset-x-0 z-[100] transition-all duration-500 px-6 md:px-12 ${
          isScrolled ? 'top-8' : 'top-12'
        }`}
      >
        <div className={`max-w-7xl mx-auto glass-panel transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'py-3 px-8 bg-black/80 !rounded-full border-[#cd9d3f]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'py-5 px-10 bg-white/[0.02] !rounded-3xl border-white/5'
        }`}>
          <div className="flex items-center justify-between">
            
            {/* BRANDING: REFINED 'X' NODE */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cd9d3f] to-[#ffdfa1] flex items-center justify-center shadow-lg shadow-[#cd9d3f]/20 group-hover:scale-110 transition-transform">
                  <span className="text-black font-black text-xl italic leading-none">X</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-syne font-black text-base uppercase tracking-tighter text-white">XORAS</span>
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-[#cd9d3f] to-[#ffdfa1] bg-clip-text text-transparent font-mono text-[8px] uppercase tracking-[0.3em] font-bold italic">V15.0_Ω_XORAS_ACTIVE</span>
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  </div>
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 flex items-center gap-3 ${
                    pathname === item.href 
                      ? 'text-[#cd9d3f] bg-[#cd9d3f]/10 italic' 
                      : 'text-white/20 hover:text-white hover:bg-white/[0.03]'
                  }`}>
                    <item.icon className={`w-3.5 h-3.5 ${pathname === item.href ? 'text-[#cd9d3f]' : 'text-current/40'}`} />
                    {item.name}
                  </button>
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#cd9d3f] hover:text-black transition-all group">
                <Search className="w-4 h-4 text-white/40 group-hover:text-black" />
              </button>
              
              <Link href="/ai-hub">
                <button className="hidden sm:flex items-center gap-3 px-8 py-3 bg-[#cd9d3f] text-black hover:bg-white transition-all rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic shadow-xl">
                  <Command className="w-3 h-3" />
                  Initialize
                </button>
              </Link>
              
              <button 
                className="xl:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[120] bg-[#020205] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cd9d3f] flex items-center justify-center">
                  <span className="text-black font-black text-xl italic">S</span>
                </div>
                <span className="font-syne font-black text-2xl uppercase tracking-tighter">SOVRA</span>
              </div>
              <button 
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"
                onClick={() => setIsMobileOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <span className={`text-5xl font-syne font-black uppercase tracking-tighter hover:text-[#cd9d3f] transition-all flex items-center gap-6 ${
                    pathname === item.href ? 'text-[#cd9d3f]' : 'text-white/20'
                  }`}>
                    <item.icon className="w-10 h-10 opacity-20" />
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-white/5">
              <button className="w-full py-6 bg-[#cd9d3f] text-black rounded-3xl font-black uppercase tracking-[0.5em] text-xs italic">
                Initialize Oracle
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
