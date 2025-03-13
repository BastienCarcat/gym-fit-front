'use client'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  CalculatorIcon,
  DatabaseIcon,
  DotIcon,
  ImageIcon,
  MoveRightIcon,
  RedoIcon,
  SearchIcon,
  Share2Icon,
  UndoIcon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'
import { DotPattern } from '@/components/ui/dot-pattern'
import { SparklesCore } from '@/components/ui/sparkles'
import { TextAnimate } from '@/components/ui/text-animate'
import { TypingAnimation } from '@/components/ui/typing-animation'

const HeaderSearchEndpoint = () => {
  const exercises = [
    {
      img: '/ex_bicep_curl_image.png',
      name: 'Bicep curl',
      type: 'Arms'
    },
    {
      img: '/ex_leg_curl_image.png',
      name: 'Seated leg curl',
      type: 'Legs'
    }
  ]

  const variants = {
    initial: {
      opacity: 100
    },
    animate: {
      opacity: 0
    }
  }

  const card = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 100
    }
  }
  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-2">
        <SearchIcon className="mr-2 h-4 w-4 text-gray-500" />
        <TypingAnimation as="p" startOnView delay={1} duration={80}>
          Curl
        </TypingAnimation>
        <motion.p
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{
            duration: 0.8,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop'
          }}
        >
          |
        </motion.p>
      </div>

      {exercises.map((ex, idx) => (
        <motion.div
          initial="initial"
          animate="animate"
          variants={card}
          transition={{
            duration: 0.1,
            delay: 0.2 + (idx + 1) * 0.2
          }}
          className="mt-2 flex w-full gap-4 rounded-lg border bg-gray-50 p-2"
        >
          <div className="relative w-16">
            <Image src={ex.img} alt="image" layout="fill" objectFit="contain" />
          </div>

          <div>
            <p className="text-md font-semibold text-gray-500">{ex.name}</p>
            <p className="text-xs text-gray-500">{ex.type}</p>
          </div>
        </motion.div>
      ))}
    </div>
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
              src="/ex_front_squat_image.png"
              alt="avatar"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Front squat
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
              src="/ex_leg_press_image.png"
              alt="avatar"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Leg Press
          </p>
          <p className="mt-2 rounded-full border border-gray-500 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            Alternative
          </p>
        </motion.div>
      </div>
      <div className="absolute right-1/2 top-8 z-10 flex translate-x-[7.75rem] transform items-center justify-center">
        <RedoIcon className="h-8 w-8 rotate-12 text-neutral-500" />
      </div>
      <div className="absolute left-1/2 top-8 z-10 flex -translate-x-[7.75rem] transform items-center justify-center">
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
      src: '/ex_front_squat_image.png'
    },
    {
      src: '/ex_leg_curl_image.png'
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
      name: 'Standing calf raise'
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
        Import hundreds of exercises into your app without building your own
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
        Implement essential fitness metrics (BMR, BMI, TDEE, IBW, ...) without
        writing complex formulas.
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
    header: <HeaderSearchEndpoint />,
    className: 'md:col-span-5',
    icon: <ImageIcon className="h-4 w-4 text-neutral-500" />
  }
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      {/* Fitness Development, Simplified */}
      <div className="pb-20 sm:pb-28 lg:pb-48">
        <TextAnimate
          delay={0.2}
          duration={0.4}
          animation="fadeIn"
          once
          className="mx-auto max-w-2xl px-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:px-6 sm:text-6xl lg:max-w-7xl lg:px-8"
          segmentClassName={{
            'Ready-6': 'text-sky-500',
            'to-8': 'text-sky-500',
            'Go-10': 'text-sky-500'
          }}
        >
          Your Fitness Backend, Ready to Go
        </TextAnimate>
        <TextAnimate
          delay={0.3}
          duration={0.4}
          animation="fadeIn"
          once
          className="mx-auto max-w-2xl px-4 pt-2 text-center text-2xl tracking-tight text-gray-500 sm:px-6 sm:pt-4 sm:text-xl lg:max-w-7xl lg:px-8"
        >
          Focus on your app's unique features while our API handles the exercise
          data and calculations.
        </TextAnimate>
      </div>

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
