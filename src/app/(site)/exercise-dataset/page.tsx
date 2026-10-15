import Link from 'next/link'
import { IconCheck, IconMinus } from '@tabler/icons-react'

import { JsonCode } from '@/app/_landing/JsonCode'
import { CATALOG_FIGURES } from '@/app/_landing/Proof'
import { JsonLd } from '@/components/seo/JsonLd'
import { buttonVariants } from '@/components/ui/button'
import { DATA_PACK } from '@/config/dataPack'
import { PLANS } from '@/config/plans'
import { formatNumber } from '@/lib/format'
import { pageMetadata } from '@/lib/seo/metadata'

import { SQUAT_RECORD } from './squatRecord'
import { dataPackStructuredData } from '@/lib/seo/structured-data'

const SUMMARY = `The whole GymFit catalog as files you keep: ${CATALOG_FIGURES[0].value} exercises with their target and secondary muscles, steps and progressions, for your app, offline included.`

export const metadata = pageMetadata({
  path: DATA_PACK.path,
  title: 'Exercise Dataset with Muscle Data',
  description: `Own the GymFit exercise dataset: ${CATALOG_FIGURES[0].value} exercises with their muscles, steps and progressions, as files. $${DATA_PACK.price} once, ${DATA_PACK.updatesMonths} months of updates.`
})

const CONTENTS = [
  {
    title: `${CATALOG_FIGURES[0].value} exercises`,
    text: 'Name, category, difficulty, force, equipment, type (compound or isolation) and laterality.'
  },
  {
    title: 'Muscles on three levels',
    text: `The target and secondary muscles of each exercise: ${CATALOG_FIGURES[1].value} ${CATALOG_FIGURES[1].label}, with their common names and heads.`
  },
  {
    title: 'How to do each exercise',
    text: 'Step-by-step instructions, tips and common mistakes.'
  },
  {
    title: 'Links between exercises',
    text: 'Variations, alternatives, and easier and harder progressions.'
  },
  {
    title: 'Reference lists',
    text: `The ${CATALOG_FIGURES[2].value} ${CATALOG_FIGURES[2].label} and the ${CATALOG_FIGURES[3].value} ${CATALOG_FIGURES[3].label}.`
  }
]

/** Data pack, then API plans; true and false draw a check or a dash */
const COMPARISON: [string, string | boolean, string | boolean][] = [
  [
    'Price',
    `$${DATA_PACK.price} once`,
    `Free, then from $${PLANS.starter.monthlyPrice} a month`
  ],
  ['The whole catalog', true, true],
  ['Keep a copy in your own database', true, false],
  ['Works offline', true, false],
  [
    'Updates of the catalog',
    `${DATA_PACK.updatesMonths} months included`,
    'Continuous'
  ],
  ['Search, suggestions and muscle heatmaps', false, true],
  ['MCP server for AI assistants', false, true],
  ['Requests', 'No limit, it is your copy', 'A monthly quota']
]

const FAQS = [
  {
    question: 'Can I download the exercise database for free?',
    answer: `No. To try the data, the free API plan gives ${formatNumber(PLANS.free.quota)} requests a month, with no credit card. The data pack is the only way to keep a copy of the catalog.`
  },
  {
    question: 'What can I do with the data?',
    answer:
      'Use it in your own apps, online or offline. Reselling the data or building a competing database is not allowed.'
  },
  {
    question: 'Which file formats does the data pack come in?',
    answer: 'Tell us the format your app needs when you ask for early access.'
  },
  {
    question: 'Does the dataset include images or videos?',
    answer:
      'No. The catalog has no exercise photos or animations. The muscle heatmaps are drawn by the API.'
  },
  {
    question: `What happens after ${DATA_PACK.updatesMonths} months?`,
    answer:
      'Your copy stays yours. The updates of the catalog made after that are not included.'
  },
  {
    question: 'When can I get it?',
    answer:
      'The data pack is open to early access requests. Write to us and we come back to you with the details.'
  }
]

const sectionTitle =
  'text-3xl font-extrabold tracking-tight text-white sm:text-4xl'

export default function ExerciseDatasetPage() {
  return (
    <>
      <JsonLd data={dataPackStructuredData(SUMMARY)} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <p className="font-code text-xs uppercase tracking-wide text-volt">
            Data pack
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            The GymFit exercise dataset
          </h1>
          <p className="mt-6 max-w-xl text-lg text-steel-light">{SUMMARY}</p>
          <p className="mt-6">
            <span className="text-4xl font-extrabold text-white">
              ${DATA_PACK.price}
            </span>
            <span className="text-steel">
              {' '}
              once, {DATA_PACK.updatesMonths} months of updates included
            </span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className={buttonVariants({ size: 'lg' })}
              href={DATA_PACK.mailto}
            >
              Ask for early access
            </a>
            <Link
              className={buttonVariants({ size: 'lg', variant: 'outline' })}
              href="/signup"
            >
              Try the data with the free API
            </Link>
          </div>
        </div>

        <figure className="min-w-0 rounded-[14px] border border-ink-700 bg-ink-900">
          <figcaption className="border-b border-ink-700 px-4 py-3 font-code text-xs text-steel-light">
            Squat (Barbell), the complete record
          </figcaption>
          <pre className="max-h-[26rem] overflow-auto whitespace-pre-wrap break-words px-4 py-4 font-code text-xs leading-relaxed text-white lg:max-h-[34rem]">
            <JsonCode text={SQUAT_RECORD} />
          </pre>
        </figure>
      </section>

      <section
        aria-labelledby="contents-title"
        className="border-y border-ink-700 bg-ink-900"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className={sectionTitle} id="contents-title">
            What is in the exercise dataset
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENTS.map((item) => (
              <li
                key={item.title}
                className="rounded-[14px] border border-ink-700 bg-ink p-6"
              >
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-steel-light">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="comparison-title"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <h2 className={sectionTitle} id="comparison-title">
          Data pack or API?
        </h2>
        <p className="mt-3 max-w-2xl text-steel-light">
          Both give the same catalog. The data pack is a copy you keep; the API
          adds the service around it.
        </p>
        <div className="mt-10 overflow-x-auto rounded-[14px] border border-ink-700">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-ink-900 font-code text-xs uppercase tracking-wide text-steel">
              <tr>
                <th className="px-4 py-3 font-normal" scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                <th className="px-4 py-3 font-normal text-volt" scope="col">
                  Data pack
                </th>
                <th className="px-4 py-3 font-normal" scope="col">
                  API plans
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700">
              {COMPARISON.map(([feature, pack, api]) => (
                <tr key={feature}>
                  <th className="px-4 py-3 font-medium text-white" scope="row">
                    {feature}
                  </th>
                  <td className="px-4 py-3 text-steel-light">
                    <Cell value={pack} />
                  </td>
                  <td className="px-4 py-3 text-steel-light">
                    <Cell value={api} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="dataset-faq-title"
        className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <h2 className={sectionTitle} id="dataset-faq-title">
          Exercise dataset FAQ
        </h2>
        <div className="mt-10 grid gap-x-12 lg:grid-cols-2">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-ink-700 py-5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt">
                <h3 className="text-base font-bold text-white">
                  {faq.question}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 font-code text-volt transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-steel-light">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="dataset-cta-title"
        className="border-t border-ink-700"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            id="dataset-cta-title"
          >
            Keep the exercise catalog in your own app
          </h2>
          <a
            className={buttonVariants({ size: 'lg', className: 'mt-8' })}
            href={DATA_PACK.mailto}
          >
            Ask for early access
          </a>
        </div>
      </section>
    </>
  )
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <IconCheck aria-hidden className="h-5 w-5 text-volt" />
        <span className="sr-only">Yes</span>
      </>
    )
  }

  if (value === false) {
    return (
      <>
        <IconMinus aria-hidden className="h-5 w-5 text-steel" />
        <span className="sr-only">No</span>
      </>
    )
  }

  return <>{value}</>
}
