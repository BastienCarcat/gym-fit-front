import { Metadata } from 'next'

/** The page is a client component: its title is set here */
export const metadata: Metadata = { title: 'Connect an AI assistant' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
