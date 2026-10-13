'use client'

import { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'

/** Read by the API reference (api.gymfit-api.com) to show the dashboard link */
const HINT = 'gf_signed_in'
const THIRTY_DAYS = 60 * 60 * 24 * 30

/**
 * Keeps a cookie on the whole domain while someone is signed in. The session
 * cookie belongs to this site alone and the reference lives on the API's
 * domain: this one only tells it which link to show, it proves nothing.
 */
export function SignedInHint() {
  const { data: session, isPending } = authClient.useSession()
  const signedIn = Boolean(session?.user)

  useEffect(() => {
    if (isPending) {
      return
    }

    const { hostname, protocol } = window.location
    const attributes = [
      'Path=/',
      'SameSite=Lax',
      signedIn ? `Max-Age=${THIRTY_DAYS}` : 'Max-Age=0',
      ...(hostname.endsWith('gymfit-api.com') ? ['Domain=gymfit-api.com'] : []),
      ...(protocol === 'https:' ? ['Secure'] : [])
    ]

    document.cookie = `${HINT}=${signedIn ? '1' : ''}; ${attributes.join('; ')}`
  }, [isPending, signedIn])

  return null
}
