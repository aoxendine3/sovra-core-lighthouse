/**
 * ─────────────────────────────────────────────────────────────
 * XORAS CORE — Ollama Client (v1.0)
 * ─────────────────────────────────────────────────────────────
 * Wraps the local Ollama REST API for use across all SOVRA agents.
 * Default base URL: http://localhost:11434
 * ─────────────────────────────────────────────────────────────
 */

export interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OllamaGenerateOptions {
  model?: string;
  temperature?: number;
  num_ctx?: number;
  num_predict?: number;
  top_p?: number;
  stop?: string[];
  stream?: boolean;
}

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  total_duration?: number;
  eval_count?: number;
  prompt_eval_count?: number;
}

export interface OllamaChatResponse {
  model: string;
  message: OllamaMessage;
  done: boolean;
  total_duration?: number;
}

export interface OllamaModelInfo {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
  details?: {
    parameter_size: string;
    quantization_level: string;
    family: string;
  };
}

const DEFAULT_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const DEFAULT_MODEL    = process.env.OLLAMA_MODEL    || 'llama3.2:latest';
const DEFAULT_TIMEOUT  = 600_000; // 10 min (Institutional Grade for 108B+)

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = DEFAULT_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export class OllamaClient {
  private baseUrl: string;
  private defaultModel: string;

  constructor(baseUrl = DEFAULT_BASE_URL, model = DEFAULT_MODEL) {
    this.baseUrl    = baseUrl.replace(/\/$/, '');
    this.defaultModel = model;
  }

  // ── Health Check ─────────────────────────────────────────────
  async isAlive(): Promise<boolean> {
    try {
      const res = await fetchWithTimeout(`${this.baseUrl}/`, { method: 'GET' }, 5_000);
      return res.ok;
    } catch {
      return false;
    }
  }

  // ── List Available Models ─────────────────────────────────────
  async listModels(): Promise<OllamaModelInfo[]> {
    const res = await fetchWithTimeout(`${this.baseUrl}/api/tags`, { method: 'GET' });
    if (!res.ok) throw new Error(`[Ollama] listModels failed: ${res.status}`);
    const data = await res.json() as { models: OllamaModelInfo[] };
    return data.models || [];
  }

  // ── Generate (single-turn completion) ────────────────────────
  async generate(prompt: string, opts: OllamaGenerateOptions = {}): Promise<string> {
    const body = {
      model:       opts.model || this.defaultModel,
      prompt,
      stream:      false,
      options: {
        temperature:  opts.temperature  ?? 0.7,
        num_ctx:      opts.num_ctx      ?? 4096,
        num_predict:  opts.num_predict  ?? 1024,
        top_p:        opts.top_p        ?? 0.9,
        stop:         opts.stop         ?? [],
      },
    };

    const res = await fetchWithTimeout(`${this.baseUrl}/api/generate`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[Ollama] generate failed (${res.status}): ${err}`);
    }

    const data = await res.json() as OllamaResponse;
    return data.response;
  }

  // ── Chat (multi-turn) ─────────────────────────────────────────
  async chat(messages: OllamaMessage[], opts: OllamaGenerateOptions = {}): Promise<string> {
    const body = {
      model:    opts.model || this.defaultModel,
      messages,
      stream:   false,
      options: {
        temperature: opts.temperature ?? 0.7,
        num_ctx:     opts.num_ctx     ?? 4096,
        num_predict: opts.num_predict ?? 1024,
        top_p:       opts.top_p       ?? 0.9,
      },
    };

    const res = await fetchWithTimeout(`${this.baseUrl}/api/chat`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[Ollama] chat failed (${res.status}): ${err}`);
    }

    const data = await res.json() as OllamaChatResponse;
    return data.message.content;
  }

  // ── Streaming Chat ────────────────────────────────────────────
  async *chatStream(messages: OllamaMessage[], opts: OllamaGenerateOptions = {}): AsyncGenerator<string> {
    const body = {
      model:    opts.model || this.defaultModel,
      messages,
      stream:   true,
      options: {
        temperature: opts.temperature ?? 0.7,
        num_ctx:     opts.num_ctx     ?? 4096,
      },
    };

    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    if (!res.ok || !res.body) throw new Error(`[Ollama] chatStream failed: ${res.status}`);

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n').filter(Boolean)) {
        try {
          const parsed = JSON.parse(line) as OllamaChatResponse;
          if (parsed.message?.content) yield parsed.message.content;
          if (parsed.done) return;
        } catch { /* skip malformed lines */ }
      }
    }
  }

  // ── Embeddings ────────────────────────────────────────────────
  async embed(text: string, model?: string): Promise<number[]> {
    const body = {
      model:  model || this.defaultModel,
      prompt: text,
    };

    const res = await fetchWithTimeout(`${this.baseUrl}/api/embeddings`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`[Ollama] embed failed: ${res.status}`);
    const data = await res.json() as { embedding: number[] };
    return data.embedding;
  }

  // ── Quick Helper: SOVRA Agent Prompt ─────────────────────────
  async agentPrompt(systemPrompt: string, userMessage: string, opts: OllamaGenerateOptions = {}): Promise<string> {
    return this.chat([
      { role: 'system',    content: systemPrompt },
      { role: 'user',      content: userMessage  },
    ], opts);
  }
}

// ── Singleton for shared use across SOVRA ────────────────────
export const ollama = new OllamaClient();
