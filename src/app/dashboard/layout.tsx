import { ReactNode } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { ApiError, apiFetch } from '@/lib/api/server'
import { Me } from '@/lib/api/types'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const me = await apiFetch<Me>('/v1/me').catch((error: unknown) => {
    // Expired or revoked session: the cookie is there but not valid anymore
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login?redirect=/dashboard')
    }
    throw error
  })

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <IconArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-sky-600"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/plans"
                className="text-gray-900 hover:text-sky-600"
              >
                Plans
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline">
              {me.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
