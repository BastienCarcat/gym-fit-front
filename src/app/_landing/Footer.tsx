import Link from 'next/link'

import { DATA_PACK } from '@/config/dataPack'
import { MCP_PAGE_PATH } from '@/config/mcp'
import { siteConfig } from '@/config/site'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Docs', href: siteConfig.documentation_url, external: true },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Data pack', href: DATA_PACK.path },
      { label: 'MCP server', href: MCP_PAGE_PATH },
      { label: 'Get an API key', href: '/signup' }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'API reference',
        href: siteConfig.documentation_url,
        external: true
      },
      {
        label: 'OpenAPI spec',
        href: `${siteConfig.api_url}/openapi.json`,
        external: true
      },
      {
        label: 'RapidAPI listing',
        href: siteConfig.rapid_listing_url,
        external: true
      }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of use', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Legal notice', href: '/legal' }
    ]
  }
]

export function Footer() {
  return (
    <footer className="border-t border-ink-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <img
              alt="GymFit API"
              className="h-7 w-auto"
              height={28}
              src="/brand/gymfit-logo-horizontal-reversed.svg"
              width={94}
            />
            <p className="mt-4 text-sm text-steel">
              <a
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
                href={`mailto:${siteConfig.contact_email}`}
              >
                {siteConfig.contact_email}
              </a>
            </p>
          </div>
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-bold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-steel-light hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
                      href={link.href}
                      {...('external' in link &&
                        link.external && {
                          target: '_blank',
                          rel: 'noreferrer'
                        })}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-12 text-xs text-steel">© 2026 GymFit API</p>
      </div>
    </footer>
  )
}
