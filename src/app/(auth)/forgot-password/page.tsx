'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthCard, Field, FormMessage } from '@/components/auth/AuthCard'
import { authClient } from '@/lib/auth-client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password'
    })
    setPending(false)
    // Same answer whether the account exists or not
    setSent(true)
  }

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="We will email you a link to choose a new one"
      footer={
        <Link href="/login" className="text-sky-500 hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <FormMessage tone="success">
          If an account exists for {email}, you will receive an email with a
          reset link in a few minutes.
        </FormMessage>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-sky-500 hover:bg-sky-600"
            size="lg"
          >
            {pending ? 'Sending…' : 'Send the reset link'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
