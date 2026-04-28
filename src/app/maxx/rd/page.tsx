'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface RDLog {
  id: number;
  agent_name: string;
  activity: string;
  status: string;
  timestamp: string;
}

// ─── Components ────────────────────────────────────────────────────────────────
function RDLogItem({ log }: { log: RDLog }) {
  return (
    <div className="flex gap-4 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:bg-white/[0.04] transition-all group">
      <div className="flex flex-col items-center pt-1">
        <div className={`w-2 h-2 rounded-full ${log.status === 'COMPLETED' ? 'bg-[#00FFFF]' : 'bg-amber-400 animate-pulse'}`} />
        <div className="w-px h-full bg-white/[0.1] my-2" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-black tracking-widest text-[#00FFFF]/60 uppercase">{log.agent_name}</span>
          <span className="text-[9px] text-zinc-600 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
        </div>
        <p className="text-sm font-medium text-white group-hover:text-[#00FFFF] transition-colors">{log.activity}</p>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Status: <span className={log.status === 'COMPLETED' ? 'text-green-500' : 'text-amber-500'}>{log.status}</span>
        </div>
      </div>
    </div>
  );
}

const SOVEREIGN_INSIGHTS = [
  "Privacy is Currency. Decentralized wealth is the only sovereign path.",
  "Automation is the ultimate leverage. 1 human + Maxx > 1,000 employees.",
  "Security is not a feature; it is the foundation of the $10M vault.",
];

// ─── Main R&D Lab ─────────────────────────────────────────────────────────────
export default function RDLab() {
  const [logs, setLogs] = useState<RDLog[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch('/api/jarvis/logs');
        const data = await res.json();
        if (data.success) setLogs(data.logs);
      } catch (e) {
        console.error('Failed to fetch real logs', e);
      }
    }
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // 5s institutional heartbeat
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060c] text-white selection:bg-[#00FFFF]/30 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#00FFFF]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#7B2FBE]/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <header className="mb-16">
          <Link href="/jarvis" className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-[#00FFFF] transition-colors flex items-center gap-2 mb-8" id="back_to_command">
            ← BACK TO COMMAND CENTER
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-full text-[10px] font-black text-[#00FFFF] uppercase tracking-widest">
              Department: Master R&D
            </div>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">
              Security: Sovereign Lockdown
            </div>
          </div>
          <h1 className="text-6xl font-black tracking-tight uppercase italic leading-none">
            Intelligence <span className="text-[#00FFFF]">Lab</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-4 font-medium max-w-2xl tracking-wide uppercase leading-loose">
            The top 1% research engine of SOVRA Enterprise. Developing autonomous systems, 
            encrypted digital wealth modules, and recursive intelligence protocols.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logs Section */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 italic">Production Logs</h2>
              <div className="text-[10px] font-mono text-[#00FFFF]">AUTO-REFRESH: ACTIVE</div>
            </div>
            <div className="space-y-4">
              {logs.length > 0 ? (
                logs.map((log: RDLog) => <RDLogItem key={log.id} log={log} />)
              ) : (
                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                    Initializing Sovereign Real-Time Audit Feed...
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Insights Section */}
          <aside className="space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 italic mb-6 text-right lg:text-left">Sovereign Insights</h3>
              <div className="space-y-6">
                {SOVEREIGN_INSIGHTS.map((insight: string, i: number) => (
                  <div key={i} className="p-6 bg-[#00FFFF]/5 border-l-2 border-[#00FFFF] rounded-r-xl">
                    <p className="text-sm font-medium leading-relaxed italic text-white/80">&quot;{insight}&quot;</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 italic mb-6">Active R&D Focus</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl text-center">
                  <div className="text-lg font-black text-[#00FFFF]">99.9%</div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Uptime</div>
                </div>
                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl text-center">
                  <div className="text-lg font-black text-[#00FFFF]">38</div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Agents Active</div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
          <div className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.8em]">
            Institutional Grade · Flaws Zero · SOVRA Sovereignty © 2026
          </div>
        </footer>
      </div>
    </div>
  );
}
