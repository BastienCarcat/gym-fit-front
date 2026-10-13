'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'

const API = 'https://api.gymfit-api.com'

const SNIPPETS = {
  curl: `curl "${API}/v2/exercises/search?query=squat&equipment=Barbell" \\
  -H "X-API-Key: $GYMFIT_API_KEY"`,
  JavaScript: `const res = await fetch(
  "${API}/v2/exercises/search?query=squat&equipment=Barbell",
  { headers: { "X-API-Key": process.env.GYMFIT_API_KEY } }
);
const { results, total } = await res.json();`,
  Python: `import os, requests

res = requests.get(
    "${API}/v2/exercises/search",
    params={"query": "squat", "equipment": "Barbell"},
    headers={"X-API-Key": os.environ["GYMFIT_API_KEY"]},
)
exercises = res.json()["results"]`
} as const

type Language = keyof typeof SNIPPETS

export function Quickstart() {
  const [language, setLanguage] = useState<Language>('curl')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[language])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // The code stays selectable
    }
  }

  return (
    <section
      aria-labelledby="quickstart-title"
      className="border-y border-ink-700 bg-ink-900"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            id="quickstart-title"
          >
            From sign-up to your first exercise in a minute
          </h2>
          <ol className="mt-8 space-y-5 text-steel-light">
            <li>
              <Link
                className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
                href="/signup"
              >
                Create a free account
              </Link>
              <span className="block text-sm">
                An email and a password, no credit card.
              </span>
            </li>
            <li>
              <span className="font-bold text-white">Copy your API key</span>
              <span className="block text-sm">
                It is shown once, in your dashboard.
              </span>
            </li>
            <li>
              <span className="font-bold text-white">Call the API</span>
              <span className="block text-sm">
                Send the key in the X-API-Key header.
              </span>
            </li>
          </ol>
        </div>

        <div className="min-w-0 rounded-[14px] border border-ink-700 bg-ink">
          <div className="flex items-center justify-between border-b border-ink-700 px-2">
            <div aria-label="Language" className="flex" role="tablist">
              {(Object.keys(SNIPPETS) as Language[]).map((name) => (
                <button
                  key={name}
                  aria-selected={name === language}
                  className={`h-11 px-3 font-code text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
                    name === language
                      ? 'border-b-2 border-volt text-white'
                      : 'text-steel hover:text-white'
                  }`}
                  role="tab"
                  type="button"
                  onClick={() => setLanguage(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-xs font-medium text-steel-light transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              type="button"
              onClick={copy}
            >
              {copied ? (
                <IconCheck aria-hidden className="h-4 w-4 text-volt" />
              ) : (
                <IconCopy aria-hidden className="h-4 w-4" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="overflow-x-auto p-5 font-code text-sm leading-relaxed text-white">
            <code>{SNIPPETS[language]}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
