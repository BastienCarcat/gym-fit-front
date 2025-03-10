'use client'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  CalculatorIcon,
  DatabaseIcon,
  DotIcon,
  ImageIcon,
  MoveRightIcon,
  RedoIcon,
  Share2Icon,
  UndoIcon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'
import { DotPattern } from '@/components/ui/dot-pattern'
import { SparklesCore } from '@/components/ui/sparkles'

const Skeleton = () => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%'
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%']
    }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse'
      }}
      className="bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg"
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%'
      }}
    >
      <motion.div className="size-full rounded-lg"></motion.div>
    </motion.div>
  )
}

const HeaderRelationships = () => {
  const first = {
    initial: {
      x: 20,
      y: 5,
      rotate: -5
    },
    hover: {
      x: -30,
      y: 15,
      rotate: -15
    }
  }
  const second = {
    initial: {
      x: -20,
      y: 5,
      rotate: 5
    },
    hover: {
      x: 30,
      y: 15,
      rotate: 15
    }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative mb-2 h-full min-h-[9rem] w-full"
    >
      <div className="bg-dot-black/[0.2] flex h-full flex-1 flex-row justify-center space-x-2">
        <motion.div
          variants={first}
          className="z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-1 pb-4 sm:w-1/4"
        >
          <div className="relative size-full">
            <Image
              src="/ex_plank_image.png"
              alt="avatar"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Plank
          </p>
          <p className="mt-2 rounded-full border border-gray-500 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            Variation
          </p>
        </motion.div>
        <div className="z-30 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:w-1/4">
          <div className="relative size-full">
            <Image
              src="/ex_squat_image.png"
              alt="avatar"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="mb-1 text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Squat
          </p>
        </div>

        <motion.div
          variants={second}
          className="z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:w-1/4"
        >
          <div className="relative size-full">
            <Image
              src="/ex_bench_press_image.png"
              alt="avatar"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Bench press
          </p>
          <p className="mt-2 rounded-full border border-gray-500 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            Alternative
          </p>
        </motion.div>
      </div>
      <div className="absolute right-1/2 top-10 z-10 flex translate-x-[6.75rem] transform items-center justify-center">
        <RedoIcon className="h-8 w-8 rotate-12 text-neutral-500" />
      </div>
      <div className="absolute left-1/2 top-10 z-10 flex -translate-x-[6.75rem] transform items-center justify-center">
        <UndoIcon className="h-8 w-8 -rotate-12 text-neutral-500" />
      </div>
    </motion.div>
  )
}

const HeaderImages = () => {
  const images = [
    {
      src: '/ex_squat_image.png'
    },
    {
      src: '/ex_bench_press_image.png'
    },
    {
      src: '/ex_plank_image.png'
    },
    {
      src: '/ex_bench_press_image.png'
    },
    {
      src: '/ex_plank_image.png'
    }
  ]
  return (
    <div className="relative h-full min-h-[9rem] w-full overflow-hidden">
      <Marquee pauseOnHover className="absolute top-0 h-full [--duration:20s]">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              'relative w-40 cursor-pointer overflow-hidden rounded-xl border px-1',
              'border-neutral-200 bg-neutral-50',
              'transform-gpu transition-all duration-300 ease-out hover:scale-[1.1]'
              //   '[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] hover:[mask-image:none]'
            )}
          >
            <div className="relative size-full">
              <Image
                src={img.src}
                alt="avatar"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}

const HeaderLibrary = () => {
  const slide = {
    initial: {
      y: 0
    },
    hover: { y: -55 }
  }

  const exercises = [
    {
      name: 'Bulgarian split squat'
    },
    {
      name: 'Leg extension'
    },
    {
      name: 'Squat'
    },
    {
      name: 'Bulgarian split squat'
    }
  ]
  return (
    <div className="flex h-40 w-full space-x-4 overflow-hidden md:h-full">
      <div className="flex h-full w-1/3 flex-col items-center gap-2">
        <div className="relative size-full">
          <Image
            src="/muscle_quadricep.png"
            alt="avatar"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-sm font-semibold text-gray-500">Legs</p>
      </div>

      <motion.ul
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex-1 space-y-2"
      >
        {exercises.map((ex, idx) => (
          <motion.li
            variants={slide}
            key={idx}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2"
          >
            <p className="text-xs font-semibold text-neutral-500 sm:text-sm">
              {ex.name}
            </p>
          </motion.li>
        ))}
        <motion.div
          variants={slide}
          className="flex flex-col items-center text-sm text-gray-500"
        >
          <DotIcon className="inline-block h-5 w-5" />
          And hundreds more!
        </motion.div>
      </motion.ul>
    </div>
  )
}

const HeaderCalculators = () => {
  return (
    <div className="relative flex size-full min-h-[9rem] items-center justify-center">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-32">
          <div className="absolute -left-10 top-0 h-1/2 w-10 translate-y-1/2">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={800}
              className="h-full w-full"
              particleColor="#000000"
            />
          </div>
          <div className="absolute left-0 top-0 h-1/2 w-[2px] translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute left-0 top-0 h-1/2 w-px translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
          <div className="absolute left-0 top-0 h-1/3 w-[3px] translate-y-full bg-gradient-to-b from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute left-0 top-0 h-1/3 w-px translate-y-full bg-gradient-to-b from-transparent via-sky-500 to-transparent"></div>
        </div>
      </div>

      <div className="flex w-full items-center space-x-2">
        <p
          className={cn(
            '[mask-image:linear-gradient(to_right,#000_50%,transparent)]',
            'w-1/2 whitespace-nowrap text-lg font-semibold slashed-zero lining-nums tracking-tight text-gray-500'
          )}
        >
          BMI = weight (kg) / height<sup>2</sup> (m)
        </p>
        <div className="relative flex h-40 w-1/2 items-center justify-end overflow-hidden [mask-image:linear-gradient(to_left,#000_50%,transparent)]">
          <div
            className={cn(
              'h-8 w-1/2 min-w-44 rounded-md border border-gray-600',
              'bg-gradient-to-r from-orange-500 via-lime-500 to-sky-500',
              'flex items-end space-x-6'
            )}
          >
            {Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'w-px bg-gray-500',
                  idx % 2 === 0 ? 'h-full' : 'h-1/2'
                )}
              ></div>
            ))}
          </div>
          <div className="absolute right-0 top-0 flex -translate-x-10 translate-y-1/2 flex-col items-center">
            <p className="text-sm">Normal</p>
            <MoveRightIcon className="h-4 w-4 rotate-90" />
          </div>
          <div className="absolute bottom-0 right-0 flex -translate-x-3 -translate-y-[275%] space-x-6 text-xs text-gray-600">
            <p>34.9</p>
            <p>29.9</p>
            <p>24.9</p>
            <p>18.5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Comprehensive Exercise Library',
    description: (
      <span className="text-sm">
        Import thousands of exercises into your app without building your own
        database. Save months of content creation time.
      </span>
    ),
    header: <HeaderLibrary />,
    className: 'md:col-span-4',
    icon: <DatabaseIcon className="h-4 w-4 text-neutral-500" />
  },
  {
    title: 'Ready-to-Use Calculators',
    description: (
      <span className="text-sm">
        Implement essential fitness metrics (BMR, BMI, TDEE) without writing
        complex formulas.
      </span>
    ),
    header: <HeaderCalculators />,
    className: 'md:col-span-4',
    icon: <CalculatorIcon className="h-4 w-4 text-neutral-500" />
  },
  {
    title: 'Rich Exercise Visuals',
    description: (
      <span className="text-sm">
        All exercises come with high-quality images to enhance your UI and
        provide visual guidance to your users.
      </span>
    ),

    header: <HeaderImages />,
    className: 'md:col-span-4',
    icon: <Share2Icon className="h-4 w-4 text-neutral-500" />
  },
  {
    title: 'Smart Exercise Relationships',
    description: (
      <span className="text-sm">
        Get variations and alternatives for each exercise, enabling you to build
        intelligent workout recommendation systems.
      </span>
    ),
    header: <HeaderRelationships />,
    className: 'md:col-span-7',
    icon: <ImageIcon className="h-4 w-4 text-neutral-500" />
  },
  {
    title: 'Powerful Search Endpoint',
    description: (
      <span className="text-sm">
        Filter exercises by multiple parameters with our optimized search
        endpoint. Build advanced filters in your app with minimal code.
      </span>
    ),
    header: <Skeleton />,
    className: 'md:col-span-5',
    icon: <ImageIcon className="h-4 w-4 text-neutral-500" />
  }
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <BentoGrid className="md:auto-rows-[20rem]">
        {features.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn('[&>p:text-lg]', item.className)}
            // icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
