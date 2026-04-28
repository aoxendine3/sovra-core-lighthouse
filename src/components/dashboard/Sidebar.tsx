'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Bitcoin, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Anchor,
  Zap,
  Globe,
  Terminal,
  ShoppingBag,
  Terminal as TerminalIcon
} from 'lucide-react';

/**
 * APEX-Ω_EXASCALE_SIDEBAR (v.200_SOVEREIGN_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * Mode: Ω_SOVEREIGN_ULTIMA
 * Mandate: Absolute Navigation Sovereignty.
 */
  { name: 'War Room Ω', path: '/admin/war-room', icon: LayoutDashboard },
  { name: 'Industrial Oracle', path: '/admin/industrial', icon: Cpu },
  { name: 'Social Saturation', path: '/admin/social', icon: TrendingUp },
  { name: 'Aegis Defense', path: '/admin/security', icon: ShieldCheck },
  { name: 'AI Command Hub', path: '/oracle', icon: Zap },
  { name: 'SIA Studios', path: '/studios', icon: Globe },
  { name: 'Choice Mart Hub', path: '/store', icon: Anchor },
  { name: 'Market Oracle', path: '/creator', icon: TerminalIcon },

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-screen sticky top-0 bg-[#020205] border-r border-white/5 flex flex-col p-10 z-[100] relative overflow-hidden font-sans">
      {/* Background Pulse Decor (v.010) */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-20 relative z-10">
        <div className="flex items-center gap-5">
           <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center relative group overflow-hidden">
              <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
              <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
           <div>
              <h1 className="text-2xl font-black text-white italic tracking-tighter leading-none font-sans uppercase">SIA-Ω</h1>
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.5em] mt-1 italic">SIA_GLOBAL_v.200</p>
           </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={`group relative flex items-center gap-5 p-5 rounded-[24px] transition-all duration-700 cursor-pointer overflow-hidden ${isActive ? 'bg-white/[0.03] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'hover:bg-white/[0.01]'}`}>
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none"
                  />
                )}
                
                <div className={`p-2.5 rounded-xl transition-all ${isActive ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'text-white/20 group-hover:text-white/60'}`}>
                   <item.icon className="w-5 h-5" />
                </div>

                <span className={`text-[12px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-white italic' : 'text-white/40 group-hover:text-white/80'}`}>
                  {item.name}
                </span>

                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]" 
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10 border-t border-white/5 relative z-10">
        <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center gap-5 group cursor-crosshair">
           <div className="w-12 h-12 rounded-full border border-white/10 p-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                 <ShieldCheck className="w-5 h-5 text-white/40 group-hover:text-amber-500 transition-colors" />
              </div>
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none italic">Commander_AO</p>
              <div className="flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                 <p className="text-[8px] font-mono text-amber-500/40 uppercase tracking-widest italic">Ω_VOID_GOLD_v.200_FINALITY</p>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
}
