export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Gym Fit',
  default_title: 'Exercise Database and Fitness Calculators',
  description:
    'Access detailed gym exercises data and essential fitness calculators (TDEE, BMR, BMI, IBW) with our API, the go-to resource for developers to create top-tier fitness apps.',
  landing_url: 'https://www.gymfit-api.com/',
  documentation_url: process.env.GYM_FIT_DOCUMENTATION_URL || '#',
  rapid_plans_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit/pricing',
  rapid_playground_url:
    'https://rapidapi.com/BastienCarcat/api/gym-fit/playground/apiendpoint_707ee9ea-69f3-4394-9975-d0e33165414b'
}
