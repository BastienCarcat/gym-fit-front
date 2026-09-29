'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { PLANS } from '@/config/plans'
import { ActionResult, PlanId } from '@/lib/api/types'
import {
  changePlan,
  openBillingPortal,
  startCheckout
} from '@/lib/billing/actions'

function useBillingAction() {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const run = (action: () => Promise<ActionResult<null> | undefined>) =>
    startTransition(async () => {
      setError(null)
      // Resolves with nothing when the action redirects to Stripe
      const result = await action()

      if (result && !result.ok) {
        setError(result.error)
      }
    })

  return { pending, error, run }
}

export function PlanButton({
  plan,
  mode
}: {
  plan: PlanId
  mode: 'subscribe' | 'switch'
}) {
  const { pending, error, run } = useBillingAction()
  const { name } = PLANS[plan]

  const onClick = () => {
    if (
      mode === 'switch' &&
      !window.confirm(
        `Switch to ${name}? Your new plan starts today, with a new monthly quota, and the unused part of your current plan is credited.`
      )
    ) {
      return
    }

    run(() => (mode === 'subscribe' ? startCheckout(plan) : changePlan(plan)))
  }

  return (
    <div>
      <Button
        className="w-full bg-sky-500 hover:bg-sky-600"
        disabled={pending}
        onClick={onClick}
      >
        {pending
          ? 'Please wait…'
          : mode === 'subscribe'
            ? `Subscribe to ${name}`
            : `Switch to ${name}`}
      </Button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function ManageBillingButton({
  label = 'Manage billing',
  className
}: {
  label?: string
  className?: string
}) {
  const { pending, error, run } = useBillingAction()

  return (
    <div>
      <Button
        className={className}
        disabled={pending}
        variant="outline"
        onClick={() => run(() => openBillingPortal())}
      >
        {pending ? 'Opening…' : label}
      </Button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
