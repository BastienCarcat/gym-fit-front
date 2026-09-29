'use client'

import { FormEvent, useState } from 'react'
import { Field, FormMessage } from '@/components/auth/AuthCard'
import { ManageBillingButton } from '@/components/dashboard/BillingButtons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { PLANS } from '@/config/plans'
import { PlanId } from '@/lib/api/types'
import { authClient } from '@/lib/auth-client'

export function DeleteAccountCard({
  plan,
  subscribed
}: {
  plan: PlanId
  subscribed: boolean
}) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const toggle = (value: boolean) => {
    if (pending) {
      return
    }

    setOpen(value)
    setPassword('')
    setError(null)
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const { error } = await authClient.deleteUser({ password })

    if (error) {
      setPending(false)
      setError(
        error.code === 'INVALID_PASSWORD'
          ? 'Incorrect password.'
          : error.message || 'Your account could not be deleted'
      )
      return
    }

    // Full reload: the session is gone, along with every page rendered for it
    window.location.assign('/login?deleted=1')
  }

  return (
    <section className="rounded-xl border border-red-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Delete account</h2>
      <p className="mt-1 text-sm text-gray-500">
        Permanently deletes your account and your API keys: requests using them
        are refused immediately. This cannot be undone.
      </p>

      {subscribed && (
        <div className="mt-4 space-y-3 rounded-md bg-amber-50 p-3 text-sm text-amber-700">
          <p>
            Your {PLANS[plan].name} subscription is cancelled at once, without
            refund for the current month. Requests beyond your quota are billed
            on a final invoice. Download your invoices first if you need them.
          </p>
          <ManageBillingButton label="See my invoices" />
        </div>
      )}

      <Button
        variant="outline"
        onClick={() => toggle(true)}
        className="mt-4 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        Delete my account
      </Button>

      <Dialog open={open} onOpenChange={toggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              Enter your password to confirm. Your API keys stop working right
              away
              {subscribed ? ' and your subscription is cancelled' : ''}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && <FormMessage tone="error">{error}</FormMessage>}
            <Field
              id="delete-account-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => toggle(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={pending}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {pending ? 'Deleting…' : 'Delete permanently'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
