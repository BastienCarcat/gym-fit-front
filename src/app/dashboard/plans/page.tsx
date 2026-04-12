'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  IconArrowLeft,
  IconCheck,
  IconX,
  IconSparkles,
  IconLoader2
} from '@tabler/icons-react'
import { createCheckoutSession, getSubscription, changePlan } from '@/lib/billing/actions'
import {
  PLAN_LIMITS,
  PLAN_PRICES,
  PLAN_LABELS,
  PLAN_COLORS
} from '@/components/dashboard/PlanCard'

type Plan = 'free' | 'pro' | 'mega' | 'ultra'

interface PlanFeature {
  name: string
  free: boolean | string
  pro: boolean | string
  mega: boolean | string
  ultra: boolean | string
}

const PLAN_FEATURES: PlanFeature[] = [
  {
    name: 'Monthly Requests',
    free: '500',
    pro: '5,000',
    mega: '10,000',
    ultra: '20,000'
  },
  {
    name: 'Overage Pricing',
    free: 'Hard limit',
    pro: '$0.003/req',
    mega: '$0.003/req',
    ultra: '$0.001/req'
  },
  {
    name: 'Rate Limit',
    free: '60 req/min',
    pro: '120 req/min',
    mega: '300 req/min',
    ultra: '600 req/min'
  },
  {
    name: 'Exercise Database',
    free: true,
    pro: true,
    mega: true,
    ultra: true
  },
  {
    name: 'Muscle Anatomy',
    free: true,
    pro: true,
    mega: true,
    ultra: true
  },
  {
    name: 'Fitness Calculators',
    free: true,
    pro: true,
    mega: true,
    ultra: true
  },
  {
    name: 'High-Quality Images',
    free: false,
    pro: true,
    mega: true,
    ultra: true
  },
  {
    name: 'Priority Support',
    free: false,
    pro: false,
    mega: true,
    ultra: true
  }
]

const PLANS: Plan[] = ['free', 'pro', 'mega', 'ultra']

export default function PlansPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled') === 'true'

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<Plan>('free')
  const [loadingPlan, setLoadingPlan] = useState(true)

  useEffect(() => {
    const loadCurrentPlan = async () => {
      try {
        const subscription = await getSubscription()
        setCurrentPlan(subscription.plan)
      } catch {
        // Default to free if we can't load the subscription
        setCurrentPlan('free')
      } finally {
        setLoadingPlan(false)
      }
    }
    loadCurrentPlan()
  }, [])

  const handleSelectPlan = (plan: Plan) => {
    if (plan === currentPlan) {
      return
    }

    if (plan === 'free') {
      const confirmMessage =
        'Are you sure you want to downgrade to the Free plan?\n\n' +
        'WARNING: Your access will be blocked IMMEDIATELY.\n' +
        'Any remaining requests in your quota will be lost.\n\n' +
        'If you have exceeded your quota this month, overage fees will still be charged.'

      if (!confirm(confirmMessage)) {
        return
      }

      setSelectedPlan(plan)
      setError(null)

      startTransition(async () => {
        try {
          await changePlan('free')
          router.push('/dashboard')
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to downgrade plan')
          setSelectedPlan(null)
        }
      })
      return
    }

    setSelectedPlan(plan)
    setError(null)

    startTransition(async () => {
      try {
        const { checkoutUrl } = await createCheckoutSession(plan)
        window.location.href = checkoutUrl
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start checkout')
        setSelectedPlan(null)
      }
    })
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

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
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
            <p className="mt-2 text-gray-500">
              Select the plan that best fits your needs
            </p>
          </div>

          {/* Canceled notice */}
          {canceled && (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-center text-sm text-amber-800">
                Checkout was canceled. You can try again when you&apos;re ready.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-center text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Plans Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => {
              const isPopular = plan === 'mega'
              const isLoading = isPending && selectedPlan === plan

              return (
                <div
                  key={plan}
                  className={`relative rounded-2xl border-2 p-6 ${
                    isPopular
                      ? 'border-sky-500 shadow-lg'
                      : 'border-gray-200'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1 text-xs font-medium text-white">
                        <IconSparkles className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="text-center">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${PLAN_COLORS[plan]}`}
                    >
                      {PLAN_LABELS[plan]}
                    </span>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${PLAN_PRICES[plan]}
                      </span>
                      {plan !== 'free' && (
                        <span className="text-gray-500">/month</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {formatNumber(PLAN_LIMITS[plan])} requests/month
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {PLAN_FEATURES.slice(0, 5).map((feature) => {
                      const value = feature[plan]
                      const isIncluded = value === true || typeof value === 'string'

                      return (
                        <li key={feature.name} className="flex items-center gap-2">
                          {isIncluded ? (
                            <IconCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
                          ) : (
                            <IconX className="h-4 w-4 flex-shrink-0 text-gray-300" />
                          )}
                          <span
                            className={`text-sm ${
                              isIncluded ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {typeof value === 'string' ? value : feature.name}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-6">
                    {loadingPlan ? (
                      <Button disabled className="w-full" variant="outline">
                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </Button>
                    ) : plan === currentPlan ? (
                      <Button
                        disabled
                        className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                        variant="outline"
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSelectPlan(plan)}
                        disabled={isPending}
                        className={`w-full ${
                          isPopular
                            ? 'bg-sky-500 hover:bg-sky-600'
                            : plan === 'free'
                              ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                              : ''
                        }`}
                        variant={plan === 'free' ? 'outline' : 'default'}
                      >
                        {isLoading ? (
                          <>
                            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                            Redirecting...
                          </>
                        ) : plan === 'free' ? (
                          'Downgrade to Free'
                        ) : (
                          `Upgrade to ${PLAN_LABELS[plan]}`
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-16">
            <h2 className="text-center text-xl font-semibold text-gray-900">
              Full Feature Comparison
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-sm font-medium text-gray-500">
                      Feature
                    </th>
                    {PLANS.map((plan) => (
                      <th
                        key={plan}
                        className="py-4 text-center text-sm font-medium text-gray-900"
                      >
                        {PLAN_LABELS[plan]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLAN_FEATURES.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={index % 2 === 0 ? 'bg-gray-50' : ''}
                    >
                      <td className="py-4 text-sm text-gray-900">{feature.name}</td>
                      {PLANS.map((plan) => {
                        const value = feature[plan]
                        return (
                          <td key={plan} className="py-4 text-center">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <IconCheck className="mx-auto h-5 w-5 text-green-500" />
                              ) : (
                                <IconX className="mx-auto h-5 w-5 text-gray-300" />
                              )
                            ) : (
                              <span className="text-sm text-gray-900">{value}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ or Contact */}
          <div className="mt-16 text-center">
            <p className="text-gray-500">
              Need a custom plan?{' '}
              <a
                href="mailto:contact@gymfit-api.com"
                className="text-sky-500 hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
