'use client';

import React from 'react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface SOVRAAcquisitionButtonProps {
  keywords: string;
  category: string;
  source: string;
  label?: string;
  className?: string;
}

/**
 * SOVRAAcquisitionButton: Institutional Grade Interaction (v2.0)
 * ─────────────────────────────────────────────────────────────
 * MISSION: BROWSER_SIDE_ACQUISITION
 * Purpose: Encapsulates handshake generation and redirection logic.
 * Decouples interactivity from Server Component node pages.
 */
export const SOVRAAcquisitionButton: React.FC<SOVRAAcquisitionButtonProps> = ({
  keywords,
  category,
  source,
  label = 'NODE BEREITSTELLEN',
  className = 'px-8 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-glow transition-all duration-500 shadow-xl'
}) => {
  const handleAcquisition = async () => {
    try {
      const lock = await generateHandshake();
      const target = encodeURIComponent(`https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=SOVRA_APEXpettech20-20`);
      window.location.href = `/api/track?url=${target}&handshake=${lock}&category=${category}&source=${source.toUpperCase()}`;
    } catch (err) {
      console.error('[SOVRAAcquisition] LOCK_FAILURE:', err);
    }
  };

  return (
    <button onClick={handleAcquisition} className={className}>
      {label}
    </button>
  );
};
