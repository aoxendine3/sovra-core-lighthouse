import React from 'react';
import Image from 'next/image';

/**
 * AD_SATURATION_ENTRY: Private_Aviation (v1.0_APEX)
 */
const AdAviationPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-slate-500/30">
      {/* 1. INSTITUTIONAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg shadow-lg shadow-slate-500/20" />
            <span className="text-xl font-bold tracking-tighter uppercase">SOVRA Air</span>
          </div>
          <button className="px-6 py-2 bg-slate-200 text-black font-semibold rounded-full text-sm hover:bg-white transition-colors">
            Book Flight
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-500/30 bg-slate-500/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
              v1.0_AIR Institutional
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">
                Sovereignty.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
              Experience unmatched luxury and exclusivity with SOVRA Air. Private jet charter engineered for the institutional executive.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-slate-200 text-black font-bold rounded-xl shadow-xl shadow-slate-500/20 hover:bg-white transition-all transform hover:-translate-y-1">
                Confirm Charter
              </button>
              <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
                Audit Fleet
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-slate-500 to-slate-400 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative aspect-square rounded-[2rem] border border-white/10 bg-gray-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/private_aviation_hero_1776804214409.png" 
                alt="SOVRA Air Challenger 350" 
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase">
        &copy; 2026 APEX AIR // FLIGHTS GROUNDED
      </footer>
    </div>
  );
};

export default AdAviationPage;
