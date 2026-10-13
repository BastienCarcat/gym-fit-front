import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/** The dark pages of the brand: volt for the main action, ink for the rest */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-volt text-ink hover:-translate-y-px focus-visible:outline-white active:translate-y-px disabled:bg-ink-700 disabled:text-steel-light disabled:opacity-100 motion-reduce:transform-none',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-400',
        outline:
          'border border-ink-700 text-white hover:border-steel focus-visible:outline-volt',
        secondary:
          'bg-ink-800 text-white hover:bg-ink-700 focus-visible:outline-volt',
        ghost:
          'text-steel-light hover:bg-ink-800 hover:text-white focus-visible:outline-volt',
        link: 'text-volt underline-offset-4 hover:underline focus-visible:outline-volt'
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
