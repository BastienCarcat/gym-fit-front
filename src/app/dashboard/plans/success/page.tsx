'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  IconCheck,
  IconLoader2,
  IconAlertCircle,
  IconRefresh
} from '@tabler/icons-react'
import { activateSubscription } from '@/lib/billing/actions'
import { PLAN_LABELS } from '@/components/dashboard/PlanCard'

type Plan = 'free' | 'pro' | 'mega' | 'ultra'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') as Plan | null

  const [status, setStatus] = useState<'activating' | 'success' | 'error'>(
    'activating'
  )
  const [error, setError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const [activationStarted, setActivationStarted] = useState(false)

  const doActivate = async () => {
    if (!plan || plan === 'free') return

    try {
      setStatus('activating')
      setError(null)
      await activateSubscription(plan)
      setStatus('success')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to activate subscription'
      )
      setStatus('error')
    }
  }

  useEffect(() => {
    if (!plan || plan === 'free') {
      router.push('/dashboard')
      return
    }

    // Only activate once
    if (!activationStarted) {
      setActivationStarted(true)
      doActivate()
    }
  }, [plan, router, activationStarted])

  const handleRetry = async () => {
    setIsRetrying(true)
    await doActivate()
    setIsRetrying(false)
  }

  if (!plan || plan === 'free') {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="w-full max-w-md text-center">
        {status === 'activating' && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
              <IconLoader2 className="h-8 w-8 animate-spin text-sky-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Activating Your Subscription
            </h1>
            <p className="mt-2 text-gray-500">
              Please wait while we set up your {PLAN_LABELS[plan]} plan...
            </p>
            <p className="mt-4 text-sm text-gray-400">
              This may take up to 30 seconds while we process your payment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <IconCheck className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Welcome to {PLAN_LABELS[plan]}!
            </h1>
            <p className="mt-2 text-gray-500">
              Your subscription has been activated successfully.
            </p>
            <Link href="/dashboard">
              <Button className="mt-8 bg-sky-500 hover:bg-sky-600">
                Go to Dashboard
              </Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <IconAlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Activation Failed
            </h1>
            <p className="mt-2 text-red-600">{error}</p>
            <p className="mt-4 text-sm text-gray-500">
              Your payment was successful. The activation may need more time to
              process.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-sky-500 hover:bg-sky-600"
              >
                {isRetrying ? (
                  <>
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <IconRefresh className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
              </Button>
              <div className="flex gap-4">
                <Link href="/dashboard">
                  <Button variant="outline">Go to Dashboard</Button>
                </Link>
                <a href="mailto:contact@gymfit-api.com">
                  <Button variant="outline">Contact Support</Button>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
