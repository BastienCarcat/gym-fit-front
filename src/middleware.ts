import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

/**
 * Cheap check on the presence of the session cookie. The session itself is
 * validated by the API when the dashboard loads.
 */
export function middleware(request: NextRequest) {
  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  const url = new URL('/login', request.url)
  url.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/dashboard/:path*']
}
