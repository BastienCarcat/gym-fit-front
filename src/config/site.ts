export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Gym-fit API',
  description: 'The all in one fitness API',
  documentation_url: process.env.GYM_FIT_DOCUMENTATION_URL,
  rapid_plans_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit/pricing',
  rapid_playground_url:
    'https://rapidapi.com/BastienCarcat/api/gym-fit/playground/apiendpoint_707ee9ea-69f3-4394-9975-d0e33165414b'
}
