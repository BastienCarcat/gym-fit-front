import { Metadata } from 'next'
import { IconCheck } from '@tabler/icons-react'
import {
  ManageBillingButton,
  PlanButton
} from '@/components/dashboard/BillingButtons'
import { PageHeader } from '@/components/dashboard/Panel'
import { Button } from '@/components/ui/button'
import { Notice } from '@/components/ui/notice'
import { PLAN_ORDER, PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { textLink } from '@/components/auth/AuthCard'
import { apiFetch } from '@/lib/api/server'
import { CurrentUsage, PlanId } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'

export const metadata: Metadata = { title: 'Plans' }

export default async function PlansPage() {
  const current = await apiFetch<CurrentUsage>('/v1/me/usage/current')
  const subscribed = current.status !== null

  return (
    <div>
      <PageHeader
        title="Plans"
        description="Prices in USD, excluding taxes, calculated at checkout for your country. Payments are handled by Stripe."
        action={subscribed && <ManageBillingButton />}
      />

      {current.cancelAtPeriodEnd && (
        <Notice className="mt-6" tone="warning">
          Your subscription ends on {formatDate(current.periodEnd)}. You can
          resume it from Manage billing.
        </Notice>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLAN_ORDER.map((id) => {
          const plan = PLANS[id]
          const isCurrent = id === current.plan

          return (
            <div
              key={id}
              className={`flex flex-col rounded-[14px] border bg-ink-900 p-6 ${
                isCurrent ? 'border-volt' : 'border-ink-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{plan.name}</h2>
                {isCurrent && (
                  <span className="rounded-[10px] bg-volt px-2.5 py-0.5 font-code text-xs font-bold text-ink">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-white">
                  ${plan.monthlyPrice}
                </span>
                <span className="text-steel"> a month</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm text-steel-light">
                <Feature>{formatNumber(plan.quota)} requests / month</Feature>
                <Feature>
                  {plan.commercialUse
                    ? 'Commercial use'
                    : 'Prototypes, non commercial'}
                </Feature>
                <Feature>
                  {plan.maxApiKeys} active API{' '}
                  {plan.maxApiKeys === 1 ? 'key' : 'keys'}
                </Feature>
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

      <p className="mt-8 text-sm text-steel-light">
        Subscribed through RapidAPI? Your RapidAPI plan keeps working as before.{' '}
        <a
          className={textLink}
          href={siteConfig.rapid_plans_url}
          rel="noreferrer"
          target="_blank"
        >
          See the RapidAPI plans
        </a>
      </p>
    </div>
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
      <IconCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
      <span>{children}</span>
    </li>
  )
}
