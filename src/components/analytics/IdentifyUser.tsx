'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

import { useConsent } from '@/lib/analytics'
import { authClient } from '@/lib/auth-client'

/**
 * Links the visits of a signed-in visitor to their account, once they have
 * accepted the cookies. Sign-out forgets it (forgetUser).
 */
export function IdentifyUser() {
  const consent = useConsent()
  const { data: session } = authClient.useSession()
  const user = session?.user

  useEffect(() => {
    if (consent === 'granted' && user) {
      posthog.identify(user.id, { email: user.email, name: user.name })
    }
  }, [consent, user?.id, user?.email, user?.name])

  return null
}
