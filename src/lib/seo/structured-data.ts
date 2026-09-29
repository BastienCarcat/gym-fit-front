import { FAQS } from '@/app/_sections/FAQ/faqs'
import { PLAN_ORDER, PLANS, planSummary } from '@/config/plans'
import { siteConfig } from '@/config/site'

const absolute = (path: string) =>
  new URL(path, siteConfig.landing_url).toString()

/** The brand, the site, the API with its plans and the FAQ, all shown on the home page */
export function homeStructuredData() {
  const organizationId = absolute('/#organization')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.name,
        url: absolute('/'),
        logo: absolute('/logo.png'),
        email: siteConfig.contact_email,
        sameAs: [siteConfig.rapid_listing_url]
      },
      {
        '@type': 'WebSite',
        '@id': absolute('/#website'),
        name: siteConfig.name,
        url: absolute('/'),
        publisher: { '@id': organizationId }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': absolute('/#api'),
        name: siteConfig.name,
        description: siteConfig.description,
        url: absolute('/'),
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        publisher: { '@id': organizationId },
        offers: PLAN_ORDER.map((id) => ({
          '@type': 'Offer',
          name: PLANS[id].name,
          price: PLANS[id].monthlyPrice,
          priceCurrency: 'USD',
          description: planSummary(PLANS[id])
        }))
      },
      {
        '@type': 'FAQPage',
        '@id': absolute('/#faq'),
        mainEntity: FAQS.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }
    ]
  }
}
