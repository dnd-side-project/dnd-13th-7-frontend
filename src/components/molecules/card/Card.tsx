'use client'

import * as React from 'react'
import Image from 'next/image'
import { BookmarkFilledIcon, BookmarkEmptyIcon } from '@/assets/icons'
import { GreyMessage } from '@/assets/icons/GreyMessage'
import { GreyThumbsUp } from '@/assets/icons/GreyThumbsUp'
import { cn } from '@/shared/utils/cn'
import { PRESET } from './presets'
import { CardSizePreset, Orientation } from './types'

type CardCSSVars = {
  '--card-w'?: string
  '--thumb-w'?: string
  '--card-gap'?: string
  '--card-pad'?: string
}

type CardImageCSSVars = {
  '--thumb-w'?: string
}

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

  const styles = {
    ...style,
    '--card-w': preset.cardWidth,
    '--thumb-w': thumbNailWidth ?? preset.ImageWidth,
    ...(gap && { '--card-gap': gap }),
    ...(pad && { '--card-pad': pad }),
  } satisfies React.CSSProperties & CardCSSVars

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
          'gap-(--card-gap) p-(--card-pad) rounded-[12px]',
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

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'desktop:typo-caption-m phone:typo-body-4-m text-grey-color-2 text-ellipsis overflow-hidden line-clamp-2 flex-col mt-1',
        className,
      )}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex', className)} {...props} />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-header" className={cn('flex', className)} {...props} />
  )
}

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  logoUrl?: string | null
  fallbackSrc?: string | null
  alt?: string
  priority?: boolean
  ImageWidth?: string
  ratioOverride?: string
  className?: string
  interactive?: boolean
}

export function CardImage({
  logoUrl,
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

  const [failed, setFailed] = React.useState(false)
  const src = failed || !logoUrl ? fallbackSrc! : logoUrl!

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
        ...((orientation === 'horizontal' && ImageWidth
          ? { '--thumb-w': ImageWidth }
          : {}) as CardImageCSSVars),
        aspectRatio: ratio?.replace('/', ' / '),
      }}
      {...props}
    >
      <Image
        src={src}
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

export function CardMeta({
  kind,
  clubName,
  clubYear,
  part,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  kind?: string
  clubName?: string
  clubYear?: string
  part?: string
}) {
  const meta = [kind?.trim(), clubName?.trim(), clubYear?.trim(), part?.trim()]
    .filter(Boolean)
    .join(' · ')

  if (meta.length === 0) return null

  return (
    <div
      data-slot="card-meta"
      className={cn(
        'typo-caption-m text-main-color-1 flex-col desktop:mt-2 phone:mt-1',
        className,
      )}
      {...props}
    >
      {meta}
    </div>
  )
}

export function CardStats({
  likes = 0,
  comments = 0,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  likes?: number
  comments?: number
}) {
  return (
    <div
      data-slot="card-stats"
      className={cn(
        'typo-caption-m text-grey-color-1 flex items-center justify-end flex-row',
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <GreyThumbsUp />
        <span className="ml-1.5">{likes}</span>
      </div>
      <div className="flex items-center ml-2">
        <GreyMessage />
        <span className="ml-1.5">{comments}</span>
      </div>
    </div>
  )
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'desktop:typo-body-2-sb phone:typo-body-3-b text-black-color text-ellipsis overflow-hidden line-clamp-1 flex-col',
        className,
      )}
      {...props}
    />
  )
}

export interface CardBookmarkProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isSubscribed?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
}

export function CardBookmark({
  isSubscribed = false,
  onClick,
  className,
  disabled = false,
  ...props
}: CardBookmarkProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick?.(e)
  }

  return (
    <button
      data-slot="card-bookmark"
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'absolute top-4 right-4 z-10',
        'flex items-center justify-center',
        'transition-opacity duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:ring-offset-2 rounded-full',
        className,
      )}
      aria-label={isSubscribed ? '구독 해제' : '구독하기'}
      {...props}
    >
      {isSubscribed ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
    </button>
  )
}
