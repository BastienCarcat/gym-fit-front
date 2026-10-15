import { Metadata } from 'next'
import Link from 'next/link'

import { DataPackBuy } from '@/components/dashboard/DataPackBuy'
import {
  DataPackDownloadButton,
  DataPackSetup
} from '@/components/dashboard/DataPackDownload'
import { PageHeader, Panel } from '@/components/dashboard/Panel'
import { Notice } from '@/components/ui/notice'
import { DATA_PACK } from '@/config/dataPack'
import { apiFetch } from '@/lib/api/server'
import { DataPackStatus } from '@/lib/api/types'
import { formatDate, formatDateTime, formatNumber } from '@/lib/format'

export const metadata: Metadata = { title: 'Data pack' }

export default async function DataPackPage({
  searchParams
}: {
  searchParams: Promise<{
    checkout?: string
    session_id?: string
    error?: string
  }>
}) {
  const [query, first] = await Promise.all([
    searchParams,
    apiFetch<DataPackStatus>('/v1/me/data-pack')
  ])
  let status = first

  // Back from Stripe: the license is granted from the session, without
  // waiting for the webhook
  if (query.session_id && !owns(status)) {
    await apiFetch('/v1/me/billing/data-pack/confirm', {
      method: 'POST',
      body: JSON.stringify({ sessionId: query.session_id })
    }).catch(() => null)
    status = await apiFetch<DataPackStatus>('/v1/me/data-pack')
  }

  const { license } = status
  const returning = query.checkout === 'success'

  return (
    <div>
      <PageHeader
        description={
          <>
            The whole catalog as JSON and CSV files you keep, with{' '}
            {DATA_PACK.updatesMonths} months of updates.{' '}
            <Link
              className="font-medium text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt"
              href={DATA_PACK.path}
            >
              What is in it
            </Link>
          </>
        }
        title="Data pack"
      />

      {returning && !owns(status) && <DataPackSetup />}
      {returning && owns(status) && (
        <Notice className="mt-6" role="status" tone="success">
          Your data pack is ready: download it below. We also sent you an email
          with the link to this page.
        </Notice>
      )}
      {query.error && (
        <Notice className="mt-6" role="alert" tone="error">
          {query.error}
        </Notice>
      )}
      {license?.revokedAt && (
        <Notice className="mt-6" tone="warning">
          This license ended on {formatDate(license.revokedAt)} after a refund
          or a dispute of its payment: its files can no longer be downloaded.
        </Notice>
      )}

      {!license || license.revokedAt ? (
        <Panel
          className="mt-8"
          description="Search, suggestions, the muscle heatmaps and the MCP server stay in the API plans: the data pack is the data, as files."
          title={`$${DATA_PACK.price} once, taxes included`}
        >
          <DataPackBuy />
        </Panel>
      ) : (
        <>
          <Panel
            className="mt-8"
            description={`Bought on ${formatDate(license.purchasedAt)}. The versions published until ${formatDate(license.updatesUntil)} are yours to download.`}
            title="Your license"
          >
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <Fact label="License">
                <span className="font-code text-xs">{license.id}</span>
              </Fact>
              <Fact label="Updates until">
                {formatDate(license.updatesUntil)}
              </Fact>
            </dl>
            <p className="mt-4 text-xs text-steel">
              Each file is marked to your license. Keep it within your business:{' '}
              <Link
                className="underline decoration-volt underline-offset-4 hover:text-white"
                href={DATA_PACK.licensePath}
                target="_blank"
              >
                read the license
              </Link>
              .
            </p>
          </Panel>

          <Panel
            className="mt-6"
            description="Each version is a zip with the JSON file, the CSV tables, a README and your license."
            title="Versions"
          >
            {status.releases.length ? (
              <ul className="mt-4 divide-y divide-ink-700">
                {status.releases.map((release) => (
                  <li
                    key={release.version}
                    className="flex flex-wrap items-center justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="font-medium text-white">
                        Version {release.version}
                      </p>
                      <p className="text-xs text-steel">
                        {formatNumber(release.exercises)} exercises
                      </p>
                    </div>
                    {release.available ? (
                      <DataPackDownloadButton version={release.version} />
                    ) : (
                      <span className="text-xs text-steel">
                        Published after your updates
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-steel-light">
                The first version is being prepared: it shows here as soon as it
                is published.
              </p>
            )}
          </Panel>

          {status.downloads.length > 0 && (
            <Panel className="mt-6" title="Last downloads">
              <ul className="mt-4 space-y-1 text-sm text-steel-light">
                {status.downloads.map((download) => (
                  <li key={download.createdAt}>
                    Version {download.version},{' '}
                    {formatDateTime(download.createdAt)}
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </>
      )}
    </div>
  )
}

/** A license that was not revoked */
function owns(status: DataPackStatus): boolean {
  return Boolean(status.license && !status.license.revokedAt)
}

function Fact({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <dt className="text-xs text-steel">{label}</dt>
      <dd className="mt-1 text-white">{children}</dd>
    </div>
  )
}
