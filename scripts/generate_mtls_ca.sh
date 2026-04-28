#!/bin/bash
# AURVANT mTLS ROOT CA & CLIENT CERTIFICATE GENERATOR
# WARNING: Keep these files entirely out of source control.

set -e

DIR=".mtls"
mkdir -p "$DIR"

echo "🔐 Generating Aurvant Sovereign Root CA..."
# Root CA Private Key
openssl genrsa -out "$DIR/ca.key" 4096
# Root CA Certificate
openssl req -x509 -new -nodes -key "$DIR/ca.key" -sha256 -days 3650 -out "$DIR/ca.crt" \
    -subj "/C=US/ST=Sovereign/L=APEX/O=Aurvant Security/OU=Root CA/CN=Aurvant Root CA"

echo "🔐 Generating Swarm Client Certificate..."
# Client Private Key
openssl genrsa -out "$DIR/client.key" 2048
# Client Certificate Signing Request (CSR)
openssl req -new -key "$DIR/client.key" -out "$DIR/client.csr" \
    -subj "/C=US/ST=Sovereign/L=APEX/O=Aurvant Nodes/OU=Swarm/CN=Aurvant Swarm Client"
# Sign Client Cert with Root CA
openssl x509 -req -in "$DIR/client.csr" -CA "$DIR/ca.crt" -CAkey "$DIR/ca.key" -CAcreateserial -out "$DIR/client.crt" -days 365 -sha256

echo "🧹 Cleaning up CSR and serials..."
rm -f "$DIR/client.csr" "$DIR/ca.srl"

echo "=========================================================="
echo "✅ mTLS Keys Generated Successfully in $DIR/"
echo "Root CA: ca.crt"
echo "Client Cert: client.crt"
echo "Client Key: client.key"
echo "=========================================================="
