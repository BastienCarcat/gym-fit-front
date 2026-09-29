/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimizer URLs got indexed as if they were pages
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }]
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
