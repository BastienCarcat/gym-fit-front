'use server'

import { createClient } from '@/lib/supabase/server'

const API_BASE_URL = process.env.GYM_FIT_BASE_URL
const WEBHOOK_SECRET = process.env.GYM_FIT_WEBHOOK_SECRET

interface ApiKeyResponse {
  id: string
  email: string
  plan: 'free' | 'pro' | 'ultra' | 'mega'
  apiKey: string | null
  keyId: string | null
  createdAt: string
  allKeys?: Array<{
    id: string
    key: string
    createdOn: string
    expiresOn?: string
    description?: string
  }>
  // Stripe subscription fields
  stripeCustomerId?: string
  stripeSubscriptionId?: string | null
  subscriptionStatus?: string
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean
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

async function getApiKeyByUserId(
  supabaseUserId: string,
  reveal: boolean = false
): Promise<ApiKeyResponse | null> {
  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/api-keys/${supabaseUserId}?reveal=${reveal}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      }
    }
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get API key: ${error}`)
  }

  return response.json()
}

export async function ensureApiKeyExists(
  supabaseUserId: string,
  email: string
): Promise<ApiKeyResponse> {
  const existing = await getApiKeyByUserId(supabaseUserId, false)

  if (existing) {
    return existing
  }

  return createApiKeyForUser(supabaseUserId, email)
}

export async function createApiKeyForUser(
  supabaseUserId: string,
  email: string
): Promise<ApiKeyResponse> {
  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(`${API_BASE_URL}/v1/api-keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': WEBHOOK_SECRET
    },
    body: JSON.stringify({
      supabaseUserId,
      email
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create API key: ${error}`)
  }

  return response.json()
}

export async function getApiKey(
  reveal: boolean = false
): Promise<ApiKeyResponse | null> {
  const user = await getAuthenticatedUser()
  return getApiKeyByUserId(user.id, reveal)
}

export async function generateApiKey(): Promise<ApiKeyResponse> {
  const user = await getAuthenticatedUser()
  return createApiKeyForUser(user.id, user.email || '')
}

export async function regenerateApiKey(): Promise<ApiKeyResponse> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/api-keys/${user.id}/regenerate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      }
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to regenerate API key: ${error}`)
  }

  return response.json()
}

export async function revokeApiKey(
  keyId: string
): Promise<{ success: boolean; message: string }> {
  const user = await getAuthenticatedUser()

  if (!API_BASE_URL || !WEBHOOK_SECRET) {
    throw new Error('API configuration missing')
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/api-keys/${user.id}/keys/${keyId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET
      }
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to revoke API key: ${error}`)
  }

  return response.json()
}
