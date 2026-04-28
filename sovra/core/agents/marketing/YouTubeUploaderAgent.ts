import { google } from 'googleapis';
import fs from 'fs';
import { TonyDB } from '../../db/TonyDB.ts';

/**
 * Ω_YOUTUBE_UPLOADER_AGENT
 * Mandate: Absolute viral saturation on Tony Sovereign Apex.
 */
export class YouTubeUploaderAgent {
  private static youtube = google.youtube('v3');

  /**
   * upload: Deploys the asset to YouTube.
   * Requires OAuth2 client to be pre-authorized.
   */
  public static async upload(filePath: string, metadata: { title: string; body: string }, auth: any) {
    console.log(`🚀 [UPLOADER] Deploying to Tony Sovereign Apex: ${metadata.title}`);
    
    try {
      const res = await this.youtube.videos.insert({
        auth: auth,
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title: metadata.title,
            description: `${metadata.body}\n\n#Singularity #InstitutionalPower #SovereignAlpha`,
            categoryId: '27', // Education/Tech
          },
          status: { 
            privacyStatus: 'public', 
            selfDeclaredMadeForKids: false 
          },
        },
        media: { 
          body: fs.createReadStream(filePath) 
        },
      });

      console.log(`✅ [UPLOADER] Broadcast Successful. Video ID: ${res.data.id}`);
      
      await TonyDB.logAgentActivity('YOUTUBE_AGENT', `Upload Complete: ${metadata.title}`, 'LIVE', {
        videoId: res.data.id,
        url: `https://youtu.be/${res.data.id}`
      });

      return res.data.id;
    } catch (error) {
      console.error(`❌ [UPLOADER] Deployment Failure: ${error}`);
      await TonyDB.logAgentActivity('YOUTUBE_AGENT', `Upload Error: ${metadata.title}`, 'FAILED', { error: String(error) });
      return null;
    }
  }
}
