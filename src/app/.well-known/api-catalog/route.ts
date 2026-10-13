import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

const absolute = (path: string) =>
  new URL(path, siteConfig.landing_url).toString()

/** API catalog for agents and API directories (RFC 9727) */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${siteConfig.api_url}/`,
        'service-desc': [
          {
            href: `${siteConfig.api_url}/openapi.json`,
            type: 'application/vnd.oai.openapi+json'
          }
        ],
        'service-doc': [
          { href: siteConfig.documentation_url, type: 'text/html' }
        ],
        status: [
          { href: `${siteConfig.api_url}/v1/health`, type: 'application/json' }
        ],
        'terms-of-service': [{ href: absolute('/terms'), type: 'text/html' }]
      }
    ]
  }

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type':
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      Link: `<${absolute('/.well-known/api-catalog')}>; rel="api-catalog"`
    }
  })
}
