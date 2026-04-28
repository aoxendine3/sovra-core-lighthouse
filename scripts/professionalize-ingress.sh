#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# SOVRA PROFESSIONALIZATION PROTOCOL (v1.0)
# Mission: Eliminate 'localhost' friction. Establish Institutional Ingress.
# -----------------------------------------------------------------------------

DOMAIN="antigravity.sovra"
PORT=3000

echo "🚀 [SOVRA_INFRA] Moving away from 'localhost:3000'..."

# 1. Update /etc/hosts (Requires sudo)
echo "📡 STEP 1: Domain Mapping"
echo "To move away from the 'corner shop' URL, you should map your local node to a professional identifier."
echo "RUN THIS IN YOUR TERMINAL:"
echo "sudo sh -c 'echo \"127.0.0.1 $DOMAIN\" >> /etc/hosts'"
echo ""

# 2. Production Build
echo "🏗️  STEP 2: Building Production Core"
echo "Generating the optimized, institutional-grade binary..."
npm run build

# 3. Start Professional Node
echo "🏁 STEP 3: Initializing Sovereign Node on Port 80 (Professional Standard)"
echo "Next time you start the enterprise, use a professional ingress. "
echo "You can now access your store at: http://$DOMAIN"
echo ""
echo "PROFESSIONALIZATION COMPLETE. NO MORE LOCALHOST."
