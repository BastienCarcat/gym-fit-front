'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthCard, Field, FormMessage } from '@/components/auth/AuthCard'
import { authClient, safeRedirect } from '@/lib/auth-client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(
    searchParams.get('deleted') ? 'Your account has been deleted.' : null
  )
  const [needsVerification, setNeedsVerification] = useState(false)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    setError(null)
    setInfo(null)

    const { error } = await authClient.signIn.email({ email, password })

    setPending(false)

    if (error) {
      const unverified = error.code === 'EMAIL_NOT_VERIFIED'
      setNeedsVerification(unverified)
      setError(
        unverified
          ? 'Please confirm your email address first.'
          : error.message || 'Invalid email or password'
      )
      return
    }

    router.push(safeRedirect(searchParams.get('redirect')))
    router.refresh()
  }

  const resendVerification = async () => {
    await authClient.sendVerificationEmail({ email, callbackURL: '/dashboard' })
    setError(null)
    setInfo('A new confirmation email is on its way.')
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage your API keys and usage"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-sky-500 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {error && (
        <FormMessage tone="error">
          {error}{' '}
          {needsVerification && (
            <button
              type="button"
              onClick={resendVerification}
              className="font-medium underline"
            >
              Resend the email
            </button>
          )}
        </FormMessage>
      )}
      {info && <FormMessage tone="success">{info}</FormMessage>}

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
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />
        <div className="text-right text-sm">
          <Link
            href="/forgot-password"
            className="text-sky-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-sky-500 hover:bg-sky-600"
          size="lg"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
