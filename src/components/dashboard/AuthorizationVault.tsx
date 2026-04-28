'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap } from 'lucide-react';

/**
 * APEX_AUTHORIZATION_VAULT (v.100_SOVEREIGN_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: ZERO_TRUST_ULTIMA_CONTROL
 * Mode: OMEGA_VOID_AMBER
 */
export interface PendingAction {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface AuthorizationVaultProps {
  actions: PendingAction[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const AuthorizationVault: React.FC<AuthorizationVaultProps> = ({ actions, onApprove, onReject }) => {
  if (actions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#08080a] backdrop-blur-3xl p-20 rounded-[56px] border border-white/5 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-glow/5 opacity-50" />
        <div className="w-24 h-24 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center relative z-10">
            <Shield className="w-10 h-10 text-amber-500 opacity-40" />
        </div>
        <div className="space-y-4 relative z-10">
           <p className="text-[12px] font-black uppercase tracking-[0.8em] text-amber-500 italic">Perimeter Locked</p>
           <p className="text-[10px] text-white/20 italic tracking-[0.4em] uppercase">No Pending Institutional Mandates detected</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#08080a] backdrop-blur-3xl rounded-[56px] border border-white/10 overflow-hidden relative shadow-[0_80px_200px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-glow/5 opacity-40" />
      
      {/* Institutional Header */}
      <div className="bg-white/[0.02] px-12 py-12 border-b border-white/10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-8">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-center relative group">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_15px_#f59e0b]" />
                <div className="absolute inset-0 rounded-3xl group-hover:bg-amber-500/10 transition-colors" />
            </div>
            <div className="space-y-1">
                <h3 className="text-4xl font-black uppercase tracking-tightest text-white italic">Mandate Vault</h3>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] italic opacity-60">Ω_SOVEREIGN_ULTIMA_v.100</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-500" />
               <span className="text-[11px] font-black text-amber-500 tracking-[0.2em] italic uppercase">
                 {actions.length} Executables Pending
               </span>
            </div>
        </div>
      </div>

      {/* Action Tranches */}
      <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar relative z-10 bg-black/40">
        <AnimatePresence mode="popLayout">
          {actions.map((action) => (
            <motion.div 
              key={action.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-12 hover:bg-white/[0.03] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Shield className="w-40 h-40 text-amber-500" />
              </div>
              
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black bg-amber-500 text-black px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] font-mono shadow-lg">Tranche::{action.type}</span>
                      <span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase font-mono italic">Grounding_Time: {action.timestamp}</span>
                  </div>
                  <p className="text-3xl font-bold text-white/80 leading-snug tracking-tight group-hover:text-white transition-colors max-w-xl italic uppercase">
                    {action.description}
                  </p>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black text-white/5 group-hover:text-amber-500/20 transition-colors tracking-[0.6em] uppercase italic">Trace_{action.id}</div>
                   <div className="text-[9px] font-mono text-amber-500/20 mt-2">ZETTASCALE_NODE::EXECUTIVE_01</div>
                </div>
              </div>
              
              <div className="flex gap-8">
                <button 
                  onClick={() => onApprove(action.id)}
                  className="flex-1 bg-amber-500 text-black text-[14px] font-black uppercase tracking-[0.5em] py-8 rounded-[36px] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 group/btn"
                >
                  <Zap className="w-5 h-5 group-hover/btn:animate-pulse" />
                  Execute Mandate
                </button>
                <button 
                  onClick={() => onReject(action.id)}
                  className="px-12 bg-white/5 border border-white/5 text-white/40 text-[14px] font-black uppercase tracking-[0.5em] rounded-[32px] hover:bg-white/10 hover:text-white transition-all duration-500 active:scale-95 italic"
                >
                  Terminate
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
