import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);
/**
 * VoiceExecutive
 *
 * Provides system-level autonomous voice reporting for the Maxx Sovereign Agency.
 */
export class VoiceExecutive {
    static isSpeaking = false;
    /**
     * Verbally announce a status update or alert.
     */
    static async announce(text) {
        if (this.isSpeaking)
            return;
        this.isSpeaking = true;
        try {
            console.log(`[VoiceExecutive] Announcing: ${text}`);
            // Using 'Daniel' voice on macOS for a premium, authoritative tone
            await execPromise(`say -v Daniel "${text}"`);
        }
        catch (error) {
            console.error('[VoiceExecutive] Failed to announce:', error);
        }
        finally {
            this.isSpeaking = false;
        }
    }
    /**
     * Shorthand for executive alerts.
     */
    static async alert(mission, status) {
        await this.announce(`Executive Alert. Mission ${mission} has reached status ${status}.`);
    }
}
