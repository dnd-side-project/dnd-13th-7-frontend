import * as React from 'react'
import { cn } from '@/shared/utils/cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'h-9 w-full min-w-0 rounded-lg border px-3 py-1 typo-body-3-3-r transition-[color,box-shadow] outline-none ring-0 resize-none',
        // Base colors from design tokens
        'bg-white-color text-black-color placeholder:text-grey-color-1 border-light-color-4',
        // disabled states
        'disabled:bg-light-color-2 disabled:text-grey-color-2 disabled:border-light-color-4 disabled:cursor-not-allowed',
        // Invalid
        'aria-invalid:border-failure-color',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
