'use client'

import Link from 'next/link'
import { FormEvent, useState, useTransition } from 'react'
import {
  IconCheck,
  IconCopy,
  IconKey,
  IconRefresh,
  IconTrash
} from '@tabler/icons-react'
import { textLink } from '@/components/auth/AuthCard'
import { Panel } from '@/components/dashboard/Panel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Notice } from '@/components/ui/notice'
import { ApiKeySummary, CreatedApiKey } from '@/lib/api/types'
import { createApiKey, revokeApiKey, rollApiKey } from '@/lib/api-keys/actions'
import { formatDate, formatDateTime } from '@/lib/format'

export function ApiKeysCard({
  keys,
  maxKeys
}: {
  keys: ApiKeySummary[]
  /** Active keys the plan allows: one key, one app */
  maxKeys: number
}) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<{
    key: CreatedApiKey
    rolled: boolean
  } | null>(null)
  const [pending, startTransition] = useTransition()
  const limitReached = keys.length >= maxKeys

  const create = (event: FormEvent) => {
    event.preventDefault()
    startTransition(async () => {
      setError(null)
      const result = await createApiKey(name.trim())

      if (!result.ok) {
        setError(result.error)
        return
      }

      setName('')
      setRevealed({ key: result.data, rolled: false })
    })
  }

  const roll = (key: ApiKeySummary) => {
    if (
      !window.confirm(
        `Replace "${key.name}"? The current key keeps working for 24 hours.`
      )
    ) {
      return
    }

    startTransition(async () => {
      setError(null)
      const result = await rollApiKey(key.id)

      if (!result.ok) {
        setError(result.error)
        return
      }

      setRevealed({ key: result.data, rolled: true })
    })
  }

  const revoke = (key: ApiKeySummary) => {
    if (
      !window.confirm(
        `Revoke "${key.name}"? Requests using it will be refused immediately.`
      )
    ) {
      return
    }

    startTransition(async () => {
      setError(null)
      const result = await revokeApiKey(key.id)

      if (!result.ok) {
        setError(result.error)
      }
    })
  }

  return (
    <Panel
      title="API keys"
      description={
        <>
          Send your key in the{' '}
          <code className="rounded-[6px] bg-ink-800 px-1.5 py-0.5 font-code text-xs text-white">
            X-API-Key
          </code>{' '}
          header. A key is only shown once, when it is created.
        </>
      }
    >
      {error && (
        <Notice className="mt-4" role="alert" tone="error">
          {error}
        </Notice>
      )}

      {keys.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-[10px] border border-dashed border-ink-700 p-6 text-center">
          <IconKey aria-hidden className="h-6 w-6 text-volt" />
          <p className="mt-2 text-sm font-bold text-white">No API key yet</p>
          <p className="mt-1 text-xs text-steel">
            Create one to start calling the API.
          </p>
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-ink-700 rounded-[10px] border border-ink-700">
          {keys.map((key) => (
            <li
              key={key.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-bold text-white">{key.name}</p>
                <p className="mt-0.5 font-code text-sm text-steel-light">
                  {key.prefix}
                  {'•'.repeat(12)}
                </p>
                <p className="mt-1 text-xs text-steel">
                  Created {formatDate(key.createdAt)}
                  {key.expiresAt && (
                    <span className="ml-2 rounded-[6px] border border-amber-300/30 bg-amber-300/10 px-1.5 py-0.5 text-amber-100">
                      Replaced, stops working {formatDateTime(key.expiresAt)}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                {!key.expiresAt && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pending}
                    onClick={() => roll(key)}
                  >
                    <IconRefresh aria-hidden />
                    Roll
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pending}
                  onClick={() => revoke(key)}
                  className="text-red-300 hover:border-red-400/60"
                >
                  <IconTrash aria-hidden />
                  Revoke
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={create}
        className="mt-6 flex flex-wrap gap-2 border-t border-ink-700 pt-6"
      >
        <label htmlFor="key-name" className="sr-only">
          Key name
        </label>
        <input
          id="key-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={50}
          placeholder="Key name, e.g. Production"
          disabled={limitReached}
          className="h-10 w-full min-w-0 rounded-[10px] border border-ink-700 bg-ink px-3 text-sm text-white transition-colors placeholder:text-steel hover:border-steel focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt disabled:opacity-50 sm:w-auto sm:flex-1"
        />
        <Button
          className="w-full sm:w-auto"
          type="submit"
          disabled={pending || limitReached}
        >
          {pending ? 'Working…' : 'Create key'}
        </Button>
        {limitReached && (
          <p className="w-full text-xs text-steel-light">
            Your plan allows {maxKeys} active {maxKeys === 1 ? 'key' : 'keys'}.
            Revoke one to create another, or{' '}
            <Link className={textLink} href="/dashboard/plans">
              compare the plans
            </Link>
            .
          </p>
        )}
      </form>

      <Dialog
        open={revealed !== null}
        onOpenChange={(open) => !open && setRevealed(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {revealed?.rolled ? 'Your new API key' : 'Your API key'}
            </DialogTitle>
            <DialogDescription>
              Copy it now: it will never be shown again.
              {revealed?.rolled &&
                ' The previous key keeps working for 24 hours, time to deploy this one.'}
            </DialogDescription>
          </DialogHeader>
          {revealed && <SecretField value={revealed.key.key} />}
          <DialogFooter>
            <Button onClick={() => setRevealed(null)}>I have copied it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Panel>
  )
}

function SecretField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-[10px] border border-ink-700 bg-ink p-3">
      <code className="min-w-0 flex-1 break-all font-code text-sm text-white">
        {value}
      </code>
      <Button
        variant="outline"
        size="sm"
        onClick={copy}
        aria-label="Copy the key"
      >
        {copied ? (
          <IconCheck aria-hidden className="text-volt" />
        ) : (
          <IconCopy aria-hidden />
        )}
      </Button>
    </div>
  )
}
