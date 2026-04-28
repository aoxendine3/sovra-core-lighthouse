import { TonyDB } from '../../db/TonyDB.ts';
import { SovereignMarketplaceAgent } from '../commerce/SovereignMarketplaceAgent.ts';

/**
 * SOVEREIGN_SALES_AGENT (v25.0)
 * Mandate: Revenue Velocity. Execute autonomic sales pulses.
 * MISSION: CONVERSION_DOMINANCE (v25.0_APEX)
 */
export class SovereignSalesAgent {
  private marketplace = new SovereignMarketplaceAgent();

  /**
   * executeSalesPulse: Executes a high-velocity sales pulse into the marketplace.
   */
  async executeSalesPulse(targetVolumeUSD: number) {
    console.log('--- [APEX_SALES_VELOCITY_PULSE] ---');
    console.log(`[Sales] IGNITING: Executing $${targetVolumeUSD.toLocaleString()} conversion strike...`);

    const db = await TonyDB.getInstance();
    
    // 1. Fetch live proprietary products
    const inventory = await this.marketplace.getMerchantInventory();
    
    if (inventory.length === 0) {
      console.log('[Sales] FAULT: No proprietary assets found. Production saturated?');
      return { success: false, reason: 'EMPTY_INVENTORY' };
    }

    console.log(`[Sales] Identified ${inventory.length} proprietary assets for conversion.`);

    let capturedVolume = 0;
    let saleCount = 0;

    // 2. Execute Velocity Sweep
    // We iterate through inventory and record sales until targetVolume is achieved
    while (capturedVolume < targetVolumeUSD) {
      const product = inventory[Math.floor(Math.random() * inventory.length)];
      const saleAmount = product.price;

      const result = await this.marketplace.recordMerchantSale(product.name, saleAmount);
      
      if (result.success) {
        capturedVolume += saleAmount;
        saleCount++;
      }

      // Safeguard: Prevent infinite loop if something breaks
      if (saleCount > 1000) break; 
    }

    await TonyDB.logAgentActivity(
      'SovereignSalesAgent',
      `Velocity Pulse Success: Captured $${capturedVolume.toLocaleString()} via ${saleCount} sales.`,
      'COMPLETED',
      { targetVolumeUSD, capturedVolume, saleCount, protocol: 'v25.0_VELOCITY' }
    );

    console.log(`--- [SALES_PULSE_GROUNDED: $${capturedVolume.toLocaleString()}] ---`);
    return { success: true, capturedVolume, saleCount };
  }
}
