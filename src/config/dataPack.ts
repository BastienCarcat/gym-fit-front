import { siteConfig } from '@/config/site'

/** The data pack: the catalog as files, the only offer to keep a copy of it */
export const DATA_PACK = {
  price: 399,
  updatesMonths: 12,
  path: '/exercise-dataset',
  mailto: `mailto:${siteConfig.contact_email}?subject=${encodeURIComponent(
    'GymFit API data pack'
  )}`
}
