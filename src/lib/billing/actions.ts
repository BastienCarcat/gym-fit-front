'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ApiError, apiFetch } from '@/lib/api/server'
import { ActionResult, PlanId } from '@/lib/api/types'

/** Sends the customer to Stripe Checkout to subscribe to a paid plan. */
export async function startCheckout(plan: PlanId): Promise<ActionResult<null>> {
  let url: string

  try {
    url = await postForUrl('/v1/me/billing/checkout', { plan })
  } catch (error) {
    return failure(error)
  }

  redirect(url)
}

/** Sends the customer to the Stripe Customer Portal. */
export async function openBillingPortal(): Promise<ActionResult<null>> {
  let url: string

  try {
    url = await postForUrl('/v1/me/billing/portal')
  } catch (error) {
    return failure(error)
  }

  redirect(url)
}

export async function changePlan(plan: PlanId): Promise<ActionResult<null>> {
  try {
    await apiFetch('/v1/me/billing/change-plan', {
      method: 'POST',
      body: JSON.stringify({ plan })
    })
  } catch (error) {
    return failure(error)
  }

  revalidatePath('/dashboard', 'layout')
  return { ok: true, data: null }
}

async function postForUrl(path: string, body?: object): Promise<string> {
  const { url } = await apiFetch<{ url: string }>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined
  })

  return url
}

function failure(error: unknown): { ok: false; error: string } {
  return {
    ok: false,
    error:
      error instanceof ApiError
        ? error.message
        : 'Something went wrong, please try again'
  }
}
