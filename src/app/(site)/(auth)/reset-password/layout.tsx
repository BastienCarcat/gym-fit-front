import { Metadata } from 'next'

/** The page is a client component: its title is set here */
export const metadata: Metadata = { title: 'Choose a new password' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
