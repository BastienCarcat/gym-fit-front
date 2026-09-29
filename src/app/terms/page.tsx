import type { Metadata } from 'next'
import {
  ContactEmail,
  LegalPage,
  List,
  Section,
  TextLink
} from '@/components/legal/LegalPage'
import { legal } from '@/config/legal'

export const metadata: Metadata = { title: 'Terms of use' }

export default function TermsOfUsePage() {
  return (
    <LegalPage title="GymFit API — Terms of Use" alternate="/fr/cgu">
      <Section title="Who we are and acceptance">
        <p>
          The GymFit API (“GymFit”, “we”) is operated by {legal.publisher} (
          {legal.tradeName}), {legal.address}. See the{' '}
          <TextLink href="/legal">legal notice</TextLink>.
        </p>
        <p>
          By creating an account, using an API key or subscribing to a plan, you
          (“you”, the user) accept these Terms of Use. If you act for a company,
          you confirm that you are authorized to bind it.
        </p>
      </Section>

      <Section title="The service">
        <p>
          The GymFit API provides structured exercise data, muscle information,
          media assets (such as exercise images) and fitness calculators. You
          can use it for free within the limits of the Free plan, or subscribe
          to a paid plan for higher limits.
        </p>
      </Section>

      <Section title="Accounts and API keys">
        <List>
          <li>
            You must give a valid email address and keep your password secure.
          </li>
          <li>
            Your API keys are confidential. Do not publish them in code
            repositories or client-side code. You are responsible for all
            requests made with your keys, including the charges they cause.
          </li>
          <li>
            If a key is exposed, revoke or replace it right away from your
            dashboard. A revoked key stops working immediately; a replaced key
            keeps working for 24 hours so you can deploy the new one.
          </li>
        </List>
      </Section>

      <Section title="Plans, quotas and rate limits">
        <List>
          <li>
            Each plan includes a number of requests per month and a rate limit
            per minute, shown on the{' '}
            <TextLink href="/dashboard/plans">pricing page</TextLink>. Only
            successful requests count towards the quota and the bill.
          </li>
          <li>
            On the Free plan, requests beyond the monthly quota are refused
            until the next month.
          </li>
          <li>
            On paid plans, requests beyond the included quota are not blocked:
            each extra request is billed at the price of your plan at the end of
            the monthly period. There is no cap on extra requests; you can
            follow your usage in real time in your dashboard.
          </li>
          <li>
            Requests above the rate limit per minute are refused with an error
            and are not billed.
          </li>
        </List>
      </Section>

      <Section title="Billing and payment">
        <List>
          <li>
            Paid plans are sold through Stripe, which acts as the merchant of
            record: Stripe processes the payment, calculates and collects the
            applicable taxes and issues the receipts. Stripe’s terms also apply
            to the purchase.
          </li>
          <li>
            Prices are shown excluding taxes. The monthly fee is charged in
            advance; extra requests are charged at the end of each period.
          </li>
          <li>Your subscription renews every month until you cancel it.</li>
          <li>
            If a payment fails and the retries do not succeed, your subscription
            may be cancelled and your account moved back to the Free plan.
          </li>
          <li>
            We may change our prices. The new prices apply to existing
            subscriptions only after notice by email and from the next period.
          </li>
        </List>
      </Section>

      <Section title="Plan changes, cancellation and account deletion">
        <List>
          <li>
            When you change plan, your renewal date stays the same, the price
            difference is prorated on your next invoice, and your included
            requests start again with the new plan.
          </li>
          <li>
            You can cancel at any time from “Manage billing” in your dashboard.
            The cancellation takes effect at the end of the current period;
            extra requests made until then are billed on a final invoice.
          </li>
          <li>
            Deleting your account cancels your subscription immediately, without
            refund of the current month. Extra requests already made are billed
            on a final invoice, and your API keys stop working immediately.
          </li>
        </List>
      </Section>

      <Section title="Refunds and right of withdrawal">
        <p>
          Monthly fees are not refundable, except where the law requires
          otherwise. If you are a consumer, you benefit from the withdrawal
          rights granted by the consumer law of your country; refund and
          withdrawal requests are handled with Stripe, as the merchant of
          record. Contact us first at <ContactEmail />: a chargeback made
          without contacting us may lead to the closing of your account.
        </p>
      </Section>

      <Section title="Subscriptions through RapidAPI">
        <p>
          If you subscribe to the GymFit API through RapidAPI, billing, quotas
          and cancellation are managed by RapidAPI under its own terms. These
          Terms of Use still apply to your use of the API and its data.
        </p>
      </Section>

      <Section title="Content and media">
        <p>
          Media files are provided through signed URLs that expire after a
          limited time (typically 24 hours). These URLs must not be stored,
          redistributed or reused after they expire. We may update or remove any
          data or media at any time.
        </p>
      </Section>

      <Section title="Prohibited uses">
        <p>
          You may integrate GymFit data into your website, application or
          digital product, but you may not:
        </p>
        <List>
          <li>
            use the API or its data to build a competing database, service or
            API;
          </li>
          <li>
            redistribute, resell or sublicense data or media obtained from the
            API;
          </li>
          <li>
            store, archive or cache API data, including transformed or derived
            data: all data must be fetched from the API;
          </li>
          <li>mirror, scrape or bulk-download API content;</li>
          <li>
            share your account or API keys to get around the limits of your
            plan;
          </li>
          <li>
            suggest an endorsement or partnership with GymFit without our
            written consent;
          </li>
          <li>use the API in breach of applicable laws.</li>
        </List>
      </Section>

      <Section title="Abuse and suspension">
        <p>
          We monitor usage to keep the service stable for everyone. We may
          throttle, suspend or close an account in case of abuse (automated bulk
          requests, attempts to overload or bypass the service, breach of these
          terms), with notice when possible. Amounts already due remain payable.
        </p>
      </Section>

      <Section title="Changes to the API">
        <p>
          We may modify, update or discontinue parts of the API, including
          endpoints, data structures and authentication methods. We give advance
          notice of breaking changes whenever possible. You are responsible for
          keeping your integration compatible.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          All rights in the GymFit API remain ours: exercise data, descriptions,
          categories and metadata, images and other media, data structures and
          response formats, documentation, software, and the GymFit name and
          logo. Your subscription grants you a non-exclusive, non-transferable
          and revocable license to use the API and its data within your plan and
          these terms. It does not transfer any ownership.
        </p>
      </Section>

      <Section title="Health information">
        <p>
          GymFit data, including exercises and calculators such as BMR, TDEE,
          BMI and ideal body weight, is provided for general information only.
          It is not medical, nutritional or health advice. If you show it to
          your own users, you are responsible for giving them the appropriate
          warnings.
        </p>
      </Section>

      <Section title="Warranty and availability">
        <p>
          The API and its data are provided “as is” and “as available”. We
          strive for accuracy and reliability, but we do not guarantee that the
          data is complete or error-free, that the API is always available, or
          that it suits a particular purpose. There is no guaranteed uptime.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          To the extent permitted by law, we are not liable for indirect damages
          such as loss of profits, revenue or data, and our total liability is
          limited to the amounts you paid us in the 12 months before the claim.
          Nothing in these terms limits the rights that consumers hold under
          mandatory law.
        </p>
        <p>
          If you use the API for professional purposes, you agree to indemnify
          us against claims arising from your misuse of the API, your breach of
          these terms, or the products you build with its data.
        </p>
      </Section>

      <Section title="Personal data">
        <p>
          We process personal data as described in our{' '}
          <TextLink href="/privacy">Privacy Policy</TextLink>.
        </p>
      </Section>

      <Section title="Force majeure">
        <p>
          We are not liable for delays or failures caused by events beyond our
          reasonable control, such as natural disasters, network failures,
          cyberattacks or outages of third-party providers.
        </p>
      </Section>

      <Section title="Governing law and disputes">
        <p>
          These terms are governed by French law. If you act as a professional,
          any dispute falls under the exclusive jurisdiction of the courts of
          Paris. If you are a consumer, you keep the protection of the mandatory
          rules and the courts of your country of residence. If any provision is
          found invalid, the others remain in force. These terms also exist in
          French; in case of discrepancy, the French version prevails.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          We may update these terms. Significant changes are announced by email
          at least 30 days before they take effect; continuing to use the API
          afterwards means you accept them. You can close your account at any
          time if you disagree.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For any question about these terms, write to <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
