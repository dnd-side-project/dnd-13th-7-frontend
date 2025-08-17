'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/shared/utils/cn'
import { CardCtx } from './Card'
import { PRESET } from './presets'

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  coverSrc?: string | null
  logoSrc?: string | null
  fallbackSrc?: string | null
  alt?: string
  priority?: boolean
  ImageWidth?: string
  ratioOverride?: string
  className?: string
  interactive?: boolean
}

export function CardImage({
  coverSrc,
  logoSrc,
  fallbackSrc = '/images/default.svg',
  alt,
  priority,
  ImageWidth,
  ratioOverride,
  className,
  interactive = false,
  ...props
}: CardImageProps) {
  const { orientation, preset } = React.useContext(CardCtx)
  const p = PRESET[preset]

  const wantSrc = coverSrc || logoSrc || fallbackSrc
  const [failed, setFailed] = React.useState(false)
  const src = failed ? fallbackSrc : wantSrc

  const ratio = ratioOverride || p.ratio

  const aspectClass = ratio === '113/108' ? 'aspect-[113/108]' : 'aspect-[3/2]'

  const sizes =
    orientation === 'vertical' ? p.ImageSize : (ImageWidth ?? p.ImageWidth)

  const imageBox =
    orientation === 'vertical' ? 'w-full' : 'w-[var(--thumb-w)] shrink-0'

  return (
    <div
      data-slot="card-image"
      className={cn(
        'relative w-full object-cover overflow-hidden border border-light-color-3 rounded-[12px]',
        imageBox,
        aspectClass,
        className,
      )}
      style={{
        ...(orientation === 'horizontal' && ImageWidth
          ? ({ ['--thumb-w' as any]: ImageWidth } as React.CSSProperties)
          : undefined),
        aspectRatio: ratio.replace('/', ' / '),
      }}
      {...props}
    >
      <Image
        src={src as string}
        alt={alt || ''}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'object-cover  transition-transform duration-300 ease-out will-change-transform transform-gpu',
          interactive && 'group-hover:scale-105',
        )}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
