/**
 * configService (Institutional Configuration Ledger)
 * Mandate: Absolute precision in the retrieval of Sovereign secrets.
 */

export function getStripeConfig() {
  return {
    stripeAccountId: process.env.STRIPE_ACCOUNT_ID || 'acct_institutional_default',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_sovereign_logic'
  };
}

export function getGitHubConfig() {
  return {
    token: process.env.GITHUB_TOKEN || '',
    owner: process.env.GITHUB_OWNER || 'aoxendine3',
    repo: process.env.GITHUB_REPO || 'mac-jarvis'
  };
}
