'use client'

import Link from 'next/link'
import { useState } from 'react'

import { siteConfig } from '@/config/site'

import { HERO_EXERCISES } from './heroData'
import { JsonCode } from './JsonCode'

export function Hero() {
  const [active, setActive] = useState(0)
  const exercise = HERO_EXERCISES[active]

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
      <div>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          The exercise API for fitness apps
        </h1>
        <p className="mt-6 max-w-xl text-lg text-steel-light">
          5,800 exercises with their target and secondary muscles on three
          levels, steps, difficulty, variants and alternatives. A search that
          reads typos and abbreviations, a muscle heatmap for each exercise, and
          BMI, BMR and TDEE calculators.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[10px] bg-volt px-6 font-bold text-ink transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
            href="/signup"
          >
            Get a free API key
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[10px] border border-ink-700 px-6 font-medium text-white transition-colors hover:border-steel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
            href={siteConfig.documentation_url}
            rel="noreferrer"
            target="_blank"
          >
            Read the docs
          </Link>
        </div>
        <p className="mt-4 text-sm text-steel">
          Free plan, no credit card. 1,000 requests a month.
        </p>
      </div>

      <div className="min-w-0">
        <div
          aria-label="Exercise"
          className="mb-3 flex flex-wrap gap-2"
          role="tablist"
        >
          {HERO_EXERCISES.map((item, index) => (
            <button
              key={item.slug}
              aria-selected={index === active}
              className={`h-10 rounded-[10px] border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
                index === active
                  ? 'border-volt bg-volt text-ink'
                  : 'border-ink-700 text-steel-light hover:border-steel hover:text-white'
              }`}
              role="tab"
              type="button"
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
          <div className="min-w-0 rounded-[14px] border border-ink-700 bg-ink-900">
            <p className="border-b border-ink-700 px-4 py-3 font-code text-xs text-steel-light">
              <span className="font-bold text-volt">GET</span>{' '}
              <span className="break-all">/v2/exercises/{exercise.slug}</span>
            </p>
            {/* The full response is a click away on a phone */}
            <details className="group sm:hidden">
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-volt">
                <span className="group-open:hidden">Show full response</span>
                <span className="hidden group-open:inline">Hide response</span>
              </summary>
              <pre className="max-h-96 overflow-auto px-4 pb-4 font-code text-xs leading-relaxed text-white">
                <JsonCode text={exercise.json} />
              </pre>
            </details>
            <pre
              key={exercise.slug}
              className="hidden max-h-[26rem] overflow-auto px-4 py-4 font-code text-xs leading-relaxed text-white duration-300 animate-in fade-in motion-reduce:animate-none sm:block"
            >
              <JsonCode text={exercise.json} />
            </pre>
          </div>

          <figure className="order-first flex flex-col rounded-[14px] border border-ink-700 bg-ink-900 p-4 sm:order-none">
            <img
              key={exercise.slug}
              alt={`Muscle heatmap of the ${exercise.label.toLowerCase()}, front and back: ${exercise.targets.join(', ')} highlighted`}
              className="mx-auto h-72 w-full object-contain duration-300 animate-in fade-in motion-reduce:animate-none"
              height={288}
              src={exercise.heatmap}
              width={360}
              // The largest image of the first screen on a phone
              fetchPriority="high"
            />
            <figcaption className="mt-3 border-t border-ink-700 pt-3 text-xs text-steel-light">
              <span className="font-bold text-volt">Target</span>:{' '}
              {exercise.targets.join(', ')}.{' '}
              <span className="font-bold text-white">Secondary</span>:{' '}
              {exercise.secondary.join(', ')}.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
