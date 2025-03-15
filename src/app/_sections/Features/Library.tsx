'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DotIcon } from 'lucide-react'

export default function LibraryFeature() {
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
            alt="avatar"
            layout="fill"
            objectFit="contain"
            src="/muscle_quadricep.png"
          />
        </div>
        <p className="text-sm font-semibold text-gray-500">Legs</p>
      </div>

      <motion.ul
        animate="animate"
        className="flex-1 space-y-2"
        initial="initial"
        whileHover="hover"
      >
        {exercises.map((ex, idx) => (
          <motion.li
            key={idx}
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2"
            variants={slide}
          >
            <p className="text-xs font-semibold text-neutral-500 sm:text-sm">
              {ex.name}
            </p>
          </motion.li>
        ))}
        <motion.div
          className="flex flex-col items-center text-sm text-gray-500"
          variants={slide}
        >
          <DotIcon className="inline-block h-5 w-5" />
          And hundreds more!
        </motion.div>
      </motion.ul>
    </div>
  )
}
