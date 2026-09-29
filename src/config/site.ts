export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'GymFit API',
  default_title: 'Exercise Database API with Muscle Data | GymFit API',
  description:
    'Exercise database API for fitness apps: target and secondary muscles, instructions, variations and alternatives for each exercise. Free plan, no credit card.',
  landing_url: 'https://www.gymfit-api.com/',
  api_url: 'https://api.gymfit-api.com',
  contact_email: 'contact@gymfit-api.com',
  documentation_url: process.env.GYM_FIT_DOCUMENTATION_URL || '#',
  plans_url: '/dashboard/plans',
  rapid_listing_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit',
  rapid_plans_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit/pricing',
  rapid_playground_url:
    'https://rapidapi.com/BastienCarcat/api/gym-fit/playground/apiendpoint_707ee9ea-69f3-4394-9975-d0e33165414b'
}
