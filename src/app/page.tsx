import React from 'react'

import PricingSection from '@/app/_sections/Pricing/PricingSection'
import CTASection from '@/app/_sections/Hero/HeroSection'
import ExercisesSection from '@/app/_sections/Exercises/ExercisesSection'
import { SearchParamsHome } from '@/types/home/SearchParams'
// import FAQSection from '@/app/_sections/FAQ/FAQSection'
// import RapidAPISection from '@/app/_sections/RapidAPI/RapidAPISection'
import FeaturesSection from './_sections/Features/Features'

export default function HomePage({
  searchParams
}: {
  searchParams: SearchParamsHome
}) {
  return (
    <>
      <CTASection />
      <FeaturesSection />
      {/* <ExercisesSection searchParams={searchParams} />
      <RapidAPISection />
      <PricingSection />
      <FAQSection /> */}
    </>
  )
}
