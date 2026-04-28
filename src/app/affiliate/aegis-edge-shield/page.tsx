'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight, 
  Activity, 
  CheckCircle2,
  Lock,
  Eye,
  Radar
} from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * SOVRA_AEGIS_EDGE_SHIELD (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: CYBER_DEFENSE_SATURATION
 * Aesthetic: COBALT_PULSE (Deep Blue/Cyan/Obsidian)
 */
export default function AegisEdgeShieldPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const lock = await generateHandshake();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'X-SOVRA-DEEP-LOCK': lock, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, asset: 'AEGIS_EDGE_SHIELD' })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[Sovereign] Defense Pulse Fault');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30 selection:text-black overflow-x-hidden">
      
      {/* Cobalt Aura */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-blue-600/5 blur-[180px] rounded-full" />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-12 py-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_30px_rgba(37,99,235,0.3)]">AE</div>
          <div className="flex flex-col">
             <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Aegis Edge Shield</span>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] italic">PRE_COGNITIVE_DEFENSE</span>
          </div>
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">Scanning Vulnerabilities...</div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-12 pt-32 pb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
             <Radar className="w-3 h-3 text-blue-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60">v9.0_PRE_COGNITIVE_GRID</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
            Edge<br />
            <span className="text-blue-500 not-italic">Shield</span>
          </h1>

          <p className="text-2xl text-white/40 font-light leading-relaxed italic max-w-xl">
            Authorize the deployment of pre-cognitive defense. Pre-emptive DDoS protection and handshake-secured API gateways for the 0.01% market leaders.
          </p>

          <div className="space-y-6">
             <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                <Activity className="w-8 h-8 text-blue-500" />
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Latency Impact</div>
                   <div className="text-xl font-bold tracking-tighter text-blue-400">-{`<`}0.1ms (ZERO_OVERHEAD)</div>
                </div>
             </div>
             <div className="flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                <ShieldAlert className="w-8 h-8 text-blue-500" />
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Defense Capacity</div>
                   <div className="text-xl font-bold tracking-tighter text-blue-400">100PB/S (UNSTOPPABLE)</div>
                </div>
             </div>
          </div>
        </div>

        <div className="relative">
           <AnimatePresence mode="wait">
             {!submitted ? (
               <motion.form 
                 onSubmit={handleLeadCapture}
                 className="relative p-12 rounded-[56px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl space-y-8"
               >
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Establish Perimeter</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Provide institutional ingress points for shield activation.</p>
                 </div>
                 <input name="domain" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-blue-500/40 outline-none transition-all" placeholder="PRIMARY DOMAIN (e.g. CORP.COM)" />
                 <input name="email" type="email" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-blue-500/40 outline-none transition-all" placeholder="SECURITY_LEAD@CORP.COM" />
                 <button 
                   className="w-full py-8 bg-blue-600 text-white font-black uppercase tracking-[0.6em] text-[11px] rounded-3xl hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_25px_80px_rgba(37,99,235,0.2)] italic"
                 >
                   Authorize Shield Pulse
                 </button>
                 <div className="flex items-center justify-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                    <Eye className="w-3 h-3" />
                    PRE_COGNITIVE_MONITORING_READY
                 </div>
               </motion.form>
             ) : (
               <motion.div className="relative p-16 rounded-[56px] border border-blue-500/40 bg-blue-500/5 backdrop-blur-3xl shadow-2xl text-center space-y-10">
                  <CheckCircle2 className="w-12 h-12 text-blue-500 mx-auto" />
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">Perimeter Secure</h2>
                  <p className="text-lg text-white/60 italic">Your defense request has been grounded in the Sovereign Ledger.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
