/** Only same-site paths, to avoid open redirects after sign-in */
export function safeRedirect(path: string | null, fallback = '/dashboard') {
  return path && path.startsWith('/') && !path.startsWith('//')
    ? path
    : fallback
}
