import { describe, it, expect } from 'vitest';
import { AppBuilderAgent } from '../jarvis/core/agents/AppBuilderAgent';

import { TrendService } from '../jarvis/core/services/trendService';
import { TechStackService } from '../jarvis/core/services/techStackService';

describe('AppBuilderAgent', () => {
  const trendService = new TrendService();
  const techStackService = new TechStackService();

  it('generateRevenueConcept should return a valid app concept', async () => {
    const appBuilderAgent = new AppBuilderAgent({ trendService, techStackService });
    const concept = await appBuilderAgent.generateRevenueConcept();
    
    expect(concept).toHaveProperty('id');
    // Note: We updated the agent to have dynamic names, 
    // so we check for the 'Pulse Widget' suffix to maintain institutional integrity.
    expect(concept.name).toContain('Pulse Widget');
  });

  it('scaffoldApp should return success and repoPath', async () => {
    const appBuilderAgent = new AppBuilderAgent();
    const concept = await appBuilderAgent.generateRevenueConcept();
    const result = await appBuilderAgent.scaffoldApp(concept);
    
    expect(result.success).toBe(true);
    expect(result.repoPath).toContain('/src/apps/');
  });

  it('deprecateApp should remove the app from activeApps', async () => {
    const appBuilderAgent = new AppBuilderAgent({ trendService, techStackService });
    const concept = await appBuilderAgent.generateRevenueConcept();
    await appBuilderAgent.scaffoldApp(concept);
    
    expect(appBuilderAgent.activeApps).toHaveLength(1);
    appBuilderAgent.deprecateApp(concept.id);
    expect(appBuilderAgent.activeApps).toHaveLength(0);
  });
});
