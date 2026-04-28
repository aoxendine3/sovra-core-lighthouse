import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const token = process.env.NOTION_INTEGRATION_TOKEN;

async function verifyDBs() {
  const dbIds = [
    '34c7f991-a9a1-812b-b714-f4359cd875f0', // Tasks Queue
    '34c7f991-a9a1-811b-a79f-f37290d76cc0', // Change Log
    '34c7f991-a9a1-8119-94ce-e1953be67c7f'  // Metrics Snapshot
  ];

  for (const id of dbIds) {
    const response = await fetch(`https://api.notion.com/v1/databases/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28'
      }
    });
    const db = await response.json();
    console.log(`DB: ${id} (${db.title[0].plain_text})`);
    console.log(`Properties: ${Object.keys(db.properties).sort().join(', ')}`);
    console.log('---');
  }
}

verifyDBs().catch(console.error);
