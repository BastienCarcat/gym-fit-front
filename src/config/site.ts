export type SiteConfig = typeof siteConfig

const API_URL = 'https://api.gymfit-api.com'

export const siteConfig = {
  name: 'GymFit API',
  // Half the clicks from Search come from "exercise database" queries
  default_title: 'Exercise Database API for Fitness Apps | GymFit API',
  // 160 characters at most: search results cut beyond
  description:
    'Exercise API for fitness apps: 5,800 exercises with target and secondary muscles, alternatives, muscle heatmaps and smart search. Free plan, no credit card.',
  landing_url: 'https://www.gymfit-api.com/',
  api_url: API_URL,
  contact_email: 'contact@gymfit-api.com',
  // A constant: client components cannot read server environment variables
  documentation_url: `${API_URL}/docs`,
  plans_url: '/dashboard/plans',
  rapid_listing_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit',
  rapid_plans_url: 'https://rapidapi.com/BastienCarcat/api/gym-fit/pricing',
  rapid_playground_url:
    'https://rapidapi.com/BastienCarcat/api/gym-fit/playground/apiendpoint_707ee9ea-69f3-4394-9975-d0e33165414b'
}
