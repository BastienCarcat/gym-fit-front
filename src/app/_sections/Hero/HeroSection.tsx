import { siteConfig } from '@/config/site'
import { Button, Link } from '@nextui-org/react'

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          The all in <span className="text-sky-500">ONE</span> <br /> fitness
          API
        </h2>
        <p className="pt-8 text-xl text-gray-900 sm:text-2xl">
          Access to over 500+{' '}
          <span className="font-bold text-sky-500">gym exercises</span> with
          complete informations and many fitness{' '}
          <span className="font-bold text-sky-500">calculators</span> like TDEE,
          BMR, BMI or IBW
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex">
            <Button
              as={Link}
              className="transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-300"
              color="primary"
              href={siteConfig.documentation_url}
              target="_blank"
            >
              See documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
