'use client';

import React from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * INSTITUTIONAL AFFILIATE NODE: Cybersecurity
 * Protocol: v2026.11_APEX (Verifiably Compliant)
 */
export default function AffiliatePage() {
  return (
    <SovereignLayout>
      <div className="max-w-6xl mx-auto px-8 py-20">
        <header className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <span className="glass-apex px-8 py-3 rounded-full border border-cyan-glow/20 text-[10px] font-black text-cyan-glow uppercase tracking-[0.5em] italic">
              Sector: Cybersecurity [INSTITUTIONAL_GRADE]
            </span>
          </motion.div>
          <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase mb-8 leading-none">
            Absolute <span className="text-cyan-glow">Cybersecurity</span> Dominance
          </h1>
          <div className="max-w-3xl mx-auto text-xl text-white/40 font-medium leading-relaxed uppercase italic">
            The Cybersecurity sector represents a critical tranche of the SOVRA Sovereign enterprise. Our institutional-grade solutions drive absolute ROI across all grounded nodes.
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {[{"name":"Aegis Edge Shield","url":"https://apex-sovereign.com/enterprise/aegis","description":"\"Pre-cognitive DDoS protection and handshake-secured API gateways for 0.01% market leaders.\"","commission":"\"$499-$9,999/mo\""}].map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-panel p-12 rounded-[48px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-[9px] font-black text-cyan-glow uppercase tracking-[0.3em] mb-6 italic">{product.commission} Yield</p>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-4">{product.name}</h3>
                <p className="text-sm text-white/40 mb-8 leading-relaxed uppercase italic">{product.description}</p>
                
                <a 
                  href={`/api/track?category=INSTITUTIONAL_REVENUE&handshake=APEX_SOVEREIGN&trace=BLOOM_SATURATION&url=${encodeURIComponent(product.url)}`}
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-cyan-glow text-black font-black uppercase italic tracking-widest hover:scale-105 transition-transform"
                >
                  SECURE ACCESS <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="text-center pt-20 border-t border-white/5">
          <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] italic">
            Verifiably Compliant (v2026.11_APEX) | SHARED_REVENUE_NODE_ACTIVE
          </p>
        </footer>
      </div>
    </SovereignLayout>
  );
}
