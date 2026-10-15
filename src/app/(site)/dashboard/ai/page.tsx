import { Metadata } from 'next'

import { ConnectedAppsCard } from '@/components/dashboard/ConnectedAppsCard'
import { McpSetup } from '@/components/dashboard/McpSetup'
import { PageHeader } from '@/components/dashboard/Panel'
import { apiFetch } from '@/lib/api/server'
import { ApiKeySummary, ConnectedApp } from '@/lib/api/types'

export const metadata: Metadata = { title: 'AI assistants' }

export default async function AiAssistantsPage() {
  const [keys, apps] = await Promise.all([
    apiFetch<ApiKeySummary[]>('/v1/me/api-keys'),
    apiFetch<ConnectedApp[]>('/v1/me/connected-apps')
  ])

  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader
        description="Connect GymFit to Claude, ChatGPT, Claude Code, Cursor or any MCP client: your assistant searches the exercises and runs the calculators for you, on your plan."
        title="AI assistants"
      />
      <ConnectedAppsCard apps={apps} />
      <McpSetup hasKey={keys.length > 0} />
    </div>
  )
}
