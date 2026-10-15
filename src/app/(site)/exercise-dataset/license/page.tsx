import { Metadata } from 'next'

import { DATA_PACK } from '@/config/dataPack'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  path: DATA_PACK.licensePath,
  title: 'Data pack license',
  description:
    'The license of the GymFit exercise dataset: what you may do with the data pack, what you may not, credit, updates and liability.'
})

// The text lives with the API, which ships it in every pack. Rendered on
// request, so a build never depends on the API; the text is kept an hour
export const dynamic = 'force-dynamic'
const revalidate = 3600

export default async function DataPackLicensePage() {
  const baseUrl = (process.env.GYM_FIT_BASE_URL ?? '').replace(/\/$/, '')
  const response = await fetch(`${baseUrl}/v1/data-pack/license`, {
    next: { revalidate }
  })

  if (!response.ok) {
    throw new Error(`License unavailable: ${response.status}`)
  }

  const { html } = (await response.json()) as { html: string }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <article
        dangerouslySetInnerHTML={{ __html: html }}
        className="mx-auto max-w-3xl text-base leading-7 text-steel-light marker:text-volt [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-white sm:[&_h1]:text-5xl [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-ink-700 [&_h2]:pt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-white [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_strong]:text-white [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
      />
    </div>
  )
}
