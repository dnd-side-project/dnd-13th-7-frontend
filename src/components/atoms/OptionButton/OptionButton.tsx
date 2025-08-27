import * as React from 'react'
import { Button } from '@/components/atoms/Button'
import type { ButtonProps } from '@/components/atoms/Button/button'
import { cn } from '@/shared/utils/cn'

export interface OptionButtonProps extends Omit<ButtonProps, 'variant'> {
  selected?: boolean
}

const OptionButton = React.forwardRef<HTMLButtonElement, OptionButtonProps>(
  ({ className, selected = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={'outlined-primary'}
        className={cn(
          'rounded-full hover:border-main-color-1 hover:text-main-color-1 hover:bg-main-color-3',
          selected && 'border-main-color-1 text-main-color-1 bg-main-color-3',
          className,
        )}
        {...props}
      />
    )
  },
)
OptionButton.displayName = 'OptionButton'

export { OptionButton }
