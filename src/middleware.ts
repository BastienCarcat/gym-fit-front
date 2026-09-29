import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import {
  CLIENT_IP_HEADER,
  FRONTEND_PROXY_SECRET_HEADER,
  visitorHeaders
} from '@/lib/api/visitor'
import { safeRedirect } from '@/lib/redirect'

const GUEST_ONLY_PATHS = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/auth/')) {
    return withVisitorHeaders(request)
  }

  if (GUEST_ONLY_PATHS.includes(pathname)) {
    return redirectSignedIn(request)
  }

  // Cheap check on the presence of the session cookie. The session itself is
  // validated by the API when the dashboard loads.
  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  const url = new URL('/login', request.url)
  url.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

/**
 * Auth requests are proxied to the API (next.config.js) with the visitor's
 * IP, so the API rate limits sign-ins per visitor and not for everyone.
 */
function withVisitorHeaders(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.delete(CLIENT_IP_HEADER)
  headers.delete(FRONTEND_PROXY_SECRET_HEADER)

  for (const [name, value] of Object.entries(visitorHeaders(request.headers))) {
    headers.set(name, value)
  }

  return NextResponse.next({ request: { headers } })
}

/** Signed-in visitors skip the sign-in and sign-up pages */
async function redirectSignedIn(request: NextRequest) {
  if (getSessionCookie(request) && (await hasSession(request))) {
    const target = safeRedirect(request.nextUrl.searchParams.get('redirect'))
    return NextResponse.redirect(new URL(target, request.url))
  }

  return NextResponse.next()
}

/**
 * The cookie can outlive its session (expired, revoked, account deleted):
 * ask the API, and show the page when it cannot answer.
 */
async function hasSession(request: NextRequest): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.GYM_FIT_BASE_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get('cookie') ?? '',
          ...visitorHeaders(request.headers)
        },
        cache: 'no-store'
      }
    )
    const body = response.ok ? await response.json() : null

    return Boolean(body?.session)
  } catch {
    return false
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/:path*', '/login', '/signup']
}
