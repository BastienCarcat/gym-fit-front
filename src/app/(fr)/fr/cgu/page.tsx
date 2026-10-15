import type { Metadata } from 'next'

import {
  ContactEmail,
  LegalPage,
  List,
  Section,
  TextLink
} from '@/components/legal/LegalPage'
import { legal } from '@/config/legal'
import { legalMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = legalMetadata({
  path: '/fr/cgu',
  title: 'Conditions générales d’utilisation',
  description:
    'Conditions générales d’utilisation de l’API GymFit : compte et clés d’API, offres, quotas, facturation, usages interdits et responsabilité.',
  lang: 'fr'
})

export default function CguPage() {
  return (
    <LegalPage
      alternate="/terms"
      lang="fr"
      title="GymFit API — Conditions générales d’utilisation"
    >
      <Section title="Qui sommes-nous et acceptation">
        <p>
          L’API GymFit (« GymFit », « nous ») est exploitée par{' '}
          {legal.publisher}. Voir les{' '}
          <TextLink href="/fr/mentions-legales">mentions légales</TextLink>.
        </p>
        <p>
          En créant un compte, en utilisant une clé d’API ou en souscrivant à
          une offre, vous (« vous », l’utilisateur) acceptez les présentes
          conditions générales d’utilisation. Si vous agissez pour le compte
          d’une société, vous confirmez être habilité à l’engager.
        </p>
      </Section>

      <Section title="Le service">
        <p>
          L’API GymFit fournit des données structurées sur les exercices
          (muscles, étapes, alternatives et progressions), une recherche, des
          cartes des muscles (heatmaps) et des calculateurs de fitness. Vous
          pouvez l’utiliser gratuitement dans les limites de l’offre Free, ou
          souscrire à une offre payante pour des limites plus élevées et un
          usage commercial. Le data pack, le catalogue en fichiers acheté une
          fois, a sa propre licence (voir « Le data pack » ci-dessous).
        </p>
      </Section>

      <Section title="Compte et clés d’API">
        <List>
          <li>
            Vous devez fournir une adresse e-mail valide et protéger votre mot
            de passe.
          </li>
          <li>
            Vos clés d’API sont confidentielles. Ne les publiez pas dans un
            dépôt de code ni dans du code exécuté côté client. Vous êtes
            responsable de toutes les requêtes faites avec vos clés, y compris
            des frais qu’elles entraînent.
          </li>
          <li>
            Si une clé est exposée, révoquez-la ou remplacez-la immédiatement
            depuis votre tableau de bord. Une clé révoquée cesse de fonctionner
            aussitôt ; une clé remplacée reste valable 24 heures, le temps de
            déployer la nouvelle.
          </li>
        </List>
      </Section>

      <Section title="Offres, quotas et limites de débit">
        <List>
          <li>
            L’offre Free est réservée aux prototypes, aux tests et aux projets
            personnels. Utiliser l’API dans un produit qui rapporte de l’argent
            demande une offre payante.
          </li>
          <li>
            Une clé d’API sert une seule application ou un seul service. Votre
            offre fixe le nombre de clés actives que vous pouvez détenir :
            n’utilisez pas une même clé pour plusieurs produits.
          </li>
          <li>
            Chaque offre comprend un nombre de requêtes par mois et une limite
            de débit par minute, indiqués sur la{' '}
            <TextLink href="/#pricing">page des offres</TextLink>. Seules les
            requêtes réussies comptent dans le quota et la facture.
          </li>
          <li>
            Avec l’offre Free, les requêtes au-delà du quota mensuel sont
            refusées jusqu’au mois suivant.
          </li>
          <li>
            Avec une offre payante, les requêtes au-delà du quota inclus ne sont
            pas bloquées : chaque requête supplémentaire est facturée au prix de
            votre offre à la fin de la période mensuelle. Il n’y a pas de
            plafond aux requêtes supplémentaires ; vous suivez votre
            consommation en temps réel dans votre tableau de bord.
          </li>
          <li>
            Les requêtes au-delà de la limite de débit par minute sont refusées
            avec une erreur et ne sont pas facturées.
          </li>
        </List>
      </Section>

      <Section title="Facturation et paiement">
        <List>
          <li>
            Les offres payantes sont vendues par l’intermédiaire de Stripe, qui
            agit en tant que vendeur officiel (merchant of record) : Stripe
            traite le paiement, calcule et collecte les taxes applicables et
            émet les reçus. Les conditions de Stripe s’appliquent également à
            l’achat.
          </li>
          <li>
            Les prix sont indiqués toutes taxes comprises : la TVA ou la taxe
            sur les ventes applicable est incluse dans le prix affiché.
            L’abonnement mensuel est payé d’avance ; les requêtes
            supplémentaires sont facturées à la fin de chaque période.
          </li>
          <li>
            Votre abonnement est renouvelé chaque mois jusqu’à sa résiliation.
          </li>
          <li>
            Si un paiement échoue et que les nouvelles tentatives n’aboutissent
            pas, votre abonnement peut être résilié et votre compte repasser sur
            l’offre Free.
          </li>
          <li>
            Nous pouvons modifier nos prix. Les nouveaux prix s’appliquent aux
            abonnements en cours seulement après en avoir été informé par
            e-mail, et à partir de la période suivante.
          </li>
        </List>
      </Section>

      <Section title="Changement d’offre, résiliation et suppression du compte">
        <List>
          <li>
            Lorsque vous changez d’offre, votre date de renouvellement ne change
            pas, la différence de prix est calculée au prorata sur votre
            prochaine facture, et vos requêtes incluses repartent avec la
            nouvelle offre.
          </li>
          <li>
            Vous pouvez résilier à tout moment depuis « Manage billing » dans
            votre tableau de bord. La résiliation prend effet à la fin de la
            période en cours ; les requêtes supplémentaires faites jusque-là
            sont facturées sur une dernière facture.
          </li>
          <li>
            La suppression de votre compte résilie immédiatement votre
            abonnement, sans remboursement du mois en cours. Les requêtes
            supplémentaires déjà faites sont facturées sur une dernière facture,
            et vos clés d’API cessent de fonctionner aussitôt.
          </li>
        </List>
      </Section>

      <Section title="Remboursements et droit de rétractation">
        <p>
          L’abonnement mensuel n’est pas remboursable, sauf lorsque la loi en
          dispose autrement. Si vous êtes un consommateur, vous bénéficiez du
          droit de rétractation prévu par le droit de la consommation de votre
          pays ; les demandes de remboursement et de rétractation sont traitées
          avec Stripe, en tant que vendeur officiel. Contactez-nous d’abord à{' '}
          <ContactEmail /> : une contestation de paiement faite sans nous
          contacter peut entraîner la fermeture de votre compte.
        </p>
      </Section>

      <Section title="Abonnements via RapidAPI">
        <p>
          Si vous vous abonnez à l’API GymFit via RapidAPI, la facturation, les
          quotas et la résiliation sont gérés par RapidAPI selon ses propres
          conditions. Les présentes conditions s’appliquent toujours à votre
          utilisation de l’API et de ses données.
        </p>
      </Section>

      <Section title="Le data pack">
        <p>
          Le data pack est vendu une fois, pour un usage professionnel
          uniquement, et régi par sa propre licence, présentée avant l’achat sur
          la page{' '}
          <TextLink href="/exercise-dataset/license">
            de la licence du data pack
          </TextLink>{' '}
          et livrée avec chaque copie. Chaque copie est marquée à sa licence.
          Les présentes conditions s’appliquent aussi à son achat : compte,
          facturation par Stripe, données personnelles et droit applicable.
        </p>
      </Section>

      <Section title="Cache et stockage">
        <List>
          <li>
            Vous pouvez garder les réponses de l’API dans un cache technique
            pendant 1 heure au plus, pour accélérer votre application, ou
            pendant la durée qu’une réponse indique dans son en-tête
            Cache-Control (les heatmaps). Un cache sert une seule application :
            il ne doit pas devenir une copie du catalogue.
          </li>
          <li>
            Vous pouvez conserver dans le contenu de vos utilisateurs, comme
            leur historique de séances, les identifiants et les noms des
            exercices auxquels il renvoie.
          </li>
          <li>Toute autre copie durable des données demande le data pack.</li>
          <li>
            À la fin de votre offre ou de votre compte, cessez d’utiliser les
            données conservées, sauf les identifiants et les noms présents dans
            le contenu de vos utilisateurs.
          </li>
          <li>
            Nous pouvons mettre à jour ou retirer des données à tout moment.
          </li>
        </List>
      </Section>

      <Section title="Usages interdits">
        <p>
          Vous pouvez intégrer les données GymFit dans votre site, votre
          application ou votre produit numérique, mais vous ne pouvez pas :
        </p>
        <List>
          <li>
            utiliser l’API ou ses données pour créer une base de données, un jeu
            de données, un service ou une API concurrents ;
          </li>
          <li>
            redistribuer, revendre ou concéder en sous-licence des données
            obtenues par l’API, ou les mettre à disposition de tiers par votre
            propre API, un téléchargement, un export ou un flux ;
          </li>
          <li>
            extraire une partie substantielle du catalogue, y compris par des
            requêtes répétées ou systématiques portant sur des parties plus
            petites, par exemple en parcourant les exercices un par un ;
          </li>
          <li>
            dupliquer, aspirer ou télécharger en masse le contenu de l’API ;
          </li>
          <li>
            utiliser les données pour entraîner, ajuster ou évaluer un modèle
            d’apprentissage automatique, ou les inclure dans un jeu
            d’entraînement. Un assistant ou un agent d’IA, y compris par notre
            serveur MCP, peut répondre à vos utilisateurs avec les données,
            chaque appel comptant comme une requête ;
          </li>
          <li>
            partager votre compte ou vos clés d’API pour contourner les limites
            de votre offre ;
          </li>
          <li>
            laisser entendre un partenariat ou une approbation de GymFit sans
            notre accord écrit ;
          </li>
          <li>utiliser l’API en violation des lois applicables.</li>
        </List>
      </Section>

      <Section title="Abus et suspension">
        <p>
          Nous surveillons l’utilisation pour garder le service stable pour
          tous. Nous pouvons limiter, suspendre ou fermer un compte en cas
          d’abus (requêtes automatisées en masse, tentatives de surcharge ou de
          contournement du service, manquement aux présentes conditions), en
          prévenant lorsque c’est possible. Les sommes déjà dues restent
          exigibles.
        </p>
        <p>
          Si vous agissez en tant que professionnel, une extraction d’une partie
          substantielle du catalogue en violation des présentes conditions vous
          rend redevable du prix de la licence du data pack (399 $ US, toutes
          taxes comprises), sans préjudice de dommages et intérêts
          supplémentaires et de la fermeture de votre compte. Les réponses de
          l’API peuvent porter des marques qui identifient le compte auquel
          elles ont été servies : entre professionnels, la présence de ces
          marques dans une copie prouve qu’elle provient de ce compte, sauf
          preuve contraire.
        </p>
      </Section>

      <Section title="Mention de GymFit sur l’offre Free">
        <p>
          Si vous utilisez l’offre Free dans une application ou un site visible
          par d’autres, mentionnez « Exercise data by GymFit (gymfit-api.com) »,
          avec un lien, sur une page accessible à vos utilisateurs, comme la
          page à propos, crédits ou mentions légales. Les offres payantes ne
          demandent aucune mention.
        </p>
      </Section>

      <Section title="Évolutions de l’API">
        <p>
          Nous pouvons modifier, faire évoluer ou arrêter des parties de l’API,
          y compris les endpoints, les structures de données et les méthodes
          d’authentification. Nous annonçons à l’avance les changements
          incompatibles chaque fois que c’est possible. Il vous appartient de
          maintenir la compatibilité de votre intégration.
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          Tous les droits sur l’API GymFit nous appartiennent : données sur les
          exercices, descriptions, catégories et métadonnées, heatmaps des
          muscles, structures de données et formats de réponse, documentation,
          logiciels, ainsi que le nom et le logo GymFit. Le catalogue est
          protégé notamment par le droit du producteur de base de données
          (articles L341-1 et suivants du Code de la propriété intellectuelle,
          directive 96/9/CE). Votre abonnement vous accorde une licence non
          exclusive, non transférable et révocable pour utiliser l’API et ses
          données dans le cadre de votre offre et des présentes conditions. Il
          ne vous transfère aucun droit de propriété.
        </p>
      </Section>

      <Section title="Informations de santé">
        <p>
          Les données GymFit, y compris les exercices et les calculateurs comme
          le métabolisme de base (BMR), la dépense énergétique journalière
          (TDEE), l’IMC (BMI) et le poids idéal, sont fournies à titre
          d’information générale. Elles ne constituent pas un avis médical,
          nutritionnel ou de santé. Si vous les présentez à vos propres
          utilisateurs, il vous appartient de leur donner les avertissements
          appropriés, et vous répondez des exercices que vous leur proposez et
          de leur sécurité. Dans la mesure permise par la loi, nous ne sommes
          pas responsables des blessures subies en réalisant un exercice.
        </p>
      </Section>

      <Section title="Garantie et disponibilité">
        <p>
          L’API et ses données sont fournies « en l’état » et « selon
          disponibilité ». Nous veillons à leur exactitude et à leur fiabilité,
          mais nous ne garantissons pas que les données sont complètes ou
          exemptes d’erreurs, que l’API est toujours disponible, ni qu’elle
          convient à un usage particulier. Aucun taux de disponibilité n’est
          garanti.
        </p>
      </Section>

      <Section title="Responsabilité">
        <p>
          Dans la mesure permise par la loi, nous ne sommes pas responsables des
          dommages indirects, comme une perte de bénéfices, de chiffre
          d’affaires ou de données, et notre responsabilité totale est limitée
          aux sommes que vous nous avez versées au cours des 12 mois précédant
          la réclamation. Rien dans les présentes conditions ne limite les
          droits que les consommateurs tiennent des dispositions impératives de
          la loi.
        </p>
        <p>
          Si vous utilisez l’API à titre professionnel, vous nous garantissez
          contre toute réclamation liée à un mauvais usage de l’API, à un
          manquement aux présentes conditions ou aux produits que vous
          construisez avec ses données.
        </p>
      </Section>

      <Section title="Données personnelles">
        <p>
          Nous traitons les données personnelles comme décrit dans notre{' '}
          <TextLink href="/fr/confidentialite">
            politique de confidentialité
          </TextLink>
          .
        </p>
      </Section>

      <Section title="Force majeure">
        <p>
          Nous ne sommes pas responsables des retards ou défaillances dus à des
          événements échappant à notre contrôle raisonnable, comme des
          catastrophes naturelles, des pannes de réseau, des cyberattaques ou
          des interruptions de prestataires tiers.
        </p>
      </Section>

      <Section title="Droit applicable et litiges">
        <p>
          Les présentes conditions sont soumises au droit français. Si vous
          agissez en tant que professionnel, tout litige relève de la compétence
          exclusive des tribunaux de Paris. Si vous êtes un consommateur, vous
          conservez la protection des règles impératives et des tribunaux de
          votre pays de résidence. Si une clause est déclarée nulle, les autres
          restent en vigueur. Ces conditions existent aussi en anglais ; en cas
          de divergence, la version française prévaut.
        </p>
      </Section>

      <Section title="Modification des conditions">
        <p>
          Nous pouvons modifier les présentes conditions. Les changements
          importants sont annoncés par e-mail au moins 30 jours avant leur
          entrée en vigueur ; continuer à utiliser l’API ensuite vaut
          acceptation. Vous pouvez fermer votre compte à tout moment si vous
          n’êtes pas d’accord.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Pour toute question sur ces conditions, écrivez à <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
