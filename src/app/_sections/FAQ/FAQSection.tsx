import { TextAnimate } from '@/components/ui/text-animate'
import { useMemo } from 'react'

export default function FAQSection() {
  const faqs = useMemo(
    () => [
      {
        question: 'Is my payment information secure?',
        answer:
          'All payments are made directly on RapidAPI, and credit cards are processed by one of their PCI-compliant banking partners.'
      },
      {
        question: 'What if I exceed my plan limits?',
        answer:
          "Depending on your plan's request limit, you will be charged an overrun fee or suspended."
      },
      {
        question: 'Can I cancel my plan any time?',
        answer:
          'Yes, you can cancel your subscription plan at any time from your RapidAPI dashboard.'
      }
    ],
    []
  )
  return (
    <section
      className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      id="faq"
    >
      <div className="mx-auto mb-20 max-w-2xl px-4 pt-16 text-center sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
        <TextAnimate
          delay={0.2}
          duration={0.4}
          animation="fadeIn"
          once
          className="mx-auto max-w-2xl px-4 pt-16 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:px-6 sm:pt-32 sm:text-6xl lg:max-w-7xl lg:px-8"
        >
          Frequently Asked Questions
        </TextAnimate>
      </div>

      <dl className="divide-y">
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
      </dl>
    </section>
  )
}
