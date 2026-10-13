'use client'

import { usePathname } from 'next/navigation'

/** Shows its children everywhere but on the landing, which draws its own */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return <>{children}</>
}

/** The page content in a main landmark; the landing draws its own */
export function MainFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/') {
    return <>{children}</>
  }

  return <main>{children}</main>
}
