'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconCrown, IconSparkles, IconAlertTriangle } from '@tabler/icons-react'

interface UsageData {
  usage: number
  included: number
  overage: number
  isSoftLimit: boolean
  periodStart: string | null
  periodEnd: string | null
}

interface PlanCardProps {
  plan: 'free' | 'pro' | 'mega' | 'ultra'
  usageData: UsageData
  cancelAtPeriodEnd?: boolean
  currentPeriodEnd?: string | null
}

// Kept for use in plans page — dashboard uses OpenMeter as source of truth
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

const OVERAGE_PRICES: Record<string, number> = {
  pro: 0.003,
  mega: 0.003,
  ultra: 0.001
}

export function PlanCard({
  plan,
  usageData,
  cancelAtPeriodEnd = false,
  currentPeriodEnd
}: PlanCardProps) {
  const { usage, included, overage, isSoftLimit, periodStart, periodEnd } = usageData
  const canUpgrade = plan !== 'ultra'
  const isPaid = plan !== 'free'
  const hasOverage = overage > 0
  const includedUsed = Math.min(usage, included)
  const percentage = included > 0 ? Math.min((includedUsed / included) * 100, 100) : 0
  const overagePrice = OVERAGE_PRICES[plan] || 0
  const estimatedOverageCost = overage * overagePrice

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    }).format(amount)
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        {isPaid && <IconCrown className="h-5 w-5 text-amber-500" />}
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

      {/* Cancellation notice */}
      {cancelAtPeriodEnd && currentPeriodEnd && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm text-amber-800">
            Your plan will be canceled on {formatDate(currentPeriodEnd)}
          </p>
        </div>
      )}

      {/* Billing period */}
      {periodStart && periodEnd && (
        <div className="mt-4 text-xs text-gray-400">
          Billing period: {formatDate(periodStart)} &ndash; {formatDate(periodEnd)}
        </div>
      )}

      {/* Included quota */}
      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Included quota</span>
          <span className="font-medium text-gray-900">
            {formatNumber(includedUsed)} / {formatNumber(included)}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className={`h-2 rounded-full transition-all ${
              percentage >= 100
                ? 'bg-red-500'
                : percentage >= 80
                  ? 'bg-amber-500'
                  : 'bg-sky-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Overage section */}
      {hasOverage && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="flex items-center gap-1.5">
            <IconAlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-800">Overage</span>
          </div>
          <div className="mt-1.5 flex justify-between text-sm">
            <span className="text-red-700">
              {formatNumber(overage)} extra requests
            </span>
            <span className="font-medium text-red-800">
              ~{formatCurrency(estimatedOverageCost)}
            </span>
          </div>
          <div className="mt-1 text-xs text-red-600">
            {formatCurrency(overagePrice)}/req &middot; billed at end of period
          </div>
        </div>
      )}

      {/* Total usage summary */}
      <div className="mt-4 flex justify-between border-t border-gray-200 pt-3 text-sm">
        <span className="text-gray-500">Total requests</span>
        <span className="font-semibold text-gray-900">{formatNumber(usage)}</span>
      </div>

      {/* Soft/hard limit indicator */}
      {!isPaid && (
        <div className="mt-1 text-xs text-gray-400">
          Hard limit &middot; requests blocked after {formatNumber(included)}
        </div>
      )}
      {isPaid && !hasOverage && (
        <div className="mt-1 text-xs text-gray-400">
          Soft limit &middot; overage billed at {formatCurrency(overagePrice)}/req
        </div>
      )}

      {/* Actions */}
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
