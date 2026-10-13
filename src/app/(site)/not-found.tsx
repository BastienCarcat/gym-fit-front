import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-code text-sm font-bold text-volt">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-steel-light">
        This page does not exist or has moved.
      </p>
      <Link
        className={buttonVariants({ size: 'lg', className: 'mt-8' })}
        href="/"
      >
        Back to the home page
      </Link>
    </section>
  )
}
