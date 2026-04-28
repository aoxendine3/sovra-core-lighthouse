'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { DollarSign, Zap, Scissors, RefreshCw, BarChart, Lock } from 'lucide-react';

export default function SubSentryPage() {
  const stats = [
    { label: 'Annual Savings', value: '$2.8M', icon: <DollarSign size={10} /> },
    { label: 'Sub Truncated', value: '450K', icon: <Scissors size={10} /> },
    { label: 'Trust Audit', value: '100/100', icon: <Lock size={10} /> }
  ];

  const features = [
    {
      title: 'Zero-Click Cancel',
      desc: 'Automated dark-pattern navigation. Stop subscriptions with a single tap, even for'ghost' accounts designed to be un-cancellable.',
      icon: <Zap size={20} />
    },
    {
      title: 'Deep Scan Radar',
      desc: 'Instititutional scan of all linked financial tranches to identify hidden micro-subscriptions and trial leaks.',
      icon: <BarChart size={20} />
    },
    {
      title: 'Ghost Concierge',
      desc: 'AI-driven negotiation tranches that automatically request refunds for un-used premium periods.',
      icon: <RefreshCw size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Sub Sentry"
      category="FINTECH // UTILITY"
      description="The definitive subscription liquidation tool. Weaponizing dark-pattern navigation AI to scan, identify, and cancel 'ghost' subscriptions in one tap."
      heroImage="/assets/apps/sub-sentry.png"
      stats={stats}
      features={features}
      ctaText="Trim My Sub"
      tranchePrice="$4.99 / Month"
    />
  );
}
