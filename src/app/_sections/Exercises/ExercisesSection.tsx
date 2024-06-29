import React, { Suspense, useMemo } from 'react'

import LoadingExercise from './loading'

import ExercisesSearchInput from '@/app/_sections/Exercises/Components/SearchInput'
import ExerciseCard from '@/app/_sections/Exercises/Components/Card/Card'
import { SearchParamsHome } from '@/types/home/SearchParams'

export default async function ExercisesSection({
  searchParams
}: {
  searchParams: SearchParamsHome
}) {
  const exerciseId = useMemo(() => {
    return searchParams.exerciseId
  }, [searchParams])

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <ExercisesSearchInput />
      </div>
      <div className="w-full pt-28">
        <Suspense key={exerciseId} fallback={<LoadingExercise />}>
          <ExerciseCard exerciseId={exerciseId} />
        </Suspense>
      </div>
    </section>
  )
}
