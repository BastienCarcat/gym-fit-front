import { siteConfig } from '@/config/site'

/**
 * Publisher details shown on the legal pages: only what French law requires
 * (LCEN), nothing more. The address is the business domiciliation.
 */
export const legal = {
  publisher: 'Bastien Carcat EI',
  address: '60 rue François 1er, 75008 Paris, France',
  siren: '993 172 873',
  vat: 'FR89993172873',
  /** Required by the LCEN for an individual publisher: set a business number */
  phone: null as string | null,
  email: siteConfig.contact_email,
  director: 'Bastien Carcat',
  updated: 'October 21, 2026',
  updatedFr: '21 octobre 2026',
  /** The same date, for the sitemap */
  updatedIso: '2026-10-21'
}
