'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react'

import { textLink } from '@/components/auth/AuthCard'
import { Panel } from '@/components/dashboard/Panel'
import { buttonVariants } from '@/components/ui/button'
import { Notice } from '@/components/ui/notice'
import {
  KEY_PLACEHOLDER,
  looksLikeApiKey,
  MCP_CLIENTS,
  MCP_TOOLS,
  MCP_URL
} from '@/config/mcp'
import { siteConfig } from '@/config/site'

const inlineCode =
  'rounded-[6px] bg-ink-800 px-1.5 py-0.5 font-code text-xs text-white'

/**
 * The MCP server and how to add it to each client. The key typed here only
 * fills the configurations in the page: it is sent nowhere.
 */
export function McpSetup({ hasKey }: { hasKey: boolean }) {
  const [key, setKey] = useState('')
  const [clientId, setClientId] = useState(MCP_CLIENTS[0].id)
  const client =
    MCP_CLIENTS.find((candidate) => candidate.id === clientId) ?? MCP_CLIENTS[0]
  const typed = key.trim()
  const valid = looksLikeApiKey(typed)
  const snippet = client.snippet(valid ? typed : KEY_PLACEHOLDER)

  return (
    <div className="space-y-6">
      <Panel
        description="For Claude Code, Cursor, VS Code and the other clients that take an API key. Same data as the API."
        title="With an API key"
      >
        <CopyRow className="mt-5" label="Copy the URL" value={MCP_URL} />
        <ul className="mt-5 grid gap-2 text-sm text-steel-light sm:grid-cols-2">
          {MCP_TOOLS.map((tool) => (
            <li key={tool} className="flex gap-2">
              <IconCheck
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-volt"
              />
              {tool}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-steel">
          Each tool call counts as one request of your quota, like a call to the
          API. Reading your usage is free. The tools only read: your assistant
          cannot change anything in your account.
        </p>
      </Panel>

      <Panel
        description={
          <>
            The server takes your key in the{' '}
            <code className={inlineCode}>X-API-Key</code> header. Paste it to
            fill in the configurations below: it stays in this page.
          </>
        }
        title="Your API key"
      >
        {!hasKey && (
          <Notice className="mt-4" role="status" tone="warning">
            You have no API key yet.{' '}
            <Link className={textLink} href="/dashboard">
              Create one in the overview
            </Link>
            , then come back.
          </Notice>
        )}
        <label className="sr-only" htmlFor="mcp-key">
          API key
        </label>
        <input
          autoComplete="off"
          className="mt-5 h-10 w-full rounded-[10px] border border-ink-700 bg-ink px-3 font-code text-sm text-white transition-colors placeholder:text-steel hover:border-steel focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt"
          id="mcp-key"
          placeholder="gf_..."
          spellCheck={false}
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <p className="mt-2 text-xs text-steel">
          {typed && !valid
            ? 'This does not look like a GymFit key: it starts with gf_ and has 46 characters.'
            : 'A key is only shown once, when it is created. Lost it? Roll it from the overview.'}
        </p>
      </Panel>

      <Panel
        description="Pick your client, then copy the configuration or install it in one click."
        title="Add it to your assistant"
      >
        <div className="mt-5 min-w-0 rounded-[14px] border border-ink-700 bg-ink">
          <div
            aria-label="MCP client"
            className="flex overflow-x-auto border-b border-ink-700 px-2"
            role="tablist"
          >
            {MCP_CLIENTS.map((candidate) => (
              <button
                key={candidate.id}
                aria-selected={candidate.id === client.id}
                className={`h-11 shrink-0 px-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
                  candidate.id === client.id
                    ? 'border-b-2 border-volt text-white'
                    : 'text-steel hover:text-white'
                }`}
                role="tab"
                type="button"
                onClick={() => setClientId(candidate.id)}
              >
                {candidate.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4">
            <p className="text-xs text-steel">{client.where}</p>
            <CopyButton value={snippet} />
          </div>
          {/* The key stays out of the session recordings and the clicks */}
          <pre className="ph-no-capture overflow-x-auto px-5 pb-5 pt-3 font-code text-sm leading-relaxed text-white">
            <code>{snippet}</code>
          </pre>
        </div>

        {client.installUrl && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {valid ? (
              <a
                className={`ph-no-capture ${buttonVariants()}`}
                href={client.installUrl(typed)}
              >
                <IconExternalLink aria-hidden />
                Install in {client.name}
              </a>
            ) : (
              <span
                aria-disabled
                className={buttonVariants({
                  className: 'pointer-events-none bg-ink-700 text-steel-light'
                })}
              >
                <IconExternalLink aria-hidden />
                Install in {client.name}
              </span>
            )}
            {!valid && (
              <p className="text-xs text-steel">
                Paste your key above to install in one click.
              </p>
            )}
          </div>
        )}

        <p className="mt-5 text-sm text-steel">
          Keep the key out of shared files: Cursor reads{' '}
          <code className={inlineCode}>{'${env:GYMFIT_API_KEY}'}</code> and
          Claude Code <code className={inlineCode}>{'${GYMFIT_API_KEY}'}</code>{' '}
          in a <code className={inlineCode}>.mcp.json</code>. More in the{' '}
          <a
            className={textLink}
            href={siteConfig.documentation_url}
            rel="noreferrer"
            target="_blank"
          >
            API reference
          </a>
          .
        </p>
      </Panel>
    </div>
  )
}

function useCopy(value: string) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // The text stays selectable
    }
  }

  return { copied, copy }
}

function CopyButton({ value }: { value: string }) {
  const { copied, copy } = useCopy(value)

  return (
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
  )
}

function CopyRow({
  value,
  label,
  className = ''
}: {
  value: string
  label: string
  className?: string
}) {
  const { copied, copy } = useCopy(value)

  return (
    <div
      className={`flex items-center gap-2 rounded-[10px] border border-ink-700 bg-ink p-3 ${className}`}
    >
      <code className="min-w-0 flex-1 break-all font-code text-sm text-white">
        {value}
      </code>
      <button
        aria-label={label}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        type="button"
        onClick={copy}
      >
        {copied ? (
          <IconCheck aria-hidden className="text-volt" />
        ) : (
          <IconCopy aria-hidden />
        )}
      </button>
    </div>
  )
}
