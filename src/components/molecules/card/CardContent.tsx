'use client'

import * as React from 'react'
import { cn } from '@/shared/utils/cn'
import { CardCtx } from './Card'

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { orientation } = React.useContext(CardCtx)

  return (
    <div
      data-slot="card-content"
      className={cn(
        'min-w-0',
        orientation === 'vertical' ? 'flex flex-col' : 'flex-1 flex flex-col',
        className,
      )}
      {...props}
    />
  )
}
