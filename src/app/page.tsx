import React from 'react'

import Pricing from '@/app/_sections/Pricing/Pricing'
import HeroSection from '@/app/_sections/Hero/Hero'
import { SearchParamsHome } from '@/types/home/SearchParams'
// import FAQSection from '@/app/_sections/FAQ/FAQSection'
// import RapidAPISection from '@/app/_sections/RapidAPI/RapidAPISection'
import Features from './_sections/Features/Features'
import FAQ from './_sections/FAQ/FAQ'

export default function HomePage({
  searchParams
}: {
  searchParams: SearchParamsHome
}) {
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
