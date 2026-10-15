import { MetadataRoute } from 'next'

import { DATA_PACK } from '@/config/dataPack'
import { legal } from '@/config/legal'
import { MCP_PAGE_PATH } from '@/config/mcp'
import { siteConfig } from '@/config/site'
import { LEGAL_PAIRS } from '@/lib/seo/alternates'

const absolute = (path: string) =>
  new URL(path, siteConfig.landing_url).toString()

/**
 * The day the content of these pages last changed: update it with the page.
 * Google stops reading a lastmod that moves at every deploy.
 */
const HOME_UPDATED = '2026-10-13'
const DATA_PACK_UPDATED = '2026-10-13'
const MCP_UPDATED = '2026-10-15'

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

  return [
    { url: absolute('/'), lastModified: HOME_UPDATED },
    { url: absolute(DATA_PACK.path), lastModified: DATA_PACK_UPDATED },
    { url: absolute(MCP_PAGE_PATH), lastModified: MCP_UPDATED },
    ...legalPages
  ]
}
