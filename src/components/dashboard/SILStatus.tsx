'use client';

import React from 'react';
import { Shield, HardDrive, Cpu, Activity } from 'lucide-react';

interface SILIdentity {
  did: string;
  name: string;
  status: 'ACTIVE' | 'REVOKED' | 'PENDING';
  timestamp: string;
}

const identities: SILIdentity[] = [
  { did: 'did:sov:agent:the-producer-v1', name: 'TheProducer', status: 'ACTIVE', timestamp: new Date().toISOString() },
  { did: 'did:sov:agent:growth-alpha-09', name: 'GrowthAgent', status: 'ACTIVE', timestamp: new Date().toISOString() },
  { did: 'did:sov:agent:affiliate-blast-x', name: 'AffiliateAgent', status: 'ACTIVE', timestamp: new Date().toISOString() },
];

export const SILStatus: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Sovereign Identity Ledger
            </h2>
            <p className="text-xs text-white/40 font-mono tracking-wider">PROTOCOL: UIP-v1.0 (SSI)</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Secured</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {identities.map((id) => (
          <div 
            key={id.did}
            className="flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10">
                <Cpu className="w-4 h-4 text-white/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">{id.name}</p>
                <p className="text-[10px] text-white/30 font-mono truncate w-48">{id.did}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-white/40 mb-1">Status</div>
              <span className="text-[10px] font-bold text-blue-400/80 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                {id.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-white/30" />
          <span className="text-[10px] text-white/30 uppercase tracking-tighter">Real-time DID Anchoring Active</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-white/5 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
