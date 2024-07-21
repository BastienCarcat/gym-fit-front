'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export type ExerciseSearch = {
  name: string
  id: string
}

export default function ExerciseList({
  exercises
}: {
  exercises: ExerciseSearch[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSelect = useCallback(
    (exerciseId: string) => {
      const params = new URLSearchParams(searchParams)

      params.set('exerciseId', exerciseId)

      replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [replace, searchParams, pathname]
  )

  return (
    <>
      {exercises.map((exercise) => (
        <button
          key={exercise.id}
          className="w-full rounded-md px-2 py-[2px] text-start text-sm hover:bg-gray-100"
          onClick={() => handleSelect(exercise.id)}
        >
          {exercise.name}
        </button>
      ))}
    </>
  )
}
