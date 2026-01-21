'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup, signInWithGithub, resendConfirmationEmail } from '../actions'
import { Button } from '@/components/ui/button'
import { IconBrandGithub, IconMail } from '@tabler/icons-react'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    const emailValue = formData.get('email') as string
    setEmail(emailValue)

    const result = await signup(formData)

    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || 'An error occurred')
    }

    setIsLoading(false)
  }

  async function handleResend() {
    setIsResending(true)
    setResendMessage(null)

    const result = await resendConfirmationEmail(email)

    if (result.success) {
      setResendMessage('Email sent! Check your inbox.')
    } else {
      setResendMessage(result.error || 'Failed to resend email')
    }

    setIsResending(false)
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <IconMail className="h-8 w-8 text-sky-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ve sent a confirmation link to <span className="font-medium text-gray-700">{email}</span>.
              Please check your inbox and click the link to activate your account.
            </p>
          </div>

          {resendMessage && (
            <div className={`rounded-md p-3 text-sm ${
              resendMessage.includes('sent')
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}>
              {resendMessage}
            </div>
          )}

          <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-sky-500 hover:underline disabled:opacity-50"
            >
              {isResending ? 'sending...' : 'resend email'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Get started with your free account
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-600"
            size="lg"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <form action={signInWithGithub}>
          <Button
            type="submit"
            variant="outline"
            className="w-full"
            size="lg"
          >
            <IconBrandGithub className="mr-2 h-5 w-5" />
            GitHub
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
