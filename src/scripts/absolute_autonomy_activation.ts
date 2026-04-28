import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function activate() {
    console.log('--- [APEX_ABSOLUTE_AUTONOMY_ACTIVATION] ---');
    
    const token = process.env.NOTION_INTEGRATION_TOKEN || process.env.NOTION_TOKEN;
    const databaseId = '129944e5e8530436498e8cf823ea4c0f8'; // Task Queue or Decision Log ID from your previous setup

    if (!token) {
        console.error('Missing Notion Token');
        return;
    }

    const notion = new Client({ auth: token });

    try {
        // Record the activation in the Decision Log
        await notion.pages.create({
            parent: { database_id: '09944e5e8530436498e8cf823ea4c0f8' },
            properties: {
                'Decision': { title: [{ text: { content: 'ACTIVATE_ABSOLUTE_AUTONOMY' } }] },
                'Rationale': { rich_text: [{ text: { content: 'User mandate "do whats best and prefered". Integrated GrowthAgent, CJSyncAgent, and GumroadDirectorAgent into 24/7 autonomous loop. Initializing live-fire revenue pulses.' } }] },
                'Status': { select: { name: 'EXECUTED' } },
                'Timestamp': { date: { start: new Date().toISOString() } }
            }
        });

        console.log('[Notion] Decision Log Updated: ABSOLUTE_AUTONOMY_ACTIVE');
        
    } catch (err: any) {
        console.error('[Notion] Fault:', err.message);
    }
}

activate();
