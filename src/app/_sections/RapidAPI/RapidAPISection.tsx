import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Button, Link } from '@nextui-org/react'
import React from 'react'

import RapidIcon from '@/app/_ui/icons/RapidIcon'
import { siteConfig } from '@/config/site'
const features = [
  {
    name: 'Easy integration',
    description:
      'RapidAPI provides SDKs and code snippets in multiple languages, making it simple to integrate the Gym Fit API into your application.',
    icon: CheckCircleIcon
  },
  {
    name: 'Try endpoints',
    description:
      'Use the interactive documentation on RapidAPI to test API endpoints directly within the platform, ensuring they work as expected before full integration.',
    icon: CheckCircleIcon
  },
  {
    name: 'Robust security',
    description:
      'RapidAPI ensures secure API key management and encrypts all API traffic, protecting your data from unauthorized access.',
    icon: CheckCircleIcon
  },
  {
    name: 'Scalability',
    description:
      "Handle high traffic volumes effortlessly with RapidAPI's robust infrastructure, which supports seamless scaling as your usage grows.",
    icon: CheckCircleIcon
  },
  {
    name: 'Monitoring',
    description:
      'Get real-time monitoring and detailed analytics of your API usage, allowing you to track performance and identify any issues quickly.',
    icon: CheckCircleIcon
  },
  {
    name: 'Secure payment',
    description:
      "Transactions are secure thanks to RapidAPI's reliable payment system. Easily update your plan whenever you need, ensuring you always have the right resources for your project.",
    icon: CheckCircleIcon
  }
]

export default function RapidAPISection() {
  return (
    <section className="relative bg-sky-100 before:absolute before:left-0 before:top-0 before:z-0 before:h-32 before:w-full before:-translate-y-full before:bg-sky-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="text-4xl font-semibold text-sky-950 lg:text-5xl">
          Works with
        </div>
        <div className="h-24 pt-5 md:h-28 lg:h-36">
          <RapidIcon />
        </div>

        <div className="py-24">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Rapid API</h2>
            <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt>
                    <div className="flex gap-x-3">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-sky-600"
                      />
                      <p className="text-lg font-medium leading-6 text-sky-950">
                        {feature.name}
                      </p>
                    </div>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <Button
            fullWidth
            as={Link}
            className="bg-sky-600 shadow-sm hover:bg-sky-800"
            color="primary"
            href={siteConfig.rapid_playground_url}
            target="_blank"
          >
            Open in Rapid
          </Button>
        </div>
      </div>
    </section>
  )
}
