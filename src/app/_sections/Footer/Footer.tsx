import React from 'react'

const navigation = {
  api: [
    { name: 'Calculator', href: '#' },
    { name: 'Exercises', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Rapid API', href: '#' },
    // { name: 'Guides', href: '#' },
  ],
  support: [
    { name: 'Contact us', href: 'mailto:contact@gymfit-api.com' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' }
  ],
  social: [
    // {
    //   name: 'Facebook',
    //   href: '#',
    //   icon: (props) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path
    //         clipRule="evenodd"
    //         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    //         fillRule="evenodd"
    //       />
    //     </svg>
    //   )
    // }
  ]
}

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 className="sr-only" id="footer-heading">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              alt="Company name"
              className="h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
            />
            <p className="text-base text-gray-500">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  className="text-gray-400 hover:text-gray-500"
                  href={item.href}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  API
                </h3>
                <ul className="mt-4 space-y-4" role="list">
                  {navigation.api.map((item) => (
                    <li key={item.name}>
                      <a
                        className="text-base text-gray-500 hover:text-gray-900"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Support
                </h3>
                <ul className="mt-4 space-y-4" role="list">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        className="text-base text-gray-500 hover:text-gray-900"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Resources
                </h3>
                <ul className="mt-4 space-y-4" role="list">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a
                        className="text-base text-gray-500 hover:text-gray-900"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4" role="list">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        className="text-base text-gray-500 hover:text-gray-900"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400">
            &copy; 2024 Gym Fit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
