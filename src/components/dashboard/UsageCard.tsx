import { Panel } from '@/components/dashboard/Panel'
import { UsageEntry, UsageReport } from '@/lib/api/types'
import { formatDate, formatNumber } from '@/lib/format'

const DAY_MS = 24 * 60 * 60 * 1000

export function UsageCard({
  daily,
  endpoints,
  apiUrl
}: {
  daily: UsageReport
  endpoints: UsageReport
  apiUrl: string
}) {
  const { totals } = daily
  const errors = totals.requests - totals.success

  return (
    <Panel
      title="Usage this month"
      action={
        <p className="flex items-center gap-2 font-code text-xs uppercase tracking-wide text-steel">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-volt" />
          Live
        </p>
      }
    >
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Requests" value={formatNumber(totals.requests)} />
        <Stat label="Successful" value={formatNumber(totals.success)} />
        <Stat label="Errors" value={formatNumber(errors)} />
        <Stat
          label="Average latency"
          value={
            totals.averageLatencyMs === null
              ? '–'
              : `${totals.averageLatencyMs} ms`
          }
        />
      </dl>

      {totals.requests === 0 ? (
        <div className="mt-8 rounded-[10px] border border-dashed border-ink-700 p-6">
          <p className="text-sm font-bold text-white">
            No request yet this month. Try your first call:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-[10px] border border-ink-700 bg-ink p-4 font-code text-xs leading-relaxed text-white">
            {`curl "${apiUrl}/v2/exercises/search?query=squat" \\\n  -H "X-API-Key: YOUR_KEY"`}
          </pre>
        </div>
      ) : (
        <>
          <DailyChart report={daily} />
          <EndpointTable entries={endpoints.data} />
        </>
      )}
    </Panel>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-ink-700 bg-ink p-4">
      <dt className="font-code text-xs uppercase tracking-wide text-steel">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-extrabold tracking-tight text-white">
        {value}
      </dd>
    </div>
  )
}

function DailyChart({ report }: { report: UsageReport }) {
  const byDay = new Map(report.data.map((entry) => [entry.key, entry]))
  const days = listDays(report.from, report.to)
  const max = Math.max(1, ...report.data.map((entry) => entry.requests))

  return (
    <figure className="mt-8">
      <div
        className="flex h-40 items-end gap-1 border-b border-ink-700"
        role="img"
        aria-label="Requests per day: the successful ones at the bottom of each bar, the errors on top"
      >
        {days.map((day) => {
          const entry = byDay.get(day)
          const requests = entry?.requests ?? 0
          const success = entry?.success ?? 0
          const height = requests ? Math.max(2, (requests / max) * 100) : 0

          return (
            <div
              key={day}
              className="flex h-full flex-1 items-end"
              title={`${formatDate(day)}: ${formatNumber(requests)} requests, ${formatNumber(requests - success)} errors`}
            >
              <div
                className="flex w-full flex-col-reverse overflow-hidden rounded-t-[3px] bg-red-400"
                style={{ height: `${height}%` }}
              >
                <div
                  className="w-full bg-volt"
                  style={{
                    height: `${requests ? (success / requests) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      {/* On a phone the legend goes under the dates */}
      <figcaption className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-2 whitespace-nowrap font-code text-xs text-steel">
        <span>{formatDate(days[0])}</span>
        <span className="order-last flex w-full items-center gap-3 sm:order-none sm:w-auto">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-volt" /> Successful
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-red-400" /> Errors
          </span>
        </span>
        <span>{formatDate(days[days.length - 1])}</span>
      </figcaption>
    </figure>
  )
}

function EndpointTable({ entries }: { entries: UsageEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.requests - a.requests)

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="font-code text-xs uppercase tracking-wide text-steel">
          <tr className="border-b border-ink-700">
            <th className="py-2 font-normal">Endpoint</th>
            <th className="py-2 text-right font-normal">Requests</th>
            <th className="py-2 text-right font-normal">Errors</th>
            <th className="py-2 text-right font-normal">Latency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700">
          {sorted.map((entry) => (
            <tr key={entry.key}>
              <td className="py-2.5 pr-4 font-code text-xs text-steel-light">
                {entry.key}
              </td>
              <td className="py-2.5 text-right text-white">
                {formatNumber(entry.requests)}
              </td>
              <td className="py-2.5 text-right text-white">
                {formatNumber(entry.requests - entry.success)}
              </td>
              <td className="py-2.5 text-right text-steel-light">
                {entry.averageLatencyMs === null
                  ? '–'
                  : `${entry.averageLatencyMs} ms`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function listDays(from: string, to: string): string[] {
  const days: string[] = []

  for (
    let time = Date.parse(`${from}T00:00:00Z`);
    time <= Date.parse(`${to}T00:00:00Z`);
    time += DAY_MS
  ) {
    days.push(new Date(time).toISOString().slice(0, 10))
  }

  return days
}
