'use server'

import { revalidatePath } from 'next/cache'
import { ApiError, apiFetch } from '@/lib/api/server'
import { ActionResult, CreatedApiKey } from '@/lib/api/types'

async function run<T>(action: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await action()
    revalidatePath('/dashboard')
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : 'Something went wrong, please try again'
    }
  }
}

export async function createApiKey(
  name: string
): Promise<ActionResult<CreatedApiKey>> {
  return run(() =>
    apiFetch<CreatedApiKey>('/v1/me/api-keys', {
      method: 'POST',
      body: JSON.stringify(name ? { name } : {})
    })
  )
}

export async function rollApiKey(
  id: string
): Promise<ActionResult<CreatedApiKey>> {
  return run(() =>
    apiFetch<CreatedApiKey>(`/v1/me/api-keys/${encodeURIComponent(id)}/roll`, {
      method: 'POST'
    })
  )
}

export async function revokeApiKey(id: string): Promise<ActionResult<null>> {
  return run(async () => {
    await apiFetch<void>(`/v1/me/api-keys/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    return null
  })
}
