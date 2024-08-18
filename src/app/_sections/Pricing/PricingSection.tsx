'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import _ from 'lodash'
import { Button, Link } from '@nextui-org/react'
import { siteConfig } from '@/config/site'

enum Billing {
  Yearly = 'YEARLY',
  Monthly = 'MONTHLY'
}

export default function PricingSection() {
  const [billing, setBilling] = useState(Billing.Yearly)

  const plans = useMemo(
    () => [
      {
        title: 'Basic',
        featured: false,
        free: true,
        priceMonthly: 0,
        priceYearly: 0,
        buttonText: 'Start now'
      },
      {
        title: 'Pro',
        featured: false,
        free: false,
        priceMonthly: 5,
        priceYearly: 60,
        buttonText: 'Start now'
      },
      {
        title: 'Ultra',
        featured: true,
        free: false,
        priceMonthly: 9,
        priceYearly: 108,
        buttonText: 'Start now'
      },
      {
        title: 'Mega',
        featured: false,
        free: false,
        priceMonthly: 11,
        priceYearly: 132,
        buttonText: 'Start now'
      }
    ],
    []
  )

  const features = useMemo(
    () => [
      {
        title: 'Requests',
        tiers: [
          { value: '500' },
          { value: '5,000' },
          { featured: true, value: '10,000' },
          { value: '20,000' }
        ]
      },
      {
        title: 'Requests limit',
        tiers: [
          { value: 'Hard limit' },
          { value: '$0.003 each' },
          { featured: true, value: '$0.003 each' },
          { value: '$0.001 each' }
        ]
      },
      {
        title: 'Rate limit',
        tiers: [
          { value: '1,000 req/h' },
          { value: '60 req/min' },
          { featured: true, value: '60 req/min' },
          { value: '120 req/min' }
        ]
      },
      {
        title: 'Include calculators',
        tiers: [
          { value: true },
          { value: true },
          { featured: true, value: true },
          { value: true }
        ]
      },
      {
        title: 'Exercise video',
        tiers: [
          { featured: true, value: 'coming soon' },
          { featured: true, value: 'coming soon' },
          { featured: true, value: 'coming soon' },
          { featured: true, value: 'coming soon' }
        ]
      },
      {
        title: 'Priority support',
        tiers: [
          { value: false },
          { value: true },
          { featured: true, value: true },
          { value: true }
        ]
      }
    ],
    []
  )

  const handleSwitchBilling = useCallback(
    (billing: Billing) => {
      setBilling(billing)
    },
    [setBilling]
  )

  const classNames = useCallback((...classes: any) => {
    return classes.filter(Boolean).join(' ')
  }, [])

  const getDiscount = useCallback((pricing: number) => {
    const discount = _.floor(_.multiply(pricing, 0.1))

    return _.subtract(pricing, discount)
  }, [])

  return (
    <>
      <div className="relative" id="pricing">
        {/* Overlapping background */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 hidden h-6 w-full lg:block"
        />

        <div className="relative mx-auto max-w-2xl px-4 pt-16 text-center sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            <span className="block text-gray-900 lg:inline">
              Choose the plan
            </span>
            <span className="block text-gray-900 lg:inline lg:pl-3">
              that’s right for <span className="text-sky-500">you</span>
            </span>
          </h2>
          {/* <p className="mt-4 text-xl text-gray-900">
            Start for free, update later
          </p> */}
        </div>

        <h2 className="sr-only">Plans</h2>

        {/* Toggle */}
        <div className="relative mt-12 flex items-center justify-center sm:mt-16">
          <div className="flex rounded-lg bg-sky-500 p-0.5">
            <button
              className={classNames(
                billing === Billing.Monthly
                  ? 'border-sky-500 bg-white text-sky-500 hover:bg-sky-50'
                  : 'border border-transparent text-sky-100 hover:bg-sky-600',
                'relative whitespace-nowrap rounded-md px-6 py-2 text-sm font-medium shadow-sm'
              )}
              type="button"
              onClick={() => handleSwitchBilling(Billing.Monthly)}
            >
              Monthly
            </button>
            <button
              className={classNames(
                billing === Billing.Yearly
                  ? 'border-sky-500 bg-white text-sky-500 hover:bg-sky-50'
                  : 'border border-transparent text-sky-100 hover:bg-sky-600',
                'relative ml-0.5 whitespace-nowrap rounded-md px-6 py-2 text-sm font-medium shadow-sm'
              )}
              type="button"
              onClick={() => handleSwitchBilling(Billing.Yearly)}
            >
              Yearly
            </button>
          </div>
          <div className="relative ml-4 rounded-md border border-green-600 bg-green-200 px-2 py-1 text-xs text-green-900 after:absolute after:left-0 after:top-1/2 after:h-3 after:w-3 after:-translate-x-[7px] after:-translate-y-1/2 after:rotate-45 after:border-b after:border-l after:border-green-600 after:bg-green-200">
            SAVE 10%
          </div>
        </div>
      </div>

      {/* Feature comparison (up to lg) */}
      <section
        aria-labelledby="mobile-comparison-heading"
        className="lg:hidden"
      >
        <h2 className="sr-only" id="mobile-comparison-heading">
          Feature comparison
        </h2>

        <div className="mx-auto max-w-2xl space-y-16 px-4 py-16 sm:px-6">
          {plans.map((plan, mobilePlanIndex) => (
            <div key={mobilePlanIndex} className="border-t border-gray-200">
              <div
                className={classNames(
                  plan.featured ? 'border-sky-500' : 'border-transparent',
                  '-mt-px border-t-2 pt-6 sm:w-1/2'
                )}
              >
                <h3
                  className={classNames(
                    plan.featured ? 'text-sky-500' : 'text-gray-900',
                    'text-sm font-bold'
                  )}
                >
                  {plan.title}
                </h3>
                <div className="mt-2 text-start text-gray-900">
                  {plan.free ? (
                    <div className="text-3xl font-bold">Free</div>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">
                        $
                        {billing === Billing.Monthly
                          ? plan.priceMonthly
                          : getDiscount(plan.priceYearly)}
                      </span>
                      <span className="text-lg font-medium">
                        /{billing === Billing.Monthly ? 'mo' : 'yo'}
                      </span>

                      {billing === Billing.Yearly && (
                        <span className="ml-3 text-gray-600 line-through">
                          <span className="text-lg font-bold">
                            ${plan.priceYearly}
                          </span>
                          <span className="text-md font-medium">/yo</span>
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="relative mt-6">
                {/* Fake card background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured ? 'shadow-md' : 'shadow',
                      'absolute right-0 h-full w-1/2 rounded-lg bg-white'
                    )}
                  />
                </div>

                <div
                  className={classNames(
                    plan.featured
                      ? 'shadow-md ring-2 ring-sky-500'
                      : 'shadow ring-1 ring-black ring-opacity-5',
                    'relative rounded-lg bg-white px-4 py-3 sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0'
                  )}
                >
                  <dl className="divide-y divide-gray-200">
                    {features.map((feature, featureIdx) => (
                      <div
                        key={featureIdx}
                        className="flex items-center justify-between py-3 sm:grid sm:grid-cols-2"
                      >
                        <dt className="pr-4 text-sm font-medium text-gray-600">
                          {feature.title}
                        </dt>
                        <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                          {typeof feature.tiers[mobilePlanIndex].value ===
                          'string' ? (
                            <span
                              className={classNames(
                                feature.tiers[mobilePlanIndex].featured
                                  ? 'text-sky-500'
                                  : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {feature.tiers[mobilePlanIndex].value}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[mobilePlanIndex].value === true ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="mx-auto h-5 w-5 text-sky-500"
                                />
                              ) : (
                                <XMarkIcon
                                  aria-hidden="true"
                                  className="mx-auto h-5 w-5 text-gray-400"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[mobilePlanIndex].value === true
                                  ? 'Yes'
                                  : 'No'}
                              </span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex items-center justify-center py-3 sm:grid sm:grid-cols-2">
                    <dt />
                    <dd className="flex w-full items-center sm:px-4">
                      {plan.featured ? (
                        <>
                          <Button
                            fullWidth
                            as={Link}
                            color="primary"
                            href={siteConfig.rapid_plans_url}
                            radius="sm"
                            target="_blank"
                          >
                            {plan.buttonText}
                          </Button>
                        </>
                      ) : (
                        <Button
                          fullWidth
                          as={Link}
                          color="primary"
                          href={siteConfig.rapid_plans_url}
                          radius="sm"
                          target="_blank"
                          variant="ghost"
                        >
                          {plan.buttonText}
                        </Button>
                      )}
                    </dd>
                  </div>
                </div>

                {/* Fake card border */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured
                        ? 'ring-2 ring-sky-500'
                        : 'ring-1 ring-black ring-opacity-5',
                      'absolute right-0 h-full w-1/2 rounded-lg'
                    )}
                  />
                </div>
              </div>

              {/*  <h4 className="mt-10 text-sm font-bold text-gray-900">Other perks</h4>

              <div className="mt-6 relative">
                {/* Fake card background */}
              {/*  <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
                  <div
                    className={classNames(
                      plan.featured ? 'shadow-md' : 'shadow',
                      'absolute right-0 w-1/2 h-full bg-white rounded-lg'
                    )}
                  />
                </div>

                <div
                  className={classNames(
                    plan.featured ? 'ring-2 ring-indigo-600 shadow-md' : 'ring-1 ring-black ring-opacity-5 shadow',
                    'relative py-3 px-4 bg-white rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none'
                  )}
                >
                  <dl className="divide-y divide-gray-200">
                    {perks.map((perk) => (
                      <div key={perk.title} className="py-3 flex justify-between sm:grid sm:grid-cols-2">
                        <dt className="text-sm font-medium text-gray-600 sm:pr-4">{perk.title}</dt>
                        <dd className="text-center sm:px-4">
                          {perk.tiers[mobilePlanIndex].value === true ? (
                            <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" />
                          ) : (
                            <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />
                          )}

                          <span className="sr-only">{perk.tiers[mobilePlanIndex].value === true ? 'Yes' : 'No'}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Fake card border */}
              {/*  <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
                  <div
                    className={classNames(
                      plan.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-black ring-opacity-5',
                      'absolute right-0 w-1/2 h-full rounded-lg'
                    )}
                  />
                </div>
              </div>*/}
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison (lg+) */}
      <section aria-labelledby="comparison-heading" className="hidden lg:block">
        <h2 className="sr-only" id="comparison-heading">
          Feature comparison
        </h2>

        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex w-full items-stretch border-t border-gray-200">
            <div className="-mt-px flex w-1/4 items-end py-6 pr-4" />
            {plans.map((plan, planIdx) => (
              <div
                key={planIdx}
                aria-hidden="true"
                className={classNames(
                  planIdx === plans.length - 1 ? '' : 'pr-4',
                  '-mt-px w-1/4 pl-4'
                )}
              >
                <div
                  className={classNames(
                    plan.featured ? 'border-sky-500' : 'border-transparent',
                    'border-t-2 py-6'
                  )}
                >
                  <p
                    className={classNames(
                      plan.featured ? 'text-sky-500' : 'text-gray-900',
                      'text-sm font-bold'
                    )}
                  >
                    {plan.title}
                  </p>
                  <div className="mt-2 text-start text-gray-900">
                    {plan.free ? (
                      <div className="text-3xl font-bold">Free</div>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">
                          $
                          {billing === Billing.Monthly
                            ? plan.priceMonthly
                            : getDiscount(plan.priceYearly)}
                        </span>
                        <span className="text-lg font-medium">
                          /{billing === Billing.Monthly ? 'mo' : 'yo'}
                        </span>

                        {billing === Billing.Yearly && (
                          <span className="ml-3 text-gray-600 line-through">
                            <span className="text-lg font-bold">
                              ${plan.priceYearly}
                            </span>
                            <span className="text-md font-medium">/yo</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Fake card backgrounds */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-stretch"
            >
              <div className="w-1/5 pr-4" />
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow-md" />
              </div>

              <div className="w-1/5 pl-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Business feature comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan, planIdx) => (
                    <th key={planIdx} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature, featureIdx) => (
                  <tr key={featureIdx}>
                    <th
                      className="w-1/5 py-3 pr-4 text-left text-sm font-medium text-gray-600"
                      scope="row"
                    >
                      {feature.title}
                    </th>
                    {feature.tiers.map((tier, tierIdx) => (
                      <td
                        key={tierIdx}
                        className={classNames(
                          tierIdx === feature.tiers.length - 1
                            ? 'pl-4'
                            : 'px-4',
                          'relative w-1/5 py-0 text-center'
                        )}
                      >
                        <span className="relative h-full w-full py-3">
                          {typeof tier.value === 'string' ? (
                            <span
                              className={classNames(
                                tier.featured
                                  ? 'text-sky-500'
                                  : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {tier.value}
                            </span>
                          ) : (
                            <>
                              {tier.value === true ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="mx-auto h-5 w-5 text-sky-500"
                                />
                              ) : (
                                <XMarkIcon
                                  aria-hidden="true"
                                  className="mx-auto h-5 w-5 text-gray-400"
                                />
                              )}

                              <span className="sr-only">
                                {tier.value === true ? 'Yes' : 'No'}
                              </span>
                            </>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Buy</span>
                  </th>
                  {plans.map((plan, planIdx) => (
                    <td
                      key={planIdx}
                      className={classNames(
                        planIdx === plans.length - 1 ? 'pl-4' : 'px-4',
                        'relative mx-3 w-1/5 py-3 text-center'
                      )}
                    >
                      <div className="mx-3">
                        {plan.featured ? (
                          <>
                            <Button
                              fullWidth
                              as={Link}
                              color="primary"
                              href={siteConfig.rapid_plans_url}
                              radius="sm"
                              target="_blank"
                            >
                              {plan.buttonText}
                            </Button>
                          </>
                        ) : (
                          <Button
                            fullWidth
                            as={Link}
                            color="primary"
                            href={siteConfig.rapid_plans_url}
                            radius="sm"
                            target="_blank"
                            variant="ghost"
                          >
                            {plan.buttonText}
                          </Button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>

            {/* Fake card borders */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-stretch"
            >
              <div className="w-1/5 pr-4" />
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/5 px-4">
                <div className="h-full w-full rounded-lg ring-2 ring-sky-500 ring-opacity-100" />
              </div>

              <div className="w-1/5 pl-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>

          {/*  <h3 className="mt-10 text-sm font-bold text-gray-900">Other perks</h3>

          <div className="mt-6 relative">
            {/* Fake card backgrounds */}
          {/*  <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="w-full h-full bg-white rounded-lg shadow" />
              </div>
              <div className="w-1/4 px-4">
                <div className="w-full h-full bg-white rounded-lg shadow-md" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="w-full h-full bg-white rounded-lg shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Perk comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Perk</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.title} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {perks.map((perk) => (
                  <tr key={perk.title}>
                    <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600">
                      {perk.title}
                    </th>
                    {perk.tiers.map((tier, tierIdx) => (
                      <td
                        key={tier.title}
                        className={classNames(
                          tierIdx === perk.tiers.length - 1 ? 'pl-4' : 'px-4',
                          'relative w-1/4 py-0 text-center'
                        )}
                      >
                        <span className="relative w-full h-full py-3">
                          {tier.value === true ? (
                            <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" />
                          ) : (
                            <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />
                          )}

                          <span className="sr-only">{tier.value === true ? 'Yes' : 'No'}</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Fake card borders */}
          {/*  <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/4 px-4">
                <div className="w-full h-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>*/}
        </div>
      </section>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <p className="mb-3 text-xl font-bold text-gray-900">
            Have a custom need ?
          </p>
          <Button
            fullWidth
            as={Link}
            color="primary"
            href="mailto:contact@gymfit-api.com"
            variant="flat"
          >
            Get in touch
          </Button>
        </div>
        <div>
          <p className="text-18 sm:text-20 mb-2">
            Not sure what plan you need?
            <a
              className="pl-2 font-bold underline"
              href={siteConfig.rapid_plans_url}
              rel="noreferrer"
              target="_blank"
            >
              Try for free in Basic plan
            </a>
          </p>
          <p className="text-16 sm:text-18 text-gray-500">
            (No credit card required)
          </p>
        </div>
      </div>
    </>
  )
}
