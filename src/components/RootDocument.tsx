import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Providers } from '@/components/Providers'

import { siteConfig } from '@/config/site'
import { fontBrand, fontCode } from '@/config/fonts'
import { AnnouncementBar } from '@/app/_landing/AnnouncementBar'
import { Footer } from '@/app/_landing/Footer'
import { Nav } from '@/app/_landing/Nav'
import { MainFrame, SiteChrome } from '@/components/SiteChrome'
import { sharedOpenGraph } from '@/lib/seo/metadata'

export const rootMetadata: Metadata = {
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
  // Each indexed page sets its own title, description and URL
  openGraph: sharedOpenGraph,
  // Without a title or a description, X reads the Open Graph ones
  twitter: {
    card: 'summary_large_image',
    site: '@BastienCrct',
    images: ['/og-image.png']
  }
}

export const rootViewport: Viewport = {
  themeColor: '#0E1116'
}

/**
 * The document of every page. The English and the French pages have their own
 * root layout, so the html element carries the language of the page.
 */
export function RootDocument({
  lang,
  children
}: {
  lang: 'en' | 'fr'
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang={lang}>
      <head />

      <body
        className={clsx(
          'min-h-screen bg-ink font-brand text-white antialiased',
          fontBrand.variable,
          fontCode.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          {/* The sign-in pages and the dashboard draw their own */}
          <SiteChrome>
            <AnnouncementBar />
            <Nav />
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
