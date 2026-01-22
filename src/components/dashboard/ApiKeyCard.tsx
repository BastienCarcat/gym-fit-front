'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  getApiKey,
  generateApiKey,
  regenerateApiKey,
  revokeApiKey
} from '@/lib/api-keys/actions'
import {
  IconCopy,
  IconEye,
  IconEyeOff,
  IconKey,
  IconRefresh,
  IconTrash,
  IconAlertCircle
} from '@tabler/icons-react'

interface ApiKeyData {
  id: string
  email: string
  plan: 'free' | 'pro' | 'ultra' | 'mega'
  apiKey: string | null
  keyId: string | null
  createdAt: string
  allKeys?: Array<{
    id: string
    key: string
    createdOn: string
    expiresOn?: string
  }>
}

interface ApiKeyCardProps {
  initialData: ApiKeyData | null
}

export function ApiKeyCard({ initialData }: ApiKeyCardProps) {
  const [data, setData] = useState<ApiKeyData | null>(initialData)
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false)

  const handleReveal = () => {
    if (isRevealed) {
      setIsRevealed(false)
      return
    }

    startTransition(async () => {
      try {
        const revealed = await getApiKey(true)
        if (revealed) {
          setData(revealed)
          setIsRevealed(true)
        }
      } catch (error) {
        console.error('Failed to reveal API key:', error)
      }
    })
  }

  const handleCopy = async () => {
    if (!data?.keyId) return

    // If revealed, use the cached apiKey, otherwise fetch it
    if (isRevealed && data.apiKey) {
      await navigator.clipboard.writeText(data.apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return
    }

    // Fetch the revealed key to copy
    const revealed = await getApiKey(true)
    if (revealed?.apiKey) {
      await navigator.clipboard.writeText(revealed.apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        const newData = await generateApiKey()
        setData(newData)
        setIsRevealed(true)
      } catch (error) {
        console.error('Failed to generate API key:', error)
      }
    })
  }

  const handleRegenerate = () => {
    startTransition(async () => {
      try {
        const newData = await regenerateApiKey()
        setData(newData)
        setIsRevealed(true)
        setShowRegenerateDialog(true)
      } catch (error) {
        console.error('Failed to regenerate API key:', error)
      }
    })
  }

  const handleRevoke = (keyId: string) => {
    if (
      !confirm(
        'Are you sure you want to revoke this API key? This action cannot be undone.'
      )
    ) {
      return
    }

    startTransition(async () => {
      try {
        await revokeApiKey(keyId)
        const updated = await getApiKey(false)
        setData(updated)
      } catch (error) {
        console.error('Failed to revoke API key:', error)
      }
    })
  }

  // Check keyId to know if a key exists (apiKey is null when not revealed)
  const hasKey = !!data?.keyId
  const displayKey = isRevealed
    ? data?.apiKey
    : hasKey
      ? '••••••••••••••••••••••••••••••••'
      : 'No API key available'

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 lg:col-span-2">
      <h2 className="text-lg font-semibold text-gray-900">Your API Key</h2>
      <p className="mt-1 text-sm text-gray-500">
        Use this key to authenticate your API requests
      </p>
      {hasKey ? (
        <div className="mt-4 flex items-center gap-3">
          <code className="flex-1 overflow-hidden text-ellipsis rounded-md border border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-700">
            {displayKey}
          </code>

          <Button
            variant="outline"
            size="icon"
            onClick={handleReveal}
            disabled={isPending}
            title={isRevealed ? 'Hide' : 'Reveal'}
          >
            {isRevealed ? (
              <IconEyeOff className="h-4 w-4" />
            ) : (
              <IconEye className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={isPending}
            title="Copy"
          >
            <IconCopy className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={handleRegenerate}
            disabled={isPending}
            className="gap-2"
          >
            <IconRefresh
              className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
            />
            Regenerate
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <Button
            onClick={handleGenerate}
            disabled={isPending}
            className="gap-2 bg-sky-500 hover:bg-sky-600"
          >
            <IconKey className={`h-4 w-4 ${isPending ? 'animate-pulse' : ''}`} />
            {isPending ? 'Generating...' : 'Generate API Key'}
          </Button>
        </div>
      )}
      {copied && (
        <p className="mt-2 text-sm text-green-600">
          API key copied to clipboard!
        </p>
      )}
      {/* <div className="mt-4 rounded-md border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-700">
          <strong>Quick start:</strong> Add this header to your API requests:
        </p>
        <code className="mt-2 block rounded bg-gray-100 px-3 py-2 font-mono text-xs text-gray-800">
          Authorization: Bearer YOUR_API_KEY
        </code>
      </div> */}
      {/* {data?.allKeys && data.allKeys.length > 1 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">All Keys</h3>
          <div className="mt-2 space-y-2">
            {data.allKeys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2"
              >
                <div className="flex-1">
                  <code className="font-mono text-xs text-gray-600">
                    {key.key}
                  </code>
                 {key.expiresOn && (
                    <span
                      suppressHydrationWarning
                      className="ml-2 text-xs text-amber-600"
                    >
                      Expires: {new Date(key.expiresOn).toLocaleDateString()}
                    </span>
                  )}

                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRevoke(key.id)}
                  disabled={isPending}
                  className="text-red-500 hover:text-red-700"
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )} */}

      <Dialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconAlertCircle className="h-5 w-5 text-amber-500" />
              API Key Regenerated
            </DialogTitle>
            <DialogDescription className="pt-2">
              Your new API key has been generated and is now active. For security
              reasons, your <strong>previous key will remain functional for 5
              minutes</strong> to allow any in-flight requests to complete.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-800">
              Make sure to update your applications with the new key before the
              grace period expires.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowRegenerateDialog(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
