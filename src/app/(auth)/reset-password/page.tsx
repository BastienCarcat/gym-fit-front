'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthCard, Field, FormMessage } from '@/components/auth/AuthCard'
import { authClient } from '@/lib/auth-client'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(
    searchParams.get('error') || !token
      ? 'This reset link is invalid or has expired.'
      : null
  )
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!token) {
      return
    }

    setPending(true)
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token
    })
    setPending(false)

    if (error) {
      setError(error.message || 'Could not reset your password')
      return
    }

    setDone(true)
  }

  return (
    <AuthCard
      title="Choose a new password"
      footer={
        <Link
          href={done ? '/login' : '/forgot-password'}
          className="text-sky-500 hover:underline"
        >
          {done ? 'Sign in' : 'Ask for a new link'}
        </Link>
      }
    >
      {error && <FormMessage tone="error">{error}</FormMessage>}
      {done ? (
        <FormMessage tone="success">
          Your password has been changed. You can now sign in.
        </FormMessage>
      ) : (
        token && (
          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              id="password"
              label="New password"
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
              {pending ? 'Saving…' : 'Save the new password'}
            </Button>
          </form>
        )
      )}
    </AuthCard>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
