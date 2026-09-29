import type { Metadata } from 'next'
import {
  ContactEmail,
  LegalPage,
  List,
  Section,
  TextLink
} from '@/components/legal/LegalPage'
import { legal } from '@/config/legal'

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation'
}

export default function CguPage() {
  return (
    <LegalPage
      title="GymFit API — Conditions générales d’utilisation"
      lang="fr"
      alternate="/terms"
    >
      <Section title="Qui sommes-nous et acceptation">
        <p>
          L’API GymFit (« GymFit », « nous ») est exploitée par{' '}
          {legal.publisher} ({legal.tradeName}), {legal.address}. Voir les{' '}
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
          L’API GymFit fournit des données structurées sur les exercices, des
          informations sur les muscles, des médias (comme des images
          d’exercices) et des calculateurs de fitness. Vous pouvez l’utiliser
          gratuitement dans les limites de l’offre Free, ou souscrire à une
          offre payante pour des limites plus élevées.
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
            Chaque offre comprend un nombre de requêtes par mois et une limite
            de débit par minute, indiqués sur la{' '}
            <TextLink href="/#pricing">page des offres</TextLink>. Seules
            les requêtes réussies comptent dans le quota et la facture.
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
            Les prix sont indiqués hors taxes. L’abonnement mensuel est payé
            d’avance ; les requêtes supplémentaires sont facturées à la fin de
            chaque période.
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

      <Section title="Contenus et médias">
        <p>
          Les médias sont fournis par des URL signées qui expirent après un
          délai limité (en général 24 heures). Ces URL ne doivent pas être
          conservées, redistribuées ni réutilisées après leur expiration. Nous
          pouvons mettre à jour ou retirer des données ou des médias à tout
          moment.
        </p>
      </Section>

      <Section title="Usages interdits">
        <p>
          Vous pouvez intégrer les données GymFit dans votre site, votre
          application ou votre produit numérique, mais vous ne pouvez pas :
        </p>
        <List>
          <li>
            utiliser l’API ou ses données pour créer une base de données, un
            service ou une API concurrents ;
          </li>
          <li>
            redistribuer, revendre ou concéder en sous-licence des données ou
            des médias obtenus par l’API ;
          </li>
          <li>
            stocker, archiver ou mettre en cache des données de l’API, y compris
            transformées ou dérivées : toutes les données doivent être
            récupérées depuis l’API ;
          </li>
          <li>
            dupliquer, aspirer ou télécharger en masse le contenu de l’API ;
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
          exercices, descriptions, catégories et métadonnées, images et autres
          médias, structures de données et formats de réponse, documentation,
          logiciels, ainsi que le nom et le logo GymFit. Votre abonnement vous
          accorde une licence non exclusive, non transférable et révocable pour
          utiliser l’API et ses données dans le cadre de votre offre et des
          présentes conditions. Il ne vous transfère aucun droit de propriété.
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
          appropriés.
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
