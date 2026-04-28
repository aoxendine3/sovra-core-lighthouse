import { MarketTrend } from './trendService';

/**
 * techStackService (Institutional Technology Forge)
 * Mandate: Optimal tranche selection for exascale builds.
 */

export class TechStackService {
  determineTechStack(trend: MarketTrend): string[] {
    if (trend.need === 'fast development') {
      return ['Next.js', 'TailwindCSS'];
    } else if (trend.need === 'interactive features') {
      return ['React', 'Framer Motion'];
    }
    return ['CustomStack'];
  }
}
