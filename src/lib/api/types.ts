export type PlanId = 'free' | 'pro' | 'mega' | 'ultra'

export interface Me {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: string
}

export interface ApiKeySummary {
  id: string
  name: string
  prefix: string
  createdAt: string
  /** Set when the key has been rolled: it stops working at this date */
  expiresAt: string | null
}

/** Only returned at creation: the key is never shown again */
export interface CreatedApiKey extends ApiKeySummary {
  key: string
}

export interface CurrentUsage {
  plan: PlanId
  quota: number
  used: number
  remaining: number
  overage: number
  hardLimit: boolean
  /** Estimated cost of the overage so far, in USD */
  overageCostUsd: number
  periodStart: string
  periodEnd: string
  /** Stripe subscription status, null on the free plan */
  status: string | null
  cancelAtPeriodEnd: boolean
}

export interface UsageEntry {
  key: string
  requests: number
  success: number
  errors: {
    invalidRequests: number
    authErrors: number
    notFound: number
    rateLimited: number
    otherClientErrors: number
    serverErrors: number
  }
  averageLatencyMs: number | null
}

export interface UsageReport {
  from: string
  to: string
  groupBy: 'day' | 'month' | 'endpoint'
  totals: UsageEntry
  data: UsageEntry[]
}

/** Result of a server action, so the UI can show the API error message */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }
