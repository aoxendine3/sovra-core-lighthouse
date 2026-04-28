/**
 * APEX-X SOVEREIGN NODE: APAC-VIRAL-MEDIA-RIGHTS--TIER-1--1189
 * Standard: v60.0_SENTINEL_ELITE (100/100 Saturation)
 */
import React from 'react';
import { Shield, Smartphone, Zap, Hexagon, ChevronRight } from 'lucide-react';

export default function SaturationNode() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/5 backdrop-blur-xl animate-pulse">
            <Shield className="w-12 h-12 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
          APAC Viral Media<br />
          <span className="text-cyan-400 font-outline-2 text-transparent">SOVEREIGN_NODE_1189</span>
        </h1>

        <p className="mt-12 text-xl md:text-3xl text-white/50 font-bold max-w-3xl mx-auto leading-relaxed italic">
          "MEDIA_LICENSE - Valued at $37.5..."
        </p>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Price Widget */}
          <div className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl transition-all hover:bg-white/10">
            <span className="block text-white/40 font-black uppercase tracking-widest text-sm mb-2">Institutional Value</span>
            <span className="text-5xl font-black text-white">$37.5</span>
          </div>

          {/* Action Hub */}
          <a 
            href="/api/track?url=https%3A%2F%2Fsellvia.com%2Fproduct%2F2503&handshake=eyJhbGciOiJIUzI1NiJ9.eyJzb3ZlcmVpZ24iOiJaRU5JVEhfQVBFWCIsImp0aSI6IjJkYTk5MGVlLTVmMzQtNDYyNi1hN2U3LWMxMTU1NzE4NmY2ZCIsImlhdCI6MTc3NjE4NzUxNCwiZXhwIjoxNzc2MTg3NTc0fQ.opD76TsDiqsjSl81TA6jfsfT2RpUN8TMbkwhbkjfLMU&category=APPLE_ACCESSORIES_SOVEREIGN&trace=AAL_SATURATION_1189"
            className="group px-12 py-6 bg-cyan-400 text-black font-black uppercase tracking-[0.5em] text-xl rounded-full transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)] active:scale-95 flex items-center gap-4"
          >
            Establish Link
            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, label: 'Ultra-Secure Pulse', val: 'APEX-X' },
            { icon: Smartphone, label: 'Form Factor', val: 'Perfect Fit' },
            { icon: Hexagon, label: 'Ledger Integrity', val: '100%' }
          ].map((item, idx) => (
            <div key={idx} className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] text-left">
              <item.icon className="w-8 h-8 text-cyan-500 mb-4" />
              <div className="text-white/40 font-bold text-sm uppercase mb-1">{item.label}</div>
              <div className="text-xl font-black">{item.val}</div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Visual Artifacts */}
      <div className="fixed bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}
