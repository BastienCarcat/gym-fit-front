import { InputHTMLAttributes, ReactNode } from 'react'

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
        {footer && (
          <div className="text-center text-sm text-gray-500">{footer}</div>
        )}
      </div>
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
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...props}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={
        tone === 'error'
          ? 'rounded-md bg-red-50 p-3 text-sm text-red-600'
          : 'rounded-md bg-green-50 p-3 text-sm text-green-700'
      }
    >
      {children}
    </div>
  )
}
