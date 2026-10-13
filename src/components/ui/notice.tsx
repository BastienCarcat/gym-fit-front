import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type NoticeTone = 'error' | 'success' | 'warning'

const TONES: Record<NoticeTone, string> = {
  error: 'border-red-400/30 bg-red-400/10 text-red-200',
  success: 'border-volt/30 bg-volt/10 text-volt',
  warning: 'border-amber-300/30 bg-amber-300/10 text-amber-100'
}

/** A message on the dark pages: errors in red, warnings in amber, the rest in volt */
export function Notice({
  tone,
  className,
  ...props
}: { tone: NoticeTone } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[10px] border px-4 py-3 text-sm',
        TONES[tone],
        className
      )}
      {...props}
    />
  )
}
