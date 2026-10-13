import { Reveal } from './Reveal'

export function Alternative() {
  return (
    <section
      aria-labelledby="alternative-title"
      className="border-y border-ink-700 bg-ink-900"
    >
      <Reveal className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2
          className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          id="alternative-title"
        >
          Looking for an ExerciseDB alternative?
        </h2>
        <p className="mt-4 text-steel-light">
          GymFit API is a direct service. Create an account, get your key and
          start on the free plan, no credit card. Each exercise comes with its
          muscles on three levels, steps, variations and progressions, and the
          fitness calculators are included.
        </p>
      </Reveal>
    </section>
  )
}
