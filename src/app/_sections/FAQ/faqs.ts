export interface Faq {
  question: string
  answer: string
}

/** Shown in the FAQ section and in the home page structured data */
export const FAQS: Faq[] = [
  {
    question: 'Is there a free exercise API?',
    answer:
      'Yes. The GymFit API free plan includes 1,000 requests a month and 30 requests a minute, with every endpoint and no credit card. It is meant for prototypes and non commercial projects.'
  },
  {
    question: 'What data does each exercise include?',
    answer:
      'Name, category, difficulty, force, equipment, type (compound or isolation), laterality, target and secondary muscles, step-by-step instructions, tips, common mistakes, variations, alternatives and easier and harder progressions. A separate endpoint draws the muscle heatmap of the exercise as an SVG.'
  },
  {
    question: 'Does the API include exercise images?',
    answer:
      'No. The v2 does not serve photos or animations. Each exercise has a muscle heatmap (an SVG of the body, front and back, with the muscles colored) that you can match to your app. The legacy v1 keeps its image fields for existing integrations.'
  },
  {
    question: 'Which muscles does the API cover?',
    answer:
      '49 muscles in 21 groups (chest, lats, quadriceps, hamstrings, glutes, abs...). Every exercise lists its target and secondary muscles, and a muscle comes with its common name, its aliases and its heads.'
  },
  {
    question: 'How does the search work?',
    answer:
      'It reads typos (bech press), abbreviations (rdl, ohp), plural forms and muscles named in plain words (quads, abs no equipment), and ranks the results by relevance, then by how often the exercise is done. Filters cover muscle, equipment, category, difficulty, tier and more, and options add a suggested spelling or counts per filter.'
  },
  {
    question: 'Which fitness calculators are included?',
    answer:
      'BMI, BMR (Mifflin-St Jeor), TDEE by activity level and ideal body weight (Devine formula), one request each.'
  },
  {
    question:
      'Can I use the exercise API from Claude, Cursor or another AI assistant?',
    answer:
      'Yes. GymFit is also an MCP server. In Claude or ChatGPT, add it as a custom connector and sign in with your GymFit account; in Claude Code, Cursor, VS Code or Windsurf, add it with your API key. Your assistant then searches the exercises, finds alternatives and runs the calculators for you. Each tool call counts as one request of your plan, the free plan included.'
  },
  {
    question: 'Can I use GymFit API in a commercial app?',
    answer:
      'Yes on the Starter and Pro plans: one API key for one app on Starter, up to five on Pro. The free plan is for prototypes and non commercial projects. Reselling the data or building a competing database is not allowed (see the terms of use).'
  },
  {
    question: 'Can I store the data in my own database?',
    answer:
      'Not with an API plan: use the responses to serve your users, without keeping a durable copy of the catalog. The data pack is the offer to own the catalog, and it is open to early access requests.'
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
    question: 'Is my payment information secure?',
    answer:
      'Payments are handled by Stripe, which acts as the merchant of record and processes your card on its PCI-compliant platform. Your card details never reach our servers.'
  },
  {
    question: 'I subscribed through RapidAPI. Does anything change?',
    answer:
      'No. Your RapidAPI subscription keeps working as before, and its billing stays with RapidAPI.'
  },
  {
    question: 'What languages does the API support?',
    answer:
      'All exercise data and responses are in English. If your app needs another language, tell us: new languages are prioritized by demand.'
  },
  {
    question: 'Do you offer technical support?',
    answer:
      'Yes, by email at contact@gymfit-api.com. Mention the X-Request-Id of a response and we can find the request.'
  }
]
