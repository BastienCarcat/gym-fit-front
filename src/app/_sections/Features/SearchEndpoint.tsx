'use client'
import { SearchIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { TypingAnimation } from '@/components/ui/typing-animation'

export default function SearchEndpointFeature() {
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
        <TypingAnimation startOnView as="p" delay={1} duration={80}>
          Curl
        </TypingAnimation>
        <motion.p
          animate="animate"
          initial="initial"
          transition={{
            duration: 0.8,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop'
          }}
          variants={variants}
        >
          |
        </motion.p>
      </div>

      {exercises.map((ex, idx) => (
        <motion.div
          key={idx}
          animate="animate"
          className="mt-2 flex w-full gap-4 rounded-lg border bg-gray-50 p-2"
          initial="initial"
          transition={{
            duration: 0.1,
            delay: 0.2 + (idx + 1) * 0.2
          }}
          variants={card}
        >
          <div className="relative w-16">
            <Image alt="image" layout="fill" objectFit="contain" src={ex.img} />
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
