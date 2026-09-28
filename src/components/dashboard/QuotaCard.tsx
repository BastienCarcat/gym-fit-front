import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
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
      ? 'bg-amber-500'
      : 'bg-sky-500'

  return (
    <section className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Current plan</h2>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          {plan.name}
        </span>
      </div>

      <p className="mt-6 text-3xl font-semibold text-gray-900">
        {formatNumber(usage.used)}
        <span className="text-base font-normal text-gray-500">
          {' '}
          / {formatNumber(usage.quota)} requests
        </span>
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"
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
      <p className="mt-2 text-sm text-gray-500">
        {formatNumber(usage.remaining)} left, resets on{' '}
        {formatDate(usage.periodEnd)}
      </p>

      {blocked && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          Quota reached: your requests are refused until{' '}
          {formatDate(usage.periodEnd)}.
        </p>
      )}
      {usage.overage > 0 && !usage.hardLimit && (
        <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-700">
          {formatNumber(usage.overage)} requests beyond your quota this month.
        </p>
      )}

      <div className="mt-auto pt-6">
        <Link
          href="/dashboard/plans"
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:underline"
        >
          Compare plans
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
