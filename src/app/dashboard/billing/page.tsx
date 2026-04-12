'use client'

import { useState, useTransition, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  IconArrowLeft,
  IconExternalLink,
  IconLoader2,
  IconAlertCircle
} from '@tabler/icons-react'
import {
  createPortalSession,
  getSubscription,
  cancelSubscription,
  resumeSubscription
} from '@/lib/billing/actions'
import { PLAN_LABELS, PLAN_PRICES, PLAN_COLORS } from '@/components/dashboard/PlanCard'

type Plan = 'free' | 'pro' | 'mega' | 'ultra'

interface SubscriptionData {
  plan: Plan
  subscriptionId?: string | null
  subscriptionStatus: string
  planKey?: string | null
  activeFrom?: string | null
  activeTo?: string | null
  hasPaymentMethod: boolean
  cancelAtPeriodEnd: boolean
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [actionType, setActionType] = useState<'portal' | 'cancel' | 'resume' | null>(null)

  useEffect(() => {
    loadSubscription()
  }, [])

  const loadSubscription = async () => {
    try {
      const data = await getSubscription()
      setSubscription(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenPortal = () => {
    setActionType('portal')
    setError(null)

    startTransition(async () => {
      try {
        const { portalUrl } = await createPortalSession()
        window.location.href = portalUrl
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to open billing portal')
        setActionType(null)
      }
    })
  }

  const handleCancelSubscription = () => {
    const confirmMessage =
      'Are you sure you want to cancel your subscription?\n\n' +
      'WARNING: Your access will be blocked IMMEDIATELY.\n' +
      'Any remaining requests in your quota will be lost.\n\n' +
      'If you have exceeded your quota this month, overage fees will still be charged at the end of the billing cycle.'

    if (!confirm(confirmMessage)) {
      return
    }

    setActionType('cancel')
    setError(null)

    startTransition(async () => {
      try {
        await cancelSubscription()
        await loadSubscription()
        setActionType(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to cancel subscription')
        setActionType(null)
      }
    })
  }

  const handleResumeSubscription = () => {
    setActionType('resume')
    setError(null)

    startTransition(async () => {
      try {
        await resumeSubscription()
        await loadSubscription()
        setActionType(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to resume subscription')
        setActionType(null)
      }
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <IconLoader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    )
  }

  const plan = subscription?.plan || 'free'
  const isPaid = plan !== 'free'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
              <IconAlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Current Plan */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${PLAN_COLORS[plan]}`}
                >
                  {PLAN_LABELS[plan]}
                </span>
                {isPaid && (
                  <span className="text-gray-500">${PLAN_PRICES[plan]}/month</span>
                )}
              </div>
              <Link href="/dashboard/plans">
                <Button variant="outline" size="sm">
                  {isPaid ? 'Change Plan' : 'Upgrade'}
                </Button>
              </Link>
            </div>

            {subscription?.cancelAtPeriodEnd && subscription.activeTo && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-800">
                  Your subscription will be canceled on{' '}
                  <strong>{formatDate(subscription.activeTo)}</strong>
                </p>
                <Button
                  onClick={handleResumeSubscription}
                  disabled={isPending}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  {isPending && actionType === 'resume' ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resuming...
                    </>
                  ) : (
                    'Resume Subscription'
                  )}
                </Button>
              </div>
            )}

            {isPaid && subscription?.activeFrom && !subscription.cancelAtPeriodEnd && (
              <p className="mt-4 text-sm text-gray-500">
                Active since: {formatDate(subscription.activeFrom)}
              </p>
            )}
          </div>

          {/* Billing Actions */}
          {isPaid && (
            <div className="mt-6 space-y-4">
              {/* Manage in Stripe */}
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900">Manage Payment Method</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your payment method, view invoices, and manage billing details.
                </p>
                <Button
                  onClick={handleOpenPortal}
                  disabled={isPending}
                  variant="outline"
                  className="mt-4"
                >
                  {isPending && actionType === 'portal' ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <IconExternalLink className="mr-2 h-4 w-4" />
                      Open Billing Portal
                    </>
                  )}
                </Button>
              </div>

              {/* Cancel Subscription */}
              {!subscription?.cancelAtPeriodEnd && (
                <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
                  <h3 className="font-medium text-gray-900">Cancel Subscription</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your access will be blocked immediately and any remaining quota will
                    be lost. Overage fees (if any) will still be charged.
                  </p>
                  <Button
                    onClick={handleCancelSubscription}
                    disabled={isPending}
                    variant="outline"
                    className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    {isPending && actionType === 'cancel' ? (
                      <>
                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        Canceling...
                      </>
                    ) : (
                      'Cancel Subscription'
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Free plan notice */}
          {!isPaid && (
            <div className="mt-6 rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-gray-500">
                You&apos;re on the free plan. Upgrade to unlock more features and higher limits.
              </p>
              <Link href="/dashboard/plans">
                <Button className="mt-4 bg-sky-500 hover:bg-sky-600">
                  View Plans
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
