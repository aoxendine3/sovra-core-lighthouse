import React from 'react';
import { Target, Zap } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'SAP S/4HANA Cloud | SOVRA Ad Delivery',
  description: 'Enterprise ERP Deployment.'
};

export default function SapAd() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full glass-panel p-8 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500">Ad Node: Active</span>
          </div>
          <span className="font-black text-xs text-white/30 uppercase tracking-widest">v2026.11_APEX</span>
        </header>

        <div className="relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
          <Image 
            src="/ads/sap_ad.png"
            alt="SAP ERP Asset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-black italic tracking-tighter text-white">SAP S/4HANA CLOUD</h2>
            <p className="font-mono text-sm text-amber-400 mt-2 tracking-widest">Infinite Scale. Absolute Institutional Velocity.</p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mb-6 text-xs font-mono uppercase tracking-widest text-amber-500/70">
          <span>Asset Quality:</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</button>
            <button className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">6K</button>
            <button className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</button>
            <button className="px-3 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">12K</button>
          </div>
        </div>

        <a 
          href="/api/track?target=https%3A%2F%2Fcj.com%2Flink%2Fsap-1002&handshake=APEX&category=AD_SATURATION"
          className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
        >
          <Zap className="w-5 h-5" />
          Initiate Cloud Migration
        </a>
      </div>
    </div>
  );
}
