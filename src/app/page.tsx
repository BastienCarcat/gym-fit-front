import React from 'react'

import Features from './_sections/Features/Features'
import FAQ from './_sections/FAQ/FAQ'

import Pricing from '@/app/_sections/Pricing/Pricing'
import HeroSection from '@/app/_sections/Hero/Hero'
// import FAQSection from '@/app/_sections/FAQ/FAQSection'
// import RapidAPISection from '@/app/_sections/RapidAPI/RapidAPISection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
      {/* <ExercisesSection searchParams={searchParams} />
      <RapidAPISection /> */}
      <Pricing />
      <FAQ />
    </>
  )
}
