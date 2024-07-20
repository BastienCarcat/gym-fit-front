'use client'
import React, { useMemo } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

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
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h1>
      </div>

      <Accordion className="w-2/3" selectionMode="multiple" variant="bordered">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            aria-label={`Accordion ${idx + 1}`}
            classNames={{
              title: 'font-semibold'
            }}
            title={faq.question}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
