import Link from 'next/link'

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8"
    >
      <h2
        className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        id="cta-title"
      >
        Build your fitness app on real exercise data
      </h2>
      <Link
        className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[10px] bg-volt px-6 font-bold text-ink transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
        href="/signup"
      >
        Get a free API key
      </Link>
    </section>
  )
}
