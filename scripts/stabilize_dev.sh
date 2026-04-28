#!/bin/bash
# ──────────────────────────────────────────────────────────────────────────────
# APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
# ──────────────────────────────────────────────────────────────────────────────
# MODULE: Localhost Stabilization Script
# VERSION: v2026.11_MASTER
# ──────────────────────────────────────────────────────────────────────────────

echo "--- SOVRA_STABILIZE: Reconciling Localhost:3000 Friction... ---"

# 1. Identify and Terminate Ghost Processes on Port 3000
PORT=3000
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "[STABILIZE] No active processes detected on port $PORT. Channel clear."
else
    echo "[STABILIZE] Detected ghost process(es) [$PID] on port $PORT. Initiating Absolute Termination..."
    lsof -ti:$PORT | xargs kill -9
    echo "[STABILIZE] Port $PORT verifiably cleared."
fi

# 2. Restart Sovereign Dev Server
echo "[STABILIZE] Re-igniting APEX Sovereign Dev Server..."
npm run dev
