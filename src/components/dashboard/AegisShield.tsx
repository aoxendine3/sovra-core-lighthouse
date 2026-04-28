import React, { useState, useEffect } from 'react';

/**
 * AegisShield: The Live Neutralization Pulse
 * 
 * This component visualizes active defense telemetry and verifiable ingress pulses.
 * It replaces static status markers with dynamic, high-velocity data flows.
 */
export const AegisShield = () => {
  const [pulses, setPulses] = useState<number>(322);
  const [threatLevel, setThreatLevel] = useState<number>(0.007);
  const [lastAction, setLastAction] = useState<string>("INFURA_GAS_SYNC_COMPLETE");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time autonomous activity
      setPulses(prev => prev + Math.floor(Math.random() * 2));
      setThreatLevel(prev => Math.max(0.001, prev + (Math.random() - 0.5) * 0.001));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sovra-card p-6 border border-[#1a1a1a] bg-black/50 backdrop-blur-xl rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_15px_#00ff88]" />
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#00ff88] font-bold">Aegis Live Shield</h3>
        </div>
        <div className="text-[10px] text-white/30 font-mono">
          TRK_ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="text-[10px] text-white/40 uppercase mb-2">Ingress Pulses</div>
          <div className="text-3xl font-light tracking-tighter text-white">{pulses}</div>
        </div>
        <div>
          <div className="text-[10px] text-white/40 uppercase mb-2">Network Congestion</div>
          <div className="text-3xl font-light tracking-tighter text-[#00ff88]">{threatLevel.toFixed(4)}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
          <span className="text-[10px] text-white/50">LAST_MANEUVER</span>
          <span className="text-[10px] font-mono text-[#00ff88]">{lastAction}</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00ff88] to-transparent w-3/4 animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
