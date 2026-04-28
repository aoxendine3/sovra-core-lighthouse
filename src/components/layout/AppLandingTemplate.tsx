'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Shield, Zap, TrendingUp, Info } from 'lucide-react';
import SovereignSidebar from '@/components/layout/SovereignSidebar';

interface AppLandingTemplateProps {
  title: string;
  category: string;
  description: string;
  heroImage?: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
  features: { title: string; desc: string; icon: React.ReactNode }[];
  ctaText: string;
  tranchePrice: string;
}

/**
 * Sovereign App Landing Template (v2026.11)
 * High-Theta, Institutional Archetype.
 */
export default function AppLandingTemplate({ 
  title, 
  category, 
  description, 
  heroImage, 
  stats, 
  features, 
  ctaText,
  tranchePrice 
}: AppLandingTemplateProps) {
  return (
    <div className="min-h-screen bg-[#020205] text-white flex">
      <SovereignSidebar />

      <main className="flex-1 ml-72 h-screen overflow-y-auto relative custom-scrollbar">
        {/* Backdrop Pulse */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-12 py-16 relative z-10">
          
          {/* Breadcrumbs & Navigation */}
          <nav className="flex justify-between items-center mb-12">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Vault
            </button>
            <div className="flex gap-4">
              <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                <Share2 size={14} className="text-white/40" />
              </button>
              <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                <Info size={14} className="text-white/40" />
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-[0.4em] italic">Institutional Tranche</span>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{category}</span>
                </div>
                <h1 className="text-6xl font-black italic tracking-tightest leading-none uppercase">
                  {title}
                </h1>
                <p className="text-lg text-white/40 font-medium leading-relaxed italic max-w-lg">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-8 py-8 border-y border-white/5">
                {stats.map(s => (
                  <div key={s.label} className="space-y-1">
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 italic">
                      {s.icon} {s.label}
                    </div>
                    <div className="text-xl font-mono text-white tracking-tighter">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                  {ctaText}
                </button>
                <div className="text-left">
                  <div className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">Starting Tranche</div>
                  <div className="text-lg font-mono text-cyan-400">{tranchePrice}</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="rounded-[48px] border border-white/10 overflow-hidden bg-black aspect-square relative shadow-2xl">
                {heroImage ? (
                  <img src={heroImage} alt={title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                    <Zap size={64} className="text-white/5 animate-pulse" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <section className="space-y-12 mb-32">
            <div className="flex items-center gap-4">
              <h2 className="text-[11px] font-black uppercase tracking-[0.8em] text-white/20 italic">Command Capabilities</h2>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div 
                  key={f.title}
                  className="p-8 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-400/20 transition-all space-y-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                    <p className="text-[11px] text-white/40 leading-relaxed font-medium italic">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Zero-Point Trust Badge */}
          <section className="p-12 rounded-[64px] border border-white/10 bg-gradient-to-br from-cyan-500/[0.03] to-transparent flex flex-col md:flex-row items-center justify-between gap-12 mb-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-full border border-cyan-400/20 flex items-center justify-center animate-pulse-slow bg-cyan-400/5">
                <Shield className="text-cyan-400" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Zero-Point Secured</h3>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-relaxed">Encrypted via SOVRA Deep-Locking Protocol v48.2</p>
              </div>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-2 rounded-full border border-white/10 text-[8px] font-black text-white/30 uppercase tracking-widest italic group-hover:text-cyan-400 transition-colors">Audit: 100/100</div>
               <div className="px-6 py-2 rounded-full border border-cyan-400/20 text-[8px] font-black text-cyan-400 uppercase tracking-widest italic">SiaCore Verified</div>
            </div>
          </section>

          <footer className="pt-12 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-[1em] text-white/10 italic">
            <div>© 2026 APEX SOVEREIGN LLC | APP BLITZ SIGULARITY</div>
            <div className="flex gap-12 font-mono">
              <span>Node: v2026.11_PROTOTYPE</span>
              <span>Collective: 200,000 ACTIVE</span>
            </div>
          </footer>
        </div>
      </main>

      <style jsx>{`
        .tracking-tightest { letter-spacing: -0.08em; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #020205; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </div>
  );
}
