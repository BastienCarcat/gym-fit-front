import { Reveal } from './Reveal'
import { SearchCell } from './SearchCell'

const cell =
  'group rounded-[14px] border border-ink-700 bg-ink-900 p-6 transition-colors hover:border-steel'

function Chip({
  children,
  tone = 'plain'
}: {
  children: React.ReactNode
  tone?: 'plain' | 'volt'
}) {
  return (
    <span
      className={`inline-block rounded-[10px] border px-3 py-1.5 font-code text-xs transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none ${
        tone === 'volt'
          ? 'border-volt bg-volt font-bold text-ink'
          : 'border-ink-700 bg-ink text-steel-light'
      }`}
    >
      {children}
    </span>
  )
}

export function Bento() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      id="features"
    >
      <Reveal>
        <h2
          className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          id="features-title"
        >
          Everything your fitness app needs in one API
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-6">
          <div className={`${cell} lg:col-span-4`}>
            <h3 className="text-lg font-bold text-white">
              A search that reads what people type
            </h3>
            <p className="mt-2 text-sm text-steel-light">
              Typos, abbreviations, plural forms and muscles named in plain
              words: <span className="font-code">rdl</span>,{' '}
              <span className="font-code">bech press</span>,{' '}
              <span className="font-code">quads</span>. Results are ranked by
              relevance, then by how often the exercise is done.
            </p>
            <SearchCell />
          </div>

          <div className="rounded-[14px] bg-volt p-6 text-ink lg:col-span-2">
            <h3 className="text-lg font-extrabold">
              A muscle heatmap for every exercise
            </h3>
            <p className="mt-2 text-sm font-medium">
              One SVG, front and back, with the target and secondary muscles
              colored. Set the colors to match your app.
            </p>
            <div className="mt-4 rounded-[14px] bg-ink p-3">
              <img
                alt="Muscle heatmap of the bench press: pectorals highlighted, shoulders and triceps in a lighter shade"
                className="mx-auto h-56 w-full object-contain"
                height={224}
                loading="lazy"
                src="/heatmaps/bench-press-barbell.svg"
                width={300}
              />
            </div>
            <p className="mt-3 font-code text-xs font-bold">
              GET /v2/exercises/{'{id}'}/heatmap
            </p>
          </div>

          <div className={`${cell} lg:col-span-2`}>
            <h3 className="text-lg font-bold text-white">
              Muscles on three levels
            </h3>
            <p className="mt-2 text-sm text-steel-light">
              21 groups, 49 muscles and their heads, each with the name people
              use.
            </p>
            <ul className="mt-5 space-y-2 font-code text-xs">
              <li className="text-white">
                <span className="text-steel">group</span> Chest
              </li>
              <li className="pl-4 text-white">
                <span className="text-steel">muscle</span> Pectoralis major
                <span className="text-steel"> (Pecs)</span>
              </li>
              <li className="pl-8 text-volt opacity-70 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
                <span className="text-steel">head</span> Clavicular (Upper)
              </li>
              <li className="pl-8 text-volt opacity-70 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
                <span className="text-steel">head</span> Sternal (Lower)
              </li>
            </ul>
          </div>

          <div className={`${cell} lg:col-span-2`}>
            <h3 className="text-lg font-bold text-white">
              Variations, alternatives and progressions
            </h3>
            <p className="mt-2 text-sm text-steel-light">
              Offer a variation, an alternative when the machine is taken, or an
              easier and a harder version.
            </p>
            <div className="mt-5 space-y-3">
              <Chip tone="volt">Squat (Barbell)</Chip>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-24 font-code text-xs text-steel">
                  variations
                </span>
                <Chip>Front Squat (Barbell)</Chip>
                <Chip>Box Squat (Barbell)</Chip>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-24 font-code text-xs text-steel">
                  alternatives
                </span>
                <Chip>Air Squat</Chip>
                <Chip>Lunge</Chip>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-24 font-code text-xs text-steel">
                  easier
                </span>
                <Chip>Air Squat</Chip>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-24 font-code text-xs text-steel">
                  harder
                </span>
                <Chip>Overhead Squat (Barbell)</Chip>
              </div>
            </div>
          </div>

          <div className={`${cell} lg:col-span-2`}>
            <h3 className="text-lg font-bold text-white">
              Fitness calculators
            </h3>
            <p className="mt-2 text-sm text-steel-light">
              BMI, BMR, TDEE and ideal body weight, one request each.
            </p>
            <p className="mt-4 font-code text-xs text-steel">
              male, 180 cm, 78 kg, 25 years, active
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {[
                ['BMI', '24.1'],
                ['BMR', '1,785 kcal'],
                ['TDEE', '2,927 kcal'],
                ['Ideal weight', '75.1 kg']
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[10px] border border-ink-700 bg-ink p-3 transition-colors group-hover:border-volt motion-reduce:transition-none"
                >
                  <dt className="font-code text-xs text-steel">{label}</dt>
                  <dd className="mt-1 text-lg font-extrabold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
