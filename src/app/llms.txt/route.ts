import { PLAN_ORDER, PLANS, planSummary } from '@/config/plans'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static'

const absolute = (path: string) =>
  new URL(path, siteConfig.landing_url).toString()

/** Overview of the API for AI assistants and agents (https://llmstxt.org) */
export function GET() {
  const plans = PLAN_ORDER.map((id) => {
    const plan = PLANS[id]
    const price =
      plan.monthlyPrice === 0 ? 'free' : `$${plan.monthlyPrice} per month`

    return `- ${plan.name} (${price}): ${planSummary(plan)}`
  })

  const body = `# ${siteConfig.name}

> REST API of gym exercises for fitness app developers. Each exercise comes with its target and secondary muscles, step-by-step instructions, equipment, image, variations and alternative exercises. Muscles come with their heads and front and back images. The API also provides fitness calculators: BMI, BMR, TDEE and ideal body weight.

Responses are JSON, in English. Requests are authenticated with an API key sent in the \`X-API-Key\` header.

## Get started

- [Sign up](${absolute('/signup')}): free plan, no credit card
- [API reference](${siteConfig.api_url}/docs)
- [OpenAPI specification](${siteConfig.api_url}/openapi.json)
- [Pricing](${absolute('/#pricing')})

## Endpoints

- \`GET /v1/exercises/search\`: search exercises by name, body part, equipment or type
- \`GET /v1/exercises/{id}\`: an exercise with its muscles, instructions, image and variations
- \`GET /v1/exercises/{id}/alternatives\`: alternative exercises
- \`GET /v1/muscles/search\` and \`GET /v1/muscles/{id}\`: muscles with their body part, group, heads and images
- \`GET /v1/calculator/bmi\`, \`/bmr\`, \`/tdee\` and \`/ibw\`: fitness calculators
- \`GET /v1/usage\`: your usage and remaining quota

## Pricing

Monthly plans, cancel at any time. Taxes may apply depending on the customer's country.

${plans.join('\n')}

## Other

- Also available on [RapidAPI](${siteConfig.rapid_listing_url}) for existing RapidAPI customers
- [Terms of use](${absolute('/terms')}) and [privacy policy](${absolute('/privacy')})
- Contact: ${siteConfig.contact_email}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
