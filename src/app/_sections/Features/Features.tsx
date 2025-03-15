'use client'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TextAnimate } from '@/components/ui/text-animate'
import SearchEndpointFeature from './SearchEndpoint'
import RelationshipsFeature from './Relationships'
import ImagesFeature from './Images'
import LibraryFeature from './Library'
import CalculatorsFeature from './Calculators'

const features = [
  {
    title: 'Comprehensive Exercise Library',
    description: (
      <span className="text-sm">
        Import hundreds of exercises into your app without building your own
        database. Save months of content creation time.
      </span>
    ),
    header: <LibraryFeature />,
    className: 'md:col-span-4'
  },
  {
    title: 'Ready-to-Use Calculators',
    description: (
      <span className="text-sm">
        Implement essential fitness metrics (BMR, BMI, TDEE, IBW, ...) without
        writing complex formulas.
      </span>
    ),
    header: <CalculatorsFeature />,
    className: 'md:col-span-4'
  },
  {
    title: 'Rich Exercise Visuals',
    description: (
      <span className="text-sm">
        All exercises come with high-quality images to enhance your UI and
        provide visual guidance to your users.
      </span>
    ),

    header: <ImagesFeature />,
    className: 'md:col-span-4'
  },
  {
    title: 'Smart Exercise Relationships',
    description: (
      <span className="text-sm">
        Get variations and alternatives for each exercise, enabling you to build
        intelligent workout recommendation systems.
      </span>
    ),
    header: <RelationshipsFeature />,
    className: 'md:col-span-7'
  },
  {
    title: 'Powerful Search Endpoint',
    description: (
      <span className="text-sm">
        Filter exercises by multiple parameters with our optimized search
        endpoint. Build advanced filters in your app with minimal code.
      </span>
    ),
    header: <SearchEndpointFeature />,
    className: 'md:col-span-5'
  }
]

export default function FeaturesSection() {
  const bentoGridVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.4
      }
    }
  }
  return (
    <section
      id="features"
      className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
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

      <motion.div
        variants={bentoGridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <BentoGrid className="md:auto-rows-[20rem]">
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn('[&>p:text-lg]', item.className)}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  )
}
