import { Metadata } from 'next'

import { ApiKeysCard } from '@/components/dashboard/ApiKeysCard'
import { PageHeader } from '@/components/dashboard/Panel'
import { QuotaCard } from '@/components/dashboard/QuotaCard'
import { UsageCard } from '@/components/dashboard/UsageCard'
import { Notice } from '@/components/ui/notice'
import { PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { apiFetch } from '@/lib/api/server'
import { ApiKeySummary, CurrentUsage, UsageReport } from '@/lib/api/types'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { checkout?: string }
}) {
  const [keys, current, daily, endpoints] = await Promise.all([
    apiFetch<ApiKeySummary[]>('/v1/me/api-keys'),
    apiFetch<CurrentUsage>('/v1/me/usage/current'),
    apiFetch<UsageReport>('/v1/me/usage?groupBy=day'),
    apiFetch<UsageReport>('/v1/me/usage?groupBy=endpoint')
  ])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="Your API keys, your plan and this month's requests."
      />
      {searchParams.checkout === 'success' && (
        <Notice role="status" tone="success">
          Thanks for subscribing! Your plan is activated within a few seconds:
          refresh the page if it still shows the previous one.
        </Notice>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApiKeysCard keys={keys} maxKeys={PLANS[current.plan].maxApiKeys} />
        </div>
        <QuotaCard usage={current} />
      </div>
      <UsageCard
        daily={daily}
        endpoints={endpoints}
        // The public URL: the server's base URL can be an internal one
        apiUrl={siteConfig.api_url}
      />
    </div>
  )
}
