import { Metadata } from 'next'

import { McpSetup } from '@/components/dashboard/McpSetup'
import { PageHeader } from '@/components/dashboard/Panel'
import { apiFetch } from '@/lib/api/server'
import { ApiKeySummary } from '@/lib/api/types'

export const metadata: Metadata = { title: 'AI assistants' }

export default async function AiAssistantsPage() {
  const keys = await apiFetch<ApiKeySummary[]>('/v1/me/api-keys')

  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader
        description="Connect GymFit to Claude Code, Cursor, VS Code or any MCP client: your assistant searches the exercises and runs the calculators for you, with your key and on your plan."
        title="AI assistants"
      />
      <McpSetup hasKey={keys.length > 0} />
    </div>
  )
}
