import React from 'react'
import { Metadata } from 'next'

import { Alternative } from './_landing/Alternative'
import { Bento } from './_landing/Bento'
import { Faq } from './_landing/Faq'
import { FinalCta } from './_landing/FinalCta'
import { Footer } from './_landing/Footer'
import { Hero } from './_landing/Hero'
import { Nav } from './_landing/Nav'
import { Pricing } from './_landing/Pricing'
import { Proof } from './_landing/Proof'
import { Quickstart } from './_landing/Quickstart'
import { UseCases } from './_landing/UseCases'

import { JsonLd } from '@/components/seo/JsonLd'
import { homeStructuredData } from '@/lib/seo/structured-data'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

/** The landing is one dark page, with its own navigation and footer */
export default function HomePage() {
  return (
    <div className="landing-dark bg-ink font-brand text-white">
      <JsonLd data={homeStructuredData()} />
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Bento />
        <Quickstart />
        <UseCases />
        <Alternative />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
