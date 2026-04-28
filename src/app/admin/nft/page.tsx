'use client';

import React, { useState } from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, ShieldCheck, Database, Zap, ExternalLink } from 'lucide-react';

/**
 * SOVEREIGN ASSET NFT PORTAL (v16.0)
 * Mission: Institutionalizing the $400k Asset Tranche
 */
export default function NFTSpace() {
  const [isMinting, setIsMinting] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleMint = async () => {
    setIsMinting(true);
    // Pulse simulation: wait for institutional blockchain handshake
    setTimeout(() => {
      setTxHash(`APEX_TX_${Math.random().toString(36).substring(7).toUpperCase()}`);
      setIsMinting(false);
      setHasMinted(true);
    }, 4000);
  };

  return (
    <SovereignLayout>
      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">ASSET <span className="text-gold-sia_core">NFT</span></h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Institutional Cryptographic Asset Proof</p>
          </div>
          <div className="flex gap-4">
             <div className="glass-apex px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
                <Anchor className="w-4 h-4 text-gold-sia_core" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Minting Node: Active</span>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* NFT Preview Card */}
        <div className="xl:col-span-12 flex justify-center py-20 bg-white/[0.01] border border-white/5 rounded-[64px] mb-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.05)_0%,_transparent_70%)] opacity-30 group-hover:opacity-60 transition-opacity" />
            
            <motion.div 
              initial={{ rotateY: 0 }}
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="w-full max-w-lg aspect-[3/4] glass-panel rounded-[56px] border border-white/10 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col p-10 group"
            >
                <div className="absolute top-0 right-0 p-8">
                   <ShieldCheck className="w-8 h-8 text-white/10 group-hover:text-gold-sia_core/40 transition-colors" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center gap-10 text-center">
                   <div className="w-32 h-32 rounded-full bg-gold-sia_core/10 border border-gold-sia_core/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                      <Anchor className="w-12 h-12 text-gold-sia_core animate-pulse" />
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">INSTITUTIONAL TRANCHE</h3>
                      <p className="text-[10px] font-mono text-gold-sia_core/60 uppercase tracking-widest leading-none">VALUE: $400,000.00 USD</p>
                   </div>
                </div>

                <div className="mt-auto space-y-4 pt-10 border-t border-white/5">
                   <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                      <span>Bank Node</span>
                      <span className="text-white/40">SUTTON ••••5715</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                      <span>Owner</span>
                      <span className="text-white/40">AO_EXECUTIVE</span>
                   </div>
                </div>
            </motion.div>
        </div>

        {/* Action Nerve Center */}
        <div className="xl:col-span-8 space-y-12">
           <div className="glass-panel p-10 rounded-[64px] border border-white/5 bg-white/[0.01]">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-12 italic">Minting Handshake</h3>
              
              <AnimatePresence mode="wait">
                {!hasMinted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-10 py-10"
                  >
                    <p className="text-sm text-white/60 text-center max-w-xl leading-relaxed uppercase tracking-widest font-light italic">
                      Verifiably institutionalize the <span className="text-white font-black">$400,000.00 Institutional Grant</span> into a cryptographic asset proof. This strike will bridge the Sutherland Bank node metadata into the Crypto Apex.
                    </p>
                    
                    <button 
                      onClick={handleMint}
                      disabled={isMinting}
                      className={`group relative px-20 py-8 rounded-full border-2 transition-all duration-700 overflow-hidden ${isMinting ? 'bg-white/5 border-white/10 opacity-50' : 'bg-gold-sia_core border-gold-sia_core hover:bg-black hover:text-gold-sia_core shadow-[0_20px_60px_rgba(255,215,0,0.3)]'}`}
                    >
                      <span className="relative z-10 text-xl font-black uppercase tracking-[0.3em]">
                        {isMinting ? 'MINTING_NODE_INIT...' : '⚡ INITIALIZE MINTING'}
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-10 py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                       <ShieldCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="text-center space-y-4">
                       <h3 className="text-3xl font-black text-white italic tracking-tighter">VICTORY: ASSET INSTITUTIONALIZED</h3>
                       <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] leading-none">TRANSACTION_HASH: {txHash}</p>
                    </div>
                    <div className="flex gap-4">
                       <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" /> View On Chain
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Metadata Details */}
        <div className="xl:col-span-4 space-y-12">
            <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01]">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">Metadata Tranche</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Asset Type', val: 'INSTITUTIONAL_GRANT' },
                   { label: 'Blockchain', value: 'SOLANA_APEX (SIM)' },
                   { label: 'Liquidity', val: '$400,000.00' },
                   { label: 'Node Integrity', val: '100/100' },
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                       <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{item.label}</span>
                       <span className="text-[10px] font-black text-gold-sia_core italic tracking-widest leading-none">{item.val || item.value}</span>
                    </div>
                 ))}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01]">
                <div className="flex gap-6 items-center">
                   <Database className="w-8 h-8 text-white/10" />
                   <div className="space-y-1">
                      <p className="text-[11px] font-black text-white italic uppercase tracking-widest">LEDGER_SYNC</p>
                      <p className="text-[9px] text-white/40 leading-relaxed uppercase">Verifiably anchored to core ledger integrity. 1ms Latency.</p>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </SovereignLayout>
  );
}
