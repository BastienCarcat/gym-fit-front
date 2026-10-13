import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontBrand, fontCode, fontSans } from '@/config/fonts'
import Navbar from '@/app/_sections/Navbar/Navbar'
import Footer from '@/app/_sections/Footer/Footer'
import { MainFrame, SiteChrome } from '@/components/SiteChrome'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.landing_url),
  title: {
    default: siteConfig.default_title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.default_title,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GymFit API, the exercise API for fitness apps'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BastienCrct',
    title: siteConfig.default_title,
    description: siteConfig.description,
    images: ['/og-image.png']
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
          fontSans.variable,
          fontBrand.variable,
          fontCode.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          {/* The landing has its own navigation and footer */}
          <SiteChrome>
            <Navbar />
          </SiteChrome>
          <MainFrame>{children}</MainFrame>
          <SiteChrome>
            <Footer />
          </SiteChrome>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
