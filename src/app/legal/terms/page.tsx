'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020205] text-white p-8 md:p-24 font-sans selection:bg-[#00FFFF]/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <p className="text-[#00FFFF] text-[10px] tracking-[0.5em] uppercase mb-4 font-bold opacity-60">Legal Sovereignty Protocol</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#A78BFA]">Service</span></h1>
          <div className="flex gap-4 items-center text-xs font-mono text-white/30 tracking-widest uppercase">
            <span>Last Updated: April 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>Version: 8.4.1 (APEX)</span>
          </div>
        </header>

        <section className="space-y-12 leading-relaxed text-zinc-400 text-lg">
          <div className="space-y-4">
            <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#00FFFF] pl-6 py-1">01. Institutional Handshake</h2>
            <p>
              Welcome to the SOVRA Sovereign LLC Workspace. By accessing our autonomous infrastructure, you agree to the following institutional terms. This protocol governs all autonomous agent interactions, asset tranches, and cryptographic maneuvers executed within the framework.
            </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#A78BFA] pl-6 py-1">02. Autonomous Agent Mandate</h2>
             <p>
               All agents deployed via the Workspace (Core, Wealth, Growth, etc.) operate under the primary directive of business optimization. You acknowledge that autonomous scaling pulses and saturation maneuvers are executed with the full authorization of the account holder.
             </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#00FFFF] pl-6 py-1">03. DeepLock Protocol</h2>
             <p>
               Unauthorized extraction of forensic metadata or reconnaissance of the SOVRA Prime Node is strictly prohibited. Any attempt to breach the DeepLock handshake will result in immediate identity rotation and termination of the sovereign access node.
             </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#A78BFA] pl-6 py-1">04. Asset Tranches & Revenue</h2>
             <p>
               Revenue generated via the Affiliate Army and Saturation Blitz components remains at the absolute command of the Sovereign Entity. SOVRA Sovereign LLC provides the orchestration layer but does not claim ownership of outbound tranches successfully captured by the User.
             </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#00FFFF] pl-6 py-1">05. Limitation of Liability</h2>
             <p>
               SOVRA Sovereign LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, resulting from your access to or use of the autonomous infrastructure.
             </p>
          </div>

          <div className="space-y-4">
             <h2 className="text-white font-black text-2xl tracking-tight uppercase italic border-l-4 border-[#A78BFA] pl-6 py-1">06. Governing Law & Jurisdiction</h2>
             <p>
               These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any legal action or proceeding arising under these terms will be brought exclusively in the federal or state courts located in Delaware.
             </p>
          </div>
        </section>

        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[10px] font-mono tracking-widest uppercase">
          <span>(c) 2026 SOVRA Sovereign LLC</span>
          <div className="flex gap-8">
            <a href="/legal/privacy" className="hover:text-white transition-colors">Privacy Matrix</a>
            <a href="/store" className="hover:text-white transition-colors">Sovereign Store</a>
          </div>
        </footer>
      </div>

      {/* Background Decorative Accent */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#00FFFF]/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none z-0"></div>
    </main>
  );
}
