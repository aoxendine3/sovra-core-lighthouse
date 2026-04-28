import { CoreKernel } from '../maxx/kernel.ts';
import { TonyDB } from '../db/TonyDB.ts';
import { SovereignSensor } from '../hardware/SovereignSensor.ts';
import axios from 'axios';

/**
 * SovereignImageAgent (THE VISIONARY)
 * Mandate: Zero-Compromise Local Image Synthesis.
 * 
 * Logic: Interfaces with local Stable Diffusion WebUI (AUTOMATIC1111) via API.
 * Capabilities: TXT2IMG, IMG2IMG, Creative Ad Generation.
 */
export class SovereignImageAgent extends CoreKernel {
    private apiBase = 'http://127.0.0.1:7860/sdapi/v1';

    constructor() {
        super();
    }

    /**
     * GENERATE: Synthesizes an image locally based on a prompt.
     */
    async generate(prompt: string, negativePrompt = '', steps = 20, width = 512, height = 512) {
        const profile = SovereignSensor.getProfile();
        
        if (profile.id === 'LEGACY') {
            console.error('[SovereignImage] HARDWARE_INSUFFICIENT: Stable Diffusion requires high-end hardware.');
            return { status: 'FAILED', reason: 'INSUFFICIENT_HARDWARE' };
        }

        console.log(`[SovereignImage] SYNTHESIZING: "${prompt.substring(0, 50)}..."`);
        
        try {
            const response = await axios.post(`${this.apiBase}/txt2img`, {
                prompt,
                negative_prompt: negativePrompt,
                steps,
                width,
                height,
                sampler_name: 'Euler a'
            }, { timeout: 60000 });

            const images = response.data.images;
            if (images && images.length > 0) {
                const activity = `Generated image for prompt: ${prompt.substring(0, 30)}`;
                await TonyDB.logAgentActivity('SovereignImage', activity, 'SUCCESS');
                return { status: 'SUCCESS', imageData: images[0] };
            }

            return { status: 'FAILED', reason: 'NO_IMAGE_RETURNED' };
        } catch (error) {
            console.error(`[SovereignImage] API_FAILURE: Ensure Stable Diffusion is running with --api flag.`);
            return { status: 'FAILED', reason: 'API_UNREACHABLE' };
        }
    }

    /**
     * CHECK_AVAILABILITY: Verifies if the local SD instance is online.
     */
    async checkAvailability() {
        try {
            await axios.get(`${this.apiBase}/options`, { timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }
}
