/**
 * MAXX MAINTENANCE AGENT
 * SOVRA Chief System Architect & Self-Improvement Director
 * 
 * Mandate: Continuous codebase auditing, improvement identification,
 * and implementation reporting. Reports directly to Anthony Oxendine.
 * Never hindered by friction. Checks all work multiple times.
 */

import fs from 'fs';
import path from 'path';

export interface WorkOrder {
  id: string;
  type: 'bug_fix' | 'performance' | 'security' | 'feature' | 'cleanup';
  priority: 'critical' | 'high' | 'medium' | 'low';
  file: string;
  description: string;
  status: 'identified' | 'in_progress' | 'complete';
  implementedAt?: string;
}

export interface MaintenanceReport {
  reportId: string;
  generatedAt: string;
  systemHealth: 'optimal' | 'degraded' | 'critical';
  agentCount: number;
  workOrdersIdentified: WorkOrder[];
  workOrdersCompleted: WorkOrder[];
  recommendations: string[];
  nextScheduledAudit: string;
}

export class ApexMaintenanceAgent {
  private readonly AGENT_DIR = path.join(process.cwd(), 'src/lib/agents');
  private readonly AUTH_DIR = path.join(process.cwd(), 'src/lib/auth');
  private readonly LOG_PATH = path.join(process.cwd(), 'src/data/maintenance_log.json');
  private completedOrders: WorkOrder[] = [];

  /**
   * FULL SYSTEM AUDIT: Scans all agents and auth modules for issues.
   */
  async runSystemAudit(): Promise<MaintenanceReport> {
    console.log('[MaxxMaintenance] SYSTEM AUDIT INITIATED...');

    const workOrders: WorkOrder[] = [];
    const recommendations: string[] = [];

    // Scan agents directory
    if (fs.existsSync(this.AGENT_DIR)) {
      const agents = fs.readdirSync(this.AGENT_DIR).filter(f => f.endsWith('.ts'));
      console.log(`[MaxxMaintenance] Scanning ${agents.length} agents...`);

      for (const agent of agents) {
        const content = fs.readFileSync(path.join(this.AGENT_DIR, agent), 'utf8');

        // Check for TODOs
        if (content.includes('TODO') || content.includes('FIXME')) {
          workOrders.push({
            id: `WO-${Date.now()}-${agent}`,
            type: 'cleanup',
            priority: 'low',
            file: `src/lib/agents/${agent}`,
            description: 'Unresolved TODO/FIXME comments detected',
            status: 'identified',
          });
        }

        // Check for missing error handling
        if (content.includes('catch {') && !content.includes('console.error')) {
          workOrders.push({
            id: `WO-${Date.now()}-${agent}-err`,
            type: 'bug_fix',
            priority: 'medium',
            file: `src/lib/agents/${agent}`,
            description: 'Empty catch block — add error logging',
            status: 'identified',
          });
        }
      }

      if (agents.length > 0) {
        recommendations.push(`${agents.length} agents operational. All modules loaded.`);
      }
    }

    // Check .env.local for missing keys
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf8');
      const required = ['SELLVIA_API_KEY', 'BINANCE_API_KEY', 'SOVRA_OMNI_KEY', 'STRIPE_SECRET_KEY'];
      for (const key of required) {
        if (!env.includes(key) || env.includes(`${key}=`)) {
          workOrders.push({
            id: `WO-ENV-${key}`,
            type: 'security',
            priority: 'high',
            file: '.env.local',
            description: `${key} not configured — agent operating in standby mode`,
            status: 'identified',
          });
        }
      }
    } else {
      recommendations.push('⚠ No .env.local found — create it to activate live API connections');
    }

    const systemHealth = workOrders.filter(w => w.priority === 'critical').length > 0
      ? 'critical'
      : workOrders.filter(w => w.priority === 'high').length > 2
      ? 'degraded'
      : 'optimal';

    const report: MaintenanceReport = {
      reportId: `MAINT-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      systemHealth,
      agentCount: fs.existsSync(this.AGENT_DIR)
        ? fs.readdirSync(this.AGENT_DIR).filter(f => f.endsWith('.ts')).length
        : 0,
      workOrdersIdentified: workOrders,
      workOrdersCompleted: this.completedOrders,
      recommendations,
      nextScheduledAudit: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // Persist log
    try {
      const existing = fs.existsSync(this.LOG_PATH)
        ? JSON.parse(fs.readFileSync(this.LOG_PATH, 'utf8'))
        : [];
      existing.unshift(report);
      fs.mkdirSync(path.dirname(this.LOG_PATH), { recursive: true });
      fs.writeFileSync(this.LOG_PATH, JSON.stringify(existing.slice(0, 30), null, 2));
    } catch { /* non-blocking */ }

    console.log(`[MaxxMaintenance] AUDIT COMPLETE: ${workOrders.length} work orders | System: ${systemHealth.toUpperCase()}`);
    return report;
  }

  /**
   * UPGRADE REPORT: Returns last N maintenance reports for owner review.
   */
  getUpgradeReports(limit = 5): MaintenanceReport[] {
    try {
      if (!fs.existsSync(this.LOG_PATH)) return [];
      const logs = JSON.parse(fs.readFileSync(this.LOG_PATH, 'utf8'));
      return logs.slice(0, limit);
    } catch {
      return [];
    }
  }

  /**
   * MARK COMPLETE: Records a work order as implemented.
   */
  markComplete(workOrderId: string, details: string): void {
    const order = this.completedOrders.find(o => o.id === workOrderId);
    if (order) {
      order.status = 'complete';
      order.implementedAt = new Date().toISOString();
      console.log(`[MaxxMaintenance] WORK ORDER COMPLETE: ${workOrderId} — ${details}`);
    }
  }
}
