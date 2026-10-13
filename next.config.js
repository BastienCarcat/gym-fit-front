// The URLs of src/config/site.ts, which this CommonJS file cannot import
const API_URL = 'https://api.gymfit-api.com'

const HOME_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  `<${API_URL}/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"`,
  `<${API_URL}/docs>; rel="service-doc"; type="text/html"`,
  `<${API_URL}/docs.md>; rel="service-doc"; type="text/markdown"`,
  '</llms.txt>; rel="describedby"; type="text/plain"'
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Image optimizer URLs got indexed as if they were pages
      {
        source: '/_next/image',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }]
      },
      // Points agents to the API catalog, the spec and the docs (RFC 8288)
      {
        source: '/',
        headers: [{ key: 'Link', value: HOME_LINKS.join(', ') }]
      }
    ]
  },
  // Auth goes through this site's domain so the session cookie is first-party
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.GYM_FIT_BASE_URL}/api/auth/:path*`
      }
    ]
  }
}

module.exports = nextConfig
