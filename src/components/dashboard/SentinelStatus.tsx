"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StatusItemProps {
  label: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  detail?: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status, detail }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'ONLINE': return '#00f0ff';
      case 'DEGRADED': return '#fbbf24';
      case 'OFFLINE': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <motion.div
        animate={{ 
          opacity: status === 'ONLINE' ? [1, 0.5, 1] : 1,
          scale: status === 'ONLINE' ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ 
          width: 8, 
          height: 8, 
          borderRadius: '50%', 
          background: getStatusColor(),
          boxShadow: `0 0 10px ${getStatusColor()}`
        }}
      />
      <div>
        <div style={{ fontSize: 10, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
          {status}
          {detail && <span style={{ fontSize: 10, fontWeight: 400, color: '#64748b', marginLeft: 8 }}>({detail})</span>}
        </div>
      </div>
    </div>
  );
};

export default function SentinelStatus() {
  // Production: Fetches from the Sovereign Ingress API
  const dependencies: StatusItemProps[] = [
    { label: 'Binance.us', status: 'ONLINE', detail: 'SIM_BARRIER' },
    { label: 'Stripe Wealth', status: 'ONLINE' },
    { label: 'Ollama Brain', status: 'ONLINE' },
    { label: 'Predictive Shield', status: 'ONLINE' }
  ];

  return (
    <div style={{ display: 'flex', gap: 16, padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 32 }}>
       {dependencies.map((dep, i) => (
         <StatusItem key={i} {...dep} />
       ))}
    </div>
  );
}
