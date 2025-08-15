import * as React from 'react'
import { cn } from '@/shared/utils/cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-lg border px-3 py-1 typo-body-3-3-r transition-[color,box-shadow] outline-none ring-0 resize-none',
        // Base colors from design tokens
        'bg-white-color text-black-color placeholder:text-grey-color-1 border-light-color-4',
        // disabled states
        'disabled:bg-light-color-2 disabled:text-grey-color-2 disabled:border-light-color-4 disabled:cursor-not-allowed',
        // File input
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        // Invalid
        'aria-invalid:border-failure-color',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
