'use client'

import { usePathname } from 'next/navigation'

/** The pages that draw their own navigation and footer */
const OWN_CHROME = ['/login', '/signup', '/forgot-password', '/reset-password']

function drawsOwnChrome(pathname: string | null): boolean {
  return (
    pathname !== null &&
    (OWN_CHROME.includes(pathname) || pathname.startsWith('/dashboard'))
  )
}

/** Shows its children everywhere but on the pages that draw their own */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (drawsOwnChrome(pathname)) {
    return null
  }

  return <>{children}</>
}

/** The page content in a main landmark; the pages with their own chrome draw it */
export function MainFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (drawsOwnChrome(pathname)) {
    return <>{children}</>
  }

  return <main>{children}</main>
}
