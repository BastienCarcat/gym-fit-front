import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

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
          {/* API Key Card */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Your API Key
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Use this key to authenticate your API requests
            </p>
            <div className="mt-4 flex items-center gap-3">
              <code className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-700">
                ••••••••••••••••••••••••
              </code>
              <Button variant="outline">Reveal</Button>
              <Button variant="outline">Regenerate</Button>
            </div>
            <div className="mt-4 rounded-md border border-gray-200 bg-white p-4">
              <p className="text-sm text-gray-700">
                <strong>Quick start:</strong> Add this header to your API
                requests:
              </p>
              <code className="mt-2 block rounded bg-gray-100 px-3 py-2 font-mono text-xs text-gray-800">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>

          {/* Plan Card */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Plan
            </h2>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800">
                Free
              </span>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">API Requests</span>
                <span className="font-medium text-gray-900">0 / 1,000</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <div className="h-2 w-0 rounded-full bg-sky-500" />
              </div>
              <p className="mt-2 text-xs text-gray-500">Resets monthly</p>
            </div>
            <Button className="mt-6 w-full bg-sky-500 hover:bg-sky-600">
              Upgrade to Premium
            </Button>
            <p className="mt-2 text-center text-xs text-gray-500">
              100,000 requests/month for $9/month
            </p>
          </div>

          {/* Usage Stats */}
          {/* <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your API usage over the last 30 days
            </p>
            <div className="mt-6 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-400">
                No usage data yet. Make your first API call to see stats here.
              </p>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  )
}
