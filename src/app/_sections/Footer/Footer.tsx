import React, { useMemo } from 'react'

import { siteConfig } from '@/config/site'

export default function Footer() {
  const navigation = useMemo(
    () => ({
      main: [
        {
          name: 'Contact us',
          href: 'mailto:contact@gymfit-api.com',
          blank: false
        },
        // { name: 'Search exercise', href: '#search', blank: false },
        {
          name: 'Try API',
          href: siteConfig.rapid_playground_url,
          blank: true
        },
        {
          name: 'Documentation',
          href: siteConfig.documentation_url,
          blank: true
        }
      ],
      social: [
        {
          name: 'Twitter',
          href: 'https://x.com/BastienCrct',
          icon: (props: any) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          )
        }
      ]
    }),
    []
  )

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mx-5 -my-2 flex flex-wrap justify-center"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                {...(item.blank && { target: '_blank' })}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              className="text-gray-400 hover:text-gray-500"
              href={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Gym Fit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
