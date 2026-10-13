import { FAQS } from '@/app/_sections/FAQ/faqs'

import { Reveal } from './Reveal'

/** The answers are in the markup: a closed item still holds its text */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8"
      id="faq"
    >
      <Reveal>
        <h2
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          id="faq-title"
        >
          Exercise API FAQ
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
      </Reveal>
    </section>
  )
}
