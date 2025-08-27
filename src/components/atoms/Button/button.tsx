import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[100px] transition-colors',
    'disabled:cursor-not-allowed',
    'disabled:bg-light-color-3 disabled:text-grey-color-3 disabled:border-light-color-3',
  ].join(' '),
  {
    variants: {
      variant: {
        solid:
          // bg: main-1, hover: main-2, text: white
          [
            'bg-main-color-1 text-white-color',
            'hover:bg-main-color-4',
            'active:bg-main-color-2',
          ].join(' '),
        'outlined-primary':
          // primary: border/text main color
          [
            'border border-solid',
            'border-light-color-3 text-grey-color-4',
            'hover:border-light-color-3 hover:text-grey-color-5 hover:bg-light-color-1',
            'active:border-main-color-1 active:text-main-color-1 active:bg-main-color-3',
          ].join(' '),
        'outlined-secondary':
          // secondary: neutral border/text, hover to main color
          [
            'border border-solid',
            'border-light-color-4 text-main-color-1',
            'hover:border-main-color-1 hover:text-main-color-1 hover:bg-main-color-3',
            'active:border-light-color-4 active:text-grey-color-5 active:bg-light-color-2',
          ].join(' '),
        none: [
          'border-none bg-transparent text-black-color hover:bg-transparent active:bg-transparent',
        ],
      },
      size: {
        small: 'px-4 py-2 typo-caption-m',
        medium: 'px-4 py-3 typo-body-3-b',
        large: 'p-4 typo-body-3-b',
        none: 'p-0 m-0',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        class: 'border border-main-color-1',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'small',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
