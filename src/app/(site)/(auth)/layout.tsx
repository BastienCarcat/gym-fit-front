import { Metadata } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'
import { IconCheck } from '@tabler/icons-react'

import { HERO_EXERCISES } from '@/app/_landing/heroData'
import { CompactFooter } from '@/components/CompactFooter'
import { PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { formatNumber } from '@/lib/format'

/** Sign-in pages have nothing to rank for */
export const metadata: Metadata = { robots: { index: false } }

const SQUAT = HERO_EXERCISES[0]

const PERKS = [
  '5,800 exercises with their target and secondary muscles',
  'A search that reads typos, abbreviations and muscle names',
  `Free plan: ${formatNumber(PLANS.free.quota)} requests a month, no credit card`
]

/** The form on the left, what the key gives on the right */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          aria-label="GymFit API, home"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt"
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
        <Link
          className="rounded-[10px] px-3 py-2 text-sm font-medium text-steel-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
          href={siteConfig.documentation_url}
          rel="noreferrer"
          target="_blank"
        >
          Docs
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:py-16">
        <div className="mx-auto w-full max-w-md lg:mx-0">{children}</div>

        <aside
          aria-label="What your API key gives you"
          className="hidden lg:block"
        >
          <figure className="rounded-[14px] border border-ink-700 bg-ink-900">
            <p className="border-b border-ink-700 px-4 py-3 font-code text-xs text-steel-light">
              <span className="font-bold text-volt">GET</span> /v2/exercises/
              {SQUAT.slug}/heatmap
            </p>
            <img
              alt={`Muscle heatmap of the squat, front and back: ${SQUAT.targets.join(', ')} highlighted`}
              className="mx-auto h-64 w-full object-contain p-4"
              height={256}
              src={SQUAT.heatmap}
              width={360}
            />
            <figcaption className="border-t border-ink-700 px-4 py-3 text-xs text-steel-light">
              <span className="font-bold text-volt">Target</span>:{' '}
              {SQUAT.targets.join(', ')}.{' '}
              <span className="font-bold text-white">Secondary</span>:{' '}
              {SQUAT.secondary.join(', ')}.
            </figcaption>
          </figure>
          <ul className="mt-8 space-y-3 text-steel-light">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <IconCheck
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-volt"
                />
                {perk}
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <CompactFooter className="max-w-6xl" />
    </div>
  )
}
