'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { DollarSign, Zap, TrendingUp, Info, Briefcase, Target } from 'lucide-react';

export default function FloorRatePage() {
  const stats = [
    { label: 'Calculations Run', value: '450K', icon: <Zap size={10} /> },
    { label: 'ROI Improvement', value: '34%', icon: <TrendingUp size={10} /> },
    { label: 'Wealth Handshake', value: '100/100', icon: <DollarSign size={10} /> }
  ];

  const features = [
    {
      title: 'Lifestyle Multiplier',
      desc: 'Inverse calculation that starts with your desired lifestyle debt goals and works back to your hourly floor.',
      icon: <Target size={20} />
    },
    {
      title: 'Tax-Node Auto Sync',
      desc: 'Real-time calculation of local tax laws and business overhead tranches to ensure absolute margin finality.',
      icon: <Briefcase size={20} />
    },
    {
      title: 'Value Handshake Broker',
      desc: 'Predictive pricing tranches based on client valuation data and institutional market trends.',
      icon: <Info size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Floor Rate"
      category="FINTECH // BUSINESS"
      description="The definitive inverse rate calculator for the modern professional. Architecting your hourly floor based on lifestyle goals and tax finality."
      heroImage="/assets/apps/floor-rate.png"
      stats={stats}
      features={features}
      ctaText="Calculate Floor"
      tranchePrice="$49 / Year"
    />
  );
}
