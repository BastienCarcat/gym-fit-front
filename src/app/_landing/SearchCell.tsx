'use client'

import { useEffect, useRef, useState } from 'react'

const EXAMPLES: Record<string, { name: string; equipment: string }[]> = {
  '': [
    { name: 'Bench Press (Barbell)', equipment: 'Barbell' },
    { name: 'Squat (Barbell)', equipment: 'Barbell' },
    { name: 'Deadlift (Barbell)', equipment: 'Barbell' }
  ],
  rdl: [
    { name: 'Romanian Deadlift (Barbell)', equipment: 'Barbell' },
    { name: 'Romanian Deadlift (Dumbbell)', equipment: 'Dumbbell' },
    { name: 'Romanian Deadlift (Kettlebell)', equipment: 'Kettlebell' }
  ],
  'bech press': [
    { name: 'Bench Press (Barbell)', equipment: 'Barbell' },
    { name: 'Bench Press (Dumbbell)', equipment: 'Dumbbell' },
    { name: 'Bench Press (Smith Machine)', equipment: 'SmithMachine' }
  ],
  quads: [
    { name: 'Squat (Barbell)', equipment: 'Barbell' },
    { name: 'Leg Press', equipment: 'Machine' },
    { name: 'Lunge', equipment: 'Bodyweight' }
  ]
}

const QUERIES = ['rdl', 'bech press', 'quads']

/** A search field with real examples: hovering types the first one */
export function SearchCell() {
  const [query, setQuery] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    return () => clearTimeout(timer.current)
  }, [])

  const type = (target: string) => {
    clearTimeout(timer.current)
    if (reduced.current) {
      setQuery(target)
      return
    }

    let index = 0
    const step = () => {
      index += 1
      setQuery(target.slice(0, index))
      if (index < target.length) timer.current = setTimeout(step, 90)
    }

    step()
  }

  const results = EXAMPLES[query] ?? EXAMPLES['']

  return (
    <div className="mt-5" onMouseEnter={() => query === '' && type(QUERIES[0])}>
      <div className="flex h-11 items-center rounded-[10px] border border-ink-700 bg-ink px-3 font-code text-sm">
        <span aria-hidden className="mr-2 text-steel">
          /v2/exercises/search?query=
        </span>
        <span className="text-white">{query}</span>
        {query === '' && <span className="text-steel">rdl</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUERIES.map((example) => (
          <button
            key={example}
            className={`rounded-[10px] border px-3 py-1.5 font-code text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
              query === example
                ? 'border-volt text-volt'
                : 'border-ink-700 text-steel-light hover:border-steel'
            }`}
            type="button"
            onClick={() => type(example)}
          >
            {example}
          </button>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-ink-700 rounded-[10px] border border-ink-700">
        {results.map((result) => (
          <li
            key={result.name}
            className="flex items-center justify-between gap-3 px-3 py-2.5"
          >
            <span className="text-sm text-white">{result.name}</span>
            <span className="rounded-[10px] border border-ink-700 px-2 py-0.5 font-code text-xs text-steel">
              {result.equipment}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
