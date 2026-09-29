import React from 'react'
import { Metadata } from 'next'

import Features from './_sections/Features/Features'
import FAQ from './_sections/FAQ/FAQ'

import Pricing from '@/app/_sections/Pricing/Pricing'
import HeroSection from '@/app/_sections/Hero/Hero'
import { JsonLd } from '@/components/seo/JsonLd'
import { homeStructuredData } from '@/lib/seo/structured-data'
// import FAQSection from '@/app/_sections/FAQ/FAQSection'
// import RapidAPISection from '@/app/_sections/RapidAPI/RapidAPISection'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <HeroSection />
      <Features />
      {/* <ExercisesSection searchParams={searchParams} />
      <RapidAPISection /> */}
      <Pricing />
      <FAQ />
    </>
  )
}
