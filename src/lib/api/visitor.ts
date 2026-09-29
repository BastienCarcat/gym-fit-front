export const CLIENT_IP_HEADER = 'x-gymfit-client-ip'
export const FRONTEND_PROXY_SECRET_HEADER = 'x-gymfit-proxy-secret'

/**
 * Headers telling the API who the visitor is. This site calls the API from
 * Vercel: without them, every visitor would share Vercel's IP and the API
 * rate limits would apply to all of them at once. Vercel sets x-real-ip and
 * x-forwarded-for itself and overwrites any value sent by the browser; the
 * shared secret lets the API trust the IP. Runs on the edge (middleware).
 */
export function visitorHeaders(incoming: Headers): Record<string, string> {
  const ip =
    incoming.get('x-real-ip') ??
    incoming.get('x-forwarded-for')?.split(',')[0]?.trim()
  const secret = process.env.FRONTEND_PROXY_SECRET

  return ip && secret
    ? { [CLIENT_IP_HEADER]: ip, [FRONTEND_PROXY_SECRET_HEADER]: secret }
    : {}
}
