'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Download, ArrowRight, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    // Simulate verification delay for institutional feel
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
      
      {/* Ambient background pulses */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#cd9d3f]/5 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full glass-panel p-12 md:p-20 rounded-[80px] border-white/5 relative z-10 shadow-3xl text-center"
      >
        {status === 'verifying' && (
          <div className="space-y-12">
            <div className="relative w-32 h-32 mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-[#cd9d3f] rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-10 h-10 text-[#cd9d3f]/40" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Verifying Acquisition</h1>
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] italic font-mono animate-pulse">
                Establishing handshake with Gumroad Ledger...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Handshake Verified</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tightest uppercase leading-[0.8] mb-8">
                Asset <br/><span className="gold-gradient">Secured.</span>
              </h1>
              <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] italic leading-relaxed max-w-xl mx-auto">
                The institutional acquisition is complete. Your tranches have been verifiably allocated to your account provenance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <Link href="/dashboard" className="w-full">
                <button className="w-full py-8 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-white/10 transition-all italic flex items-center justify-center gap-4 group">
                  <ArrowRight className="w-4 h-4 text-[#cd9d3f] group-hover:translate-x-2 transition-transform" />
                  Enter Dashboard
                </button>
              </Link>
              <Link href="/ai-hub" className="w-full">
                <button className="w-full py-8 bg-[#cd9d3f] text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:scale-105 transition-all italic shadow-2xl flex items-center justify-center gap-4">
                  <Zap className="w-4 h-4" />
                  Initialize Assets
                </button>
              </Link>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="text-left">
                 <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] mb-2 italic">Product_Identifier</p>
                 <p className="text-xs font-mono text-white/40">{productId || 'SOVRA_GENERIC_ACQUISITION'}</p>
               </div>
               <div className="flex items-center gap-4 opacity-30 grayscale italic text-[10px] font-black tracking-widest uppercase">
                  <span>Sovereign Proof-of-Funds</span>
                  <div className="w-px h-4 bg-white/20" />
                  <span>v15.0_SIG</span>
               </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
