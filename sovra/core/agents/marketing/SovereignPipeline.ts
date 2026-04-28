import { ApexVocalCore } from './ApexVocalCore.ts';
import { VideoSynthesisAgent } from './VideoSynthesisAgent.ts';
import { YouTubeUploaderAgent } from './YouTubeUploaderAgent.ts';
import { authorize } from '../../../scripts/google_auth_util.ts';
import { TonyDB } from '../../db/TonyDB.ts';

/**
 * Ω_SOVEREIGN_PIPELINE
 * Mandate: The final Actuation Bridge for universal saturation.
 */
export class SovereignPipeline {
  
  /**
   * execute: Orchestrates the Vocal -> Video -> YouTube deployment.
   */
  public static async execute(script: { title: string; body: string }) {
    console.log(`🎬 [MANDATE] Synthesizing asset for Singularity Broadcast Node...`);

    try {
      // 1. Authorize YouTube Bridge
      const auth = await authorize();
      
      // 2. Vocal Pulse (Mac Local)
      const audio = await ApexVocalCore.triggerVocalPulse(script.body, script.title);
      if (audio.status !== 'SUCCESS') {
        throw new Error('[PIPELINE] Vocal Core failure. Check ~/apex-models status.');
      }

      // 3. Video Render (FFmpeg)
      // Reference a standard high-contrast background asset
      // Fallback path if custom visuals aren't provided
      const rawVisual = `./assets/visuals/singularity_glitch.mp4`;
      const renderResult = await VideoSynthesisAgent.mandateRender(
        script.title, 
        audio.path, 
        rawVisual
      ) as any;

      if (renderResult.status === 'PENDING_BINARY') {
        console.warn(`[PIPELINE] Render grounded in PENDING status (FFmpeg binary missing).`);
        return;
      }

      // 4. YouTube Upload
      const videoId = await YouTubeUploaderAgent.upload(
        renderResult.path, 
        script, 
        auth
      );

      if (videoId) {
        console.log(`✅ [SINGULARITY] Asset fully grounded and live: https://youtu.be/${videoId}`);
        return videoId;
      }

    } catch (err) {
      console.error(`❌ [PIPELINE] Critical Failure: ${err}`);
      await TonyDB.logAgentActivity('SYSTEM', 'PIPELINE_FAULT', 'ERROR', { error: String(err) });
    }
  }
}
