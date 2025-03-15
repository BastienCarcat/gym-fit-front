'use client'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

import { TextAnimate } from '@/components/ui/text-animate'

export default function FAQSection() {
  const faqs = useMemo(
    () => [
      {
        question: 'Is my payment information secure?',
        answer:
          'All payments are processed securely through RapidAPI, with credit card transactions handled by their PCI-compliant banking partners. Your financial information is never stored on our servers.'
      },
      {
        question: 'What happens if I exceed my plan limits?',
        answer:
          "If you exceed your plan's monthly request limit, RapidAPI will either charge you an overuse fee based on your plan's per-request rate or temporarily suspend access until the next billing cycle. We recommend monitoring your usage through the RapidAPI dashboard to avoid unexpected charges."
      },
      {
        question: 'Can I cancel my subscription at any time?',
        answer:
          'Yes, you can cancel your subscription plan at any time directly from your RapidAPI dashboard. There are no long-term commitments or cancellation fees. Your access will continue until the end of your current billing period.'
      },
      {
        question: 'How often is the exercise database updated?',
        answer:
          'Our exercise database is updated monthly with new exercises, improved descriptions, and enhanced images. All updates are automatically available through the API with no changes required to your implementation.'
      },
      {
        question: 'What formats do the API responses come in?',
        answer:
          'All API responses are delivered in standard JSON format for easy integration with any programming language or framework. Image URLs are provided as standard web URLs that can be directly embedded in your application.'
      },
      {
        question: 'What languages does the API support?',
        answer:
          'Currently, all exercise data and responses are available in English only. If your application requires support for additional languages, please let us know. We prioritize new language implementations based on user demand.'
      },
      {
        question: 'Do you offer technical support?',
        answer:
          'Yes, all paid plans include email technical support with response times based on your plan level. Premium plans include priority support with faster response times and dedicated assistance for implementation.'
      }
    ],
    []
  )

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
        {faqs.map((faq, idx) => (
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
