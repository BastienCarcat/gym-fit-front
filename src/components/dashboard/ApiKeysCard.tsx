'use client'

import { FormEvent, useState, useTransition } from 'react'
import {
  IconCheck,
  IconCopy,
  IconKey,
  IconRefresh,
  IconTrash
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ApiKeySummary, CreatedApiKey } from '@/lib/api/types'
import { createApiKey, revokeApiKey, rollApiKey } from '@/lib/api-keys/actions'
import { formatDate, formatDateTime } from '@/lib/format'

const MAX_ACTIVE_KEYS = 5

export function ApiKeysCard({ keys }: { keys: ApiKeySummary[] }) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<{
    key: CreatedApiKey
    rolled: boolean
  } | null>(null)
  const [pending, startTransition] = useTransition()
  const limitReached = keys.length >= MAX_ACTIVE_KEYS

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
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">API keys</h2>
      <p className="mt-1 text-sm text-gray-500">
        Send your key in the{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-gray-700">
          X-API-Key
        </code>{' '}
        header. A key is only shown once, when it is created.
      </p>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {keys.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <IconKey className="h-6 w-6 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-700">
            No API key yet
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Create one to start calling the API.
          </p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-gray-100">
          {keys.map((key) => (
            <li
              key={key.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900">{key.name}</p>
                <p className="font-mono text-sm text-gray-500">
                  {key.prefix}
                  {'•'.repeat(12)}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Created {formatDate(key.createdAt)}
                  {key.expiresAt && (
                    <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-amber-700">
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
                    <IconRefresh className="mr-1 h-4 w-4" />
                    Roll
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pending}
                  onClick={() => revoke(key)}
                  className="text-red-600 hover:text-red-700"
                >
                  <IconTrash className="mr-1 h-4 w-4" />
                  Revoke
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={create}
        className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-6"
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
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:bg-gray-50"
        />
        <Button
          type="submit"
          disabled={pending || limitReached}
          className="bg-sky-500 hover:bg-sky-600"
        >
          {pending ? 'Working…' : 'Create key'}
        </Button>
        {limitReached && (
          <p className="w-full text-xs text-gray-500">
            You can have up to {MAX_ACTIVE_KEYS} active keys. Revoke one to
            create another.
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
            <Button
              onClick={() => setRevealed(null)}
              className="bg-sky-500 hover:bg-sky-600"
            >
              I have copied it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
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
    <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
      <code className="min-w-0 flex-1 break-all font-mono text-sm text-gray-900">
        {value}
      </code>
      <Button
        variant="outline"
        size="sm"
        onClick={copy}
        aria-label="Copy the key"
      >
        {copied ? (
          <IconCheck className="h-4 w-4 text-green-600" />
        ) : (
          <IconCopy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
