'use client'

import { reopenConsent, useConsent } from '@/lib/analytics'

/** In the footers, to change the answer given to the cookie banner */
export function CookieSettingsButton({
  className = ''
}: {
  className?: string
}) {
  const consent = useConsent()

  if (!consent || consent === 'pending') {
    return null
  }

  return (
    <button className={className} type="button" onClick={reopenConsent}>
      Cookie settings
    </button>
  )
}
