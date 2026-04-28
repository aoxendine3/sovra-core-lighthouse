import { SovereignDB } from '../agency/lib/db/SovereignDB.ts';

async function testDB() {
  try {
    console.log('Testing SovereignDB pulse...');
    const db = await SovereignDB.getInstance();
    const result = await db.get('SELECT 1 + 1 AS result');
    console.log('DB Pulse Verified:', result);
  } catch (err) {
    console.error('DB Pulse Fault:', err);
    process.exit(1);
  }
}

testDB();
