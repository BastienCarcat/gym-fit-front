import posthog from 'posthog-js'

const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN

/**
 * Product analytics. Nothing is sent before the visitor answers the cookie
 * banner: accepted, PostHog uses its cookies and records the sessions;
 * refused, it only counts anonymous visits, without cookies.
 */
if (token) {
  posthog.init(token, {
    // The relay of next.config.js
    api_host: '/relay',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-08-30',
    cookieless_mode: 'on_reject',
    // The password reset link carries its token in the URL
    mask_personal_data_properties: true,
    custom_personal_data_properties: ['token']
  })
}
