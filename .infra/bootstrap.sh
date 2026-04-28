#!/bin/bash
# ─────────────────────────────────────────────────────────────
# ANTIGRAVITY SOVEREIGN BOOTSTRAP v1.0
# Oracle Cloud Always-Free ARM (Ubuntu 22.04)
# Run once after first SSH login:
#   chmod +x bootstrap.sh && ./bootstrap.sh
# ─────────────────────────────────────────────────────────────
set -e

echo "══════════════════════════════════════════════"
echo "  ANTIGRAVITY SOVEREIGN BOOTSTRAP v1.0"
echo "  Oracle ARM • 4 OCPU • 24GB RAM • 200GB SSD"
echo "══════════════════════════════════════════════"

# ── 1. System Update ──────────────────────────────────────────
echo "[1/8] Updating system packages..."
sudo apt-get update -qq && sudo apt-get upgrade -y -qq

# ── 2. Core Dependencies ──────────────────────────────────────
echo "[2/8] Installing core dependencies..."
sudo apt-get install -y -qq \
  curl wget git unzip \
  ca-certificates gnupg \
  ufw fail2ban \
  htop ncdu \
  build-essential

# ── 3. Docker ─────────────────────────────────────────────────
echo "[3/8] Installing Docker..."
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo systemctl start docker

# ── 4. Coolify (Self-Hosted PaaS) ────────────────────────────
echo "[4/8] Installing Coolify..."
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# ── 5. Cloudflare Tunnel ──────────────────────────────────────
echo "[5/8] Installing Cloudflare Tunnel (cloudflared)..."
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared-linux-arm64.deb
rm cloudflared-linux-arm64.deb

# ── 6. Node.js 20 LTS ─────────────────────────────────────────
echo "[6/8] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# ── 7. Firewall ───────────────────────────────────────────────
echo "[7/8] Configuring firewall (UFW)..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 8000   # Coolify UI
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Also open Oracle's iptables (required on OCI):
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 8000 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save

# ── 8. Final Output ───────────────────────────────────────────
echo "[8/8] Bootstrap complete!"
echo ""
echo "══════════════════════════════════════════════"
echo "  ✅ ANTIGRAVITY SOVEREIGN STACK IS LIVE"
echo "══════════════════════════════════════════════"
echo ""
SERVER_IP=$(curl -s ifconfig.me)
echo "  Coolify Dashboard:  http://${SERVER_IP}:8000"
echo "  Next step: Run ./setup-tunnel.sh <your-domain>"
echo ""
echo "  SSH back in with a new terminal to activate Docker group."
echo "══════════════════════════════════════════════"
