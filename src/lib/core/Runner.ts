// src/lib/core/Runner.ts
/**
 * ONE Runner – Isolated execution engine for validated plans.
 * Executes a plan (string command or JSON workflow) safely.
 * The Runner now owns all tool execution; Brain supplies only the plan.
 */

import { Tools } from './Tools';
import { CircuitBreaker } from './CircuitBreaker';
import { Retry } from './Retry';
import { Logger } from './Logger';

export class Runner {
  private tools: Tools;
  private circuitBreaker: CircuitBreaker;

  constructor(tools: Tools) {
    this.tools = tools;
    this.circuitBreaker = new CircuitBreaker();
  }

  /**
   * Runs a validated workflow with circuit breaking and retries.
   * @param plan Serialized plan (string command or JSON steps).
   * @returns Promise with execution result.
   */
  async runWorkflow(plan: string): Promise<any> {
    return this.circuitBreaker.call(async () => {
      // If plan is JSON with steps, execute each step via the Tools registry.
      try {
        const parsed = JSON.parse(plan);
        if (Array.isArray(parsed.steps)) {
          const results: any[] = [];
          for (const step of parsed.steps) {
            const { tool, args = [], name } = step;
            if (!tool) throw new Error(`Step "${name}" missing tool identifier`);
            
            const result = await Retry.execute(() => this.tools.runTool(tool, ...args));
            results.push({ step: name, tool, result });
          }
          return { success: true, results };
        }
      } catch (err) {
        // If it was valid JSON but failed, rethrow
        if (err instanceof SyntaxError) { /* ignore and fallback to command */ }
        else throw err;
      }
      
      // Fallback: execute raw command string in a sandboxed process with retry.
      const output = await Retry.execute(() => this._runCommand(plan));
      return { success: true, output };
    });
  }

  private _runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      // Restricted PATH for safety
      exec(command, { env: { PATH: '/usr/bin:/bin:/opt/homebrew/bin' }, timeout: 30000 }, (err: any, stdout: string, stderr: string) => {
        if (err) {
          Logger.error(`Command execution failed: ${command}`, stderr || err.message);
          reject(stderr || err.message);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }
}

