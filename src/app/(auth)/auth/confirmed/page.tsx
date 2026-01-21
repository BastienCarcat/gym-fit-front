import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconCheck, IconX } from '@tabler/icons-react'

export default async function ConfirmedPage({
  searchParams
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const { success, error } = await searchParams
  const isSuccess = success === 'true'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {isSuccess ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <IconCheck className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email confirmed!</h1>
              <p className="mt-2 text-sm text-gray-500">
                Your email has been successfully verified. You can now access
                your dashboard.
              </p>
            </div>

            <Button asChild className="w-full bg-sky-500 hover:bg-sky-600" size="lg">
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <IconX className="h-8 w-8 text-red-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Confirmation failed
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {error || 'The confirmation link is invalid or has expired.'}
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-sky-500 hover:bg-sky-600" size="lg">
                <Link href="/signup">Try signing up again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/login">Go to login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
