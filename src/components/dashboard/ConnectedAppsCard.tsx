'use client'

import { useState, useTransition } from 'react'
import { IconPlugConnected } from '@tabler/icons-react'

import { Panel } from '@/components/dashboard/Panel'
import { Button } from '@/components/ui/button'
import { Notice } from '@/components/ui/notice'
import { MCP_OAUTH_URL } from '@/config/mcp'
import { ConnectedApp } from '@/lib/api/types'
import { disconnectApp } from '@/lib/connected-apps/actions'
import { formatDate } from '@/lib/format'

/**
 * Claude, ChatGPT and the other assistants that sign in with the GymFit
 * account instead of a key, and the ones already connected
 */
export function ConnectedAppsCard({ apps }: { apps: ConnectedApp[] }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const disconnect = (app: ConnectedApp) => {
    const name = app.name ?? 'this assistant'

    if (
      !window.confirm(
        `Disconnect ${name}? It stops reaching GymFit right away and has to ask you again.`
      )
    ) {
      return
    }

    startTransition(async () => {
      setError(null)
      const result = await disconnectApp(app.clientId)

      if (!result.ok) {
        setError(result.error)
      }
    })
  }

  return (
    <Panel
      description="Claude (web, desktop and mobile), ChatGPT and the other assistants that sign in with OAuth use your GymFit account instead of a key."
      title="Claude, ChatGPT and other apps"
    >
      <ol className="mt-5 space-y-2 text-sm text-steel-light">
        <li>
          1. In your assistant, add a custom connector with this URL:{' '}
          <code className="break-all rounded-[6px] bg-ink-800 px-1.5 py-0.5 font-code text-xs text-white">
            {MCP_OAUTH_URL}
          </code>
        </li>
        <li>2. Sign in to GymFit when it asks, and allow it.</li>
      </ol>

      {error && (
        <Notice className="mt-4" role="alert" tone="error">
          {error}
        </Notice>
      )}

      <h3 className="mt-6 text-sm font-bold text-white">Connected</h3>
      {apps.length === 0 ? (
        <div className="mt-3 flex items-center gap-3 rounded-[10px] border border-dashed border-ink-700 p-4 text-sm text-steel">
          <IconPlugConnected aria-hidden className="h-5 w-5 text-volt" />
          No assistant connected with your account yet.
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-ink-700 rounded-[10px] border border-ink-700">
          {apps.map((app) => (
            <li
              key={app.clientId}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-bold text-white">
                  {app.name ?? app.clientId}
                </p>
                <p className="mt-1 text-xs text-steel">
                  Connected {formatDate(app.connectedAt)}
                  {app.uri && ` · ${hostOf(app.uri)}`}
                </p>
              </div>
              <Button
                className="text-red-300 hover:border-red-400/60"
                disabled={pending}
                size="sm"
                variant="outline"
                onClick={() => disconnect(app)}
              >
                Disconnect
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

function hostOf(uri: string): string {
  try {
    return new URL(uri).host
  } catch {
    return uri
  }
}
