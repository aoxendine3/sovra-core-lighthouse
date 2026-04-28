import { SOVRADB } from '../../../sovra/core/db/SOVRADB';

/**
 * SOVRA Agentic Memory (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Verifiably persists agent 'Learnings', 'States', and 
 * 'Recursive Upgrades' across session boundaries (MemGPT Architecture).
 * 
 * Mandate: Absolute Persistence. Zero Amnesia.
 */

export class SOVRAMemory {
    /**
     * commitLearning: Saves a new operational fact or strategic update.
     */
    static async commitLearning(agent: string, topic: string, insight: string) {
        const db = await SOVRADB.getInstance();
        await db.run(
            'INSERT INTO sovra_agent_memory (agent, topic, insight, confidence, timestamp) VALUES (?, ?, ?, ?, ?)',
            [agent, topic, insight, 1.0, new Date().toISOString()]
        );
        console.log(`[SOVRA_Memory] GROUNDED_INSIGHT: ${agent} -> ${topic}`);
    }

    /**
     * recallTopic: Retrieves the latest insight on a specific topic.
     */
    static async recallTopic(topic: string): Promise<string | null> {
        const db = await SOVRADB.getInstance();
        const row = await db.get(
            'SELECT insight FROM sovra_agent_memory WHERE topic = ? ORDER BY timestamp DESC LIMIT 1',
            [topic]
        );
        return row ? row.insight : null;
    }

    /**
     * getAgentState: Recovers the persistent state for a specific agent.
     */
    static async getAgentState(agent: string): Promise<any> {
        const db = await SOVRADB.getInstance();
        const row = await db.get(
            'SELECT insight FROM sovra_agent_memory WHERE agent = ? AND topic = "AGENT_STATE" ORDER BY timestamp DESC LIMIT 1',
            [agent]
        );
        return row ? JSON.parse(row.insight) : null;
    }
}
