import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** A block of a dashboard page: a title, a line of help, then its content */
export function Panel({
  title,
  description,
  action,
  danger = false,
  className,
  children
}: {
  title: string
  description?: ReactNode
  action?: ReactNode
  /** Irreversible actions: a red border */
  danger?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <section
      className={cn(
        'rounded-[14px] border bg-ink-900 p-6',
        danger ? 'border-red-400/30' : 'border-ink-700',
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-steel-light">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

/** The title of a dashboard page */
export function PageHeader({
  title,
  description,
  action
}: {
  title: string
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-steel-light">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
