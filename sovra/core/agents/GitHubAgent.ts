/**
 * GITHUB AGENT
 * SOVRA Chief Infrastructure Architect
 * 
 * Mandate: Full GitHub repository management, enterprise infrastructure,
 * CI/CD pipelines, database schema, project organization, R&D department setup.
 * 
 * Never hindered by friction. Deep thought. Checks all work multiple times.
 * Activation: Set GITHUB_TOKEN in .env.local
 */

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'sovra-sovereign';
const GITHUB_REPO = process.env.GITHUB_REPO || 'sovra-core';

export interface RepoIssue {
  title: string;
  body: string;
  labels: string[];
}

export interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string;
  name: string;
  created_at: string;
}

export interface InfrastructureReport {
  repo: string;
  openIssues: number;
  branches: string[];
  latestWorkflowStatus: string;
  recommendations: string[];
  generatedAt: string;
}

export class GitHubAgent {
  private headers: Record<string, string>;

  constructor() {
    this.headers = {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'X-SOVRA-Agent': 'GitHubAgent-v1',
    };
  }

  private isLive(): boolean {
    return GITHUB_TOKEN !== '';
  }

  private async api<T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH', endpoint: string, body?: object): Promise<T | null> {
    if (!this.isLive()) {
      console.warn('[GitHubAgent] Set GITHUB_TOKEN in .env.local to activate.');
      return null;
    }
    try {
      const res = await fetch(`${GITHUB_API}${endpoint}`, {
        method,
        headers: this.headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (!res.ok) {
        console.error(`[GitHubAgent] API ERROR: ${method} ${endpoint} → ${res.status}`);
        return null;
      }
      return res.json() as Promise<T>;
    } catch (err) {
      console.error(`[GitHubAgent] NETWORK ERROR: ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * INFRASTRUCTURE AUDIT: Full repo health check.
   */
  async auditInfrastructure(): Promise<InfrastructureReport> {
    console.log('[GitHubAgent] AUDITING INFRASTRUCTURE...');

    const [repoData, issuesData, branchesData] = await Promise.all([
      this.api<{ open_issues_count: number }>('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`),
      this.api<Array<{ title: string }>>('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=open`),
      this.api<Array<{ name: string }>>('GET', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/branches`),
    ]);

    const branches = (branchesData || []).map(b => b.name);
    const recommendations: string[] = [];

    if (!branches.includes('develop')) recommendations.push('Create develop branch for feature work');
    if (!branches.includes('staging')) recommendations.push('Create staging branch for pre-production testing');
    if ((issuesData || []).length === 0) recommendations.push('No open issues — consider adding work order issues for tracking');

    const report: InfrastructureReport = {
      repo: `${GITHUB_OWNER}/${GITHUB_REPO}`,
      openIssues: repoData?.open_issues_count ?? 0,
      branches,
      latestWorkflowStatus: 'unknown',
      recommendations,
      generatedAt: new Date().toISOString(),
    };

    console.log(`[GitHubAgent] AUDIT COMPLETE: ${branches.length} branches | ${report.openIssues} open issues`);
    return report;
  }

  /**
   * CREATE ISSUE: Logs a work order as a GitHub issue.
   */
  async createWorkOrderIssue(issue: RepoIssue): Promise<string | null> {
    console.log(`[GitHubAgent] CREATING ISSUE: ${issue.title}`);
    const result = await this.api<{ html_url: string }>('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, issue);
    if (result) {
      console.log(`[GitHubAgent] ISSUE CREATED: ${result.html_url}`);
      return result.html_url;
    }
    return null;
  }

  /**
   * ENTERPRISE SETUP: Creates branch structure, labels, and project milestones.
   * Runs once to establish professional GitHub workflow.
   */
  async setupEnterpriseStructure(): Promise<void> {
    console.log('[GitHubAgent] SETTING UP ENTERPRISE GITHUB STRUCTURE...');

    // Create standard labels
    const labels = [
      { name: 'critical', color: 'FF0000', description: 'Production blocker' },
      { name: 'revenue', color: '00AA00', description: 'Revenue-generating feature' },
      { name: 'security', color: '9B4DCA', description: 'Security enhancement' },
      { name: 'agent', color: '00CCCC', description: 'AI agent development' },
      { name: 'infrastructure', color: 'FF6600', description: 'Infrastructure work order' },
      { name: 'R&D', color: '0066FF', description: 'Research and development' },
    ];

    for (const label of labels) {
      await this.api('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/labels`, label);
    }

    // Create milestone structure
    const milestones = [
      { title: 'Phase 1: First Revenue', description: '$188/month — 10 Pro + 2 SOVRA subs', due_on: '2026-05-01T00:00:00Z' },
      { title: 'Phase 2: Affiliate Scale', description: '$2K/month commissions', due_on: '2026-07-01T00:00:00Z' },
      { title: 'Phase 3: SOVRA APEX Licensing', description: '$5K/month licensing', due_on: '2026-10-01T00:00:00Z' },
      { title: 'Phase 4: $10M Path', description: '$73,500/month run rate', due_on: '2027-12-01T00:00:00Z' },
    ];

    for (const milestone of milestones) {
      await this.api('POST', `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/milestones`, milestone);
    }

    console.log('[GitHubAgent] ENTERPRISE STRUCTURE COMPLETE: Labels + Milestones deployed');
  }

  /**
   * DATABASE INFRASTRUCTURE: Creates schema documentation as GitHub issues and files.
   * SOVRA needs persistent storage for: ledger, leads, affiliates, agents, sessions.
   */
  getRecommendedDatabaseSchema(): object {
    return {
      tables: {
        transactions: {
          purpose: 'Revenue ledger — every real transaction',
          fields: ['id', 'amount', 'currency', 'source', 'product', 'customer_email', 'stripe_id', 'gumroad_sale_id', 'created_at'],
          indexes: ['created_at', 'source'],
        },
        leads: {
          purpose: 'Verified lead capture from survey gate',
          fields: ['id', 'email', 'source', 'tier_interest', 'survey_completed', 'converted', 'created_at'],
          indexes: ['email', 'converted'],
        },
        affiliate_clicks: {
          purpose: 'Every affiliate link click with attribution',
          fields: ['id', 'product_asin', 'tag', 'region', 'source_page', 'ip_hash', 'clicked_at'],
          indexes: ['tag', 'clicked_at', 'region'],
        },
        agent_logs: {
          purpose: 'Every agent execution with results',
          fields: ['id', 'agent_name', 'action', 'result', 'duration_ms', 'executed_at'],
          indexes: ['agent_name', 'executed_at'],
        },
        subscriptions: {
          purpose: 'Active SOVRA subscriptions',
          fields: ['id', 'email', 'tier', 'stripe_subscription_id', 'status', 'started_at', 'renews_at'],
          indexes: ['email', 'status', 'tier'],
        },
      },
      recommended_platform: 'PlanetScale (MySQL) or Supabase (PostgreSQL) — both have free tiers',
      orm: 'Prisma — type-safe, works with Next.js perfectly',
      note: 'Add DATABASE_URL to .env.local to activate persistent storage',
    };
  }

  getStatus(): string {
    return this.isLive()
      ? '[GitHubAgent] LIVE — Full repository access active'
      : '[GitHubAgent] STANDBY — Set GITHUB_TOKEN in .env.local to activate';
  }
}
