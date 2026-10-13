import { Reveal } from './Reveal'

/** The size of the catalog, also shown on the data pack page */
export const CATALOG_FIGURES = [
  { value: '5,800', label: 'exercises' },
  { value: '49', label: 'muscles in 21 groups' },
  { value: '33', label: 'types of equipment' },
  { value: '136', label: 'movement families' }
]

export function Proof() {
  return (
    <section
      aria-labelledby="proof-title"
      className="border-y border-ink-700 bg-ink-900"
    >
      <Reveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          id="proof-title"
        >
          An exercise database built for developers
        </h2>
        <dl className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {CATALOG_FIGURES.map((figure) => (
            <div key={figure.label} className="border-l-2 border-volt pl-4">
              <dt className="sr-only">{figure.label}</dt>
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {figure.value}
                <span className="mt-1 block font-code text-xs font-normal uppercase tracking-wide text-steel">
                  {figure.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-steel-light">
          Used by 1,600+ developers.
        </p>
      </Reveal>
    </section>
  )
}
