/**
 * AuthManager
 * Responsible for the Authorization Queue within the Digital Fortress.
 * Holds high-risk actions (e.g., $500+ outflows) until user confirmation.
 */
import { randomUUID } from 'crypto';
export class AuthManager {
    queue = [];
    tokenRegistry = new Map();
    sovereignOverride = false;
    constructor() { }
    /**
     * Toggles the Sovereign Override (Maxx Sign-Off Privilege).
     */
    setSovereignOverride(enabled) {
        this.sovereignOverride = enabled;
        console.warn(`[AuthManager] SOVEREIGN OVERRIDE: ${enabled ? 'ENABLED - MAXX IN COMMAND' : 'DISABLED'}`);
    }
    isSovereignOverrideEnabled() {
        return this.sovereignOverride;
    }
    /**
     * Updates the health status of a specific service token.
     */
    updateTokenHealth(status) {
        this.tokenRegistry.set(status.service, status);
        console.log(`[AuthManager] HEALTH_SYNC: ${status.service} is ${status.status}`);
    }
    /**
     * Checks if the system is technically cleared for high-risk operations.
     */
    isSystemHealthy() {
        const statuses = Array.from(this.tokenRegistry.values());
        if (statuses.length === 0)
            return true; // Initializing state
        return !statuses.some(s => s.status === 'OFFLINE');
    }
    /**
     * Adds a high-risk action to the queue.
     * If Sovereign Override is enabled, Maxx auto-approves the action.
     */
    requestAuthorization(action) {
        const id = `AUTH-${randomUUID().toUpperCase()}`;
        const status = this.sovereignOverride ? 'MAXX_SIGNED' : 'PENDING';
        const newAction = {
            ...action,
            id,
            timestamp: new Date(),
            status
        };
        this.queue.push(newAction);
        if (this.sovereignOverride) {
            console.log(`[AuthManager] SOVEREIGN AUTO-SIGN: ${action.type} - Approved by Maxx.`);
        }
        else {
            console.warn(`[AuthManager] ACTION QUEUED: ${action.type} - ${action.description}`);
        }
        return id;
    }
    /**
     * Approves a pending action.
     */
    approveAction(id) {
        const action = this.queue.find(a => a.id === id);
        if (action) {
            action.status = 'APPROVED';
            console.log(`[AuthManager] ACTION APPROVED: ${id}`);
        }
    }
    /**
     * Rejects a pending action.
     */
    rejectAction(id) {
        const action = this.queue.find(a => a.id === id);
        if (action) {
            action.status = 'REJECTED';
            console.log(`[AuthManager] ACTION REJECTED: ${id}`);
        }
    }
    getPendingActions() {
        return this.queue.filter(a => a.status === 'PENDING');
    }
    getActionStatus(id) {
        const action = this.queue.find(a => a.id === id);
        return action ? action.status : 'NOT_FOUND';
    }
}
