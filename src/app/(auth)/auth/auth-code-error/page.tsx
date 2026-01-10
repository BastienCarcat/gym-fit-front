import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Authentication Error
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            There was a problem verifying your email. The link may have expired
            or already been used.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
            <Link href="/signup">Try signing up again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
