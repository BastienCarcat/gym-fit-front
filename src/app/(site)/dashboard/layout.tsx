import { ReactNode } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CompactFooter } from '@/components/CompactFooter'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { siteConfig } from '@/config/site'
import { ApiError, apiFetch } from '@/lib/api/server'
import { Me } from '@/lib/api/types'

export const dynamic = 'force-dynamic'

/** Private pages: kept out of search results */
export const metadata: Metadata = { robots: { index: false, follow: false } }

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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink/90 backdrop-blur">
        {/* On a phone the pages go on a second row */}
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6">
          <Link
            aria-label="GymFit API, home"
            className="flex h-16 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt"
            href="/"
          >
            <img
              alt="GymFit API"
              className="h-7 w-auto"
              height={28}
              src="/brand/gymfit-logo-horizontal-reversed.svg"
              width={94}
            />
          </Link>
          <DashboardNav className="order-last w-full pb-3 md:order-none md:w-auto md:flex-1 md:pb-0" />
          <div className="flex h-16 items-center gap-4">
            <Link
              className="text-sm font-medium text-steel-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              href={siteConfig.documentation_url}
              rel="noreferrer"
              target="_blank"
            >
              Docs
            </Link>
            <span className="hidden max-w-[14rem] truncate text-sm text-steel lg:inline">
              {me.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
        {children}
      </main>
      <CompactFooter className="max-w-6xl" />
    </div>
  )
}
