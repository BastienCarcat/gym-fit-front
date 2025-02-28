'use client'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {
  CalculatorIcon,
  DatabaseIcon,
  ImageIcon,
  RedoIcon,
  Share2Icon,
  UndoIcon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

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
      <motion.div className="h-full w-full rounded-lg"></motion.div>
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
      className="relative mb-2 h-full min-h-[6rem] w-full"
    >
      <div className="bg-dot-black/[0.2] flex h-full flex-1 flex-row justify-center space-x-2">
        <motion.div
          variants={first}
          className="z-20 flex h-full w-1/4 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
        >
          <div className="relative h-full w-full">
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
        <div className="z-30 flex h-full w-1/4 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="relative h-full w-full">
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
          className="z-20 flex h-full w-1/4 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
        >
          <div className="relative h-full w-full">
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
    <div className="relative h-full min-h-[6rem] w-full overflow-hidden">
      <Marquee pauseOnHover className="absolute top-0 h-full [--duration:20s]">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
              'border-neutral-200 bg-neutral-50',
              'transform-gpu transition-all duration-300 ease-out hover:scale-[1.1]'
              //   '[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] hover:[mask-image:none]'
            )}
          >
            <div className="relative h-full w-full">
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

const features = [
  {
    title: 'Comprehensive Exercise Library',
    description: (
      <span className="text-sm">
        Import thousands of exercises into your app without building your own
        database. Save months of content creation time.
      </span>
    ),
    header: <Skeleton />,
    className: 'md:col-span-2',
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
    header: <Skeleton />,
    className: 'md:col-span-1',
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
    className: 'md:col-span-1',
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
    className: 'md:col-span-2',
    icon: <ImageIcon className="h-4 w-4 text-neutral-500" />
  }
  //   {
  //     title: 'Powerful Search Endpoint',
  //     description: (
  //       <span className="text-sm">
  //     Filter exercises by multiple parameters with our optimized search endpoint. Build advanced filters in your app with minimal code.
  //       </span>
  //     ),
  //     header: <SkeletonFour />,
  //     className: 'md:col-span-2',
  //     icon: <ImageIcon className="h-4 w-4 text-neutral-500" />
  //   }
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
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
