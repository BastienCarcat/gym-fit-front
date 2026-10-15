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
import { useRedirectWhenSignedIn } from '@/components/auth/useRedirectWhenSignedIn'
import { PLANS } from '@/config/plans'
import { authClient } from '@/lib/auth-client'
import { formatNumber } from '@/lib/format'

const smallLink =
  'text-steel-light underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const captcha = useCaptcha()

  // Also moves this tab to the dashboard once the email is confirmed elsewhere
  useRedirectWhenSignedIn('/dashboard')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: '/dashboard',
      fetchOptions: { headers: captcha.headers }
    })

    setPending(false)
    captcha.reset()

    if (error) {
      setError(error.message || 'Could not create your account')

      return
    }

    setSent(true)
  }

  const resend = async () => {
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/dashboard',
      fetchOptions: { headers: captcha.headers }
    })

    captcha.reset()
    setInfo(
      error
        ? error.message || 'Could not send the email, please try again'
        : 'A new confirmation email is on its way.'
    )
  }

  if (sent) {
    return (
      <AuthCard
        footer={
          <Link className={textLink} href="/login">
            Back to sign in
          </Link>
        }
        subtitle={`We sent a confirmation link to ${email}. Click it to activate your account and get your API key.`}
        title="Check your inbox"
      >
        {info && <FormMessage tone="success">{info}</FormMessage>}
        {captcha.widget}
        <Button
          className="w-full"
          disabled={!captcha.ready}
          size="lg"
          variant="outline"
          onClick={resend}
        >
          Resend the email
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      footer={
        <>
          Already have an account?{' '}
          <Link className={textLink} href="/login">
            Sign in
          </Link>
        </>
      }
      subtitle={`${formatNumber(PLANS.free.quota)} free requests a month, no credit card required`}
      title="Create your account"
    >
      {error && <FormMessage tone="error">{error}</FormMessage>}

      <form className="space-y-4" onSubmit={onSubmit}>
        <Field
          required
          autoComplete="name"
          id="name"
          label="Name"
          placeholder="Jane Doe"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <Field
          required
          autoComplete="new-password"
          id="password"
          label="Password"
          minLength={8}
          placeholder="At least 8 characters"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {captcha.widget}
        <Button
          className="w-full"
          disabled={pending || !captcha.ready}
          size="lg"
          type="submit"
        >
          {pending ? 'Creating your account…' : 'Create account'}
        </Button>
        <p className="text-xs text-steel">
          By creating an account, you agree to the{' '}
          <Link className={smallLink} href="/terms">
            Terms of Use
          </Link>{' '}
          and acknowledge the{' '}
          <Link className={smallLink} href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthCard>
  )
}
