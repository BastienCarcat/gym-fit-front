import { ApiKeysCard } from '@/components/dashboard/ApiKeysCard'
import { QuotaCard } from '@/components/dashboard/QuotaCard'
import { UsageCard } from '@/components/dashboard/UsageCard'
import { apiFetch } from '@/lib/api/server'
import { ApiKeySummary, CurrentUsage, UsageReport } from '@/lib/api/types'

export default async function DashboardPage() {
  const [keys, current, daily, endpoints] = await Promise.all([
    apiFetch<ApiKeySummary[]>('/v1/me/api-keys'),
    apiFetch<CurrentUsage>('/v1/me/usage/current'),
    apiFetch<UsageReport>('/v1/me/usage?groupBy=day'),
    apiFetch<UsageReport>('/v1/me/usage?groupBy=endpoint')
  ])

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApiKeysCard keys={keys} />
        </div>
        <QuotaCard usage={current} />
      </div>
      <UsageCard
        daily={daily}
        endpoints={endpoints}
        apiUrl={process.env.GYM_FIT_BASE_URL ?? ''}
      />
    </main>
  )
}
