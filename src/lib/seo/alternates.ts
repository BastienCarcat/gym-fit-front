import { Metadata } from 'next'

/** Legal pages exist in English and French: each one points to its translation */
export const LEGAL_PAIRS = [
  { en: '/terms', fr: '/fr/cgu' },
  { en: '/privacy', fr: '/fr/confidentialite' },
  { en: '/legal', fr: '/fr/mentions-legales' }
] as const

export function legalAlternates(path: string): Metadata['alternates'] {
  const pair = LEGAL_PAIRS.find(({ en, fr }) => en === path || fr === path)

  return {
    canonical: path,
    languages: pair && { en: pair.en, fr: pair.fr, 'x-default': pair.en }
  }
}
