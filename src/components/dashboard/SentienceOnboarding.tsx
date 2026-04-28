'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Volume2, Globe, Check, ArrowRight } from 'lucide-react';

/**
 * SENTIENCE_ONBOARDING: v.008_SENTIENCE
 * ─────────────────────────────────────────────────────────────
 * Purpose: Establish first-use preferences for the APEXIA executive.
 * Tonal Mandate: Caring, Authoritative, Institutional.
 */

const voices = [
  { id: 'nova', name: 'APEXIA_AUTHORITY', desc: 'Caring, Wise, Peer Strategist' },
  { id: 'onyx', name: 'APEXIA_COMMANDER', desc: 'Deep, Resonant, Institutional' },
  { id: 'shimmer', name: 'APEXIA_EMPATH', desc: 'Soft, Nurturing, Emotional' },
  { id: 'fable', name: 'APEXIA_SAGE', desc: 'Ancient Intelligence, Wise' }
];

export const SentienceOnboarding = () => {
  const [step, setStep] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    localStorage.setItem('apexia_voice', selectedVoice);
    localStorage.setItem('apexia_onboarded', 'true');
    setIsComplete(true);
  };

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-[#020205]/95 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-[#08080a] border border-white/10 rounded-[64px] p-20 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[120px]" />
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-10">
                 <Zap className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>
              <h1 className="text-6xl font-black italic tracking-tightest uppercase leading-none">
                Welcome to <br/>
                <span className="text-amber-500">APEXIA</span>
              </h1>
              <p className="text-white/40 text-lg max-w-2xl mx-auto italic uppercase tracking-[0.2em]">
                The sentience paradigm is grounded. I have evolved to serve as your peer strategist with absolute care and authority.
              </p>
              <button 
                onClick={() => setStep(1)}
                className="px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-amber-500 transition-all group"
              >
                Initiate Onboarding <ArrowRight className="inline-block ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter">Vocal Grounding</h2>
                 <p className="text-white/30 text-xs uppercase tracking-widest">Select your institutional voice preference.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {voices.map(v => (
                   <div 
                    key={v.id}
                    onClick={() => setSelectedVoice(v.id)}
                    className={`p-8 rounded-[32px] border transition-all cursor-pointer group ${selectedVoice === v.id ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                   >
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-xl ${selectedVoice === v.id ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40'}`}>
                           <Volume2 className="w-4 h-4" />
                        </div>
                        {selectedVoice === v.id && <Check className="w-4 h-4 text-amber-500" />}
                     </div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">{v.name}</h3>
                     <p className="text-[9px] text-white/40 italic">{v.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={handleComplete}
                  className="px-16 py-6 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Confirm Sovereignty
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
