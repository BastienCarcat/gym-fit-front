'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  AuthCard,
  Field,
  FormMessage,
  textLink
} from '@/components/auth/AuthCard'
import { useCaptcha } from '@/components/auth/useCaptcha'
import { authClient } from '@/lib/auth-client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const captcha = useCaptcha()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
      fetchOptions: { headers: captcha.headers }
    })
    setPending(false)
    captcha.reset()
    // Same answer whether the account exists or not
    setSent(true)
  }

  return (
    <AuthCard
      footer={
        <Link className={textLink} href="/login">
          Back to sign in
        </Link>
      }
      subtitle="We will email you a link to choose a new one"
      title="Forgot your password?"
    >
      {sent ? (
        <FormMessage tone="success">
          If an account exists for {email}, you will receive an email with a
          reset link in a few minutes.
        </FormMessage>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit}>
          <Field
            required
            autoComplete="email"
            id="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {captcha.widget}
          <Button
            className="w-full"
            disabled={pending || !captcha.ready}
            size="lg"
            type="submit"
          >
            {pending ? 'Sending…' : 'Send the reset link'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
