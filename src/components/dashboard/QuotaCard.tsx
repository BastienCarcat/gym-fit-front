import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import { ManageBillingButton } from '@/components/dashboard/BillingButtons'
import { Panel } from '@/components/dashboard/Panel'
import { Notice } from '@/components/ui/notice'
import { PLANS } from '@/config/plans'
import { CurrentUsage } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'

export function QuotaCard({ usage }: { usage: CurrentUsage }) {
  const plan = PLANS[usage.plan]
  const percent = usage.quota
    ? Math.min(100, Math.round((usage.used / usage.quota) * 100))
    : 0
  const blocked = usage.hardLimit && usage.remaining === 0
  const barColor = blocked
    ? 'bg-red-500'
    : percent >= 80
      ? 'bg-amber-400'
      : 'bg-volt'

  return (
    <Panel
      className="flex h-full flex-col"
      title="Current plan"
      action={
        <span className="rounded-[10px] border border-volt px-2.5 py-0.5 font-code text-xs text-volt">
          {plan.name}
        </span>
      }
    >
      <p className="mt-6 text-4xl font-extrabold tracking-tight text-white">
        {formatNumber(usage.used)}
        <span className="mt-1 block font-code text-xs font-normal uppercase tracking-wide text-steel">
          of {formatNumber(usage.quota)} requests
        </span>
      </p>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-ink-700"
        role="progressbar"
        aria-label="Monthly quota used"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-steel-light">
        {formatNumber(usage.remaining)} left, resets on{' '}
        {formatDate(usage.periodEnd)}
      </p>

      {blocked && (
        <Notice className="mt-4" tone="error">
          Quota reached: your requests are refused until{' '}
          {formatDate(usage.periodEnd)}.
        </Notice>
      )}
      {usage.overage > 0 && !usage.hardLimit && (
        <Notice className="mt-4" tone="warning">
          {formatNumber(usage.overage)} requests beyond your quota this month,
          about ${usage.overageCostUsd.toFixed(2)} so far.
        </Notice>
      )}

      {usage.cancelAtPeriodEnd && (
        <Notice className="mt-4" tone="warning">
          Your subscription ends on {formatDate(usage.periodEnd)}.
        </Notice>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <Link
          href="/dashboard/plans"
          className="inline-flex items-center gap-1 text-sm font-bold text-volt hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
        >
          Compare plans
          <IconArrowRight aria-hidden className="h-4 w-4" />
        </Link>
        {usage.status && <ManageBillingButton />}
      </div>
    </Panel>
  )
}
