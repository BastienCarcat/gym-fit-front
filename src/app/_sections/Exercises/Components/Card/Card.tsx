import React, { use } from 'react'
import { Divider } from '@nextui-org/react'
import _ from 'lodash'

import ExerciseList, { ExerciseSearch } from './ExerciseList'

import fetchApi from '@/tools/fetchApi'
import { ClockIcon } from '@heroicons/react/24/outline'

type Muscle = {
  heads: string[]
  name: string
  group: string | null
}

type Instruction = {
  order: number
  description: string
}

type Exercise = {
  name: string
  bodyPart: string
  muscles: Record<string, Muscle[]>
  alternatives: ExerciseSearch[]
  variations: ExerciseSearch[]
  instructions: Instruction[]
}

const DEFAULT_EXERCISE_ID = 'c2b6fccf-2c2c-43e1-aca3-a3cb73caa78b' // Id for Bench Press

export default function ExerciseCard({ exerciseId }: { exerciseId?: string }) {
  const exercise = use(getExercise(exerciseId))

  const getMuscles = (muscles: Muscle[]) => {
    return _.chain(muscles)
      .map((muscle) => muscle.name)
      .join(', ')
      .value()
  }

  return (
    <div className="flex h-[550px] flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-start gap-2">
        <div className="flex flex-1 flex-col">
          <div className="flex items-end gap-3">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="text-lg font-semibold text-gray-500">
              {exercise.bodyPart}
            </p>
          </div>

          <div className="mt-1 text-xs text-gray-900">
            {_.get(exercise, 'muscles.Target.length') > 0 && (
              <div className="flex items-start gap-1">
                <div className="text-nowrap font-bold">Target :</div>
                <div>{getMuscles(_.get(exercise, 'muscles.Target'))}</div>
              </div>
            )}

            {_.get(exercise, 'muscles.Synergist.length') > 0 && (
              <div className="flex items-start gap-1">
                <div className="text-nowrap font-bold">Synergist :</div>
                <div>{getMuscles(_.get(exercise, 'muscles.Synergist'))}</div>
              </div>
            )}

            {_.get(exercise, 'muscles.Stabilizer.length') > 0 && (
              <div className="flex items-start gap-1">
                <div className="text-nowrap font-bold">Stabilizer :</div>
                <div>{getMuscles(_.get(exercise, 'muscles.Stabilizer'))}</div>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-md border border-sky-300 bg-sky-100 p-1 text-center text-xs text-sky-600">
          <div>Exercise video</div>
          <div className="inline-flex">
            <ClockIcon className="mr-1 h-4 w-4" />
            coming soon
          </div>
        </div>
      </div>

      <Divider className="my-2" />
      <div className="flex flex-col-reverse gap-6 overflow-hidden md:h-full md:flex-row">
        <div className="hidden w-48 flex-col md:flex">
          <span className="text-lg font-bold">Alternatives</span>
          <div className="min-h-[50%] flex-1 overflow-auto">
            {exercise.alternatives.length > 0 ? (
              <ExerciseList exercises={exercise.alternatives} />
            ) : (
              <div className="py-3 text-center text-gray-500">
                No alternatives
              </div>
            )}
          </div>

          <span className="pt-3 text-lg font-bold">Variations</span>
          <div className="overflow-auto">
            {exercise.variations.length > 0 ? (
              <ExerciseList exercises={exercise.variations} />
            ) : (
              <div className="py-3 text-center text-gray-500">
                No variations
              </div>
            )}
          </div>
        </div>

        <div className="flex max-h-[174px] gap-x-3 overflow-auto md:hidden">
          <div className="flex-1 overflow-auto">
            <span className="text-lg font-bold">Alternatives</span>
            {exercise.alternatives.length > 0 ? (
              <ExerciseList exercises={exercise.alternatives} />
            ) : (
              <div className="py-3 text-center text-gray-500">
                No alternatives
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto">
            <span className="text-lg font-bold">Variations</span>
            {exercise.variations.length > 0 ? (
              <ExerciseList exercises={exercise.variations} />
            ) : (
              <div className="py-3 text-center text-gray-500">
                No variations
              </div>
            )}
          </div>
        </div>

        <div
          className="h-divider w-full shrink-0 border-none bg-divider md:mt-5 md:h-auto md:w-divider"
          role="separator"
        />
        <div className="max-h-52 flex-1 overflow-auto md:max-h-none">
          <div className="text-lg font-bold">Instructions</div>

          <div className="p-3">
            <ul>
              {exercise.instructions.map(
                (instruction: Instruction, index: number) => (
                  <li key={index} className="pb-8 last:pb-0">
                    <div className="relative">
                      {index + 1 !== exercise.instructions.length && (
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        />
                      )}

                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white">
                            <div className="text-md flex h-5 w-5 items-center justify-center font-medium text-white">
                              {instruction.order}
                            </div>
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {instruction.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

async function getExercise(
  exerciseId: string = DEFAULT_EXERCISE_ID
): Promise<Exercise> {
  // TODO: type from api
  const exercise = await fetchApi(`v1/exercises/${exerciseId}`)
  return exercise
}
