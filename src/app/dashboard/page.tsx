import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { ApiKeyCard } from '@/components/dashboard/ApiKeyCard'
import { PlanCard } from '@/components/dashboard/PlanCard'
import { getApiKey } from '@/lib/api-keys/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const apiKeyData = await getApiKey(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <IconArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <form>
              <Button formAction={signout} variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <ApiKeyCard initialData={apiKeyData} />
          {/* <PlanCard plan={apiKeyData?.plan || 'free'} requestsUsed={0} /> */}
        </div>
      </main>
    </div>
  )
}
