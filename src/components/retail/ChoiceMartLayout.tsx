'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  Home,
  Store,
  Heart,
  ExternalLink,
  Shield,
  Users,
  Globe,
  Mail,
  Zap
} from 'lucide-react';

export default function ChoiceMartLayout({ children, currentPageName }: { children: React.ReactNode, currentPageName?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/store/gumroad', icon: Store },
    { name: 'Shopify Hub', path: '/store/shopify', icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen bg-[#020205] font-sans selection:bg-purple-500/30">
      {/* Announcement Bar — SOVRA Standard */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-center py-3 px-4 text-[11px] font-black uppercase tracking-[0.4em] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        <span className="relative z-10 inline-flex items-center gap-4">
          <Zap className="w-3 h-3 text-white" />
          Welcome to Stunning Choice Mart — Quality Products at Amazing Prices!
        </span>
      </div>

      {/* Header — Adapt user structure */}
      <header
        className={`sticky top-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo — Maintain brand identity */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_10px_30px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-black text-xl italic">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-base tracking-tighter uppercase italic">Stunning Choice</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black text-[10px] uppercase tracking-[0.4em] mt-1 italic">Mart</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link key={link.path} href={link.path}>
                    <button className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      isActive 
                        ? 'text-white bg-white/10 shadow-inner' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}>
                      {link.name}
                    </button>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link href="/store/gumroad">
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                  <Search className="w-4 h-4" />
                </button>
              </Link>
              
              <a 
                href="https://co-trendzone.myshopify.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="hidden sm:flex px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all active:scale-95 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full shadow-[0_15px_40px_rgba(168,85,247,0.2)]">
                  Visit Store
                </button>
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu — Adapted */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050508] border-t border-white/5 overflow-hidden"
            >
              <div className="px-8 py-10 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <button className="w-full flex items-center gap-6 p-6 rounded-[24px] bg-white/[0.02] border border-white/5 text-[11px] font-black uppercase tracking-widest text-slate-300">
                      <link.icon className="w-5 h-5 text-purple-400" />
                      {link.name}
                    </button>
                  </Link>
                ))}
                <a 
                  href="https://co-trendzone.myshopify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block pt-8"
                >
                  <button className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-[11px] uppercase tracking-widest rounded-[24px]">
                    Visit Store
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Node */}
      <main className="relative z-10">{children}</main>

      {/* Footer — Adapted and upscaled */}
      <footer className="bg-[#050508] border-t border-white/5 py-32 mt-32">
        <div className="max-w-7xl mx-auto px-10 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            {/* Brand Intelligence */}
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-black italic">S</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-black text-xs uppercase tracking-tighter italic">Stunning Choice</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black text-[8px] uppercase tracking-[0.4em] italic mt-0.5">Mart</span>
                </div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed italic uppercase font-bold tracking-widest">
                Your destination for trending high-theta products verifiably grounded in the Sovereign Ledger.
              </p>
              <div className="flex gap-4">
                {[Shield, Users, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 hover:scale-110 transition-all duration-500"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Ingress */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.6em] italic">Shop_Tranches</h4>
              <ul className="space-y-4">
                {['All Products', 'Electronics', 'Beauty', 'Fitness', 'Home'].map((item) => (
                  <li key={item}>
                    <Link href="/store/gumroad" className="text-slate-500 hover:text-purple-400 text-[10px] font-black uppercase tracking-widest transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Bridge */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.6em] italic">Support_Lock</h4>
              <ul className="space-y-4">
                {['Contact Us', 'Shipping Info', 'Returns', 'FAQ', 'Track Order'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-purple-400 text-[10px] font-black uppercase tracking-widest transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Sentinel */}
            <div className="space-y-8">
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.6em] italic">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                  <Mail className="w-4 h-4 text-purple-400" />
                  support@trendzone.co
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] italic">
              © 2026 Stunning Choice Mart // SOVRA Sovereign LLC. All rights reserved.
            </p>
            <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] italic">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
