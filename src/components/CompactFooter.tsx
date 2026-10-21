import Link from 'next/link'

import { CookieSettingsButton } from '@/components/analytics/CookieSettingsButton'
import { siteConfig } from '@/config/site'

const LINKS = [
  { label: 'Docs', href: siteConfig.documentation_url, external: true },
  { label: 'Contact', href: `mailto:${siteConfig.contact_email}` },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' }
]

/** The footer of the sign-in pages and the dashboard */
export function CompactFooter({ className = '' }: { className?: string }) {
  return (
    <footer className="border-t border-ink-700">
      <div
        className={`mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 text-sm text-steel sm:px-6 ${className}`}
      >
        <p>© 2026 GymFit API</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
                  href={link.href}
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noreferrer'
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt" />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
