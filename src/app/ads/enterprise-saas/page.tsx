import React from 'react';
import Image from 'next/image';

/**
 * AD_SATURATION_ENTRY: Enterprise_SaaS (v1.0_APEX)
 */
const AdSaaSPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      {/* 1. INSTITUTIONAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20" />
            <span className="text-xl font-bold tracking-tighter uppercase">SOVRA Core</span>
          </div>
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-200 transition-colors">
            Request Demo
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION (THE CORE) */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              v1.0_APEX Sovereign
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              Ground Your Enterprise in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Absolute Reality.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
              Hyper-Sovereign Workflow Singularity. Orchestrate exascale industrial tranches with zero-latency cognitive synchronization.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl shadow-xl shadow-cyan-500/20 hover:bg-cyan-500 transition-all transform hover:-translate-y-1">
                Initiate Ingress
              </button>
              <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
                Audit Registry
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative aspect-square rounded-[2rem] border border-white/10 bg-gray-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/enterprise_saas_hero_1776804129634.png" 
                alt="SOVRA Core Dashboard" 
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </main>

      {/* 3. TECHNICAL MATRIX */}
      <section className="py-20 border-t border-white/10 bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <h3 className="text-3xl font-bold mb-2">1.2 PB/s</h3>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Data Velocity</p>
          </div>
          <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <h3 className="text-3xl font-bold mb-2">100/100</h3>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Integrity Handshake</p>
          </div>
          <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <h3 className="text-3xl font-bold mb-2">24/7</h3>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Sovereign Uptime</p>
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase">
        &copy; 2026 APEX SOVEREIGN LLC // ALL TRANCHES RESERVED
      </footer>
    </div>
  );
};

export default AdSaaSPage;
