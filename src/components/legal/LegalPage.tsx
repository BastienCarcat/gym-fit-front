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
    <div lang={lang} className="bg-white px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-6 text-sm">
          <TextLink href={alternate}>
            {lang === 'fr' ? 'English version' : 'Version française'}
          </TextLink>
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-gray-500">
          {lang === 'fr'
            ? `Dernière mise à jour : ${legal.updatedFr}`
            : `Last updated: ${legal.updated}`}
        </p>
        <div className="mt-10 space-y-10 text-base leading-7 text-gray-700">
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
    <section>
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6">{children}</ul>
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
      className="font-medium text-blue-600 hover:text-blue-800"
      {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
    >
      {children}
    </Link>
  )
}

export function ContactEmail() {
  return <TextLink href={`mailto:${legal.email}`}>{legal.email}</TextLink>
}
