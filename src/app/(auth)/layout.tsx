import { Metadata } from 'next'
import { ReactNode } from 'react'

/** Sign-in pages have nothing to rank for */
export const metadata: Metadata = { robots: { index: false } }

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
