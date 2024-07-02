'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import _ from 'lodash'

enum Billing {
  Yearly = 'YEARLY',
  Monthly = 'MONTHLY'
}

export default function PricingSection() {

const [billing, setBilling] = useState(Billing.Yearly)

  const plans = useMemo(() => [
    {
      title: 'Basic',
      featured: false,
      description: 'All your essential business finances, taken care of.',
      free: true,
      priceMonthly: 0,
      priceYearly: 0,
    },
    {
      title: 'Pro',
      featured: false,
      description: 'The best financial services for your thriving business.',
      free: false,
      priceMonthly: 5,
      priceYearly: 60,
    },
    {
      title: 'Ultra',
      featured: true,
      description: 'Convenient features to take your business to the next level.',
      free: false,
      priceMonthly: 9,
      priceYearly: 108,
    },
    {
      title: 'Mega',
      featured: false,
      description: 'Convenient features to take your business to the next level.',
      free: false,
      priceMonthly: 11,
      priceYearly: 132,
    },
  ], [])

  const features = useMemo(() => [
    {
      title: 'Tax Savings',
      tiers: [
        { value: true },
        { value: true },
        {  featured: true, value: true },
        { value: true },
      ],
    },
    {
      title: 'Easy to use accounting',
      tiers: [
        { value: true },
        { value: true },
        {  featured: true, value: true },
        { value: true },
      ],
    },
    {
      title: 'Multi-accounts',
      tiers: [
        { value: '3 accounts' },
        { value: '7 accounts' },
        {  featured: true, value: 'Unlimited accounts' },
        { value: true },
      ],
    },
    {
      title: 'Invoicing',
      tiers: [
        { value: '3 invoices' },
        { value: '10 invoices' },
        {  featured: true, value: 'Unlimited invoices' },
        { value: true },
      ],
    },
    {
      title: 'Exclusive offers',
      tiers: [
        { value: true },
        { value: true },
        {  featured: true, value: true },
        { value: true },
      ],
    },
    {
      title: '6 months free advisor',
      tiers: [
        { value: false },
        { value: true },
        {  featured: true, value: true },
        { value: true },
      ],
    },
    {
      title: 'Mobile and web access',
      tiers: [
        { value: false },
        { value: true },
        {  featured: true, value: true },
        { value: true },
      ],
    },
  ], [])


  const handleSwitchBilling = useCallback((billing: Billing) => {
setBilling(billing)
  }, [setBilling])

const classNames = useCallback((...classes: any) => { 
    return classes.filter(Boolean).join(' ')
}, [])


const getDiscount = useCallback((pricing: number) => { 

  const discount = _.floor(_.multiply(pricing, 0.1))
  return _.subtract(pricing, discount)
}, [])

  return (
    <div className="bg-gray-50">
      <div className="relative">
        {/* Overlapping background */}
        <div aria-hidden="true" className="hidden absolute bg-gray-50 w-full h-6 bottom-0 lg:block" />

        <div className="relative max-w-2xl mx-auto pt-16 px-4 text-center sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            <span className="block lg:inline text-gray-900">Simple pricing,</span>
            <span className="block lg:inline text-gray-900">no commitment.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-900">
            Everything you need, nothing you don't. Pick a plan that best suits your business.
          </p>
        </div>

        <h2 className="sr-only">Plans</h2>

        {/* Toggle */}
        <div className="relative mt-12 flex justify-center items-center sm:mt-16">
          <div className="bg-indigo-700 p-0.5 rounded-lg flex">
            <button
            onClick={() => handleSwitchBilling(Billing.Monthly)}
              type="button"
              className={
                classNames(billing === Billing.Monthly ? 'bg-white text-indigo-700 border-indigo-700 hover:bg-indigo-50' : 'text-indigo-100 hover:bg-indigo-800 border border-transparent', 'relative  py-2 px-6  rounded-md shadow-sm text-sm font-medium  whitespace-nowrap ')
              }
            >
              Monthly
            </button>
            <button
            onClick={() => handleSwitchBilling(Billing.Yearly)}
              type="button"
              className={
                classNames(billing === Billing.Yearly ? 'bg-white text-indigo-700 border-indigo-700 hover:bg-indigo-50' : 'text-indigo-100 hover:bg-indigo-800 border border-transparent', 'relative  py-2 px-6 ml-0.5 rounded-md shadow-sm text-sm font-medium  whitespace-nowrap ')
              }
            >
              Yearly
            </button>
          </div>
          <div className='relative text-xs text-green-900 border-green-600 border bg-green-200 rounded-md ml-4 py-1 px-2 after:absolute after:left-0 after:w-3 after:border-green-600 after:border-b after:border-l after:bg-green-200 after:top-1/2 after:h-3 after:rotate-45 after:-translate-y-1/2 after:-translate-x-[7px]'>SAVE 10%</div>
        </div>
       
      </div>

      {/* Feature comparison (up to lg) */}
      <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
        <h2 id="mobile-comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="max-w-2xl mx-auto py-16 px-4 space-y-16 sm:px-6">
          {plans.map((plan, mobilePlanIndex) => (
            <div key={mobilePlanIndex} className="border-t border-gray-200">
              <div
                className={classNames(
                  plan.featured ? 'border-indigo-600' : 'border-transparent',
                  '-mt-px pt-6 border-t-2 sm:w-1/2'
                )}
              >
                <h3 className={classNames(plan.featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-bold')}>
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <h4 className="mt-10 text-sm font-bold text-gray-900">Catered for business</h4>

              <div className="mt-6 relative">
                {/* Fake card background */}
                <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
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
                    {features.map((feature, featureIdx) => (
                      <div
                        key={featureIdx}
                        className="py-3 flex items-center justify-between sm:grid sm:grid-cols-2"
                      >
                        <dt className="pr-4 text-sm font-medium text-gray-600">{feature.title}</dt>
                        <dd className="flex items-center justify-end sm:px-4 sm:justify-center">
                          {typeof feature.tiers[mobilePlanIndex].value === 'string' ? (
                            <span
                              className={classNames(
                                feature.tiers[mobilePlanIndex].featured ? 'text-indigo-600' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {feature.tiers[mobilePlanIndex].value}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[mobilePlanIndex].value === true ? (
                                <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" />
                              ) : (
                                <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />
                              )}

                              <span className="sr-only">
                                {feature.tiers[mobilePlanIndex].value === true ? 'Yes' : 'No'}
                              </span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Fake card border */}
                <div aria-hidden="true" className="hidden absolute inset-0 pointer-events-none sm:block">
                  <div
                    className={classNames(
                      plan.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-black ring-opacity-5',
                      'absolute right-0 w-1/2 h-full rounded-lg'
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
        <h2 id="comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="max-w-7xl mx-auto py-24 px-8">
          <div className="w-full border-t border-gray-200 flex items-stretch">
            <div className="-mt-px w-1/4 py-6 pr-4 flex items-end">
              <h3 className="mt-auto text-sm font-bold text-gray-900">Catered for business</h3>
            </div>
            {plans.map((plan, planIdx) => (
              <div
                key={planIdx}
                aria-hidden="true"
                className={classNames(planIdx === plans.length - 1 ? '' : 'pr-4', '-mt-px pl-4 w-1/4')}
              >
                <div
                  className={classNames(plan.featured ? 'border-indigo-600' : 'border-transparent', 'py-6 border-t-2')}
                >
                  <p className={classNames(plan.featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-bold')}>
                    {plan.title}
                  </p>
                  <div className='text-start text-gray-900 mt-2'>
                    {plan.free ? (
<div  className='font-bold text-3xl'>Free</div>
                    ) : (
                      <>
                       <span className='font-bold text-3xl'>${billing === Billing.Monthly ?  plan.priceMonthly : getDiscount(plan.priceYearly)}</span>
                    <span className='font-medium text-lg'>/{billing === Billing.Monthly ?  'mo' : 'yo'}</span>
                  
                    {
                      billing === Billing.Yearly && (
                        <span className='text-gray-600 ml-3 line-through'>
                        <span className='font-bold text-lg'>${plan.priceYearly}</span>
                        <span className='font-medium text-md'>/yo</span>
                        </span>
                
                      )
                    }
                      </>
                    )}
                   
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Fake card backgrounds */}
            <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
              <div className="w-1/5 pr-4" />
              <div className="w-1/5 px-4">
                <div className="w-full h-full bg-white rounded-lg shadow" />
              </div>
              <div className="w-1/5 pl-4">
                <div className="w-full h-full bg-white rounded-lg shadow" />
              </div> 
              <div className="w-1/5 px-4">
                <div className="w-full h-full bg-white rounded-lg shadow-md" />
              </div>
            
               <div className="w-1/5 pl-4">
                <div className="w-full h-full bg-white rounded-lg shadow" />
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
                    <th scope="row" className="w-1/5 py-3 pr-4 text-left text-sm font-medium text-gray-600">
                      {feature.title}
                    </th>
                    {feature.tiers.map((tier, tierIdx) => (
                      <td
                        key={tierIdx}
                        className={classNames(
                          tierIdx === feature.tiers.length - 1 ? 'pl-4' : 'px-4',
                          'relative w-1/5 py-0 text-center'
                        )}
                      >
                        <span className="relative w-full h-full py-3">
                          {typeof tier.value === 'string' ? (
                            <span
                              className={classNames(
                                tier.featured ? 'text-indigo-600' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {tier.value}
                            </span>
                          ) : (
                            <>
                              {tier.value === true ? (
                                <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" />
                              ) : (
                                <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />
                              )}

                              <span className="sr-only">{tier.value === true ? 'Yes' : 'No'}</span>
                            </>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Fake card borders */}
            <div className="absolute inset-0 flex items-stretch pointer-events-none" aria-hidden="true">
              <div className="w-1/5 pr-4" />
              <div className="w-1/5 px-4">
                <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/5 pl-4">
                <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/5 px-4">
                <div className="w-full h-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
             
              <div className="w-1/5 pl-4">
                <div className="w-full h-full rounded-lg ring-1 ring-black ring-opacity-5" />
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
    </div>
  )
}
