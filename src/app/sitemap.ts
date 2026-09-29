import { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { LEGAL_PAIRS } from '@/lib/seo/alternates'

const absolute = (path: string) =>
  new URL(path, siteConfig.landing_url).toString()

export default function sitemap(): MetadataRoute.Sitemap {
  const legalPages = LEGAL_PAIRS.flatMap((pair) => {
    const languages = {
      en: absolute(pair.en),
      fr: absolute(pair.fr),
      'x-default': absolute(pair.en)
    }

    return [pair.en, pair.fr].map((path) => ({
      url: absolute(path),
      alternates: { languages }
    }))
  })

  return [{ url: absolute('/') }, ...legalPages]
}
