'use server'

import { revalidatePath } from 'next/cache'

import { ApiError, apiFetch } from '@/lib/api/server'
import { ActionResult } from '@/lib/api/types'

/** Removes the consent and the tokens of an assistant: it has to ask again */
export async function disconnectApp(
  clientId: string
): Promise<ActionResult<null>> {
  try {
    await apiFetch<void>(
      `/v1/me/connected-apps/${encodeURIComponent(clientId)}`,
      { method: 'DELETE' }
    )
    revalidatePath('/dashboard/ai')

    return { ok: true, data: null }
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
