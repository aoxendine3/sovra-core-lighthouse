/**
 * APEX_X: SOCIAL_MANEUVER_TYPES (v20.0_SENTINEL)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Browser-safe type definitions for social saturation.
 */

export interface ViralManeuver {
  platform: 'X' | 'TikTok' | 'LinkedIn' | 'YouTube Shorts';
  hook: string;
  viralProbability: number;
}
