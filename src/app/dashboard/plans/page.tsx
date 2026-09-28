import { IconCheck } from '@tabler/icons-react'
import {
  ManageBillingButton,
  PlanButton
} from '@/components/dashboard/BillingButtons'
import { Button } from '@/components/ui/button'
import { PLAN_ORDER, PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { apiFetch } from '@/lib/api/server'
import { CurrentUsage, PlanId } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'

export default async function PlansPage() {
  const current = await apiFetch<CurrentUsage>('/v1/me/usage/current')
  const subscribed = current.status !== null

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Plans</h1>
          <p className="mt-1 text-gray-500">
            Prices exclude taxes, calculated at checkout for your country.
            Payments are handled by Stripe.
          </p>
        </div>
        {subscribed && <ManageBillingButton />}
      </div>

      {current.cancelAtPeriodEnd && (
        <p className="mt-6 rounded-md bg-amber-50 p-3 text-sm text-amber-700">
          Your subscription ends on {formatDate(current.periodEnd)}. You can
          resume it from Manage billing.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLAN_ORDER.map((id) => {
          const plan = PLANS[id]
          const isCurrent = id === current.plan

          return (
            <div
              key={id}
              className={`flex flex-col rounded-xl border p-6 ${
                isCurrent
                  ? 'border-sky-500 ring-1 ring-sky-500'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h2>
                {isCurrent && (
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="text-3xl font-semibold text-gray-900">
                  ${plan.monthlyPrice}
                </span>
                <span className="text-gray-500"> / month</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <Feature>{formatNumber(plan.quota)} requests / month</Feature>
                <Feature>
                  {plan.overagePrice === null
                    ? 'Requests refused beyond the quota'
                    : `$${plan.overagePrice} per extra request`}
                </Feature>
                <Feature>{plan.rateLimitPerMinute} requests / minute</Feature>
              </ul>
              <div className="mt-auto pt-6">
                <PlanAction
                  id={id}
                  isCurrent={isCurrent}
                  subscribed={subscribed}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Subscribed through RapidAPI? Your RapidAPI plan keeps working as before.{' '}
        <a
          className="text-sky-600 hover:underline"
          href={siteConfig.rapid_plans_url}
          rel="noreferrer"
          target="_blank"
        >
          See the RapidAPI plans
        </a>
      </p>
    </main>
  )
}

function PlanAction({
  id,
  isCurrent,
  subscribed
}: {
  id: PlanId
  isCurrent: boolean
  subscribed: boolean
}) {
  if (isCurrent) {
    return (
      <Button disabled className="w-full" variant="outline">
        Current plan
      </Button>
    )
  }

  if (id === 'free') {
    // Going back to free means cancelling the subscription
    return (
      <ManageBillingButton className="w-full" label="Cancel subscription" />
    )
  }

  return <PlanButton mode={subscribed ? 'switch' : 'subscribe'} plan={id} />
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
      <span>{children}</span>
    </li>
  )
}
