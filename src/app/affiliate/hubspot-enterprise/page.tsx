'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight, 
  BarChart3, 
  Target,
  Users,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * SOVRA_HUBSPOT_ENTERPRISE (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: LEAD_SATURATION_APEX
 * Protocol: INSTITUTIONAL_AFFILIATE_v1.0
 * Aesthetic: PRESTIGE_OBSIDIAN (Gold/Black/Deep Blue)
 */
export default function HubSpotEnterprisePage() {
  const [projection, setProjection] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calculateROI = (leads: number) => {
    return (leads * 450).toLocaleString(); // Simplified Enterprise Proj
  };

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
        body: JSON.stringify({ ...data, asset: 'HUBSPOT_ENTERPRISE' })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[Sovereign] Lead Grounding Fault');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstitutionalRedirect = () => {
    window.open('https://www.hubspot.com/products/marketing/enterprise', '_blank');
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-amber-500/30 selection:text-black overflow-x-hidden">
      
      {/* Cinematic Aura — Deep Amber & Cobalt */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-amber-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Global Ingress Control */}
      <nav className="relative z-50 flex justify-between items-center px-12 py-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center font-black text-black italic text-xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">SS</div>
          <div className="flex flex-col">
             <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">SOVRA Sovereign</span>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] italic">Institutional_Grade_Asset</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">
          <a href="#" className="hover:text-amber-500 transition-colors">Architecture</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Yield Matrix</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Ingress API</a>
        </div>
        <button 
           onClick={handleInstitutionalRedirect}
           className="px-8 py-3 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all italic"
        >
          Institutional Access
        </button>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-12 pt-32 pb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* The Hook: Institutional Dominance */}
        <div className="space-y-12">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
             <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60">v48.3_SINGULARITY_EXASCALE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic"
          >
            HubSpot<br />
            <span className="text-amber-500 not-italic drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">Enterprise</span>
          </motion.h1>

          <p className="text-2xl text-white/40 font-light leading-relaxed italic max-w-xl">
            Authorize the deployment of the world's most sophisticated marketing automation infrastructure. consolidated for the global 0.01% executive ingress.
          </p>

          {/* Institutional Projections Matrix */}
          <div className="p-10 rounded-[48px] glass-panel border-white/5 bg-white/[0.01]">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                   <Target className="w-5 h-5 text-amber-500" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.4em] italic text-white/60">Yield Projection Matrix</h3>
                </div>
                <div className="text-[9px] font-mono text-amber-500/40">CALIBRATION: ACTIVE</div>
             </div>
             
             <div className="space-y-8">
                <div className="space-y-4">
                   <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                      <span>Market Saturation (Nodes)</span>
                      <span className="text-amber-500">{projection}</span>
                   </div>
                   <input 
                     type="range" 
                     min="100" 
                     max="5000" 
                     step="100"
                     value={projection}
                     onChange={(e) => setProjection(parseInt(e.target.value))}
                     className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-amber-500"
                   />
                </div>

                <div className="flex items-end gap-2">
                   <span className="text-6xl font-black italic tracking-tighter">${calculateROI(projection)}</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 pb-2 mb-1 border-b border-white/10">Projected_Asset_Yield / Mo</span>
                </div>
             </div>
          </div>
        </div>

        {/* The Capture: Lead Matrix Form */}
        <div className="relative">
           <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
           <AnimatePresence mode="wait">
             {!submitted ? (
               <motion.form 
                 key="lead-form"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 onSubmit={handleLeadCapture}
                 className="relative p-12 rounded-[56px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl space-y-8"
               >
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Acquire Clearance</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Institutional identification required for terminal ingress.</p>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4 italic">First Name</label>
                       <input name="firstName" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:border-amber-500/40 outline-none transition-all" placeholder="EXECUTIVE" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4 italic">Last Name</label>
                       <input name="lastName" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:border-amber-500/40 outline-none transition-all" placeholder="OFFICER" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4 italic">Institutional Email</label>
                    <input name="email" type="email" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:border-amber-500/40 outline-none transition-all" placeholder="ROOT@INSTITUTION.GLOBAL" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4 italic">Phone (Secure Line)</label>
                    <input name="phone" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:border-amber-500/40 outline-none transition-all" placeholder="+1 000 000 0000" />
                 </div>

                 <button 
                   disabled={isSubmitting}
                   className="w-full py-8 bg-amber-500 text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-3xl hover:bg-white transition-all active:scale-95 shadow-[0_25px_80px_rgba(245,158,11,0.2)] disabled:opacity-50 italic"
                 >
                   {isSubmitting ? 'Grounding Lead Pulse...' : 'Authorize Ingress'}
                 </button>

                 <div className="flex items-center justify-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                    <Lock className="w-3 h-3" />
                    SECURE_ZERO_TRUST_ENCRYPTION_ACTIVE
                 </div>
               </motion.form>
             ) : (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="relative p-16 rounded-[56px] border border-amber-500/40 bg-amber-500/5 backdrop-blur-3xl shadow-2xl text-center space-y-10"
               >
                  <div className="w-24 h-24 bg-amber-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.4)]">
                     <CheckCircle2 className="w-12 h-12 text-black" />
                  </div>
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">Identity Verified</h2>
                  <p className="text-lg text-white/60 italic leading-relaxed">
                     Your lead pulse has been verifiably grounded in the Sovereign Ledger. An Institutional Liaison will materialize on your secure line shortly.
                  </p>
                  <button 
                    onClick={handleInstitutionalRedirect}
                    className="flex items-center gap-4 mx-auto text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-colors italic"
                  >
                    Proceed to Hubspot Console
                    <ArrowRight className="w-4 h-4" />
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>

      {/* Institutional Asset Features */}
      <section className="max-w-7xl mx-auto px-12 pb-48 grid grid-cols-1 md:grid-cols-4 gap-12">
         {[
           { icon: Cpu, label: 'Exascale Reach', desc: 'Saturate the global 0.01% with zettascale precision.' },
           { icon: Shield, label: 'Zero-Trust Data', desc: 'Secure institutional tranches with temporal handshakes.' },
           { icon: BarChart3, label: 'Yield Analytics', desc: 'Real-time ROI visualizers for total capital oversight.' },
           { icon: Users, label: 'Swarm Capture', desc: 'Deploy autonomous lead swarms to capture high-value leads.' }
         ].map((f, i) => (
           <div key={i} className="p-10 rounded-[32px] border border-white/5 bg-white/[0.01] hover:border-amber-500/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-amber-500 group-hover:bg-amber-500/10 mb-8 transition-all">
                 <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-3 italic">{f.label}</h3>
              <p className="text-sm text-white/30 font-medium leading-relaxed italic">{f.desc}</p>
           </div>
         ))}
      </section>

      <footer className="px-12 py-20 border-t border-white/5 flex justify-between items-center gap-10">
         <div className="flex items-center gap-4 grayscale opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] italic text-amber-500">Hubspot Enterprise</span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic">|</span>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] italic text-white/40">Sovereign Asset</span>
         </div>
         <div className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em] italic">
            © 2026 Sovereign Singularity Hub // TRUST_VERIFIED
         </div>
      </footer>
    </main>
  );
}
