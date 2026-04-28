import sqlite3 from 'sqlite3';
import path from 'path';
import os from 'os';
import { SOVRADB } from '../src/lib/db/SOVRADB';

const CHROME_PATH = path.join(os.homedir(), 'Library/Application Support/Google/Chrome/Default');
const LOGIN_DATA_PATH = path.join(CHROME_PATH, 'Login Data');
const HISTORY_PATH = path.join(CHROME_PATH, 'History');

async function runForensics() {
  console.log('--- [HOUSE_OF_OXONE_FORENSICS] INITIATED ---');
  
  const keywords = ['houseofoxone', 'yahoo.com', 'ymail.com', 'mtgox', 'bitcointalk'];
  const results: any[] = [];

  // 1. Scan Login Data (URLs/Usernames)
  console.log('[FORENSICS] Scanning Browser Login Data (URLs)...');
  const db = new sqlite3.Database(LOGIN_DATA_PATH);
  
  const query = `
    SELECT origin_url, username_value 
    FROM logins 
    WHERE username_value LIKE '%houseofoxone%' 
       OR origin_url LIKE '%mtgox%' 
       OR origin_url LIKE '%bitcointalk%'
  `;

  await new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error('[ERROR] Failed to query Login Data:', err);
        return resolve(null);
      }
      if (rows.length > 0) {
        console.log(`[FOUND] ${rows.length} potential credential markers in Local DB.`);
        results.push(...rows);
      }
      resolve(null);
    });
  });

  // 2. Scan History for 2009-2010 deep nodes
  console.log('[FORENSICS] Scanning Deep URL History...');
  const historyDb = new sqlite3.Database(HISTORY_PATH);
  const historyQuery = `
    SELECT url, title, datetime(last_visit_time/1000000-11644473600,'unixepoch') as last_visit
    FROM urls
    WHERE url LIKE '%houseofoxone%' OR url LIKE '%mtgox%'
    ORDER BY last_visit_time ASC
  `;

  await new Promise((resolve, reject) => {
    historyDb.all(historyQuery, (err, rows) => {
      if (err) {
        console.error('[ERROR] Failed to query History:', err);
        return resolve(null);
      }
      if (rows.length > 0) {
        console.log(`[FOUND] ${rows.length} historical URL nodes.`);
        results.push(...rows);
      }
      resolve(null);
    });
  });

  // 3. Log results to Sovereign DB
  if (results.length > 0) {
    await SOVRADB.logAgentActivity(
      'SovereignScavenger',
      'Forensic Markers Identified',
      'SUCCESS',
      { forensics: results }
    );
    console.log('[SUCCESS] Forensic report logged to Sovereign Database.');
  } else {
    console.log('[INFO] No direct plaintext markers found in active local profiles.');
  }

  console.log('--- [HOUSE_OF_OXONE_FORENSICS] COMPLETED ---');
}

runForensics().catch(console.error);
