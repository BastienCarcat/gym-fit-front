'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { forgetUser } from '@/lib/analytics'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut()
    forgetUser()
    router.push('/')
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={signOut}>
      Sign out
    </Button>
  )
}
