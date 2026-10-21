import { useSyncExternalStore } from 'react'
import posthog from 'posthog-js'

export type Consent = 'granted' | 'denied' | 'pending'

const CONSENT_CHANGE = 'gymfit:consent'

/**
 * The visitor's answer to the cookie banner. Null on the server, and when
 * PostHog is not set up (no NEXT_PUBLIC_POSTHOG_TOKEN).
 */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, readConsent, () => null)
}

export function answerConsent(granted: boolean) {
  if (granted) {
    posthog.opt_in_capturing()
  } else {
    posthog.opt_out_capturing()
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE))
}

/** Shows the banner again: consent is withdrawn as easily as it is given */
export function reopenConsent() {
  posthog.clear_opt_in_out_capturing()
  window.dispatchEvent(new Event(CONSENT_CHANGE))
}

/**
 * At sign-out and account deletion, the next visitor is someone else. The
 * reset clears the consent too: the banner asks them again.
 */
export function forgetUser() {
  if (posthog.__loaded) {
    posthog.reset()
    window.dispatchEvent(new Event(CONSENT_CHANGE))
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE, onChange)

  return () => window.removeEventListener(CONSENT_CHANGE, onChange)
}

function readConsent(): Consent | null {
  return posthog.__loaded ? posthog.get_explicit_consent_status() : null
}
