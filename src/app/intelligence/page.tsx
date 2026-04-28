'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, Zap, Search, ChevronRight, Globe, Cpu, Library, ArrowUpRight, GraduationCap } from 'lucide-react';
import ChoiceMartLayout from '@/components/retail/ChoiceMartLayout';

export default function SovereignIntelligenceTerminal() {
  const [reports, setReports] = useState<any[]>([]);
  const [activeReport, setActiveReport] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/intelligence')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReports(data);
          if (data.length > 0) setActiveReport(data[0]);
        }
      });
  }, []);

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ChoiceMartLayout>
      <div className="min-h-screen bg-[#020205] text-white">
        
        {/* Cinematic Header */}
        <header className="pt-48 pb-24 px-10 md:px-20 max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-12"
          >
            <div className="inline-flex items-center gap-4 bg-purple-500/10 border border-purple-500/20 px-8 py-3 rounded-full backdrop-blur-xl mb-8">
               <GraduationCap className="w-5 h-5 text-purple-400" />
               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-purple-400 italic">Exascale Doctorate Program</span>
            </div>
            
            <h1 className="text-7xl md:text-[9rem] font-black italic tracking-tightest leading-[0.8] uppercase italic">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-white italic">Library.</span>
            </h1>
            <p className="text-white/40 text-2xl font-bold leading-relaxed border-l-4 border-purple-500/30 pl-12 italic uppercase tracking-widest max-w-3xl">
              Synthesized intelligence extracted from global institutional ledgers. Doctorate-level mastery across 40+ intellectual tranches.
            </p>
          </motion.div>
        </header>

        <div className="max-w-[1600px] mx-auto px-10 md:px-20 pb-64 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Knowledge Ledger */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex gap-4 mb-8">
               <button className="flex-1 py-4 bg-purple-600 rounded-2xl text-[10px] font-black uppercase tracking-widest italic shadow-3xl">Doctorate Tranches</button>
               <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 italic hover:text-white hover:bg-white/10 transition-all">Resource Matrix</button>
            </div>
            
            <div className="relative mb-12">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search the Intelligence Matrix..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-[12px] font-black text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all uppercase tracking-widest italic"
              />
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {filteredReports.map((report) => (
                <motion.button
                  key={report.id}
                  onClick={() => setActiveReport(report)}
                  className={`w-full p-8 rounded-[32px] text-left transition-all border flex flex-col gap-4 group ${
                    activeReport?.id === report.id 
                      ? 'bg-purple-600 border-purple-500 shadow-3xl scale-[1.02]' 
                      : 'bg-white/[0.02] border-white/5 hover:border-purple-500/40 hover:bg-white/[0.04]'
                  }`}
                >
                   <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${activeReport?.id === report.id ? 'text-white/60' : 'text-purple-400'} italic`}>
                        {report.category}
                      </span>
                      <ArrowUpRight className={`w-4 h-4 ${activeReport?.id === report.id ? 'text-white' : 'text-white/10 group-hover:text-purple-400'}`} />
                   </div>
                   <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                     {report.title}
                   </h3>
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT: Intelligence Terminal */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeReport ? (
                <motion.div
                  key={activeReport.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-16 rounded-[64px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
                      <Library className="w-96 h-96" />
                   </div>

                   <div className="relative z-10 space-y-12">
                      <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="bg-purple-600/20 border border-purple-500/30 px-6 py-2 rounded-full flex items-center gap-3">
                           <GraduationCap className="w-4 h-4 text-purple-400" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 italic">Verified Doctoral Synthesis</span>
                        </div>
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Node_Ref: 0x{activeReport.id.toString(16).toUpperCase()}</p>
                      </div>

                      <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-white">
                        {activeReport.title}
                      </h2>

                      <div className="p-10 rounded-[32px] bg-white/[0.03] border border-white/5 space-y-6">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-400 italic">Executive_Briefing</h4>
                         <p className="text-white/60 text-lg font-bold leading-relaxed italic uppercase tracking-wider">
                           {activeReport.executive_summary}
                         </p>
                      </div>

                      <div className="space-y-8">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic">The_Doctorate_Thesis</h4>
                         <div className="prose prose-invert max-w-none">
                            <p className="text-white/80 text-xl leading-relaxed font-medium whitespace-pre-wrap">
                               {activeReport.synthesis}
                            </p>
                         </div>
                      </div>

                      <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row gap-12 justify-between items-end">
                         <div className="space-y-6 flex-1">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic">Foundational_Assets</h4>
                            <div className="flex flex-wrap gap-4">
                               {JSON.parse(activeReport.top_assets).map((asset: any, i: number) => (
                                 <div key={i} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white/40 italic">
                                   {asset.title}
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="flex gap-4 w-full lg:w-auto">
                           <button className="flex-1 lg:flex-none px-10 py-5 bg-purple-600 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-purple-700 transition-all shadow-3xl italic">
                              Acquire Synthesis
                           </button>
                           <a 
                             href={activeReport.source_url} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex-1 lg:flex-none px-10 py-5 bg-white/5 border border-white/10 text-white/40 font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-4 italic whitespace-nowrap"
                           >
                              <Globe size={16} /> View Provenance
                           </a>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center p-32 bg-white/[0.01] rounded-[64px] border border-white/5">
                   <p className="text-[12px] font-black text-white/10 uppercase tracking-[1em] italic">Initializing Knowledge Matrix...</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </ChoiceMartLayout>
  );
}
