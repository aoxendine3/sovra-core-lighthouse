import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const token = process.env.NOTION_INTEGRATION_TOKEN;
const parentPageId = process.env.NOTION_PAGE_ID;

async function notionRequest(endpoint: string, method: string, body?: any) {
  const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json();
  if (!response.ok) {
    console.error(`Notion API Error (${endpoint}):`, data);
    throw new Error(data.message);
  }
  return data;
}

async function setupHQ() {
  if (!token || !parentPageId) throw new Error('Missing NOTION_INTEGRATION_TOKEN or NOTION_PAGE_ID');

  console.log('--- Establishing Revenue Ops HQ ---');

  // 1. Create Revenue Ops HQ Page (re-creating to ensure a fresh start if parentPageId changed)
  const hqPage = await notionRequest('pages', 'POST', {
    parent: { type: 'page_id', page_id: parentPageId },
    properties: {
      title: {
        title: [{ text: { content: 'Revenue Ops HQ' } }]
      }
    },
    icon: { type: 'emoji', emoji: '🚀' }
  });

  const hqPageId = hqPage.id;
  console.log(`Revenue Ops HQ established: ${hqPageId}`);

  // 2. Create Tasks Queue Database
  const tasksDb = await notionRequest('databases', 'POST', {
    parent: { type: 'page_id', page_id: hqPageId },
    title: [{ text: { content: 'Tasks Queue' } }],
    properties: {
      'Task Name': { title: {} },
      Status: {
        select: {
          options: [
            { name: 'To do', color: 'gray' },
            { name: 'Doing', color: 'blue' },
            { name: 'Done', color: 'green' },
            { name: 'Blocked', color: 'red' }
          ]
        }
      },
      Platform: {
        select: {
          options: [
            { name: 'CJ', color: 'orange' },
            { name: 'Gumroad', color: 'pink' }
          ]
        }
      },
      Type: {
        select: {
          options: [
            { name: 'Link', color: 'yellow' },
            { name: 'Product', color: 'purple' },
            { name: 'Promo', color: 'brown' },
            { name: 'Analytics', color: 'orange' },
            { name: 'Fix', color: 'red' }
          ]
        }
      },
      Risk: {
        select: {
          options: [
            { name: 'Low', color: 'green' },
            { name: 'Medium', color: 'yellow' },
            { name: 'High', color: 'red' }
          ]
        }
      },
      'Notes + Outcome': { rich_text: {} }
    }
  });
  console.log(`Tasks Queue DB created: ${tasksDb.id}`);

  // 3. Create Change Log Database
  const changeLogDb = await notionRequest('databases', 'POST', {
    parent: { type: 'page_id', page_id: hqPageId },
    title: [{ text: { content: 'Change Log (Audit Trail)' } }],
    properties: {
      'Change Event': { title: {} },
      'Date/Time': { date: {} },
      Platform: {
        select: {
          options: [
            { name: 'CJ', color: 'orange' },
            { name: 'Gumroad', color: 'pink' }
          ]
        }
      },
      'What Changed': { rich_text: {} },
      Why: { rich_text: {} },
      'Before/After (Copy)': { rich_text: {} },
      'Rollback Plan': { rich_text: {} },
      Result: { rich_text: {} }
    }
  });
  console.log(`Change Log DB created: ${changeLogDb.id}`);

  // 4. Create Metrics Snapshot Database
  const metricsDb = await notionRequest('databases', 'POST', {
    parent: { type: 'page_id', page_id: hqPageId },
    title: [{ text: { content: 'Metrics Snapshot' } }],
    properties: {
      Date: { title: {} },
      'CJ Clicks': { number: {} },
      'CJ Sales': { number: {} },
      'CJ Commission': { number: {} },
      'Gumroad Sales': { number: {} },
      'Gumroad Refunds': { number: {} },
      'Gumroad Conversion': { number: {} },
      'Notes / Anomalies': { rich_text: {} }
    }
  });
  console.log(`Metrics Snapshot DB created: ${metricsDb.id}`);

  console.log('\n--- Revenue Ops HQ Setup Complete ---');
}

setupHQ().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
