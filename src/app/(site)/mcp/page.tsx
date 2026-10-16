import Link from 'next/link'
import { IconCheck } from '@tabler/icons-react'

import { JsonLd } from '@/components/seo/JsonLd'
import { buttonVariants } from '@/components/ui/button'
import {
  MCP_OAUTH_URL,
  MCP_PAGE_PATH,
  MCP_SERVER_NAME,
  MCP_TOOLS,
  MCP_URL
} from '@/config/mcp'
import { PLANS } from '@/config/plans'
import { siteConfig } from '@/config/site'
import { formatNumber } from '@/lib/format'
import { pageMetadata } from '@/lib/seo/metadata'

const SUMMARY =
  'Plug the GymFit exercise database into Claude, ChatGPT, Cursor or any MCP client: your assistant finds exercises, their muscles and alternatives, draws muscle heatmaps and runs fitness calculators.'

export const metadata = pageMetadata({
  path: MCP_PAGE_PATH,
  title: 'Fitness MCP Server for Claude, ChatGPT and Cursor',
  description:
    'Exercise MCP server: 5,800 exercises with their muscles, alternatives, heatmaps and calculators in Claude, ChatGPT and Cursor. Free plan, no credit card.'
})

/** What a person can ask, and what the assistant does with the tools */
const EXAMPLES = [
  'Find three dumbbell alternatives to the barbell bench press',
  'Build a 45-minute leg workout with a kettlebell, for a beginner',
  'Which muscles does the Romanian deadlift work? Show me',
  'What is my TDEE: 30 years old, 80 kg, 180 cm, active?'
]

const CLAUDE_CODE = `claude mcp add --transport http ${MCP_SERVER_NAME} ${MCP_URL} \\
  --header "X-API-Key: YOUR_API_KEY"`

const FAQS = [
  {
    question: 'Which AI assistants work with the GymFit MCP server?',
    answer:
      'Claude (web, desktop and mobile) and ChatGPT connect with your GymFit account. Claude Code, Cursor, VS Code, Windsurf, Gemini CLI and the other MCP clients connect with your API key.'
  },
  {
    question: 'How is the MCP server billed?',
    answer: `Like the API: each tool call counts as one request of your plan, and reading your usage is free. The free plan gives ${formatNumber(
      PLANS.free.quota
    )} requests a month, with no credit card.`
  },
  {
    question: 'Can the assistant change my account or my data?',
    answer:
      'No. The tools only read the exercise catalog, run the calculators and read your usage. You can disconnect an assistant at any time from your dashboard.'
  },
  {
    question: 'Do I need to write code?',
    answer:
      'No for Claude and ChatGPT: add a custom connector with the URL and sign in. For Claude Code or Cursor, one command or one line of configuration.'
  }
]

const sectionTitle =
  'text-3xl font-extrabold tracking-tight text-white sm:text-4xl'
const code =
  'break-all rounded-[6px] bg-ink-800 px-1.5 py-0.5 font-code text-xs text-white'

export default function McpPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer }
          }))
        }}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <p className="font-code text-xs uppercase tracking-wide text-volt">
            MCP server
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            The exercise database in your AI assistant
          </h1>
          <p className="mt-6 max-w-xl text-lg text-steel-light">{SUMMARY}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className={buttonVariants({ size: 'lg' })} href="/signup">
              Get a free account
            </Link>
            <a
              className={buttonVariants({ size: 'lg', variant: 'outline' })}
              href="#setup"
            >
              See the setup
            </a>
          </div>
        </div>

        <figure className="min-w-0 rounded-[14px] border border-ink-700 bg-ink-900 p-5">
          <figcaption className="font-code text-xs text-steel">
            In Claude, with GymFit connected
          </figcaption>
          <p className="ml-auto mt-4 w-fit max-w-[85%] rounded-[14px] bg-ink-800 px-4 py-3 text-sm text-white">
            Which muscles does the barbell squat work? Show me
          </p>
          <p className="mt-4 font-code text-xs text-volt">
            get_exercise_heatmap · squat-barbell
          </p>
          <div className="mt-3 flex items-center gap-4 rounded-[14px] border border-ink-700 bg-ink p-3">
            <img
              alt="Muscle heatmap of the barbell squat, front and back"
              className="h-40 w-auto"
              height={160}
              src="/heatmaps/squat-barbell.svg"
              width={150}
            />
            <p className="text-sm text-steel-light">
              The quadriceps and the glutes do the work; the adductors help.
            </p>
          </div>
        </figure>
      </section>

      <section
        aria-labelledby="tools-title"
        className="border-y border-ink-700 bg-ink-900"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className={sectionTitle} id="tools-title">
              What your assistant can do
            </h2>
            <ul className="mt-8 space-y-3 text-steel-light">
              {MCP_TOOLS.map((tool) => (
                <li key={tool} className="flex gap-3">
                  <IconCheck
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-volt"
                  />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Ask it, for example
            </h3>
            <ul className="mt-6 space-y-3">
              {EXAMPLES.map((example) => (
                <li
                  key={example}
                  className="rounded-[14px] border border-ink-700 bg-ink px-4 py-3 text-sm text-white"
                >
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="setup-title"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
        id="setup"
      >
        <h2 className={sectionTitle} id="setup-title">
          Connect it in a minute
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[14px] border border-ink-700 bg-ink-900 p-6">
            <h3 className="text-lg font-bold text-white">Claude and ChatGPT</h3>
            <ol className="mt-4 space-y-3 text-sm text-steel-light">
              <li>
                1. Add a custom connector with the URL{' '}
                <code className={code}>{MCP_OAUTH_URL}</code>
              </li>
              <li>2. Sign in to GymFit and allow it. No key to copy.</li>
            </ol>
          </div>
          <div className="min-w-0 rounded-[14px] border border-ink-700 bg-ink-900 p-6">
            <h3 className="text-lg font-bold text-white">
              Claude Code, Cursor, VS Code
            </h3>
            <p className="mt-4 text-sm text-steel-light">
              With your API key, at <code className={code}>{MCP_URL}</code>.
              Claude Code:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[10px] border border-ink-700 bg-ink p-4 font-code text-xs leading-relaxed text-white">
              <code>{CLAUDE_CODE}</code>
            </pre>
            <p className="mt-3 text-sm text-steel-light">
              The other clients are in your{' '}
              <Link
                className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt"
                href="/dashboard/ai"
              >
                dashboard
              </Link>{' '}
              and the{' '}
              <a
                className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt"
                href={siteConfig.documentation_url}
              >
                API reference
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="mcp-faq-title"
        className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <h2 className={sectionTitle} id="mcp-faq-title">
          MCP server FAQ
        </h2>
        <div className="mt-10 grid gap-x-12 lg:grid-cols-2">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-ink-700 py-5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt">
                <h3 className="text-base font-bold text-white">
                  {faq.question}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 font-code text-volt transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-steel-light">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="mcp-cta-title"
        className="border-t border-ink-700"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2
            className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            id="mcp-cta-title"
          >
            Give your assistant 5,800 exercises
          </h2>
          <Link
            className={buttonVariants({ size: 'lg', className: 'mt-8' })}
            href="/signup"
          >
            Get a free account
          </Link>
        </div>
      </section>
    </>
  )
}
