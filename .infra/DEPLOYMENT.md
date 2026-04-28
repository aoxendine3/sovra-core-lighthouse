# ANTIGRAVITY SOVEREIGN INFRASTRUCTURE
# Infrastructure as Code — Oracle Cloud Always Free
# ─────────────────────────────────────────────────────────────

## Quick Reference

### Server Specs (Oracle Always Free ARM)
- **CPU**: 4 ARM Ampere OCPUs
- **RAM**: 24 GB
- **Storage**: 200 GB SSD
- **Cost**: $0 — permanently

---

## Deployment Order

### Step 1 — Oracle Account (You do this once)
1. Go to https://cloud.oracle.com/free
2. Sign up with your email (use `aurvant.apex@gmail.com` or similar)
3. Choose **US East (Ashburn)** or **US West (Phoenix)** as your home region
4. Add credit card for identity verification only — **you will not be charged**
5. Create a new VM instance:
   - Shape: `VM.Standard.A1.Flex`
   - OCPUs: `4`, RAM: `24 GB`
   - OS: `Ubuntu 22.04 Minimal`
   - Boot Volume: `100 GB`
   - Add SSH key (download the private key)
6. Note your **Public IP address**

### Step 2 — SSH Into Your Server
```bash
chmod 400 ~/Downloads/oracle_ssh_key.key
ssh -i ~/Downloads/oracle_ssh_key.key ubuntu@YOUR_SERVER_IP
```

### Step 3 — Run Bootstrap
```bash
# Upload the script
scp -i ~/Downloads/oracle_ssh_key.key \
  .infra/bootstrap.sh ubuntu@YOUR_SERVER_IP:~/

# SSH in and run it
ssh -i ~/Downloads/oracle_ssh_key.key ubuntu@YOUR_SERVER_IP
chmod +x bootstrap.sh && ./bootstrap.sh
```

### Step 4 — Coolify Dashboard
- Open: `http://YOUR_SERVER_IP:8000`
- Create admin account
- Connect GitHub repo (`xoras-sovereign/xoras-core`)
- Deploy AntiGravity as a Next.js app

### Step 5 — Cloudflare Tunnel
```bash
# On the server, authenticate with Cloudflare
cloudflared tunnel login
# Then run the tunnel setup
./setup-tunnel.sh yourdomain.com
```

---

## Files in This Directory

| File | Purpose |
|------|---------|
| `bootstrap.sh` | One-time Oracle server setup |
| `setup-tunnel.sh` | Cloudflare Tunnel configuration |
| `backup-to-usb.sh` | Nightly USB backup daemon |
| `DEPLOYMENT.md` | This file |

---

## Free Tier Breakdown

| Service | Free Allowance | Notes |
|---------|---------------|-------|
| Oracle Compute | 4 OCPU + 24GB RAM | Never expires |
| Oracle Storage | 200 GB SSD | Never expires |
| Cloudflare CDN | Unlimited bandwidth | Never expires |
| Cloudflare Tunnel | Unlimited | Never expires |
| Cloudflare Pages | Unlimited builds | Never expires |
| GitHub Actions | 2,000 min/month | Resets monthly |

---

## Domain Recommendation

Cheapest paths to a real domain:
- **Cloudflare Registrar**: `antigravity.dev` (~$12/yr, no markup)
- **Porkbun**: often has `.io` for ~$10 first year
- **Free subdomain now**: use Coolify's built-in domain while deciding

---

## Architecture Overview

```
Mac (Ollama + Dev)
    │
    ├─ git push → GitHub
    │               │
    │               └─ Coolify (Oracle) auto-deploys
    │
    └─ USB drives → nightly rsync backup

Oracle ARM Server
    ├─ Coolify (app manager)
    ├─ AntiGravity Next.js backend
    ├─ PostgreSQL (agent logs, ledger)
    └─ Cloudflare Tunnel → public HTTPS

Cloudflare Edge
    ├─ yourdomain.com → Cloudflare Pages (frontend)
    └─ api.yourdomain.com → Oracle (backend APIs)
```
