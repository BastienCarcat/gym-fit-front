import { DeleteAccountCard } from '@/components/dashboard/DeleteAccountCard'
import { PasswordCard } from '@/components/dashboard/PasswordCard'
import { ProfileCard } from '@/components/dashboard/ProfileCard'
import { apiFetch } from '@/lib/api/server'
import { CurrentUsage, Me } from '@/lib/api/types'

export default async function SettingsPage() {
  const [me, current] = await Promise.all([
    apiFetch<Me>('/v1/me'),
    apiFetch<CurrentUsage>('/v1/me/usage/current')
  ])

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <ProfileCard me={me} />
        <PasswordCard />
        <DeleteAccountCard
          plan={current.plan}
          subscribed={current.status !== null}
        />
      </div>
    </main>
  )
}
