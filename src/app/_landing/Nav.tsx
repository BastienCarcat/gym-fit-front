'use client'

import Link from 'next/link'

import { authClient } from '@/lib/auth-client'
import { siteConfig } from '@/config/site'

const LINKS = [
  { label: 'Docs', href: siteConfig.documentation_url, external: true },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' }
]

export function Nav() {
  const { data: session } = authClient.useSession()
  const signedIn = Boolean(session?.user)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link aria-label="GymFit API, home" href="/">
          <img
            alt="GymFit API"
            className="h-7 w-auto"
            height={28}
            src="/brand/gymfit-logo-horizontal-reversed.svg"
            width={94}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              className="rounded-[10px] px-3 py-2 text-sm font-medium text-steel-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noreferrer' })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Signed in, the button alone leads to the dashboard */}
          {!signedIn && (
            <Link
              className="hidden text-sm font-medium text-steel-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt sm:inline"
              href="/login"
            >
              Sign in
            </Link>
          )}
          <Link
            className="inline-flex h-10 items-center whitespace-nowrap rounded-[10px] bg-volt px-4 text-sm font-bold text-ink transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
            href={signedIn ? '/dashboard' : '/signup'}
          >
            {signedIn ? 'Open dashboard' : 'Get a free API key'}
          </Link>
        </div>
      </div>
    </header>
  )
}
