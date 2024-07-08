import React from 'react'

import PricingSection from '@/app/_sections/Pricing/PricingSection'
import CTASection from '@/app/_sections/Hero/HeroSection'
import ExercisesSection from '@/app/_sections/Exercises/ExercisesSection'
import { SearchParamsHome } from '@/types/home/SearchParams'
import FAQSection from '@/app/_sections/FAQ/FAQSection'

export default function HomePage({
  searchParams
}: {
  searchParams: SearchParamsHome
}) {
  return (
    <>
      <CTASection />
      <ExercisesSection searchParams={searchParams} />
      <PricingSection />
      <FAQSection />
    </>
  )
}
