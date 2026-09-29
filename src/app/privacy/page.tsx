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
  title: 'Privacy policy',
  alternates: legalAlternates('/privacy')
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage alternate="/fr/confidentialite" title="Privacy policy">
      <Section title="Who we are">
        <p>
          The data controller is {legal.publisher}, who operates the GymFit API.
          Contact: <ContactEmail />.
        </p>
        <p>
          This policy covers the website gymfit-api.com, your dashboard account
          and the GymFit API. If you subscribe through RapidAPI, RapidAPI’s own
          privacy policy applies to the data it processes.
        </p>
      </Section>

      <Section title="Data we collect">
        <List>
          <li>
            <strong>Account</strong>: your name, email address and password. The
            password is stored as a one-way hash, never in clear text.
          </li>
          <li>
            <strong>API keys</strong>: stored as a hash with their name and the
            first characters shown in your dashboard. A key is displayed only
            once, when it is created.
          </li>
          <li>
            <strong>Usage</strong>: for your account, daily totals per API
            endpoint (number of requests, response status categories, response
            times). We do not store your requests one by one.
          </li>
          <li>
            <strong>Technical logs</strong>: IP address, requested path, status
            code, user agent and a request identifier, for security and
            troubleshooting.
          </li>
          <li>
            <strong>Billing</strong>: your plan, the status of your subscription
            and your Stripe customer identifier. Your payment details are
            collected by Stripe; we never see them.
          </li>
          <li>
            <strong>Support</strong>: the messages you send us by email.
          </li>
          <li>
            <strong>Website analytics</strong>: anonymous page views and
            performance measures, without cookies (Vercel Web Analytics and
            Speed Insights).
          </li>
        </List>
      </Section>

      <Section title="Why we use it">
        <List>
          <li>
            Providing your account, API keys, quotas and usage statistics, and
            billing paid plans: performance of our contract with you.
          </li>
          <li>
            Securing the service (rate limits, abuse prevention, logs),
            monitoring errors and improving the API from aggregated statistics:
            our legitimate interest in running a reliable and secure service.
          </li>
          <li>Keeping accounting records: our legal obligations.</li>
          <li>
            Sending transactional emails (email confirmation, password reset,
            account notices): performance of our contract. We do not send
            marketing emails.
          </li>
        </List>
      </Section>

      <Section title="How long we keep it">
        <List>
          <li>
            Account, API keys and billing information: until you delete your
            account. Deletion is immediate and can be done at any time from the
            Settings page of your dashboard.
          </li>
          <li>
            Usage statistics: kept for the service and billing while your
            account exists. After deletion, the remaining daily totals are no
            longer linked to any person.
          </li>
          <li>Technical logs: 7 days. Error reports: 90 days at most.</li>
          <li>
            Payment records: kept by Stripe as required by law. Our own
            accounting records are kept for the legal period of 10 years.
          </li>
        </List>
      </Section>

      <Section title="Who receives it">
        <p>
          We do not sell your data. It is processed on our behalf by the
          following providers, each for its own purpose:
        </p>
        <List>
          <li>Vercel Inc. (USA): website hosting and anonymous analytics.</li>
          <li>
            Railway Corporation (USA): hosting of the API, the database and the
            technical logs.
          </li>
          <li>Resend, Inc. (USA): sending of transactional emails.</li>
          <li>Functional Software, Inc. / Sentry (USA): error monitoring.</li>
          <li>OVH SAS (France): email hosting for our support inbox.</li>
          <li>
            Stripe: payments. Stripe acts as the merchant of record for paid
            plans and processes your payment data under its own{' '}
            <TextLink href="https://stripe.com/privacy">
              privacy policy
            </TextLink>
            .
          </li>
        </List>
        <p>
          Exercise images are stored by Scaleway SAS (France); no personal data
          is stored there.
        </p>
      </Section>

      <Section title="Transfers outside the European Union">
        <p>
          Some providers are located in the United States. These transfers rely
          on the EU-U.S. Data Privacy Framework or on the standard contractual
          clauses of the European Commission.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          We only use a strictly necessary cookie that keeps you signed in to
          your dashboard. It requires no consent. We use no advertising or
          tracking cookies, and our analytics work without cookies.
        </p>
      </Section>

      <Section title="Security">
        <p>
          All traffic is encrypted (HTTPS). Passwords and API keys are stored as
          hashes, access to production systems is restricted, and requests are
          rate limited to prevent abuse.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can access, correct or delete your data, object to or restrict its
          processing, and ask for a copy in a portable format. You can delete
          your account yourself at any time from your dashboard. For any other
          request, write to <ContactEmail />; we answer within one month.
        </p>
        <p>
          If you think your rights are not respected, you can lodge a complaint
          with the French data protection authority, the CNIL (
          <TextLink href="https://www.cnil.fr">cnil.fr</TextLink>).
        </p>
      </Section>

      <Section title="Children">
        <p>
          The service is intended for developers and businesses. It is not
          directed at children under 15, and we do not knowingly collect their
          data.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update this policy. The date at the top shows the latest
          version; significant changes are announced by email.
        </p>
      </Section>
    </LegalPage>
  )
}
