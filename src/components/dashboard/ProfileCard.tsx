'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Field, FormMessage, textLink } from '@/components/auth/AuthCard'
import { Panel } from '@/components/dashboard/Panel'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { Me } from '@/lib/api/types'
import { authClient } from '@/lib/auth-client'

type Message = { tone: 'error' | 'success'; text: string }

export function ProfileCard({ me }: { me: Me }) {
  const router = useRouter()
  const [name, setName] = useState(me.name)
  const [message, setMessage] = useState<Message | null>(null)
  const [pending, setPending] = useState(false)
  const trimmed = name.trim()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setPending(true)
    setMessage(null)

    const { error } = await authClient.updateUser({ name: trimmed })

    setPending(false)

    if (error) {
      setMessage({
        tone: 'error',
        text: error.message || 'Your name could not be saved'
      })
      return
    }

    setMessage({ tone: 'success', text: 'Your name has been saved.' })
    router.refresh()
  }

  return (
    <Panel title="Profile">
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {message && (
          <FormMessage tone={message.tone}>{message.text}</FormMessage>
        )}
        <Field
          id="name"
          label="Name"
          autoComplete="name"
          required
          maxLength={100}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div>
          <p className="text-sm font-medium text-steel-light">Email</p>
          <p className="mt-1.5 text-white">{me.email}</p>
          <p className="mt-1 text-xs text-steel">
            To change it,{' '}
            <a href={`mailto:${siteConfig.contact_email}`} className={textLink}>
              contact us
            </a>
            .
          </p>
        </div>
        <Button
          type="submit"
          disabled={pending || !trimmed || trimmed === me.name}
        >
          {pending ? 'Saving…' : 'Save'}
        </Button>
      </form>
    </Panel>
  )
}
