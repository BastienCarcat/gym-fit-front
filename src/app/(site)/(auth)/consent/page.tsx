'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'

import { AuthCard, FormMessage } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { followOAuthRedirect } from '@/lib/oauth'

/** What an assistant can do once allowed, in the words of the customer */
const GRANTED = [
  'Search and read the exercises, their muscles and alternatives',
  'Run the calculators (BMR, TDEE, BMI, ideal weight)',
  'Read your usage and what is left of your quota'
]

interface PublicClient {
  client_name?: string
  client_uri?: string
}

/** Where an AI assistant asks to use GymFit with the visitor's account */
function ConsentForm() {
  const searchParams = useSearchParams()
  const clientId = searchParams.get('client_id')
  const [client, setClient] = useState<PublicClient | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!clientId) {
      return
    }

    authClient.oauth2
      .publicClient({ query: { client_id: clientId } })
      .then(({ data }) => setClient((data as PublicClient | null) ?? {}))
  }, [clientId])

  const answer = async (accept: boolean) => {
    setPending(true)
    setError(null)

    const { data, error } = await authClient.oauth2.consent({ accept })

    if (!error && followOAuthRedirect(data)) {
      return
    }

    setPending(false)
    setError(
      error?.message ||
        'This request has expired. Start the connection again from your assistant.'
    )
  }

  if (!clientId) {
    return (
      <AuthCard title="Nothing to allow">
        <FormMessage tone="error">
          This page opens when an AI assistant asks to connect to GymFit.
        </FormMessage>
      </AuthCard>
    )
  }

  const name = client?.client_name || 'An AI assistant'

  return (
    <AuthCard
      footer="Each request of the assistant counts in your monthly quota. You can disconnect it at any time from AI assistants in your dashboard."
      subtitle={`${name} will use GymFit with your account, on your plan.`}
      title={`Connect ${name} to GymFit`}
    >
      {error && <FormMessage tone="error">{error}</FormMessage>}
      {client?.client_uri && (
        <p className="text-sm text-steel">
          From{' '}
          <span className="font-code text-steel-light">
            {safeHost(client.client_uri)}
          </span>
        </p>
      )}
      <p className="mt-6 text-sm font-bold text-white">It will be able to:</p>
      <ul className="mt-3 space-y-2 text-sm text-steel-light">
        {GRANTED.map((item) => (
          <li key={item} className="flex gap-2">
            <IconCheck
              aria-hidden
              className="mt-0.5 h-4 w-4 shrink-0 text-volt"
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-steel">
        It cannot change your account, your keys or your plan.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          className="sm:flex-1"
          disabled={pending}
          size="lg"
          onClick={() => answer(true)}
        >
          {pending ? 'Working…' : 'Allow'}
        </Button>
        <Button
          className="sm:flex-1"
          disabled={pending}
          size="lg"
          variant="outline"
          onClick={() => answer(false)}
        >
          Deny
        </Button>
      </div>
    </AuthCard>
  )
}

function safeHost(uri: string): string {
  try {
    return new URL(uri).host
  } catch {
    return uri
  }
}

export default function ConsentPage() {
  return (
    <Suspense>
      <ConsentForm />
    </Suspense>
  )
}
