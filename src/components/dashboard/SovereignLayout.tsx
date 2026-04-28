'use client';

import React from 'react';
import Sidebar from './Sidebar';

/**
 * SOVEREIGN INSTITUTIONAL LAYOUT (v16.0)
 * Mission: Multi-Space Orchestration Container
 */
export default function SovereignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020205] text-white selection:bg-cyan-glow selection:text-black antialiased font-sans">
      {/* Persistent Navigation Hub */}
      <Sidebar />

      {/* Main Command Space */}
      <main className="flex-1 overflow-y-auto px-12 py-10 relative">
        {/* Absolute High-Fidelity Ambience */}
        <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-cyan-glow/5 rounded-full blur-[200px] -mr-[400px] -mt-[400px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] -ml-[300px] -mb-[300px] pointer-events-none -z-10"></div>

        {/* Content Node */}
        <div className="max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(0,240,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,240,255,0.3); }
      `}</style>
    </div>
  );
}
