import { siteConfig } from '@/config/site'

/** Publisher details required by French law (LCEN), shown on the legal pages */
export const legal = {
  publisher: 'Bastien Carcat EI',
  tradeName: 'Scrole',
  status: 'individual entrepreneur (micro-entreprise)',
  address: '60 rue François 1er, 75008 Paris, France',
  siren: '993 172 873',
  siret: '993 172 873 00016',
  ape: '6201Z',
  vat: 'FR89993172873',
  /** Required by the LCEN for an individual publisher: set a business number */
  phone: null as string | null,
  email: siteConfig.contact_email,
  director: 'Bastien Carcat',
  updated: 'September 29, 2026',
  updatedFr: '29 septembre 2026'
}
