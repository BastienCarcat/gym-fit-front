'use client'

import Link from 'next/link'

import { DATA_PACK } from '@/config/dataPack'
import { PLAN_ORDER, PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { authClient } from '@/lib/auth-client'

import { Reveal } from './Reveal'

const formatNumber = (value: number) => value.toLocaleString('en-US')

const BUTTONS: Record<string, string> = {
  free: 'Get a free API key',
  starter: 'Choose Starter',
  scale: 'Choose Pro'
}

const card =
  'flex min-w-[17rem] shrink-0 snap-start flex-col rounded-[14px] border p-6 sm:min-w-0'

export function Pricing() {
  const { data: session } = authClient.useSession()
  // Visitors create an account first; signed-in users pick their plan
  const choose = session ? siteConfig.plans_url : '/signup'

  return (
    <section
      aria-labelledby="pricing-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
      id="pricing"
    >
      <Reveal>
        <h2
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          id="pricing-title"
        >
          Exercise API pricing
        </h2>
        <p className="mt-3 text-steel-light">
          Start free, upgrade when your app grows. Prices in USD, excluding
          taxes.
        </p>

        <div className="-mx-4 mt-10 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {PLAN_ORDER.map((id) => {
            const plan = PLANS[id]
            const featured = id === 'starter'

            return (
              <div
                key={id}
                className={`${card} ${
                  featured
                    ? 'border-volt bg-ink-900'
                    : 'border-ink-700 bg-ink-900'
                }`}
              >
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-white">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-steel"> a month</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-steel-light">
                  <li>
                    <strong className="text-white">
                      {formatNumber(plan.quota)}
                    </strong>{' '}
                    requests a month
                  </li>
                  <li>{plan.rateLimitPerMinute} requests a minute</li>
                  <li>
                    {plan.overagePrice === null
                      ? 'Requests beyond the quota are refused'
                      : `Then $${plan.overagePrice} per extra request`}
                  </li>
                  <li>
                    {plan.commercialUse
                      ? `Commercial use, ${plan.maxApiKeys} ${
                          plan.maxApiKeys === 1 ? 'app' : 'apps'
                        }`
                      : 'Prototypes and non commercial projects'}
                  </li>
                </ul>
                <Link
                  className={`mt-auto inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] px-4 text-sm font-bold transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px ${
                    featured
                      ? 'bg-volt text-ink'
                      : 'border border-ink-700 text-white hover:border-steel'
                  } ${'mt-8'}`}
                  href={id === 'free' && !session ? '/signup' : choose}
                >
                  {BUTTONS[id]}
                </Link>
              </div>
            )
          })}

          <div className={`${card} border-ink-700 bg-ink`}>
            <h3 className="text-lg font-bold text-white">Data pack</h3>
            <p className="mt-4">
              <span className="text-4xl font-extrabold text-white">
                ${DATA_PACK.price}
              </span>
              <span className="text-steel"> once</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-steel-light">
              <li>The whole catalog, as files you own</li>
              <li>A durable copy for your app, offline included</li>
              <li>{DATA_PACK.updatesMonths} months of updates</li>
              <li>The only offer to store the data yourself</li>
            </ul>
            <Link
              className="mt-4 text-sm font-bold text-volt hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              href={DATA_PACK.path}
            >
              What is in the data pack
            </Link>
            <a
              className="mt-8 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] border border-ink-700 px-4 text-sm font-bold text-white transition-transform hover:-translate-y-px hover:border-steel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt active:translate-y-px"
              href={DATA_PACK.mailto}
            >
              Ask for early access
            </a>
          </div>
        </div>

        <p className="mt-6 text-sm text-steel">
          Every plan includes every endpoint. Cancel anytime from your
          dashboard.
        </p>
      </Reveal>
    </section>
  )
}
