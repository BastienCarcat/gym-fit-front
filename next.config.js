/** @type {import('next').NextConfig} */
const nextConfig = {
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
