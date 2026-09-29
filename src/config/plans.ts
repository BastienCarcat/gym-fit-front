import { PlanId } from '@/lib/api/types'

export interface PlanDetails {
  name: string
  monthlyPrice: number
  quota: number
  rateLimitPerMinute: number
  /** Price of each request beyond the quota, null when requests are refused */
  overagePrice: number | null
}

/** Mirror of the API plans (gym-fit-api: src/plans/plans.config.ts) */
export const PLANS: Record<PlanId, PlanDetails> = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    quota: 500,
    rateLimitPerMinute: 30,
    overagePrice: null
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 5,
    quota: 5000,
    rateLimitPerMinute: 60,
    overagePrice: 0.003
  },
  mega: {
    name: 'Mega',
    monthlyPrice: 9,
    quota: 10000,
    rateLimitPerMinute: 120,
    overagePrice: 0.003
  },
  ultra: {
    name: 'Ultra',
    monthlyPrice: 11,
    quota: 20000,
    rateLimitPerMinute: 300,
    overagePrice: 0.001
  }
}

export const PLAN_ORDER: PlanId[] = ['free', 'pro', 'mega', 'ultra']
