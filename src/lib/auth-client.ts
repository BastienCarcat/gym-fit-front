import { createAuthClient } from 'better-auth/react'

/**
 * Calls /api/auth on this site's origin, proxied to the API (next.config.js),
 * so the session cookie belongs to this domain.
 */
export const authClient = createAuthClient()

/** Only same-site paths, to avoid open redirects after sign-in */
export function safeRedirect(path: string | null, fallback = '/dashboard') {
  return path && path.startsWith('/') && !path.startsWith('//')
    ? path
    : fallback
}
