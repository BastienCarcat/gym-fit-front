import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import Navbar from '@/app/_sections/Navbar/Navbar'
import Footer from '@/app/_sections/Footer/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.landing_url),
  title: {
    default: siteConfig.default_title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.default_title,
    description: siteConfig.description,
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'GymFit API logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BastienCrct',
    title: siteConfig.default_title,
    description: siteConfig.description,
    images: ['/logo.png']
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <Navbar />
          {/*className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 from-30% via-indigo-600 to-slate-900 to-80%"*/}
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
