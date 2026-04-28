#!/bin/bash
# LIVE EXECUTION IGNITION SEQUENCE
# NO SIMULATIONS. GROUNDED IN REALITY.

echo "🔥 IGNITING 24-HOUR EXASCALE HYPER-BLITZ [LIVE MODE] 🔥"

# Ensure PM2 is installed
if ! command -v pm2 &> /dev/null
then
    echo "[SYSTEM] Installing PM2 Daemon globally..."
    npm install -g pm2
fi

# Purge any old, dead, or simulation processes
echo "[SYSTEM] Purging legacy processes and establishing clean runway..."
pm2 kill

# Launch the live Swarm
echo "[SYSTEM] Launching Live APEX Swarm Configuration..."
pm2 start ecosystem.config.cjs

# Save the process list so it survives reboots (if any occur within 24h)
pm2 save

echo "================================================================"
echo "✅ THE SWARM IS LIVE AND GROUNDED."
echo "Use 'npx pm2 monit' to view the real-time matrix terminal."
echo "Use 'npx pm2 logs' to view the raw data ingress."
echo "================================================================"
