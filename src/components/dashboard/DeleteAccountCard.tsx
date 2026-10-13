'use client'

import { FormEvent, useState } from 'react'
import { Field, FormMessage } from '@/components/auth/AuthCard'
import { ManageBillingButton } from '@/components/dashboard/BillingButtons'
import { Panel } from '@/components/dashboard/Panel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Notice } from '@/components/ui/notice'
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
    <Panel
      danger
      title="Delete account"
      description="Permanently deletes your account and your API keys: requests using them are refused immediately. This cannot be undone."
    >
      {subscribed && (
        <Notice className="mt-4 space-y-3" tone="warning">
          <p>
            Your {PLANS[plan].name} subscription is cancelled at once, without
            refund for the current month. Requests beyond your quota are billed
            on a final invoice. Download your invoices first if you need them.
          </p>
          <ManageBillingButton label="See my invoices" />
        </Notice>
      )}

      <Button
        variant="outline"
        onClick={() => toggle(true)}
        className="mt-4 border-red-400/40 text-red-300 hover:border-red-400"
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
              <Button type="submit" disabled={pending} variant="destructive">
                {pending ? 'Deleting…' : 'Delete permanently'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Panel>
  )
}
