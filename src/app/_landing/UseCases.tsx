import { Reveal } from './Reveal'

const CASES = [
  {
    title: 'Workout trackers',
    text: 'Log sets and show the muscles each session worked, from the target and secondary muscles of every exercise.'
  },
  {
    title: 'Muscle heatmaps',
    text: 'Count the weekly volume per muscle group, or draw the heatmap of a session with the SVG of each exercise.'
  },
  {
    title: 'AI workout generators',
    text: 'Give your model structured exercises, muscles, variations and alternatives instead of free text.'
  },
  {
    title: 'Coaching platforms',
    text: 'An exercise library with steps, tips, common mistakes and progressions for your clients.'
  }
]

export function UseCases() {
  return (
    <section
      aria-labelledby="usecases-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <Reveal>
        <h2
          className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          id="usecases-title"
        >
          What developers build with GymFit API
        </h2>
        <dl className="mt-10 divide-y divide-ink-700 border-y border-ink-700">
          {CASES.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 py-6 sm:grid-cols-[16rem_1fr] sm:gap-8"
            >
              <dt className="text-lg font-bold text-white">{item.title}</dt>
              <dd className="text-steel-light">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
