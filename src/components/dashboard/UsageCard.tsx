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
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Usage this month
        </h2>
        <p className="text-xs text-gray-400">Updated every 5 minutes</p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-6">
          <p className="text-sm font-medium text-gray-700">
            No request yet this month. Try your first call:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
            {`curl -H "X-API-Key: YOUR_KEY" \\\n  "${apiUrl}/v1/exercises/search?query=bench"`}
          </pre>
        </div>
      ) : (
        <>
          <DailyChart report={daily} />
          <EndpointTable entries={endpoints.data} />
        </>
      )}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-1 text-xl font-semibold text-gray-900">{value}</dd>
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
        className="flex h-40 items-end gap-1"
        role="img"
        aria-label="Requests per day, successful ones in blue and errors in red"
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
                className="flex w-full flex-col-reverse overflow-hidden rounded-t bg-rose-300"
                style={{ height: `${height}%` }}
              >
                <div
                  className="w-full bg-sky-500"
                  style={{
                    height: `${requests ? (success / requests) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <figcaption className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{formatDate(days[0])}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-sky-500" /> Successful
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-rose-300" /> Errors
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
        <thead className="text-xs uppercase text-gray-400">
          <tr>
            <th className="py-2 font-medium">Endpoint</th>
            <th className="py-2 text-right font-medium">Requests</th>
            <th className="py-2 text-right font-medium">Errors</th>
            <th className="py-2 text-right font-medium">Latency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map((entry) => (
            <tr key={entry.key}>
              <td className="py-2 font-mono text-gray-700">{entry.key}</td>
              <td className="py-2 text-right text-gray-900">
                {formatNumber(entry.requests)}
              </td>
              <td className="py-2 text-right text-gray-900">
                {formatNumber(entry.requests - entry.success)}
              </td>
              <td className="py-2 text-right text-gray-500">
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
