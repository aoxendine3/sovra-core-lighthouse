'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Shield, Volume2, Video, PhoneCall, AlertTriangle, Eye } from 'lucide-react';

export default function GhostGuardPage() {
  const stats = [
    { label: 'Active Guards', value: '180K', icon: <Shield size={10} /> },
    { label: 'Deterrents Active', value: '1.2M', icon: <Volume2 size={10} /> },
    { label: 'Cloud Buffer', value: '100%', icon: <Eye size={10} /> }
  ];

  const features = [
    {
      title: 'Safe-Word Deterrent',
      desc: 'Activated by a specific, discreet voice command. AI immediately initiates a loud phone call or alarm to exit risky situations.',
      icon: <PhoneCall size={20} />
    },
    {
      title: 'Biometric Pulse Stream',
      desc: 'Real-time monitoring of wearer biometric data, alerting designated proxies if pulse or stress markers spike.',
      icon: <AlertTriangle size={20} />
    },
    {
      title: 'Invisible Cloud Blackbox',
      desc: 'Immediate, encrypted streaming of audio and video to a decentralized cloud ledger that cannot be intercepted.',
      icon: <Video size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Ghost Guard"
      category="SECURITY // AI_PROXY"
      description="The definitive voice-activated security app. Providing institutional-grade deterrents and biometric pulse monitoring for absolute personal sovereignty."
      heroImage="/assets/apps/ghost-guard.png"
      stats={stats}
      features={features}
      ctaText="Activate Guard"
      tranchePrice="$29 / Year"
    />
  );
}
