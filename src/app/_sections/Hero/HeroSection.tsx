import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <div className="relative max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="z-20">
          <h1 className="text-4xl text-gray-900 sm:text-6xl">
            Start building your next
            <br />
            <strong className="font-extrabold"> fitness App</strong> today
          </h1>
          <p className="pt-8 text-xl text-gray-900 sm:text-2xl">
            Access to all detailed{' '}
            <strong className="font-bold text-sky-500">gym exercises</strong>{' '}
            and
            <br />
            all the{' '}
            <strong className="font-bold text-sky-500">
              fitness calculators
            </strong>{' '}
            you need <br /> through our powerful API.
          </p>
          <div className="mt-8 space-x-4">
            <button className="inline-flex h-12 items-center rounded-lg border border-gray-500 px-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              See Documentation
            </button>
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-sky-700 bg-[linear-gradient(110deg,#0ea5e9,45%,#7dd3fc,55%,#0ea5e9)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Try for Free
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex translate-x-96 transform items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src="/hero_image.png"
              alt="Hero image"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" /> */}
          </div>
        </div>
      </div>
    </section>
  )
}
