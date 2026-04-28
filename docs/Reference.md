# Media Synthesis & Extraction Mastery

## FFmpeg Documentation
- Official docs: https://ffmpeg.org/documentation.html
- Key parameters to master:
  - `-i` input file
  - `-c:v`, `-c:a` codec specifications
  - Bitrate, frame rate, resolution flags (`-b:v`, `-r`, `-s`)
  - Filters (`-vf`, `-af`) for complex processing pipelines
- Common use‑cases for our platform:
  - Audio extraction from video for vocal synthesis training.
  - Concatenation of generated clips into promotional reels.
  - Transcoding to web‑friendly formats (MP4/H.264, AAC).

## Web Scraping & Browser Automation (Playwright)
- Docs: https://playwright.dev/docs/intro
- Advantages over static scrapers:
  - Handles SPA frameworks (React, Vue, Angular).
  - Interacts with authentication flows, captchas (via human‑in‑the‑loop).
- Recommended patterns:
  - Create a singleton `PlaywrightBrowser` service.
  - Use request/response interception for rate‑limit avoidance.
  - Store extracted data in a vector DB for later retrieval.

---

# System Logic & Memory Management

## Vector Database Patterns (Pinecone / Weaviate)
- Store embeddings of documents, media metadata, and AI‑generated insights.
- Schema design:
  - `id` (string)
  - `vector` (float[])
  - `metadata` (JSON) – includes source URL, timestamps, tags.
- Example workflow:
  1. Scrape content → generate embeddings (e.g., OpenAI text‑embedding‑ada‑002).
  2. Upsert into Pinecone.
  3. Query with similarity search to avoid duplicate processing.

## TypeScript Design Patterns
- **Strategy** – swap out processing pipelines (e.g., different FFmpeg command strategies).
- **Factory** – create tool instances (Playwright, FFmpeg wrapper, vector DB client) based on configuration.
- **Decorator** – add logging, retry, or circuit‑breaker behavior to any async tool.
- **Singleton** – ensure a single shared instance of heavy resources (browser, DB client).

## OpenAPI / Swagger Specs
- Provide Swagger JSON/YAML files for each external service (Pinecone, Weaviate, Playwright server, FFmpeg REST wrapper).
- Load specs into the Brain’s tool registry so the AI can auto‑generate request payloads.

---

# Repository Organization
- `docs/` – contains all markdown reference files (this one, FFmpeg‑Cheatsheet.md, Playwright‑Guide.md, VectorDB‑Patterns.md).
- `src/lib/` – core TypeScript code (Brain, Runner, Tools, Logger).
- `scripts/` – helper scripts (FFmpeg wrapper, media processing pipelines).
- `media/` – **ignored** via `.gitignore` for large binary assets.
- `examples/` – small sample media files for testing.

# .gitignore additions
```
# Media assets
media/**
*.mp4
*.wav
*.flac
*.mov

# Large binaries
node_modules/
build/
Dist/
```

---

By keeping heavy files out of version control and maintaining clear documentation, the repository stays clean while still giving the AI the knowledge it needs to act autonomously.
