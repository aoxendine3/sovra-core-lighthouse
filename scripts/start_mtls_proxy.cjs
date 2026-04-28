const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// Check if mTLS certificates exist
try {
  fs.readFileSync('.mtls/ca.crt');
} catch {
  console.error('[mTLS] Fatal: Root CA not found. Run generate_mtls_ca.sh first.');
  process.exit(1);
}

const options = {
  key: fs.readFileSync('.mtls/client.key'),
  cert: fs.readFileSync('.mtls/client.crt'),
  ca: fs.readFileSync('.mtls/ca.crt'),
  requestCert: true,
  rejectUnauthorized: true, // This is the core mTLS drop-rule
};

const proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('mTLS Proxy Error.');
});

const server = https.createServer(options, function(req, res) {
  // If the client presented a valid cert signed by our CA, rejectUnauthorized: true allows it.
  // We forward the request to Next.js on port 3000.
  proxy.web(req, res, { target: 'http://localhost:3000' });
});

console.log('[mTLS] Sovereign Reverse Proxy active on port 8443.');
console.log('[mTLS] All connections without the Aurvant Client Cert will be instantly dropped at the transport layer.');
server.listen(8443);
