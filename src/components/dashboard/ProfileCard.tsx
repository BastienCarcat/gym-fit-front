'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Field, FormMessage } from '@/components/auth/AuthCard'
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
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Profile</h2>

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
          <p className="text-sm font-medium text-gray-700">Email</p>
          <p className="mt-1 text-gray-900">{me.email}</p>
          <p className="mt-1 text-xs text-gray-500">
            To change it,{' '}
            <a
              href={`mailto:${siteConfig.contact_email}`}
              className="text-sky-600 hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
        <Button
          type="submit"
          disabled={pending || !trimmed || trimmed === me.name}
          className="bg-sky-500 hover:bg-sky-600"
        >
          {pending ? 'Saving…' : 'Save'}
        </Button>
      </form>
    </section>
  )
}
