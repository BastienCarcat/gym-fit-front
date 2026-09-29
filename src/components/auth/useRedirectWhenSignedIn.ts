'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'

/**
 * Sends signed-in visitors away from the sign-in and sign-up pages. The
 * middleware covers page loads; this covers the back button and a session
 * opened in another tab (email confirmed from the inbox).
 */
export function useRedirectWhenSignedIn(target: string) {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (session) {
      router.replace(target)
    }
  }, [session, router, target])
}
