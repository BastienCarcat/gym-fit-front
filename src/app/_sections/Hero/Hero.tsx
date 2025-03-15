'use client'
import { ArrowRight, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { NumberTicker } from '@/components/ui/number-ticker'

export default function HeroSection() {
  const fadeInUp = (delay = 0.2) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: delay
      }
    }
  })

  return (
    <section className="relative mx-auto my-12 max-w-7xl px-4 py-10 sm:my-24 sm:px-6 sm:py-16 md:my-36 lg:my-48 lg:px-8 lg:py-36">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
        {/* Text content - full width on mobile, constrained on desktop */}
        <div className="relative z-20 w-full text-center lg:max-w-2xl lg:text-left">
          <motion.h1
            animate="show"
            className="text-3xl text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
            initial="hidden"
            variants={fadeInUp(0)}
          >
            Start building your next
            <br className="hidden sm:block" />
            <strong className="font-extrabold"> fitness App</strong> today
          </motion.h1>

          <motion.p
            animate="show"
            className="pt-4 text-lg text-gray-900 sm:pt-6 sm:text-xl md:text-2xl"
            initial="hidden"
            variants={fadeInUp(0.2)}
          >
            Access to all detailed{' '}
            <strong className="font-bold text-sky-500">gym exercises</strong>{' '}
            and
            <br className="hidden sm:block" />
            all the{' '}
            <strong className="font-bold text-sky-500">
              fitness calculators
            </strong>{' '}
            you need <br className="hidden sm:block" />
            through our powerful API.
          </motion.p>

          <motion.div
            animate="show"
            className="mt-6 flex flex-col space-y-4 sm:mt-8 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start"
            initial="hidden"
            variants={fadeInUp(0.3)}
          >
            <Link
              className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-500 px-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              href={siteConfig.documentation_url}
              target="_blank"
            >
              See Documentation
            </Link>
            <Link
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-sky-700 bg-[linear-gradient(110deg,#0ea5e9,45%,#7dd3fc,55%,#0ea5e9)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              href={siteConfig.rapid_playground_url}
              target="_blank"
            >
              Try for Free
              <ArrowRight className="ml-2" />
            </Link>
          </motion.div>

          <motion.div
            animate="show"
            className="mt-4 flex items-center justify-center space-x-2 text-sm leading-4 lg:justify-start"
            initial="hidden"
            variants={fadeInUp(0.4)}
          >
            <p>
              Used by +
              <NumberTicker
                className="font-semibold"
                startValue={150}
                value={900}
              />{' '}
              developers
            </p>
            <HeartIcon className="h-3 w-3 text-red-500" />
          </motion.div>
        </div>

        {/* Image container - positioned below text on mobile, to the right on desktop */}
        <motion.div
          animate="show"
          className="relative mt-12 h-[300px] w-full overflow-hidden sm:h-[400px] md:h-[500px] lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-[60%] xl:w-[70%]"
          initial="hidden"
          variants={fadeInUp(0.1)}
        >
          <div className="relative h-full w-full rounded-2xl sm:rounded-[2.5rem]">
            <Image
              fill
              alt="Hero image"
              className={cn(
                'rounded-2xl sm:rounded-[2.5rem]',
                'lg:[mask-image:linear-gradient(to_right,transparent_1%,transparent,#000_60%)]'
              )}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 70vw"
              src="/hero_image.jpg"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
