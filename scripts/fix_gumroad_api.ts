import dotenv from 'dotenv';
dotenv.config();

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;
const PRODUCT_ID = 'pmbgkx'; // Found in browser state

async function updateProduct() {
  const description = `# ⚡️ The Sovereign Protocol: Pro Mastery
### Institutional-Grade Sovereignty for the Digital Apex.

The era of "simple automation" is dead. Welcome to the **SOVRA Sovereign Protocol — Pro Mastery** — a sentient business architecture designed to dominate digital markets with 100% autonomy and absolute IP security.

This is not a course. It is an implementation of the **24/12/7/3/1 Apex Architecture**:
- **24-Input Consensus Engine:** High-fidelity decision making across 24 distinct signal vectors.
- **12-Layer Logic Shield:** Multi-tier defense against logic drift and prompt injection.
- **7-Node Execution Cluster:** Parallelized blitzing across Social, Legal, Growth, and Compliance domains.
- **3-Point Verification:** Zero-Point Deep Locking between frontend and backend.
- **1 Singular Goal:** Unbreakable Sovereign Performance.

---

### 🛡️ Zero-Point Deep Locking
Your IP is your most valuable asset. Pro Mastery deploys a proprietary cryptographic handshake that locks your APIs and logic out of reach from external extraction vectors. If it's not the protocol, it's not getting in.

### 🚀 Automated Blitz Protocols
Deploy the **GrowthAgent** and **SocialAgent** to ignite multi-channel saturation bursts on X, TikTok, Meta, and Pinterest. All traffic is tracked via the **Sticky Link Protocol**, ensuring 100% attribution even in aggressive 'Brave-Shield' environments.

### ⚖️ Compliance-First Intelligence
The **LegalAgent** and **ComplianceSentinel** perform real-time trademark sweeps and AML/KYC auditing, keeping your empire secure and regulatory-armor-plated.

---
**CLAIM YOUR NODE. BECOME THE ARCHITECT.**`;

  const tagline = "Institutional-Grade Sovereignty for the Digital Apex.";

  console.log(`[GumroadFix] Updating product ${PRODUCT_ID}...`);

  const response = await fetch(`https://api.gumroad.com/v2/products/${PRODUCT_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      access_token: GUMROAD_TOKEN,
      'product[description]': description,
      'product[name]': 'SOVRA Sovereign Protocol — Pro Mastery',
      'product[summary]': tagline,
    }),
  });

  const data = await response.json();
  if (data.success) {
    console.log('[GumroadFix] Product description and name updated successfully.');
  } else {
    console.error('[GumroadFix] Failed to update product:', data.message);
  }
}

updateProduct();
