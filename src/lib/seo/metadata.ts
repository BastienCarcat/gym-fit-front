import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { legalAlternates } from '@/lib/seo/alternates'

/**
 * Sharing tags of every page. A page that sets its own `openGraph` replaces
 * the whole object, so it starts from this one.
 */
export const sharedOpenGraph = {
  type: 'website',
  siteName: siteConfig.name,
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'GymFit API, the exercise API for fitness apps'
    }
  ]
} satisfies Metadata['openGraph']

interface PageDetails {
  path: string
  title: string
  description: string
  lang?: 'en' | 'fr'
}

/** An indexed page: its own description, canonical and sharing tags */
export function pageMetadata({
  path,
  title,
  description,
  lang = 'en'
}: PageDetails): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US'
    }
  }
}

/** A legal page, which also points to its translation */
export function legalMetadata(page: PageDetails): Metadata {
  return { ...pageMetadata(page), alternates: legalAlternates(page.path) }
}
