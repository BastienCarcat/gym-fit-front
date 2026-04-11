'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconCrown, IconSparkles } from '@tabler/icons-react'

interface PlanCardProps {
  plan: 'free' | 'pro' | 'mega' | 'ultra'
  requestsUsed?: number
  cancelAtPeriodEnd?: boolean
  currentPeriodEnd?: string | null
}

/**
 * Plan configurations matching the pricing:
 * - free: 500 req/month (hard limit)
 * - pro: $5/month, 5,000 req/month + $0.003/req overage
 * - mega: $9/month, 10,000 req/month + $0.003/req overage
 * - ultra: $11/month, 20,000 req/month + $0.001/req overage
 */
export const PLAN_LIMITS = {
  free: 500,
  pro: 5000,
  mega: 10000,
  ultra: 20000
} as const

export const PLAN_PRICES = {
  free: 0,
  pro: 5,
  mega: 9,
  ultra: 11
} as const

export const PLAN_LABELS = {
  free: 'Free',
  pro: 'Pro',
  mega: 'Mega',
  ultra: 'Ultra'
} as const

export const PLAN_COLORS = {
  free: 'bg-gray-100 text-gray-800 border-gray-200',
  pro: 'bg-sky-100 text-sky-800 border-sky-200',
  mega: 'bg-purple-100 text-purple-800 border-purple-200',
  ultra: 'bg-amber-100 text-amber-800 border-amber-200'
} as const

export function PlanCard({
  plan,
  requestsUsed = 0,
  cancelAtPeriodEnd = false,
  currentPeriodEnd
}: PlanCardProps) {
  const limit = PLAN_LIMITS[plan]
  const percentage = Math.min((requestsUsed / limit) * 100, 100)
  const canUpgrade = plan !== 'ultra'
  const isPaid = plan !== 'free'

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        {isPaid && (
          <IconCrown className="h-5 w-5 text-amber-500" />
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${PLAN_COLORS[plan]}`}
        >
          {PLAN_LABELS[plan]}
        </span>
        {isPaid && (
          <span className="text-sm text-gray-500">
            ${PLAN_PRICES[plan]}/month
          </span>
        )}
      </div>

      {cancelAtPeriodEnd && currentPeriodEnd && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-sm text-amber-800">
            Your plan will be canceled on {formatDate(currentPeriodEnd)}
          </p>
        </div>
      )}

      <div className="mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">API Requests</span>
          <span className="font-medium text-gray-900">
            {formatNumber(requestsUsed)} / {formatNumber(limit)}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full transition-all ${
              percentage >= 90 ? 'bg-red-500' : percentage >= 70 ? 'bg-amber-500' : 'bg-sky-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Resets monthly</span>
          {plan !== 'free' && (
            <span>Overage: ${plan === 'ultra' ? '0.001' : '0.003'}/req</span>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {canUpgrade && (
          <Link href="/dashboard/plans">
            <Button className="w-full bg-sky-500 hover:bg-sky-600">
              <IconSparkles className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </Link>
        )}
        {isPaid && (
          <Link href="/dashboard/billing">
            <Button variant="outline" className="w-full">
              Manage Billing
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
