#!/bin/bash
# ─────────────────────────────────────────────────────────────
# CLOUDFLARE TUNNEL SETUP
# Usage: ./setup-tunnel.sh yourdomain.com
# Run AFTER bootstrap.sh and after:
#   cloudflared tunnel login
# ─────────────────────────────────────────────────────────────

DOMAIN=${1:-"antigravity.example.com"}
TUNNEL_NAME="antigravity-sovereign"

echo "══════════════════════════════════════════════"
echo "  CLOUDFLARE TUNNEL SETUP"
echo "  Domain: ${DOMAIN}"
echo "══════════════════════════════════════════════"

# Create tunnel
cloudflared tunnel create $TUNNEL_NAME

# Get the tunnel ID
TUNNEL_ID=$(cloudflared tunnel list | grep $TUNNEL_NAME | awk '{print $1}')
echo "Tunnel ID: $TUNNEL_ID"

# Write config
mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml << EOF
tunnel: ${TUNNEL_ID}
credentials-file: /root/.cloudflared/${TUNNEL_ID}.json

ingress:
  # Main site (Cloudflare Pages handles frontend — this is the backend API)
  - hostname: api.${DOMAIN}
    service: http://localhost:3000

  # Coolify dashboard (internal only — remove for production)
  - hostname: coolify.${DOMAIN}
    service: http://localhost:8000

  # Catchall
  - service: http_status:404
EOF

echo "Config written to ~/.cloudflared/config.yml"

# Route DNS
cloudflared tunnel route dns $TUNNEL_NAME api.$DOMAIN
cloudflared tunnel route dns $TUNNEL_NAME coolify.$DOMAIN

# Install as system service
cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared

echo ""
echo "══════════════════════════════════════════════"
echo "  ✅ TUNNEL ACTIVE"
echo "  API:     https://api.${DOMAIN}"
echo "  Coolify: https://coolify.${DOMAIN}"
echo "══════════════════════════════════════════════"
