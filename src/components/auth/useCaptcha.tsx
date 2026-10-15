'use client'

import Script from 'next/script'
import { ReactNode, useCallback, useRef, useState } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

interface TurnstileApi {
  render(element: HTMLElement, options: Record<string, unknown>): string
  reset(widgetId: string): void
  remove(widgetId: string): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export interface Captcha {
  /** The widget, to place in the form; nothing without a site key */
  widget: ReactNode
  /** Whether a request may go: a token is there, or there is no captcha */
  ready: boolean
  /** Headers of the auth request, carrying the token */
  headers: Record<string, string>
  /** A token serves one request: call after each */
  reset: () => void
}

/**
 * Cloudflare Turnstile before the auth requests that send an email or try a
 * password (the API checks the token). Off without
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY, so the site key goes live before the
 * secret of the API.
 */
export function useCaptcha(): Captcha {
  const widgetId = useRef<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(
    () => typeof window !== 'undefined' && Boolean(window.turnstile)
  )

  // A callback ref: the widget follows its container when the page swaps it
  const mount = useCallback(
    (element: HTMLDivElement | null) => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }

      if (!element || !SITE_KEY || !loaded || !window.turnstile) return

      widgetId.current = window.turnstile.render(element, {
        sitekey: SITE_KEY,
        theme: 'dark',
        size: 'flexible',
        callback: (value: string) => setToken(value),
        'expired-callback': () => setToken(null),
        'error-callback': () => setToken(null)
      })
    },
    [loaded]
  )

  const reset = useCallback(() => {
    setToken(null)
    if (widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current)
    }
  }, [])

  if (!SITE_KEY) {
    return { widget: null, ready: true, headers: {}, reset: () => undefined }
  }

  return {
    widget: (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setLoaded(true)}
          onReady={() => setLoaded(true)}
        />
        <div ref={mount} className="min-h-[65px]" />
      </>
    ),
    ready: Boolean(token),
    headers: token ? { 'x-captcha-response': token } : {},
    reset
  }
}
