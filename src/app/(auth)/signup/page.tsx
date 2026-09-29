'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthCard, Field, FormMessage } from '@/components/auth/AuthCard'
import { useRedirectWhenSignedIn } from '@/components/auth/useRedirectWhenSignedIn'
import { authClient } from '@/lib/auth-client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

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
      callbackURL: '/dashboard'
    })

    setPending(false)

    if (error) {
      setError(error.message || 'Could not create your account')
      return
    }

    setSent(true)
  }

  const resend = async () => {
    await authClient.sendVerificationEmail({ email, callbackURL: '/dashboard' })
    setInfo('A new confirmation email is on its way.')
  }

  if (sent) {
    return (
      <AuthCard
        title="Check your inbox"
        subtitle={`We sent a confirmation link to ${email}. Click it to activate your account and get your API key.`}
        footer={
          <Link href="/login" className="text-sky-500 hover:underline">
            Back to sign in
          </Link>
        }
      >
        {info && <FormMessage tone="success">{info}</FormMessage>}
        <Button variant="outline" className="w-full" size="lg" onClick={resend}>
          Resend the email
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="500 free requests per month, no credit card required"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-sky-500 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {error && <FormMessage tone="error">{error}</FormMessage>}

      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          id="name"
          label="Name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Jane Doe"
        />
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
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
        />
        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-sky-500 hover:bg-sky-600"
          size="lg"
        >
          {pending ? 'Creating your account…' : 'Create account'}
        </Button>
        <p className="text-center text-xs text-gray-500">
          By creating an account, you agree to the{' '}
          <Link href="/terms" className="text-sky-500 hover:underline">
            Terms of Use
          </Link>{' '}
          and acknowledge the{' '}
          <Link href="/privacy" className="text-sky-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthCard>
  )
}
