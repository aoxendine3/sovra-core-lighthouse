module.exports = {
  apps: [
    {
      name: 'LIVE_FIRE_AFFILIATE_ENGINE',
      script: 'scripts/LiveFireAffiliateEngine.ts',
      interpreter: 'npx',
      interpreter_args: 'tsx',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        MTLS_CERT: '.mtls/client.crt',
        MTLS_KEY: '.mtls/client.key',
        MTLS_CA: '.mtls/ca.crt'
      }
    },
    {
      name: 'LIQUIDITY_SENTINEL',
      script: 'scripts/MAXX_LIQUIDITY_SENTINEL.ts',
      interpreter: 'npx',
      interpreter_args: 'tsx',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        MTLS_CERT: '.mtls/client.crt',
        MTLS_KEY: '.mtls/client.key',
        MTLS_CA: '.mtls/ca.crt'
      }
    },
    {
      name: 'DATA_HARVESTER_NODE',
      script: 'scripts/SovereignDataHarvester.ts',
      interpreter: 'npx',
      interpreter_args: 'tsx',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'MTLS_REVERSE_PROXY',
      script: 'scripts/start_mtls_proxy.cjs',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 443
      }
    }
  ]
};
