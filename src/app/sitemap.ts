import { MetadataRoute } from 'next'

import { DATA_PACK } from '@/config/dataPack'
import { legal } from '@/config/legal'
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
      lastModified: legal.updatedIso,
      alternates: { languages }
    }))
  })

  // Built at each deploy, which is when the home page changes
  return [
    { url: absolute('/'), lastModified: new Date() },
    { url: absolute(DATA_PACK.path), lastModified: new Date() },
    ...legalPages
  ]
}
