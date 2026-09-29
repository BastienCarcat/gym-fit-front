import type { Metadata } from 'next'

import {
  ContactEmail,
  LegalPage,
  List,
  Section,
  TextLink
} from '@/components/legal/LegalPage'
import { legal } from '@/config/legal'
import { legalAlternates } from '@/lib/seo/alternates'

export const metadata: Metadata = {
  title: 'Mentions légales',
  alternates: legalAlternates('/fr/mentions-legales')
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage alternate="/legal" lang="fr" title="Mentions légales">
      <Section title="Éditeur">
        <p>
          Le site et le service GymFit API (gymfit-api.com) sont édités par :
        </p>
        <List>
          <li>{legal.publisher} (entrepreneur individuel)</li>
          <li>Adresse : {legal.address}</li>
          <li>SIREN : {legal.siren}</li>
          <li>Numéro de TVA intracommunautaire : {legal.vat}</li>
          <li>
            E-mail : <ContactEmail />
            {legal.phone && ` · Téléphone : ${legal.phone}`}
          </li>
          <li>Directeur de la publication : {legal.director}</li>
        </List>
      </Section>

      <Section title="Hébergement">
        <List>
          <li>
            Site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis (
            <TextLink href="https://vercel.com">vercel.com</TextLink>)
          </li>
          <li>
            API et base de données : Railway Corporation, 548 Market St PMB
            68956, San Francisco, CA 94104, États-Unis (
            <TextLink href="https://railway.com">railway.com</TextLink>)
          </li>
          <li>
            Images des exercices : Scaleway SAS, 8 rue de la Ville l’Évêque,
            75008 Paris, France (
            <TextLink href="https://www.scaleway.com">scaleway.com</TextLink>)
          </li>
        </List>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L’API GymFit, ses données, images, sa documentation, son nom et son
          logo sont protégés par le droit de la propriété intellectuelle et
          appartiennent à {legal.publisher}. Toute reproduction ou utilisation
          en dehors des{' '}
          <TextLink href="/fr/cgu">conditions générales d’utilisation</TextLink>{' '}
          nécessite un accord écrit préalable.
        </p>
      </Section>

      <Section title="Données personnelles">
        <p>
          La façon dont nous collectons et utilisons les données personnelles,
          et dont vous pouvez exercer vos droits, est décrite dans notre{' '}
          <TextLink href="/fr/confidentialite">
            politique de confidentialité
          </TextLink>
          .
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Pour toute question sur ce site ou le service, écrivez à{' '}
          <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
