import { PLAN_ORDER, PLANS, planSummary } from '@/config/plans'
import { DATA_PACK } from '@/config/dataPack'
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

> REST API of gym exercises for fitness app developers. 5,800 exercises, each with its target and secondary muscles on three levels (group, muscle, head), step-by-step instructions, tips, difficulty, equipment, variations, alternatives and easier and harder progressions. A search reads typos, abbreviations and muscle names. Each exercise has a muscle heatmap as an SVG. The API also provides fitness calculators: BMI, BMR, TDEE and ideal body weight. There are no exercise photos or animations.

Responses are JSON, in English. Requests are authenticated with an API key sent in the \`X-API-Key\` header.

## Get started

- [Sign up](${absolute('/signup')}): free plan, no credit card
- [API reference](${siteConfig.api_url}/docs)
- [API reference as Markdown](${siteConfig.api_url}/docs.md): every endpoint with its parameters, an example request and an example response
- [OpenAPI specification](${siteConfig.api_url}/openapi.json)
- [Pricing](${absolute('/#pricing')})

## Endpoints

- \`GET /v2/exercises/search\`: search by text (typos, abbreviations, muscles) with filters for muscle, equipment, category, difficulty, tier, family and more; \`suggest=true\` adds a suggested spelling, \`facets=true\` adds counts per filter
- \`GET /v2/exercises/suggest\`: exercises to offer while a person types
- \`GET /v2/exercises/{idOrSlug}\`: an exercise with its muscles, steps, tips, variations, alternatives and progressions
- \`GET /v2/exercises/{idOrSlug}/alternatives\`: alternative exercises
- \`GET /v2/exercises/{idOrSlug}/heatmap\`: the muscles of the exercise as an SVG, front and back
- \`GET /v2/muscles/search\`, \`GET /v2/muscles/{id}\` and \`GET /v2/muscles/{id}/exercises\`: muscles with their common name, aliases, group and heads, and the exercises that work them
- \`GET /v2/muscle-groups\`: the 21 groups with their muscles
- \`GET /v2/equipment\`, \`/v2/categories\`, \`/v2/families\` and \`/v2/meta\`: the values the filters take
- \`GET /v2/calculator/bmi\`, \`/bmr\`, \`/tdee\` and \`/ibw\`: fitness calculators
- \`GET /v2/usage\`: your usage and remaining quota, free and not counted in it

The v1 stays available for existing integrations.

## Pricing

Monthly plans, cancel at any time. Taxes may apply depending on the customer's country.

${plans.join('\n')}

## Other

- [Data pack](${absolute(DATA_PACK.path)}): the catalog as files to keep, $${DATA_PACK.price} once with ${DATA_PACK.updatesMonths} months of updates, open to early access requests at ${siteConfig.contact_email}
- Also available on [RapidAPI](${siteConfig.rapid_listing_url}) for existing RapidAPI customers
- [Terms of use](${absolute('/terms')}) and [privacy policy](${absolute('/privacy')})
- Contact: ${siteConfig.contact_email}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
