import { ReactNode } from 'react'
import Link from 'next/link'
import { legal } from '@/config/legal'

export function LegalPage({
  title,
  lang = 'en',
  alternate,
  children
}: {
  title: string
  lang?: 'en' | 'fr'
  /** The same page in the other language */
  alternate: string
  children: ReactNode
}) {
  return (
    <div lang={lang} className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-sm">
          <TextLink href={alternate}>
            {lang === 'fr' ? 'English version' : 'Version française'}
          </TextLink>
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 font-code text-xs uppercase tracking-wide text-steel">
          {lang === 'fr'
            ? `Dernière mise à jour : ${legal.updatedFr}`
            : `Last updated: ${legal.updated}`}
        </p>
        <div className="mt-12 space-y-12 text-base leading-7 text-steel-light [&_strong]:text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Section({
  title,
  children
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-ink-700 pt-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-volt">{children}</ul>
  )
}

export function TextLink({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="font-medium text-white underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
      {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
    >
      {children}
    </Link>
  )
}

export function ContactEmail() {
  return <TextLink href={`mailto:${legal.email}`}>{legal.email}</TextLink>
}
