import { createAuthClient } from 'better-auth/react'

/**
 * Calls /api/auth on this site's origin, proxied to the API (next.config.js),
 * so the session cookie belongs to this domain.
 */
export const authClient = createAuthClient()
