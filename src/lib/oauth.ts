/**
 * An AI assistant sends the visitor to the sign-in and consent pages with a
 * signed query (client_id, scope, sig...): the pages pass it back to the API.
 */
export function isOAuthRequest(params: URLSearchParams): boolean {
  return params.has('client_id') && params.has('sig')
}

/**
 * After a sign-in or a consent of the OAuth flow, the API answers with the
 * next page: the consent screen, or the assistant itself with its code.
 */
export function followOAuthRedirect(data: unknown): boolean {
  const next = data as { redirect?: boolean; url?: string } | null

  if (next?.redirect && next.url) {
    window.location.assign(next.url)

    return true
  }

  return false
}
