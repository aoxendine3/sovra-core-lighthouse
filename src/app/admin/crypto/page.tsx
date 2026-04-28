'use client';

import React from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import TradingViewWidget from '@/components/dashboard/TradingViewWidget';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Bitcoin, TrendingUp, Zap, Radio } from 'lucide-react';

/**
 * SOVEREIGN CRYPTO SPACE (v16.0)
 * Mission: Real-Time Decentralized Asset Management
 */
const data = [
  { time: '00:00', price: 62000 },
  { time: '04:00', price: 63500 },
  { time: '08:00', price: 62800 },
  { time: '12:00', price: 65100 },
  { time: '16:00', price: 64200 },
  { time: '20:00', price: 66800 },
  { time: '23:59', price: 65500 },
];

export default function CryptoSpace() {
  return (
    <SovereignLayout>
      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">CRYPTO <span className="text-cyan-glow">SPACE</span></h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Real-Time Decentralized Asset Monitoring</p>
          </div>
          <div className="flex gap-4">
             <div className="glass-apex px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
                <Radio className="w-4 h-4 text-cyan-glow animate-pulse" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Market Node: Active</span>
             </div>
          </div>
        </div>
      </header>

      {/* Primary Ticker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'BITCOIN / USD', val: '$65,502.12', trend: '+4.2%', color: 'text-orange-400' },
          { label: 'ETHEREUM / USD', val: '$3,412.80', trend: '+2.1%', color: 'text-purple-400' },
          { label: 'SOLANA / USD', val: '$142.45', trend: '+12.4%', color: 'text-cyan-glow' },
          { label: 'CO-TREND (SOVRA)', val: '$3,450.00', trend: '+34.2%', color: 'text-sovereign-neon' },
        ].map((ticker, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-[40px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
          >
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4 italic leading-none">{ticker.label}</p>
            <div className="text-2xl font-black text-white italic mb-2 tracking-tight">{ticker.val}</div>
            <div className={`text-xs font-bold ${ticker.color} tracking-widest`}>{ticker.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Real-Time Price Graph */}
        <div className="xl:col-span-8 flex flex-col gap-12">
          <div className="glass-panel p-10 rounded-[64px] border border-white/5 bg-white/[0.01] relative overflow-hidden h-[450px]">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">Institutional Growth Curve</h3>
               <span className="text-[9px] font-mono text-cyan-glow/40">V16.0_ENGINE</span>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip 
                  contentStyle={{background: '#050510', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '10px'}} 
                  itemStyle={{color: '#00f0ff'}}
                />
                <Area type="monotone" dataKey="price" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <TradingViewWidget symbol="BINANCE:BTCUSDT" />
        </div>

        {/* Action Sidebar */}
        <div className="xl:col-span-4 space-y-12">
           <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-glow/5 blur-[100px]"></div>
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">Asset Concentration</h3>
              <div className="space-y-8">
                 {[
                   { asset: 'BTC', concentration: '45%', color: 'bg-orange-400' },
                   { asset: 'ETH', concentration: '25%', color: 'bg-purple-400' },
                   { asset: 'SOL', concentration: '20%', color: 'bg-cyan-glow' },
                   { asset: 'SOVRA', concentration: '10%', color: 'bg-sovereign-neon' },
                 ].map((node, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/60 italic">
                       <span>{node.asset}</span>
                       <span>{node.concentration}</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: node.concentration }}
                        transition={{ delay: 1 + (i * 0.1), duration: 2 }}
                        className={`h-full ${node.color}`} 
                       />
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-8 italic">Signal AI</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-cyan-glow/5 border border-cyan-glow/10 flex items-start gap-6">
                   <div className="w-10 h-10 rounded-xl bg-cyan-glow/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-cyan-glow" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-white italic tracking-widest uppercase">BTC_PULSE_94</p>
                      <p className="text-[9px] text-white/40 leading-relaxed uppercase">Strong buy signal detected in S&P 500 correlation matrix. Alpha extraction active.</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </SovereignLayout>
  );
}
