import { Metadata } from 'next'
import { DeleteAccountCard } from '@/components/dashboard/DeleteAccountCard'
import { PasswordCard } from '@/components/dashboard/PasswordCard'
import { PageHeader } from '@/components/dashboard/Panel'
import { ProfileCard } from '@/components/dashboard/ProfileCard'
import { apiFetch } from '@/lib/api/server'
import { CurrentUsage, Me } from '@/lib/api/types'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const [me, current] = await Promise.all([
    apiFetch<Me>('/v1/me'),
    apiFetch<CurrentUsage>('/v1/me/usage/current')
  ])

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Settings" />
      <ProfileCard me={me} />
      <PasswordCard />
      <DeleteAccountCard
        plan={current.plan}
        subscribed={current.status !== null}
      />
    </div>
  )
}
