import React from 'react'
import { Metadata } from 'next'

import { Bento } from '@/app/_landing/Bento'
import { Faq } from '@/app/_landing/Faq'
import { FinalCta } from '@/app/_landing/FinalCta'
import { Hero } from '@/app/_landing/Hero'
import { Pricing } from '@/app/_landing/Pricing'
import { Proof } from '@/app/_landing/Proof'
import { Quickstart } from '@/app/_landing/Quickstart'
import { UseCases } from '@/app/_landing/UseCases'

import { JsonLd } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { sharedOpenGraph } from '@/lib/seo/metadata'
import { homeStructuredData } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    ...sharedOpenGraph,
    title: siteConfig.default_title,
    description: siteConfig.description,
    url: '/',
    locale: 'en_US'
  }
}

/** The root layout draws the navigation and the footer */
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <Hero />
      <Proof />
      <Bento />
      <Quickstart />
      <UseCases />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  )
}
