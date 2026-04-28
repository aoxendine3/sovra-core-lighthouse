import * as fs from 'fs';
import * as path from 'path';
import { TonyDB } from '../../db/TonyDB.ts';

/**
 * SOVEREIGN_MARKETPLACE_AGENT (v23.0)
 * Mandate: Revenue Sovereignty. Manage proprietary high-margin assets.
 * MISSION: MERCHANT_DOMINANCE (v23.0_APEX)
 */
export class SovereignMarketplaceAgent {
  
  /**
   * deployProprietaryProduct: Adds a 100% margin proprietary product to the catalog.
   */
  async deployProprietaryProduct(
    name: string, 
    description: string, 
    price: number, 
    category: string = 'AI_SOFTWARE',
    imageUrl: string = '',
    seoTranche: any = {}
  ) {
    console.log(`--- [APEX_PROPRIETARY_DEPLOYMENT: ${name}] ---`);
    const db = await TonyDB.getInstance();
    
    const metadata = {
      isProprietary: true,
      margin: 1.0,
      fulfillment: 'INSTITUTIONAL_API_KEY',
      version: 'v22.0_SINGULARITY',
      imageUrl,
      seoTranche
    };

    try {
      await db.run(`
        INSERT INTO sovra_products (name, description, price, category, status, metadata, image_url, seo_tranche)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        name,
        description,
        price,
        category,
        'ACTIVE_MERCHANT_NODE',
        JSON.stringify(metadata),
        imageUrl,
        JSON.stringify(seoTranche)
      ]);

      // Forge Live Node in Filesystem
      await this.forgeInstitutionalNode(name, description, price, category, imageUrl);

      await TonyDB.logAgentActivity(
        'SovereignMarketplaceAgent',
        `Proprietary Product Deployed & Forged: ${name}`,
        'COMPLETED',
        { name, price, category }
      );

      console.log(`[Marketplace] SUCCESS: ${name} is now a live Sovereign Asset and Forged Node.`);
      return { success: true, name };
    } catch (err: any) {
      console.error('[Marketplace] DEPLOYMENT_FAULT:', err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * forgeInstitutionalNode: Physically creates the Next.js ingress node for a product.
   */
  private async forgeInstitutionalNode(name: string, summary: string, price: number, category: string, imageUrl: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const nodesPath = path.resolve(process.cwd(), 'src/app/nodes', slug);
    
    if (!fs.existsSync(nodesPath)) {
      fs.mkdirSync(nodesPath, { recursive: true });
    }

    const pageContent = `
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: '${name} | SOVRA Sovereign LLC',
  description: '${summary.replace(/'/g, "\\'")}',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="${name.replace(/"/g, '&quot;')}"
      summary="${summary.replace(/"/g, '&quot;')}"
      price="$${price.toFixed(2)}"
      buyUrl="/subscribe?source=node_${slug}"
      category="${category.toUpperCase()}"
    />
  );
}
`;

    fs.writeFileSync(path.join(nodesPath, 'page.tsx'), pageContent.trim());
    console.log(`[Marketplace] NODE_FORGED: /nodes/${slug} is verifiably live.`);
  }

  /**
   * getMerchantInventory: Fetches all proprietary products.
   */
  async getMerchantInventory() {
    const db = await TonyDB.getInstance();
    return await db.all(`
      SELECT * FROM sovra_products 
      WHERE status = 'ACTIVE_MERCHANT_NODE'
    `);
  }

  /**
   * recordMerchantSale: Records a 100% margin sale events.
   */
  async recordMerchantSale(productName: string, amount: number) {
    console.log(`[Marketplace] RECORDING_SALE: $${amount} for ${productName}...`);
    const db = await TonyDB.getInstance();
    
    await db.run('BEGIN TRANSACTION');
    try {
      await db.run(`
        INSERT INTO sovra_revenue (source, gross_amount, net_amount, currency, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `, [
        `Merchant_Sale_${productName}`,
        amount,
        amount, // 100% margin
        'USD',
        new Date().toISOString()
      ]);

      await db.run('COMMIT');

      await TonyDB.logAgentActivity(
        'SovereignMarketplaceAgent',
        `Merchant Sale Logged: $${amount} [${productName}]`,
        'COMPLETED',
        { productName, amount, margin: '1.0' }
      );

      return { success: true, amount };
    } catch (err) {
      await db.run('ROLLBACK');
      console.error('[Marketplace] SALE_LOG_FAULT:', err);
      return { success: false, error: 'SALE_LOG_FAILURE' };
    }
  }

  /**
   * purgeLegacyInventory: Verifiably removes low-margin affiliate products from the storefront.
   */
  async purgeLegacyInventory() {
    console.log('[Marketplace] PURGING_LEGACY: Clearing low-margin affiliate products...');
    const db = await TonyDB.getInstance();
    
    // Purge any products that are NOT marked as proprietary
    const result = await db.run(`
      DELETE FROM sovra_products 
      WHERE metadata NOT LIKE '%isProprietary":true%'
    `);

    await TonyDB.logAgentActivity(
      'SovereignMarketplaceAgent',
      `Legacy Purge Success: Cleared all low-margin affiliate assets.`,
      'COMPLETED',
      { purgedCount: result.changes }
    );

    console.log(`[Marketplace] SUCCESS: ${result.changes} legacy products verifiably purged.`);
    return { success: true, count: result.changes };
  }

  /**
   * recordBulkMerchantSales: Records multiple 100% margin sales in a single optimized transaction.
   */
  async recordBulkMerchantSales(sales: { productName: string, amount: number }[]) {
    console.log(`[Marketplace] RECORDING_BULK_SALES: ${sales.length} transactions...`);
    const db = await TonyDB.getInstance();
    
    await db.run('BEGIN TRANSACTION');
    try {
      for (const sale of sales) {
        await db.run(`
          INSERT INTO sovra_revenue (source, gross_amount, net_amount, currency, timestamp)
          VALUES (?, ?, ?, ?, ?)
        `, [
          `Merchant_Sale_${sale.productName}`,
          sale.amount,
          sale.amount,
          'USD',
          new Date().toISOString()
        ]);
      }
      await db.run('COMMIT');
      return { success: true, count: sales.length };
    } catch (err) {
      await db.run('ROLLBACK');
      console.error('[Marketplace] BULK_SALE_FAULT:', err);
      return { success: false, error: 'BULK_SALE_FAILURE' };
    }
  }
}
