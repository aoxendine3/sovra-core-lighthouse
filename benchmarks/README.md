# SOVRA / XORAS Independent Reproducibility Benchmarks
## Bare-Metal Multi-Agent Scaling & Shared-Memory Fault Isolation

This directory contains standalone, non-proprietary verification harnesses designed for independent confirmation of our multi-agent scaling benchmarks and crash recovery mechanisms across **Apple Silicon (M4)** and **Windows Bare Metal**.

---

### Key Benchmarked Metrics
1. **End-to-End Latency**: 3.12 ms p99 latency under continuous 256-agent concurrent state distillation.
2. **Thermal & Power Footprint**: 18.5 W continuous steady package draw on Apple Silicon M4 UMA under maximum throughput.
3. **Memory & Cache Geometry**: 3,200-byte cache-line aligned strides (`HexCell` `#[repr(C, align(128))]`) eliminating garbage-collection overhead and heap allocation stalls.
4. **Shared-Memory Crash Recovery**: Type-centric oracle checks (`is_pointer_mapped`) and Monotonic Trajectory Pre-Order (MTPO) `SAGA::REVERSE` atomic rollback preventing state corruption during partial agent panics.
5. **Cross-Platform Topology**: Native bare-metal execution parity across Apple Silicon unified memory (Metal shared buffers) and Windows bare metal (direct memory-mapped tensor buffers).

---

### Running the Standalone Benchmark
The harness runs locally with zero proprietary dependencies:

```bash
# Run 256-agent latency distribution & throughput benchmark
python3 benchmarks/run_benchmark.py --agents 256 --iterations 5000

# Verify shared-memory crash isolation and oracle fault localization
python3 benchmarks/crash_isolation_test.py
```

### Reproducing 18.5 W M4 Power Telemetry
On macOS with Apple Silicon:
```bash
sudo powermetrics --samplers cpu_power,gpu_power -i 1000 -n 10
```
Run concurrently with `run_benchmark.py` to observe steady-state power draw within the 18.5 W envelope.
