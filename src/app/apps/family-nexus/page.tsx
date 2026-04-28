'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Home, MapPin, Zap, MessageSquare, Bell, Calendar } from 'lucide-react';

/**
 * Family Nexus: Context-Aware household governance (v2026.11)
 * Mission: Zero-Friction Connectivity
 */
export default function FamilyNexusPage() {
  const stats = [
    { label: 'Active Households', value: '45.2K', icon: <Home size={10} /> },
    { label: 'Tasks Resolved', value: '1.4M', icon: <Bell size={10} /> },
    { label: 'Sync Efficiency', value: '98%', icon: <Zap size={10} /> }
  ];

  const features = [
    {
      title: 'Geofenced Context',
      desc: 'Automatic task prioritization based on physical location. Get 'Pick up milk' alerts exactly when you enter the store zone.',
      icon: <MapPin size={20} />
    },
    {
      title: 'Neural Calendar Sync',
      desc: 'Consolidated family agenda that predicts conflicts and suggests optimization windows.',
      icon: <Calendar size={20} />
    },
    {
      title: 'Ghost Messaging',
      desc: 'Context-specific chat threads that disappear once the associated task is verifiably closed.',
      icon: <MessageSquare size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Family Nexus"
      category="LIFESTYLE // GOVERNANCE"
      description="The definitive communication hub for the modern household. Combining real-time HUD telemetry with context-aware tasking for absolute family synchronization."
      heroImage="/assets/apps/family-nexus.png" 
      stats={stats}
      features={features}
      ctaText="Synchronize Home"
      tranchePrice="$9.99 / Month"
    />
  );
}
