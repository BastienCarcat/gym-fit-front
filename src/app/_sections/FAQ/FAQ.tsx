'use client'
import { motion } from 'framer-motion'

import { FAQS } from './faqs'

import { TextAnimate } from '@/components/ui/text-animate'

export default function FAQSection() {
  const showSection = {
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
      className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      id="faq"
    >
      <div className="pb-20 sm:pb-28 lg:pb-48">
        <TextAnimate
          once
          animation="fadeIn"
          as="h2"
          className="mx-auto max-w-2xl px-4 pt-16 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:px-6 sm:pt-32 sm:text-6xl lg:max-w-7xl lg:px-8"
          delay={0.2}
          duration={0.4}
          segmentClassName={{
            'Questions-4': 'text-sky-500'
          }}
        >
          Frequently Asked Questions
        </TextAnimate>
      </div>

      <motion.dl
        className="divide-y"
        initial="hidden"
        variants={showSection}
        viewport={{ once: true }}
        whileInView="show"
      >
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="space-y-2 py-6 md:grid md:grid-cols-12 md:gap-4 md:space-y-0"
          >
            <dt className="text-base font-semibold md:col-span-5">
              {faq.question}
            </dt>
            <dd className="md:col-span-7">{faq.answer}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
