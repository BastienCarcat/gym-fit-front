import { cookies } from 'next/headers'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string
  ) {
    super(message)
  }
}

/**
 * Server-side call to the GymFit API on behalf of the signed-in user:
 * forwards the session cookie. Only usable in server components and actions.
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const baseUrl = (process.env.GYM_FIT_BASE_URL ?? '').replace(/\/$/, '')
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      cookie: cookies().toString(),
      ...init.headers
    },
    cache: 'no-store'
  })

  if (response.status === 204) {
    return undefined as T
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      body?.detail ?? body?.message ?? 'Request failed',
      body?.code
    )
  }

  return body as T
}
