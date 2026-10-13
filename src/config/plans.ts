import { PlanId } from '@/lib/api/types'

export interface PlanDetails {
  name: string
  monthlyPrice: number
  quota: number
  rateLimitPerMinute: number
  /** Price of each request beyond the quota, null when requests are refused */
  overagePrice: number | null
  /** Active API keys: one key, one app */
  maxApiKeys: number
  /** Use in a product that earns money */
  commercialUse: boolean
}

/** Mirror of the API plans (gym-fit-api: src/plans/plans.config.ts) */
export const PLANS: Record<PlanId, PlanDetails> = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    quota: 1000,
    rateLimitPerMinute: 30,
    overagePrice: null,
    maxApiKeys: 1,
    commercialUse: false
  },
  starter: {
    name: 'Starter',
    monthlyPrice: 9,
    quota: 20000,
    rateLimitPerMinute: 60,
    overagePrice: 0.002,
    maxApiKeys: 1,
    commercialUse: true
  },
  scale: {
    name: 'Pro',
    monthlyPrice: 29,
    quota: 100000,
    rateLimitPerMinute: 300,
    overagePrice: 0.001,
    maxApiKeys: 5,
    commercialUse: true
  },
  // Sold before: shown only to the customers who subscribed to them
  pro: {
    name: 'Pro (legacy)',
    monthlyPrice: 5,
    quota: 5000,
    rateLimitPerMinute: 60,
    overagePrice: 0.003,
    maxApiKeys: 5,
    commercialUse: true
  },
  mega: {
    name: 'Mega (legacy)',
    monthlyPrice: 9,
    quota: 10000,
    rateLimitPerMinute: 120,
    overagePrice: 0.003,
    maxApiKeys: 5,
    commercialUse: true
  },
  ultra: {
    name: 'Ultra (legacy)',
    monthlyPrice: 11,
    quota: 20000,
    rateLimitPerMinute: 300,
    overagePrice: 0.001,
    maxApiKeys: 5,
    commercialUse: true
  }
}

/** The plans a visitor can choose, in the order shown */
export const PLAN_ORDER: PlanId[] = ['free', 'starter', 'scale']

/** "20,000 requests per month, 60 requests per minute, then $0.002 per extra request" */
export function planSummary(plan: PlanDetails): string {
  const beyondQuota =
    plan.overagePrice === null
      ? 'requests beyond the quota are refused'
      : `then $${plan.overagePrice} per extra request`

  return `${plan.quota.toLocaleString('en-US')} requests per month, ${plan.rateLimitPerMinute} requests per minute, ${beyondQuota}`
}
