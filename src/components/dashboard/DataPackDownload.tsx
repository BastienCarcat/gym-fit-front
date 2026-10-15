'use client'

import { IconLoader2 } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Notice } from '@/components/ui/notice'
import { DATA_PACK } from '@/config/dataPack'

/**
 * Downloads a version: the zip is made for the license on demand, which takes
 * a few seconds, so the button tells it is on its way
 */
export function DataPackDownloadButton({ version }: { version: string }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const download = async () => {
    setPending(true)
    setError(null)

    try {
      const response = await fetch(
        `${DATA_PACK.dashboardPath}/download/${version}`,
        { headers: { accept: 'application/zip, application/json' } }
      )

      if (!response.ok) {
        const body = await response.json().catch(() => null)

        throw new Error(body?.error ?? 'The download failed, please try again')
      }

      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')

      link.href = url
      link.download = `gymfit-exercises-${version}.zip`
      link.click()
      URL.revokeObjectURL(url)
      // The last downloads and the downloads left today
      router.refresh()
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : 'The download failed, please try again'
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="text-right">
      <Button disabled={pending} size="sm" variant="outline" onClick={download}>
        {pending ? (
          <>
            <IconLoader2 aria-hidden className="mr-1.5 size-3.5 animate-spin" />
            Preparing your file…
          </>
        ) : (
          'Download'
        )}
      </Button>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  )
}

const SETUP_POLL_MS = 3000
const SETUP_POLLS = 20

/**
 * Back from Stripe while the payment is still being confirmed: the page asks
 * again every few seconds until the license shows
 */
export function DataPackSetup() {
  const router = useRouter()
  const [polls, setPolls] = useState(0)

  useEffect(() => {
    if (polls >= SETUP_POLLS) return

    const timer = setTimeout(() => {
      router.refresh()
      setPolls((count) => count + 1)
    }, SETUP_POLL_MS)

    return () => clearTimeout(timer)
  }, [polls, router])

  return polls < SETUP_POLLS ? (
    <Notice
      className="mt-6 flex items-center gap-3"
      role="status"
      tone="success"
    >
      <IconLoader2 aria-hidden className="size-4 shrink-0 animate-spin" />
      Payment received, your data pack is being set up. This page updates by
      itself.
    </Notice>
  ) : (
    <Notice className="mt-6" role="status" tone="warning">
      Your payment is still being confirmed. You will get an email as soon as
      your data pack is ready.
    </Notice>
  )
}
