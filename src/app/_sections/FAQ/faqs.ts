export interface Faq {
  question: string
  answer: string
}

/** Shown in the FAQ section and in the home page structured data */
export const FAQS: Faq[] = [
  {
    question: 'Is my payment information secure?',
    answer:
      'Payments are handled by Stripe, which acts as the merchant of record and processes your card on its PCI-compliant platform. Your card details never reach our servers.'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer:
      "On the Free plan, requests beyond the monthly quota are refused until the next month. On paid plans, your API keeps working: each extra request is billed at your plan's rate at the end of the month. You can follow your usage in real time from your dashboard."
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, from Manage billing in your dashboard, with no commitment or cancellation fee. Your plan stays active until the end of the current billing period.'
  },
  {
    question: 'I subscribed through RapidAPI. Does anything change?',
    answer:
      'No. Your RapidAPI subscription keeps working as before, and its billing stays with RapidAPI.'
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
]
