import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { visitorHeaders } from '@/lib/api/visitor'

/**
 * The zip of a version, fetched from the API with the session of the visitor
 * and passed through: the API checks the license and records the download
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ version: string }> }
) {
  const baseUrl = (process.env.GYM_FIT_BASE_URL ?? '').replace(/\/$/, '')
  const [{ version }, cookieStore, headerStore] = await Promise.all([
    params,
    cookies(),
    headers()
  ])
  const response = await fetch(
    `${baseUrl}/v1/me/data-pack/releases/${encodeURIComponent(version)}/download`,
    {
      headers: {
        cookie: cookieStore.toString(),
        ...visitorHeaders(headerStore),
        'user-agent': headerStore.get('user-agent') ?? ''
      },
      cache: 'no-store'
    }
  )

  if (!response.ok || !response.body) {
    const body = await response.json().catch(() => null)
    const error =
      body?.detail ?? body?.message ?? 'The download failed, please try again'

    // The button of the page reads the error; a link opened directly goes
    // back to the page, which tells it
    if (request.headers.get('accept')?.includes('application/json')) {
      return NextResponse.json({ error }, { status: response.status })
    }

    const url = new URL('/dashboard/data-pack', request.url)

    url.searchParams.set('error', error)

    return NextResponse.redirect(url, 303)
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition':
        response.headers.get('content-disposition') ??
        `attachment; filename="gymfit-exercises-${version}.zip"`,
      'Cache-Control': 'no-store'
    }
  })
}
