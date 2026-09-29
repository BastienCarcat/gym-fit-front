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
  title: 'Politique de confidentialité',
  alternates: legalAlternates('/fr/confidentialite')
}

export default function ConfidentialitePage() {
  return (
    <LegalPage
      alternate="/privacy"
      lang="fr"
      title="Politique de confidentialité"
    >
      <Section title="Qui sommes-nous">
        <p>
          Le responsable du traitement est {legal.publisher}, qui exploite l’API
          GymFit. Contact : <ContactEmail />.
        </p>
        <p>
          Cette politique couvre le site gymfit-api.com, votre compte sur le
          tableau de bord et l’API GymFit. Si vous vous abonnez via RapidAPI, la
          politique de confidentialité de RapidAPI s’applique aux données qu’il
          traite.
        </p>
      </Section>

      <Section title="Données collectées">
        <List>
          <li>
            <strong>Compte</strong> : votre nom, votre adresse e-mail et votre
            mot de passe. Le mot de passe est conservé sous forme d’empreinte
            irréversible, jamais en clair.
          </li>
          <li>
            <strong>Clés d’API</strong> : conservées sous forme d’empreinte,
            avec leur nom et les premiers caractères affichés dans votre tableau
            de bord. Une clé n’est affichée qu’une seule fois, à sa création.
          </li>
          <li>
            <strong>Utilisation</strong> : pour votre compte, des totaux
            journaliers par endpoint de l’API (nombre de requêtes, catégories de
            statut des réponses, temps de réponse). Nous ne conservons pas vos
            requêtes une par une.
          </li>
          <li>
            <strong>Journaux techniques</strong> : adresse IP, chemin demandé,
            code de statut, agent utilisateur et identifiant de requête, pour la
            sécurité et le diagnostic.
          </li>
          <li>
            <strong>Facturation</strong> : votre offre, le statut de votre
            abonnement et votre identifiant client Stripe. Vos données de
            paiement sont collectées par Stripe ; nous n’y avons jamais accès.
          </li>
          <li>
            <strong>Support</strong> : les messages que vous nous envoyez par
            e-mail.
          </li>
          <li>
            <strong>Mesure d’audience</strong> : pages vues et mesures de
            performance anonymes, sans cookies (Vercel Web Analytics et Speed
            Insights).
          </li>
        </List>
      </Section>

      <Section title="Finalités et bases légales">
        <List>
          <li>
            Fournir votre compte, vos clés d’API, vos quotas et vos statistiques
            d’utilisation, et facturer les offres payantes : exécution du
            contrat qui nous lie.
          </li>
          <li>
            Sécuriser le service (limites de débit, prévention des abus,
            journaux), surveiller les erreurs et améliorer l’API à partir de
            statistiques agrégées : notre intérêt légitime à faire fonctionner
            un service fiable et sûr.
          </li>
          <li>Tenir notre comptabilité : nos obligations légales.</li>
          <li>
            Envoyer les e-mails de service (confirmation de l’adresse,
            réinitialisation du mot de passe, informations sur le compte) :
            exécution du contrat. Nous n’envoyons pas d’e-mails commerciaux.
          </li>
        </List>
      </Section>

      <Section title="Durées de conservation">
        <List>
          <li>
            Compte, clés d’API et informations de facturation : jusqu’à la
            suppression de votre compte. La suppression est immédiate et se fait
            à tout moment depuis la page Settings de votre tableau de bord.
          </li>
          <li>
            Statistiques d’utilisation : conservées pour le service et la
            facturation tant que votre compte existe. Après sa suppression, les
            totaux journaliers restants ne sont plus rattachés à aucune
            personne.
          </li>
          <li>
            Journaux techniques : 7 jours. Rapports d’erreur : 90 jours au
            maximum.
          </li>
          <li>
            Données de paiement : conservées par Stripe comme la loi l’impose.
            Nos propres pièces comptables sont conservées pendant la durée
            légale de 10 ans.
          </li>
        </List>
      </Section>

      <Section title="Destinataires">
        <p>
          Nous ne vendons pas vos données. Elles sont traitées pour notre compte
          par les prestataires suivants, chacun pour sa finalité :
        </p>
        <List>
          <li>
            Vercel Inc. (États-Unis) : hébergement du site et mesure d’audience
            anonyme.
          </li>
          <li>
            Railway Corporation (États-Unis) : hébergement de l’API, de la base
            de données et des journaux techniques.
          </li>
          <li>Resend, Inc. (États-Unis) : envoi des e-mails de service.</li>
          <li>
            Functional Software, Inc. / Sentry (États-Unis) : surveillance des
            erreurs.
          </li>
          <li>
            OVH SAS (France) : hébergement de notre messagerie de support.
          </li>
          <li>
            Stripe : paiements. Stripe agit en tant que vendeur officiel
            (merchant of record) des offres payantes et traite vos données de
            paiement selon sa propre{' '}
            <TextLink href="https://stripe.com/fr/privacy">
              politique de confidentialité
            </TextLink>
            .
          </li>
        </List>
        <p>
          Les images des exercices sont stockées par Scaleway SAS (France) ;
          aucune donnée personnelle n’y est conservée.
        </p>
      </Section>

      <Section title="Transferts hors de l’Union européenne">
        <p>
          Certains prestataires sont situés aux États-Unis. Ces transferts
          reposent sur le cadre de protection des données UE-États-Unis (Data
          Privacy Framework) ou sur les clauses contractuelles types de la
          Commission européenne.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Nous utilisons uniquement un cookie strictement nécessaire, qui vous
          garde connecté à votre tableau de bord. Il ne requiert pas de
          consentement. Nous n’utilisons aucun cookie publicitaire ni de
          traçage, et notre mesure d’audience fonctionne sans cookies.
        </p>
      </Section>

      <Section title="Sécurité">
        <p>
          Toutes les communications sont chiffrées (HTTPS). Les mots de passe et
          les clés d’API sont conservés sous forme d’empreinte, l’accès aux
          systèmes de production est restreint et les requêtes sont limitées
          pour prévenir les abus.
        </p>
      </Section>

      <Section title="Vos droits">
        <p>
          Vous pouvez accéder à vos données, les rectifier ou les effacer, vous
          opposer à leur traitement ou le limiter, et en demander une copie dans
          un format portable. Vous pouvez supprimer vous-même votre compte à
          tout moment depuis votre tableau de bord. Pour toute autre demande,
          écrivez à <ContactEmail /> ; nous répondons sous un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          adresser une réclamation à la CNIL (
          <TextLink href="https://www.cnil.fr">cnil.fr</TextLink>).
        </p>
      </Section>

      <Section title="Mineurs">
        <p>
          Le service s’adresse aux développeurs et aux entreprises. Il ne
          s’adresse pas aux enfants de moins de 15 ans et nous ne collectons pas
          sciemment leurs données.
        </p>
      </Section>

      <Section title="Modifications">
        <p>
          Nous pouvons mettre à jour cette politique. La date en haut de page
          indique la dernière version ; les changements importants sont annoncés
          par e-mail.
        </p>
      </Section>
    </LegalPage>
  )
}
