import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import {
  CLIENT_IP_HEADER,
  FRONTEND_PROXY_SECRET_HEADER,
  visitorHeaders
} from '@/lib/api/visitor'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    return withVisitorHeaders(request)
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

export const config = {
  matcher: ['/dashboard/:path*', '/api/auth/:path*']
}
