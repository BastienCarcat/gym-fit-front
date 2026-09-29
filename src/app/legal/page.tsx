import type { Metadata } from 'next'
import {
  ContactEmail,
  LegalPage,
  List,
  Section,
  TextLink
} from '@/components/legal/LegalPage'
import { legal } from '@/config/legal'

export const metadata: Metadata = { title: 'Legal notice' }

export default function LegalNoticePage() {
  return (
    <LegalPage title="Legal notice">
      <Section title="Publisher">
        <p>
          The GymFit API website and service (gymfit-api.com) are published by:
        </p>
        <List>
          <li>
            {legal.publisher}, trading as {legal.tradeName}, {legal.status}
          </li>
          <li>Address: {legal.address}</li>
          <li>
            SIREN: {legal.siren} · SIRET: {legal.siret} · APE code: {legal.ape}
          </li>
          <li>VAT number: {legal.vat}</li>
          <li>
            Email: <ContactEmail /> · Phone: {legal.phone}
          </li>
          <li>Publication director: {legal.director}</li>
        </List>
      </Section>

      <Section title="Hosting">
        <List>
          <li>
            Website: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            USA (<TextLink href="https://vercel.com">vercel.com</TextLink>)
          </li>
          <li>
            API and database: Railway Corporation, 548 Market St PMB 68956, San
            Francisco, CA 94104, USA (
            <TextLink href="https://railway.com">railway.com</TextLink>)
          </li>
          <li>
            Exercise images: Scaleway SAS, 8 rue de la Ville l’Évêque, 75008
            Paris, France (
            <TextLink href="https://www.scaleway.com">scaleway.com</TextLink>)
          </li>
        </List>
      </Section>

      <Section title="Intellectual property">
        <p>
          The GymFit API, its data, images, documentation, name and logo are
          protected by intellectual property law and belong to {legal.publisher}
          . Any reproduction or use outside the{' '}
          <TextLink href="/terms">Terms of Use</TextLink> requires prior written
          consent.
        </p>
      </Section>

      <Section title="Personal data">
        <p>
          How we collect and use personal data, and how to exercise your rights,
          is described in our{' '}
          <TextLink href="/privacy">Privacy Policy</TextLink>.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For any question about this website or the service, write to{' '}
          <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
