'use client';

import React, { useState } from 'react';

/**
 * DynamicNicheHero: v2026.11_APEX
 * MISSION: ELEGANT_FALLBACK_MANAGEMENT
 * Purpose: Handles niche-specific hero images with graceful fallbacks.
 */
export function DynamicNicheHero({ niche }: { niche: string }) {
  const [error, setError] = useState(false);
  const nicheKey = niche === 'saas' ? 'enterprise_saas' : niche;

  if (error) return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden opacity-30">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-carbon to-carbon" />
    </div>
  );

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden opacity-30">
      <img 
         src={`/assets/heros/${nicheKey}.png`} 
         alt=""
         className="w-full h-full object-cover blur-sm scale-110"
         onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/0 via-carbon/50 to-carbon" />
    </div>
  );
}
