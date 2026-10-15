import { InputHTMLAttributes, ReactNode } from 'react'

import { Notice } from '@/components/ui/notice'

/** A link inside a sentence, on the dark pages */
export const textLink =
  'font-bold text-white underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt'

/** The form column of the sign-in pages; the layout draws the rest */
export function AuthCard({
  title,
  subtitle,
  children,
  footer
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-steel-light">{subtitle}</p>}
      <div className="mt-8 space-y-5">{children}</div>
      {footer && <p className="mt-8 text-sm text-steel-light">{footer}</p>}
    </div>
  )
}

export function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-steel-light"
      >
        {label}
      </label>
      <input
        {...props}
        className="mt-1.5 block h-11 w-full rounded-[10px] border border-ink-700 bg-ink px-3 text-white transition-colors placeholder:text-steel hover:border-steel focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt disabled:opacity-50"
      />
    </div>
  )
}

export function FormMessage({
  tone,
  children
}: {
  tone: 'error' | 'success'
  children: ReactNode
}) {
  return (
    <Notice role={tone === 'error' ? 'alert' : 'status'} tone={tone}>
      {children}
    </Notice>
  )
}
