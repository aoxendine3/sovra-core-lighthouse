'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  CheckCircle2,
  Lock,
  Plane,
  Navigation,
  Wind,
  Layers
} from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * sovra_jets (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: GLOBAL_MOBILITY_APEX
 * Aesthetic: OBSIDIAN_PLATINUM (Silver/Black/Deep Sky)
 */
export default function ApexJetsPage() {
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
        body: JSON.stringify({ ...data, asset: 'APEX_JETS' })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[Sovereign] Mobility Grounding Fault');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050508] text-white font-sans selection:bg-slate-500/30 selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-slate-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-900/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-12 py-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-300 flex items-center justify-center font-black text-black italic text-xl shadow-[0_0_30px_rgba(203,213,225,0.3)]">AJ</div>
          <div className="flex flex-col">
             <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Apex Jets</span>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] italic">SOVRA_GLOBAL_MOBILITY</span>
          </div>
        </div>
        <button 
           className="px-8 py-3 rounded-full border border-slate-500/40 bg-slate-500/5 text-slate-300 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all italic"
        >
          Request Flight Manifest
        </button>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-12 pt-32 pb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
             <Navigation className="w-3 h-3 text-slate-400 animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60">v44.8_STRATOSPHERE_SYNC</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic text-white">
            Apex<br />
            <span className="text-slate-400 not-italic">Jets</span>
          </h1>

          <p className="text-2xl text-white/40 font-light leading-relaxed italic max-w-xl">
            Sovereign global mobility for the exascale elite. Private stratospheric transit coordinated by our autonomous flight-optimization swarm.
          </p>

          <div className="grid grid-cols-2 gap-8">
             <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
                <Plane className="w-6 h-6 text-slate-400" />
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Fleet Size</div>
                <div className="text-3xl font-black italic">850+ AIRCRAFT</div>
             </div>
             <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
                <Wind className="w-6 h-6 text-slate-400" />
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Response Time</div>
                <div className="text-3xl font-black italic">&lt; 2 HOURS</div>
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
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Mobility Ingress</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Provide flight requirements for immediate scheduling.</p>
                 </div>
                 <div className="space-y-4">
                    <div className="relative">
                      <Layers className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input name="company" required className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-sm focus:border-slate-400/40 outline-none transition-all" placeholder="ORGANIZATION / FAMILY OFFICE" />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input name="email" type="email" required className="w-full bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-sm focus:border-slate-400/40 outline-none transition-all" placeholder="EXECUTIVE_ADMIN@DOMAIN.TLD" />
                    </div>
                 </div>
                 <button 
                   disabled={isSubmitting}
                   className="w-full py-8 bg-slate-200 text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-3xl hover:bg-white transition-all active:scale-95 italic disabled:opacity-50"
                 >
                   {isSubmitting ? 'SCHEDULING...' : 'INITIATE FLIGHT PROTOCOL'}
                 </button>
                 <div className="flex items-center justify-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                    <Lock className="w-3 h-3" />
                    SECURE_QUANTUM_HANDSHAKE_v11
                 </div>
               </motion.form>
             ) : (
               <motion.div className="relative p-16 rounded-[56px] border border-slate-500/40 bg-slate-500/5 backdrop-blur-3xl shadow-2xl text-center space-y-10">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">Manifest Authorized</h2>
                  <p className="text-lg text-white/60 italic">Your mobility request has been verifiably grounded. Logistics synchronization in progress.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
