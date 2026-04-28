'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export default function AegisHealth() {
  const [status, setStatus] = useState('AUDITING');
  const [score, setScore] = useState(100);

  useEffect(() => {
    // Simulate real-time compliance heartbeat
    const timer = setTimeout(() => {
      setStatus('SECURE');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-3 backdrop-blur-xl">
      <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 italic mb-1">Legal_Integrity</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black uppercase tracking-widest ${status === 'SECURE' ? 'text-emerald-400' : 'text-amber-400'} italic`}>
            {status}
          </span>
          <span className="text-xs font-mono text-white/40">[{score}%]</span>
        </div>
      </div>
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${status === 'SECURE' ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-amber-500/30 bg-amber-500/10'}`}>
         {status === 'SECURE' ? <Shield size={14} className="text-emerald-400" /> : <AlertTriangle size={14} className="text-amber-400" />}
      </div>
    </div>
  );
}
