import fs from 'fs';
import { google } from 'googleapis';
import readline from 'readline';

/**
 * google_auth_util
 * Mandate: Initialize the OAuth2 bridge to the SOVRA Sovereign Apex channel.
 */
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

export async function authorize() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error('❌ [AUTH] credentials.json not found in project root. Go to Google Cloud Console > APIs & Services > Credentials to download it.');
  }

  const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have a previously stored token.
  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
    return oAuth2Client;
  }

  // Generate a new token
  const authUrl = oAuth2Client.generateAuthUrl({ 
    access_type: 'offline', 
    scope: SCOPES 
  });
  
  console.log('🔗 [AUTH] Authorize this app by visiting this url:', authUrl);
  
  const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        oAuth2Client.setCredentials(token!);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        resolve(oAuth2Client);
      });
    });
  });
}

// Self-execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  authorize()
    .then(() => console.log('✅ [AUTH] Token grounded successfully.'))
    .catch(console.error);
}
