'use client'

import * as React from 'react'
import { cn } from '@/shared/utils/cn'
import { PRESET } from './presets'
import { CardSizePreset, Orientation } from './types'

export const CardCtx = React.createContext<{
  orientation: Orientation
  preset: CardSizePreset
}>({
  orientation: 'vertical',
  preset: 'col3Desktop',
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  size?: CardSizePreset
  thumbNailWidth?: string
  gap?: string
  pad?: string
  border?: boolean
  children?: React.ReactNode
}

export function Card({
  orientation = 'vertical',
  size = 'col3Desktop',
  thumbNailWidth,
  className,
  gap,
  pad,
  border,
  style,
  children,
  ...props
}: CardProps) {
  const preset = PRESET[size]

  const styles: React.CSSProperties = {
    ...(style || {}),
    ['--card-w' as any]: preset.cardWidth,
    ['--thumb-w' as any]: thumbNailWidth ?? preset.ImageWidth,
    ['--card-gap' as any]: gap,
    ['--card-pad' as any]: pad,
  }

  const base =
    orientation === 'vertical'
      ? 'max-w-[var(--card-w)] w-full flex flex-col'
      : 'w-full flex flex-row items-start'

  return (
    <CardCtx.Provider value={{ orientation, preset: size }}>
      <div
        data-slot="card"
        className={cn(
          base,
          'gap-[var(--card-gap)] p-[var(--card-pad)] rounded-[12px]',
          border && 'border-light-color-3',
          className,
        )}
        style={styles}
        {...props}
      >
        {children}
      </div>
    </CardCtx.Provider>
  )
}
