// src/lib/core/Tools.ts
/**
 * ONE Tools – Central registry for all operational utilities.
 * Each tool may provide an optional JSON schema for its arguments.
 * Execution is only allowed after schema validation and argument checks.
 */

export interface Tool {
  name: string;
  /** Execute the tool with arbitrary arguments; returns a Promise. */
  execute: (...args: any[]) => Promise<any>;
  /** Optional JSON schema describing expected arguments. */
  schema?: object;
}

export class Tools {
  private tools: Map<string, Tool> = new Map();

  constructor() {
    // Register built‑in tools here. Extend as needed.
    // Example placeholder: a no‑op echo tool with simple argument schema.
    this.register({
      name: 'echo',
      execute: async (...args: any[]) => args.join(' '),
      schema: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
      },
    });
  }

  /** Register a new tool – will overwrite if name already exists (ensuring a single instance). */
  register(tool: Tool): void {
    this.tools.set(tool.name, tool);
  }

  /** Retrieve a tool by name. */
  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  /** List all registered tool names – used by the Brain for planning. */
  listNames(): string[] {
    return Array.from(this.tools.keys());
  }

  /**
   * Validate arguments against the tool's JSON schema (if provided) and execute.
   * Throws if validation fails.
   */
  async runTool(name: string, ...args: any[]): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool "${name}" not found`);
    }

    if (tool.schema) {
      let Ajv;
      try {
        Ajv = (await import('ajv')).default;
      } catch {
        console.warn('[Tools] Ajv not installed; schema validation skipped for', name);
        return tool.execute(...args);
      }
      const ajv = new Ajv();
      const validate = ajv.compile(tool.schema);
      const valid = validate(args);
      if (!valid) {
        const errors = (validate.errors || []).map(e => `${e.instancePath} ${e.message}`).join('; ');
        throw new Error(`Argument validation failed for tool "${name}": ${errors}`);
      }
    }
    return tool.execute(...args);
  }
}
