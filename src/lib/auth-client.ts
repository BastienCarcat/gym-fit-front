import { oauthProviderClient } from '@better-auth/oauth-provider/client'
import { createAuthClient } from 'better-auth/react'

/**
 * Calls /api/auth on this site's origin, proxied to the API (next.config.js),
 * so the session cookie belongs to this domain. The OAuth plugin carries the
 * signed query of an AI assistant through the sign-in and the consent.
 */
export const authClient = createAuthClient({
  plugins: [oauthProviderClient()]
})
