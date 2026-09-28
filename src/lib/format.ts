const numberFormat = new Intl.NumberFormat('en-US')

export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

/** UTC on purpose: same output on the server and in the browser */
export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

export function formatDateTime(value: string | Date): string {
  const formatted = new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  })
  return `${formatted} UTC`
}
