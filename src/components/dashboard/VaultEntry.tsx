'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Fingerprint, Lock, Zap, CheckCircle2 } from 'lucide-react';

/**
 * SOVEREIGN_VAULT_ENTRY (v.010_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mode: CINEMATIC_INSTITUTIONAL_INGRESS
 * Mandate: 0.01% Aesthetic Excellence.
 * Purpose: Immersive Biometric Verification for the Executive Core.
 */
interface VaultEntryProps {
  onSuccess: () => void;
}

export const VaultEntry: React.FC<VaultEntryProps> = ({ onSuccess }) => {
  const [stage, setStage] = useState<'IDLE' | 'SCANNING' | 'VERIFYING' | 'GRANTED'>('IDLE');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === 'SCANNING') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage('VERIFYING');
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    
    if (stage === 'VERIFYING') {
      setTimeout(() => setStage('GRANTED'), 1500);
    }
    
    if (stage === 'GRANTED') {
      setTimeout(onSuccess, 1000);
    }
  }, [stage, onSuccess]);

  return (
    <div className="fixed inset-0 z-[999] bg-[#020205] flex items-center justify-center overflow-hidden">
      {/* Background Institutional Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />

      <AnimatePresence mode="wait">
        {stage !== 'GRANTED' ? (
          <motion.div 
            key="vault-ui"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="relative z-10 flex flex-col items-center space-y-12"
          >
            {/* The Scanner Disk */}
            <div className="relative w-64 h-64 flex items-center justify-center">
               <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-amber-500/20 rounded-full"
               />
               <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-white/5 rounded-full"
               />
               
               {/* Scanner Pulse */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence>
                     {stage === 'IDLE' && (
                        <motion.button
                           key="idle-btn"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => setStage('SCANNING')}
                           className="w-32 h-32 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center group shadow-[0_0_50px_rgba(245,158,11,0.1)]"
                        >
                           <Fingerprint className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform" />
                        </motion.button>
                     )}
                     
                     {stage === 'SCANNING' && (
                        <div className="relative">
                           <motion.div 
                              initial={{ y: -60 }}
                              animate={{ y: 60 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute left-[-40px] right-[-40px] h-[2px] bg-amber-500 shadow-[0_0_15px_#f59e0b] z-20"
                           />
                           <Fingerprint className="w-32 h-32 text-amber-500/40 animate-pulse" />
                        </div>
                     )}

                     {stage === 'VERIFYING' && (
                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           className="flex flex-col items-center space-y-4"
                        >
                           <Zap className="w-12 h-12 text-amber-500 animate-bounce" />
                           <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] italic">Grounding Handshake...</span>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Status & Progress */}
            <div className="text-center space-y-4">
               <h2 className="text-2xl font-black italic tracking-tightest text-white uppercase tabular-nums">
                  {stage === 'IDLE' ? 'Awaiting Biometric Pulse' : 
                   stage === 'SCANNING' ? `Scanning... ${progress}%` : 
                   'Institutional Verification'}
               </h2>
               <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic leading-none max-w-xs mx-auto">
                 {stage === 'IDLE' ? 'Ground your identity to access the sovereign core.' : 
                  'Verifying encrypted institutional nodes at exascale.'}
               </p>
            </div>

            {/* Progress Bar (v.010) */}
            <div className="w-80 h-1 bg-white/5 rounded-full overflow-hidden relative">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
               />
            </div>
          </motion.div>
        ) : (
          <motion.div 
             key="vault-granted"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-center space-y-8"
          >
             <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
             </div>
             <div className="text-center space-y-2">
                <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">Access Granted</h1>
                <p className="text-[10px] font-black text-green-500/60 uppercase tracking-[0.5em] italic">Welcome back, Commander.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Scanners */}
      <div className="absolute top-10 left-10 opacity-20">
         <div className="flex gap-4">
            {[1,2,3].map(i => <motion.div key={i} animate={{ height: [10, 40, 10] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="w-1 bg-amber-500 rounded-full" />)}
         </div>
      </div>
    </div>
  );
};
