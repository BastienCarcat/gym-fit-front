import React from 'react'
import Link from 'next/link'

export default function TermsOfUsePage() {
  return (
    <div className="bg-white px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          GymFit API — Terms of Use
        </h1>
        <p className="mt-6 text-lg text-gray-500">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <div className="mt-10 space-y-10 text-base leading-7 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Acceptance of Terms
            </h2>
            <p className="mt-4">
              By subscribing to any of the GymFit API plans offered on our
              website or through our distribution partners, you (&quot;the
              subscriber&quot;) confirm that you have read, understood, and
              agree to the Terms of Use outlined below.
            </p>
            <p className="mt-4">
              Failure to comply with these terms may result in the suspension or
              permanent termination of your API access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">License</h2>
            <p className="mt-4">
              A GymFit API subscription grants you a non-exclusive,
              non-transferable, and revocable license to access and use the
              GymFit API and its data, provided that:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>You have an active and valid subscription,</li>
              <li>
                You respect the limitations of your plan (including monthly or
                daily request limits),
              </li>
              <li>You comply with these Terms of Use.</li>
            </ul>
            <p className="mt-4">
              Your subscription is billed periodically (typically monthly) until
              canceled through your account dashboard or the platform where you
              subscribed.
            </p>
            <p className="mt-4">
              You agree to keep your GymFit API key confidential. Do not share
              it publicly, in code repositories, or in client-side code. If your
              API key is compromised, you are responsible for any unauthorized
              usage and potential charges incurred.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Content</h2>
            <p className="mt-4">
              The GymFit API provides access to structured exercise data, muscle
              group information, media assets (such as exercise images and
              videos), and related metadata. All content and media are the
              exclusive property of GymFit and are protected by applicable
              copyright and intellectual property laws.
            </p>
            <p className="mt-4">
              Each media file provided via the API is accessed through a signed
              URL that expires after a limited period (typically 24 hours).
              These URLs must not be stored, redistributed, or reused after
              expiration.
            </p>
            <p className="mt-4">
              GymFit reserves the right to update, modify, or remove any data or
              media at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Prohibitions
            </h2>
            <p className="mt-4">
              You may integrate GymFit API data into your website, application,
              or digital product, but you may not:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Use the GymFit API or its data to create a competing database,
                service, or API.
              </li>
              <li>
                Redistribute, resell, or sublicense any data or media obtained
                from the API.
              </li>
              <li>
                Store, archive, or cache API data — including transformed or
                derived data — for any purpose.
              </li>
              <li>Mirror, scrape, or bulk-download API content.</li>
              <li>
                Display or use GymFit data in a way that suggests endorsement or
                partnership without written consent.
              </li>
              <li>
                Use the API in violation of applicable laws or regulations.
              </li>
            </ul>
            <p className="mt-4 font-semibold">
              All data must be fetched dynamically from the API. Caching is
              strictly prohibited, including local, server-side, or
              database-level caching.
            </p>
            <p className="mt-4">
              GymFit may, at its sole discretion, revoke access to the API if
              your usage is found to violate these rules or to negatively impact
              the service or its brand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Rate Limiting &amp; Abuse Policy
            </h2>
            <p className="mt-4">
              Each subscription plan includes specific rate limits (monthly
              and/or daily request quotas). These limits are enforced to ensure
              fair usage and service stability for all subscribers.
            </p>
            <p className="mt-4">If you exceed your plan&apos;s rate limits:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Your requests may be throttled or temporarily blocked until the
                next billing cycle or daily reset.
              </li>
              <li>
                Repeated or severe abuse may result in suspension or permanent
                termination of your API access without refund.
              </li>
              <li>
                You may be required to upgrade to a higher plan to accommodate
                your usage needs.
              </li>
            </ul>
            <p className="mt-4">
              GymFit reserves the right to monitor API usage patterns and take
              action against any behavior deemed abusive, including but not
              limited to: automated bulk requests, DDoS attempts, or any form of
              service manipulation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              API Modifications and Deprecation
            </h2>
            <p className="mt-4">
              GymFit reserves the right to modify, update, or discontinue any
              part of the API, including endpoints, data structures, or
              authentication methods, at any time and without prior notice.
            </p>
            <p className="mt-4">
              When possible, advance notice will be provided for breaking
              changes or deprecated endpoints.
            </p>
            <p className="mt-4">
              Subscribers are responsible for maintaining compatibility with the
              latest version of the API.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Intellectual Property Rights
            </h2>
            <p className="mt-4">
              All intellectual property rights in and to the GymFit API,
              including but not limited to the following, are and remain the
              exclusive property of GymFit:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Content and Data:</strong> All exercise data, muscle
                group information, descriptions, categorizations, and metadata
              </li>
              <li>
                <strong>Media Assets:</strong> Images, videos, graphics, and all
                visual content
              </li>
              <li>
                <strong>Data Structures:</strong> Database schemas, API response
                formats, and data organization methods
              </li>
              <li>
                <strong>Branding:</strong> The GymFit name, logo, trademarks,
                service marks, and brand identity
              </li>
              <li>
                <strong>Documentation:</strong> API guides, tutorials, and
                technical documentation
              </li>
              <li>
                <strong>Software:</strong> All source code, algorithms, and
                technical implementations
              </li>
            </ul>
            <p className="mt-4">
              You may not reproduce, duplicate, copy, sell, resell, or exploit
              any portion of the GymFit API or its content without express
              written permission from GymFit.
            </p>
            <p className="mt-4">
              The license granted to you does not transfer any ownership rights.
              You acknowledge that all rights, title, and interest in the API
              and its content remain with GymFit.
            </p>
            <p className="mt-4 font-semibold">
              Any derivative works, modifications, or compilations you create
              using GymFit data must not be used to compete with, replicate, or
              substitute the GymFit API service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Billing</h2>
            <p className="mt-4">
              Subscribers must provide accurate and complete billing
              information, including applicable tax details (e.g., VAT number
              where relevant).
            </p>
            <p className="mt-4">
              All fees are due in accordance with your selected subscription
              plan. Subscribers are responsible for any applicable taxes,
              duties, or fees imposed by local authorities.
            </p>
            <p className="mt-4">
              Failure to make payment may result in suspension or termination of
              your API access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Refund Policy
            </h2>
            <p className="mt-4">
              Due to the digital nature of the product, GymFit API subscriptions
              are generally non-refundable once activated.
            </p>
            <p className="mt-4">
              However, refund requests may be reviewed on a case-by-case basis
              at GymFit&apos;s sole discretion. To request a refund, please
              contact{' '}
              <Link
                className="font-medium text-blue-600 hover:text-blue-800"
                href="mailto:contact@gymfit-api.com"
              >
                contact@gymfit-api.com
              </Link>{' '}
              with:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Your name and email address associated with the subscription
              </li>
              <li>A clear explanation of your request</li>
            </ul>
            <p className="mt-4">
              If a chargeback is initiated without prior contact, GymFit
              reserves the right to permanently terminate your access to all
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimer</h2>
            <p className="mt-4">
              The GymFit API and its data are provided &quot;as is&quot;,
              &quot;with all faults&quot;, and &quot;as available&quot;. While
              GymFit strives for accuracy and reliability, we make no warranties
              or guarantees regarding:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>The completeness, accuracy, or reliability of the data,</li>
              <li>The availability or uptime of the API,</li>
              <li>The suitability of the data for a specific purpose.</li>
            </ul>
            <p className="mt-4">
              GymFit shall not be held responsible for any loss, damages, or
              errors resulting from the use, unavailability, or inaccuracies of
              the API data or media. Subscribers assume all risks associated
              with using the API and its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Representations and Indemnification
            </h2>
            <p className="mt-4">
              You represent and warrant that you have the authority to enter
              into this agreement. If you are agreeing on behalf of a company or
              organization, you confirm that you have full authority to bind
              that entity.
            </p>
            <p className="mt-4">
              You agree to indemnify and hold harmless GymFit from any claims,
              losses, damages, liabilities, or expenses (including legal fees)
              arising from:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Your use or misuse of the API,</li>
              <li>Your violation of these Terms,</li>
              <li>
                Or any content or service you create using data from the API.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Limitations of Liability
            </h2>
            <p className="mt-4 font-semibold uppercase">
              In no event shall GymFit be liable for any indirect, incidental,
              consequential, or special damages (including loss of profits or
              data), whether arising in contract, tort, or otherwise, even if
              advised of the possibility of such damages.
            </p>
            <p className="mt-4">
              Your sole and exclusive remedy for dissatisfaction with the API is
              to discontinue its use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Force Majeure
            </h2>
            <p className="mt-4">
              GymFit shall not be held liable for any delay or failure in
              performance resulting from causes beyond its reasonable control,
              including but not limited to natural disasters, network failures,
              strikes, cyberattacks, or third-party service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Miscellaneous
            </h2>
            <p className="mt-4">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>
            <p className="mt-4">
              These Terms constitute the entire agreement between you and GymFit
              regarding the use of the API and supersede all prior agreements or
              communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Choice of Law
            </h2>
            <p className="mt-4">
              These Terms of Use are governed by and construed in accordance
              with the laws of France. All disputes arising from these Terms
              shall fall under the exclusive jurisdiction of the French Courts,
              unless otherwise required by applicable consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Updates</h2>
            <p className="mt-4">
              GymFit reserves the right to modify these Terms of Use at any
              time. Any substantial change will be communicated to subscribers.
              Continued use of the API after changes take effect constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>
            <p className="mt-4">
              For any questions, requests, or concerns, please contact:
            </p>
            <p className="mt-4">
              <Link
                className="font-medium text-blue-600 hover:text-blue-800"
                href="mailto:contact@gymfit-api.com"
              >
                contact@gymfit-api.com
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
