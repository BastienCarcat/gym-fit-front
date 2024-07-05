import React from 'react'

import PricingSection from './_sections/Pricing/PricingSection'

import CTASection from '@/app/_sections/Hero/HeroSection'
import ExercisesSection from '@/app/_sections/Exercises/ExercisesSection'
import { SearchParamsHome } from '@/types/home/SearchParams'

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
    </>
  )
}
