import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

/**
 * A route rather than robots.ts: Next's robots format has no field for the
 * Content-Signal line (https://contentsignals.org). The site wants to be
 * indexed, quoted in AI answers and known to the models.
 */
export function GET() {
  const body = `# Content signals (https://contentsignals.org): search engines may index
# this site, AI assistants may use it in their answers, models may train on it.
User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /dashboard
Disallow: /api/

Sitemap: ${new URL('/sitemap.xml', siteConfig.landing_url).toString()}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
