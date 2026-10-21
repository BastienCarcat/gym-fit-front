'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { answerConsent, useConsent } from '@/lib/analytics'

const COPY = {
  en: {
    label: 'Cookies',
    text: 'May we use cookies to see how GymFit is used? With your consent, PostHog records the pages you visit, your clicks and your session, so we can improve the site. Without it, we only count anonymous visits, without cookies.',
    privacy: 'Privacy policy',
    privacyHref: '/privacy',
    decline: 'Decline',
    accept: 'Accept'
  },
  fr: {
    label: 'Cookies',
    text: 'Pouvons-nous utiliser des cookies pour voir comment GymFit est utilisé ? Avec votre accord, PostHog enregistre les pages que vous visitez, vos clics et votre session, pour nous aider à améliorer le site. Sans lui, nous comptons seulement des visites anonymes, sans cookies.',
    privacy: 'Politique de confidentialité',
    privacyHref: '/fr/confidentialite',
    decline: 'Refuser',
    accept: 'Accepter'
  }
}

/**
 * Asked once, until the visitor answers or reopens it from the footer. Both
 * answers carry the same weight, as the CNIL requires.
 */
export function CookieBanner({ lang }: { lang: 'en' | 'fr' }) {
  const consent = useConsent()

  if (consent !== 'pending') {
    return null
  }

  const copy = COPY[lang]

  return (
    <section
      aria-label={copy.label}
      className="fixed inset-x-4 bottom-4 z-50 rounded-[14px] border border-ink-700 bg-ink-800 p-5 shadow-2xl sm:left-6 sm:right-auto sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-steel-light">
        {copy.text}{' '}
        <Link
          className="text-white underline underline-offset-4 hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
          href={copy.privacyHref}
        >
          {copy.privacy}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => answerConsent(false)}>
          {copy.decline}
        </Button>
        <Button variant="outline" onClick={() => answerConsent(true)}>
          {copy.accept}
        </Button>
      </div>
    </section>
  )
}
