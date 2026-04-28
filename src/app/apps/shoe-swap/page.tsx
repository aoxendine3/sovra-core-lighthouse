'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { RefreshCw, MapPin, Users, Heart, Camera, CheckCircle } from 'lucide-react';

/**
 * Shoe Swap: High-Theta Marketplace (v2026.11)
 * Mission: Mirror-Vision Ingress
 */
export default function ShoeSwapPage() {
  const stats = [
    { label: 'Active Swappers', value: '12.4K', icon: <Users size={10} /> },
    { label: 'Successful Matches', value: '8.2K', icon: <CheckCircle size={10} /> },
    { label: 'Alpha Liquidity', value: '$240K', icon: <Heart size={10} /> }
  ];

  const features = [
    {
      title: 'Mirror-Vision AI',
      desc: 'Sophisticated neural scan to match size, wear pattern, and gait mechanics for perfectly synchronized pairs.',
      icon: <Camera size={20} />
    },
    {
      title: 'Geofence Swapping',
      desc: 'Real-time localized matching to eliminate shipping overhead and ensure high-velocity handshakes.',
      icon: <MapPin size={20} />
    },
    {
      title: 'Zero-Cost Liquidation',
      desc: 'Split the cost of new high-ticket footwear tranches with your designated mirror-node.',
      icon: <RefreshCw size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Shoe Swap"
      category="LIFESTYLE // MARKETPLACE"
      description="The definitive P2P marketplace for the limb-different community. Weaponizing Mirror-Vision AI to match stylish sneakers for those who only need one."
      heroImage="/assets/apps/shoe-swap.png"
      stats={stats}
      features={features}
      ctaText="Find Mirror Node"
      tranchePrice="$29 / Swapping Lifetime"
    />
  );
}
