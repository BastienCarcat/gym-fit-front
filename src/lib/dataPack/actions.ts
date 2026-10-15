'use server'

import { redirect } from 'next/navigation'

import { ApiError, apiFetch } from '@/lib/api/server'
import { ActionResult } from '@/lib/api/types'

/**
 * Sends the customer to Stripe Checkout to buy the data pack, once the
 * license is accepted
 */
export async function startDataPackCheckout(): Promise<ActionResult<null>> {
  let url: string

  try {
    ;({ url } = await apiFetch<{ url: string }>('/v1/me/billing/data-pack', {
      method: 'POST',
      body: JSON.stringify({ acceptLicense: true })
    }))
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : 'Something went wrong, please try again'
    }
  }

  redirect(url)
}
