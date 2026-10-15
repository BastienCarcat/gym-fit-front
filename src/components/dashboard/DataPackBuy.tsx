'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { DATA_PACK } from '@/config/dataPack'
import { startDataPackCheckout } from '@/lib/dataPack/actions'

/** The license to accept, then the way to Stripe Checkout */
export function DataPackBuy() {
  const [accepted, setAccepted] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const buy = () =>
    startTransition(async () => {
      setError(null)
      // Resolves with nothing when the action redirects to Stripe
      const result = await startDataPackCheckout()

      if (result && !result.ok) {
        setError(result.error)
      }
    })

  return (
    <div className="mt-6">
      <label className="flex items-start gap-3 text-sm text-steel-light">
        <input
          checked={accepted}
          className="mt-0.5 size-4 shrink-0 accent-volt"
          type="checkbox"
          onChange={(event) => setAccepted(event.target.checked)}
        />
        <span>
          I buy the data pack for a professional project, current or planned,
          and I accept the{' '}
          <Link
            className="font-medium text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt"
            href={DATA_PACK.licensePath}
            target="_blank"
          >
            data pack license
          </Link>
          . The files are delivered as soon as the payment is confirmed: I lose
          my right of withdrawal once they are.
        </span>
      </label>
      <Button className="mt-5" disabled={!accepted || pending} onClick={buy}>
        {pending ? 'Please wait…' : `Buy the data pack, $${DATA_PACK.price}`}
      </Button>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  )
}
