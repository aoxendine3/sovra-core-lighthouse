import os from 'os';

/**
 * SOVEREIGN HARDWARE SENSOR (v1.0_Ω)
 * Mandate: Universal Compatibility. Zero Hardware Exclusion.
 * Logic: Analyzes host environment to determine optimal execution profiles.
 */
export class SovereignSensor {
    
    /**
     * GET_PROFILE: Returns a performance profile based on CPU and RAM.
     */
    static getProfile() {
        const totalRamGB = os.totalmem() / (1024 ** 3);
        const cpuCores = os.cpus().length;
        const arch = os.arch();
        
        // Profile Determination
        if (totalRamGB >= 16 && cpuCores >= 8) {
            return {
                id: 'SINGULARITY',
                mode: 'LOCAL_MAX',
                description: 'Full high-fidelity local processing (NPU/GPU optimized).',
                ram: totalRamGB.toFixed(1),
                cores: cpuCores
            };
        } else if (totalRamGB >= 8 && cpuCores >= 4) {
            return {
                id: 'BALANCED',
                mode: 'HYBRID',
                description: 'Optimized local processing with selective cloud offloading.',
                ram: totalRamGB.toFixed(1),
                cores: cpuCores
            };
        } else {
            return {
                id: 'LEGACY',
                mode: 'EFFICIENCY',
                description: 'Ultra-light execution profile. API-first fallback active.',
                ram: totalRamGB.toFixed(1),
                cores: cpuCores
            };
        }
    }

    /**
     * IS_COMPATIBLE: Checks if a specific feature is safe to run.
     */
    static isSafe(feature: 'HEAVY_ML' | 'LOCAL_LLM' | 'SWARM_SCALING') {
        const profile = this.getProfile();
        
        switch (feature) {
            case 'HEAVY_ML':
                return profile.id !== 'LEGACY';
            case 'LOCAL_LLM':
                return profile.id === 'SINGULARITY';
            case 'SWARM_SCALING':
                return profile.cores >= 4;
            default:
                return true;
        }
    }
}
