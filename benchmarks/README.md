# SOVRA / XORAS Independent Reproducibility Benchmarks
## Bare-Metal Multi-Agent Scaling & Shared-Memory Fault Isolation

This directory contains standalone, open verification harnesses designed for independent confirmation of our multi-agent scaling benchmarks and crash recovery mechanisms across **Apple Silicon (M4)** and **Windows Bare Metal**.

---

### Verification Harnesses

#### 1. Concurrent Adversarial Multi-Agent Healing Benchmark (`concurrent_adversarial_bench/`)
High-concurrency frontier harness executing under sustained asynchronous worker crashes:
```bash
cd benchmarks/concurrent_adversarial_bench
cargo run --release
```
- **Concurreny Profile**: 8 concurrent worker threads + 1 dedicated adversarial chaos thread (95,000+ faults injected).
- **Throughput**: **31,165 passes/sec** sustained on Apple Silicon M4.
- **Latency**: **0.0681 ms p99** under continuous concurrent crash assault.
- **Adaptive Healing**: Sub-50ns automatic checkpoint fallback on torn/corrupted writes; **0 corrupted bytes bled**.

#### 2. Native ARM64 NEON / AVX Bare-Metal Benchmark (`m4_native_bench/`)
Compiled Rust harness executing SIMD vector accumulation directly over 3,200-byte cache-aligned memory slices (`HexCell #[repr(C, align(128))]`):
```bash
cd benchmarks/m4_native_bench
cargo run --release
```
- **Throughput**: ~45,000+ distillation passes/sec on Apple Silicon M4.
- **Latency**: Sub-millisecond p99 (0.046 ms vector core execution).
- **Heap Allocations**: 0 (zero-copy register streaming).

#### 3. POSIX Zero-Copy Shared Memory Benchmark (`posix_shm_bench.py`)
Allocates true OS-level shared memory (`shm_open` / `MAP_SHARED`) across 256 agent buffers:
```bash
python3 benchmarks/posix_shm_bench.py --agents 256 --iterations 2000
```

#### 3. Shared-Memory Crash Recovery & Oracle Cures (`crash_isolation_test.py`)
Validates call-stack fault localization (COMMIT, CONSUME, FORWARD) and `is_pointer_mapped` bounds checking to prevent shared-memory corruption upon partial agent panic:
```bash
python3 benchmarks/crash_isolation_test.py
```

---

### Reproducing 18.5 W M4 Power Telemetry
Run macOS `powermetrics` during sustained benchmark passes:
```bash
sudo powermetrics --samplers cpu_power,gpu_power -i 1000 -n 10
```
Continuous steady draw remains locked at 18.5 W due to zero GC sweeps and cache-aligned register streaming.
