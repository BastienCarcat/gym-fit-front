'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  AuthCard,
  Field,
  FormMessage,
  textLink
} from '@/components/auth/AuthCard'
import { useCaptcha } from '@/components/auth/useCaptcha'
import { useRedirectWhenSignedIn } from '@/components/auth/useRedirectWhenSignedIn'
import { authClient } from '@/lib/auth-client'
import { followOAuthRedirect, isOAuthRequest } from '@/lib/oauth'
import { safeRedirect } from '@/lib/redirect'

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
  // Sent here by an AI assistant: the sign-in continues to its consent
  const oauth = isOAuthRequest(searchParams)
  const captcha = useCaptcha()

  useRedirectWhenSignedIn(safeRedirect(searchParams.get('redirect')), !oauth)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    setError(null)
    setInfo(null)

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      fetchOptions: { headers: captcha.headers }
    })

    if (!error && followOAuthRedirect(data)) {
      return
    }

    setPending(false)
    captcha.reset()

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
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/dashboard',
      fetchOptions: { headers: captcha.headers }
    })

    captcha.reset()
    setError(
      error
        ? error.message || 'Could not send the email, please try again'
        : null
    )
    setInfo(error ? null : 'A new confirmation email is on its way.')
  }

  return (
    <AuthCard
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link className={textLink} href="/signup">
            Sign up
          </Link>
        </>
      }
      subtitle={
        oauth
          ? 'Sign in to connect your AI assistant to GymFit'
          : 'Sign in to manage your API keys and usage'
      }
      title="Welcome back"
    >
      {error && (
        <FormMessage tone="error">
          {error}{' '}
          {needsVerification && (
            <button
              className="font-medium underline disabled:opacity-50"
              disabled={!captcha.ready}
              type="button"
              onClick={resendVerification}
            >
              Resend the email
            </button>
          )}
        </FormMessage>
      )}
      {info && <FormMessage tone="success">{info}</FormMessage>}

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
        <Field
          required
          autoComplete="current-password"
          id="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="text-right text-sm">
          <Link
            className="text-steel-light underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
        {captcha.widget}
        <Button
          className="w-full"
          disabled={pending || !captcha.ready}
          size="lg"
          type="submit"
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
