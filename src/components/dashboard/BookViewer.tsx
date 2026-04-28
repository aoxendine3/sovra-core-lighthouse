'use client';

import React, { useState } from 'react';

/**
 * SOVRA Institutional Book Viewer
 * 100/100 Premium Reader for high-ticket manuscript delivery.
 */
export default function BookViewer({ manuscript }: { manuscript: string }) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-6 font-serif">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-12 overflow-hidden relative">
        {/* Institutional Branding */}
        <div className="absolute top-0 right-0 p-8">
          <span className="text-[10px] tracking-widest text-[#00FFFF] opacity-50 uppercase font-sans">SOVRA Sovereign Protocol</span>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-12 border-b border-white/5 pb-8 font-sans">
          <button onClick={() => setFontSize(Math.min(fontSize + 2, 24))} className="text-white/40 hover:text-white text-xs uppercase tracking-tighter">Increase Type</button>
          <button onClick={() => setFontSize(Math.max(fontSize - 2, 12))} className="text-white/40 hover:text-white text-xs uppercase tracking-tighter">Decrease Type</button>
        </div>

        {/* Content */}
        <div 
          className="text-white leading-relaxed whitespace-pre-wrap selection:bg-[#00FFFF]/30 selection:text-white"
          style={{ fontSize: `${fontSize}px` }}
        >
          {manuscript}
        </div>

        {/* Verifiable Baseline Seal */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center font-sans">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            Verified Ground Truth Baseline | Mission 10M | (c) 2026 SOVRA
          </p>
        </div>
      </div>
    </div>
  );
}
