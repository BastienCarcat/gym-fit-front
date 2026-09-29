'use client'

import { FormEvent, useState } from 'react'
import { Field, FormMessage } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

type Message = { tone: 'error' | 'success'; text: string }

export function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [message, setMessage] = useState<Message | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (newPassword !== confirmation) {
      setMessage({ tone: 'error', text: 'The new passwords do not match.' })
      return
    }

    setPending(true)

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    })

    setPending(false)

    if (error) {
      setMessage({
        tone: 'error',
        text:
          error.code === 'INVALID_PASSWORD'
            ? 'Your current password is incorrect.'
            : error.message || 'Your password could not be changed'
      })
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmation('')
    setMessage({
      tone: 'success',
      text: 'Your password has been changed and your other devices signed out.'
    })
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Password</h2>
      <p className="mt-1 text-sm text-gray-500">
        Changing it signs you out of your other devices.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {message && (
          <FormMessage tone={message.tone}>{message.text}</FormMessage>
        )}
        <Field
          id="current-password"
          label="Current password"
          type="password"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
        <Field
          id="new-password"
          label="New password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Field
          id="new-password-confirmation"
          label="Confirm the new password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />
        <Button
          type="submit"
          disabled={pending}
          className="bg-sky-500 hover:bg-sky-600"
        >
          {pending ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </section>
  )
}
