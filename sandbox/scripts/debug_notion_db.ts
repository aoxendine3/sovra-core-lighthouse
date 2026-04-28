import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

async function debugDB() {
  const id = 'ee702f4a-2d97-4cfe-ba32-b52c667a69cc';
  const db = await notion.databases.retrieve({ database_id: id });
  console.log(JSON.stringify(db, null, 2));
}

debugDB().catch(console.error);
