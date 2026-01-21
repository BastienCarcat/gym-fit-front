'use client'

import { Button } from '@/components/ui/button'

interface PlanCardProps {
  plan: 'free' | 'pro' | 'ultra' | 'mega'
  requestsUsed?: number
}

const PLAN_LIMITS = {
  free: 1000,
  pro: 100000,
  ultra: 1000000,
  mega: 10000000
} as const

const PLAN_PRICES = {
  free: 0,
  pro: 9,
  ultra: 49,
  mega: 199
} as const

const PLAN_LABELS = {
  free: 'Free',
  pro: 'Pro',
  ultra: 'Ultra',
  mega: 'Mega'
} as const

export function PlanCard({ plan, requestsUsed = 0 }: PlanCardProps) {
  const limit = PLAN_LIMITS[plan]
  const percentage = Math.min((requestsUsed / limit) * 100, 100)
  const canUpgrade = plan !== 'mega'

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
      <div className="mt-4">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800">
          {PLAN_LABELS[plan]}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">API Requests</span>
          <span className="font-medium text-gray-900">
            {formatNumber(requestsUsed)} / {formatNumber(limit)}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-sky-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Resets monthly</p>
      </div>

      {canUpgrade && (
        <>
          <Button className="mt-6 w-full bg-sky-500 hover:bg-sky-600">
            Upgrade to {plan === 'free' ? 'Pro' : plan === 'pro' ? 'Ultra' : 'Mega'}
          </Button>
          <p className="mt-2 text-center text-xs text-gray-500">
            {plan === 'free'
              ? `${formatNumber(PLAN_LIMITS.pro)} requests/month for $${PLAN_PRICES.pro}/month`
              : plan === 'pro'
                ? `${formatNumber(PLAN_LIMITS.ultra)} requests/month for $${PLAN_PRICES.ultra}/month`
                : `${formatNumber(PLAN_LIMITS.mega)} requests/month for $${PLAN_PRICES.mega}/month`}
          </p>
        </>
      )}
    </div>
  )
}
