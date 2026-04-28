import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

async function listPages() {
  console.log('--- Checking Notion Access ---');
  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'page' }
    });
    console.log(`Found ${response.results.length} pages:`);
    response.results.forEach((p: any) => {
      console.log(`- ${p.id}: ${p.properties?.title?.title?.[0]?.plain_text || 'Untitled'}`);
    });
  } catch (err: any) {
    console.error('Search failed:', err.message);
  }
}

listPages().catch(console.error);
