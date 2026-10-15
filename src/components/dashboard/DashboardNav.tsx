'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Plans', href: '/dashboard/plans' },
  { label: 'Data pack', href: '/dashboard/data-pack' },
  { label: 'Settings', href: '/dashboard/settings' }
]

/** The dashboard pages, the current one marked */
export function DashboardNav({ className = '' }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Dashboard" className={className}>
      <ul className="flex gap-1">
        {LINKS.map((link) => {
          const current =
            link.href === '/dashboard'
              ? pathname === link.href
              : pathname?.startsWith(link.href)

          return (
            <li key={link.href}>
              <Link
                aria-current={current ? 'page' : undefined}
                className={`inline-flex h-9 items-center rounded-[10px] px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
                  current
                    ? 'bg-ink-800 text-white'
                    : 'text-steel-light hover:text-white'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
