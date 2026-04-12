'use server'

import { createClient } from '@/lib/supabase/server'

const API_BASE_URL = process.env.GYM_FIT_BASE_URL
const WEBHOOK_SECRET = process.env.GYM_FIT_WEBHOOK_SECRET

type SubscriptionPlan = 'free' | 'pro' | 'mega' | 'ultra'

interface CheckoutResponse {
  checkoutUrl: string
  sessionId: string
}

interface PortalResponse {
  portalUrl: string
}

interface SubscriptionResponse {
  plan: SubscriptionPlan
  subscriptionId?: string | null
  subscriptionStatus: string
  planKey?: string | null
  activeFrom?: string | null
  activeTo?: string | null
  hasPaymentMethod: boolean
  cancelAtPeriodEnd: boolean
}

interface ActivationResponse {
  success: boolean
  plan: SubscriptionPlan
  subscriptionId: string
}

async function getAuthenticatedUser() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  return user
}

/**
 * Create a checkout session to upgrade to a paid plan
 */
export async function createCheckoutSession(
  plan: SubscriptionPlan
): Promise<CheckoutResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  if (plan === 'free') {
    throw new Error('Cannot checkout for free plan')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id,
      email: user.email,
      plan
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create checkout session: ${error}`)
  }

  return response.json()
}

/**
 * Activate subscription after successful checkout.
 * Called on the success page to create the subscription.
 */
export async function activateSubscription(
  plan: SubscriptionPlan
): Promise<ActivationResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id,
      plan
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to activate subscription: ${error}`)
  }

  return response.json()
}

/**
 * Create a billing portal session to manage subscription
 */
export async function createPortalSession(): Promise<PortalResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create portal session: ${error}`)
  }

  return response.json()
}

/**
 * Get current subscription info
 */
export async function getSubscription(): Promise<SubscriptionResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/billing/subscription/${user.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      }
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get subscription: ${error}`)
  }

  return response.json()
}

/**
 * Cancel subscription (will remain active until end of billing period)
 */
export async function cancelSubscription(): Promise<{
  success: boolean
  message: string
}> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to cancel subscription: ${error}`)
  }

  return response.json()
}

/**
 * Resume a subscription that was scheduled to cancel
 */
export async function resumeSubscription(): Promise<{
  success: boolean
  message: string
}> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to resume subscription: ${error}`)
  }

  return response.json()
}

/**
 * Change subscription plan
 */
export async function changePlan(newPlan: SubscriptionPlan): Promise<{
  success: boolean
  message: string
}> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/billing/change-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId: user.id,
      newPlan
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to change plan: ${error}`)
  }

  return response.json()
}

interface UsageResponse {
  usage: number
  included: number
  overage: number
  isSoftLimit: boolean
  periodStart: string | null
  periodEnd: string | null
}

/**
 * Get current billing period usage from OpenMeter
 */
export async function getUsage(): Promise<UsageResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/api-keys/${user.id}/usage`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      }
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get usage: ${error}`)
  }

  return response.json()
}
