'use client'
import type { ExerciseSearch } from '@/types/exercise/ExerciseSearch'

import React, { Key, useCallback, useEffect, useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ExercisesSearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [exercises, setExercises] = useState([] as ExerciseSearch[])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(
    searchParams.get('exerciseId') || 'c2b6fccf-2c2c-43e1-aca3-a3cb73caa78b'
  )

  const handleChangeInput = useDebouncedCallback(
    useCallback(async (value: string) => {
      setIsLoading(true)
      const res = await fetch(
        `/api/exercises/search?${new URLSearchParams({ query: value })}`
      )
      const { exercises } = await res.json()

      setExercises(exercises.results)
      setIsLoading(false)
    }, []),
    300
  )

  const handleSelect = useCallback(
    (key: Key) => {
      if (key) {
        key = key.toString()
        setSelectedExercise(key)
        const params = new URLSearchParams(searchParams)

        params.set('exerciseId', key)

        replace(`${pathname}?${params.toString()}`, { scroll: false })
      }
    },
    [replace, searchParams, pathname]
  )

  return (
    <Autocomplete
      allowsCustomValue
      aria-label="Search for an exercise"
      defaultItems={exercises}
      isLoading={isLoading}
      selectedKey={selectedExercise}
      startContent={
        <MagnifyingGlassIcon className="h-5 w-5 text-default-400" />
      }
      variant="bordered"
      onInputChange={handleChangeInput}
      onSelectionChange={handleSelect}
      placeholder="Search for an exercise"
      // endContent={<Kbd keys={['command']}>K</Kbd>}
      radius="md"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
