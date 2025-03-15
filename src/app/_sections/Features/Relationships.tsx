'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RedoIcon, UndoIcon } from 'lucide-react'

export default function RelationshipsFeature() {
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
      animate="animate"
      className="relative mb-2 h-full min-h-[9rem] w-full"
      initial="initial"
      whileHover="hover"
    >
      <div className="bg-dot-black/[0.2] flex h-full flex-1 flex-row justify-center space-x-2">
        <motion.div
          className="z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-1 pb-4 sm:w-1/4"
          variants={first}
        >
          <div className="relative size-full">
            <Image
              alt="avatar"
              layout="fill"
              objectFit="contain"
              src="/ex_front_squat_image.png"
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
              alt="avatar"
              layout="fill"
              objectFit="contain"
              src="/ex_squat_image.png"
            />
          </div>

          <p className="mb-1 text-center text-xs font-semibold text-neutral-500 sm:text-base">
            Squat
          </p>
        </div>

        <motion.div
          className="z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:w-1/4"
          variants={second}
        >
          <div className="relative size-full">
            <Image
              alt="avatar"
              layout="fill"
              objectFit="contain"
              src="/ex_leg_press_image.png"
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
