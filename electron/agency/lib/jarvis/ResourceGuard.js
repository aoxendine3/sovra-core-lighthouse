import fs from 'fs/promises';
import path from 'path';
/**
 * ResourceGuard (Hardware Protection Node)
 * Responsible for protecting the local M4's 256GB SSD and 16GB RAM.
 * Ensures autonomous operations do not saturate the sovereign node.
 */
export class ResourceGuard {
    static MAX_LOG_SIZE_MB = 10; // Prune if logs exceed 10MB to save 256GB SSD
    static CRITICAL_PATHS = [
        'src/data/deployments.json',
        'src/data/audience.json',
        'src/data/feedback.json'
    ];
    /**
     * Evaluates and prunes local resources to maintain a lean sovereign core.
     */
    static async auditResources() {
        console.log('[ResourceGuard] AUDIT: Evaluating sovereign node disk pressure (M4 256GB SSD)...');
        for (const relativePath of this.CRITICAL_PATHS) {
            const fullPath = path.resolve(process.cwd(), relativePath);
            try {
                const stats = await fs.stat(fullPath);
                const sizeMB = stats.size / (1024 * 1024);
                if (sizeMB > this.MAX_LOG_SIZE_MB) {
                    console.warn(`[ResourceGuard] PRUNING: ${relativePath} (${sizeMB.toFixed(2)}MB). Exceeds disk threshold.`);
                    await this.pruneJsonFile(fullPath);
                }
            }
            catch (err) {
                // Path might not exist yet
            }
        }
        return { status: 'OPTIMIZED', monitoredPaths: this.CRITICAL_PATHS.length };
    }
    /**
     * Prunes a JSON array file to its last 100 entries to save disk space.
     */
    static async pruneJsonFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const items = JSON.parse(data);
            if (Array.isArray(items) && items.length > 100) {
                const pruned = items.slice(0, 100);
                await fs.writeFile(filePath, JSON.stringify(pruned, null, 2));
                console.log(`[ResourceGuard] COMPLETED: Pruned ${filePath} to latest 100 records.`);
            }
        }
        catch (err) {
            console.error(`[ResourceGuard] PRUNE_FAILED: ${filePath}`, err);
        }
    }
}
