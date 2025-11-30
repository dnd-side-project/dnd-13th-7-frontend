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

/**
 * Render a Card container that provides CardCtx and applies preset sizing, orientation, spacing, and optional border.
 *
 * @param orientation - Layout direction used by the card and its children; affects base flex classes. Defaults to `'vertical'`.
 * @param size - Preset key used to derive card and image sizing CSS variables.
 * @param thumbNailWidth - Explicit thumbnail width that overrides the preset image width (sets `--thumb-w`).
 * @param className - Additional CSS classes applied to the outer card element.
 * @param gap - Optional gap value applied to the card via `--card-gap`.
 * @param pad - Optional padding value applied to the card via `--card-pad`.
 * @param border - When true, renders a border around the card.
 * @param style - Inline styles merged with generated CSS variables for sizing and spacing.
 * @param children - Child nodes rendered inside the card.
 * @returns The card element wrapped with CardCtx.Provider, with computed classes and CSS variables applied.
 */
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

/**
 * Render the card content container with layout that adapts to the card orientation.
 *
 * The container always includes a minimum-width reset and applies a column layout.
 * When the surrounding Card orientation is `horizontal` the container becomes flexibly
 * expanding (`flex-1`) to fill available space.
 *
 * @returns A div element used as the card content area; `vertical` orientation uses a simple column layout, `horizontal` orientation uses `flex-1` plus a column layout.
 */
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

/**
 * Renders the card's descriptive text area with preset typography, color, two-line truncation, and spacing.
 *
 * @param className - Additional CSS classes appended to the default description styles.
 * @returns A div element used as the card description slot.
 */
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

/**
 * Render the card's footer container with default layout and forwarded attributes.
 *
 * @param className - Additional CSS classes to merge with the footer's base `flex` class
 * @param props - Other HTMLDivElement attributes forwarded to the root element
 * @returns A div element with `data-slot="card-footer"`, `flex` layout, merged `className`, and any forwarded props
 */
export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex', className)} {...props} />
  )
}

/**
 * Renders the header slot for a Card, providing a horizontal flex container.
 *
 * @returns A div with `data-slot="card-header"` and `flex` layout that merges any provided `className` and other div props.
 */
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

/**
 * Renders a card image area with responsive sizing, aspect-ratio control, and a fallback.
 *
 * Renders a container that applies a preset or explicit thumbnail width, sets the CSS aspect ratio,
 * and contains an image that falls back to `fallbackSrc` on load error. When `orientation` is horizontal
 * and `ImageWidth` is provided, the container sets the CSS variable `--thumb-w` to control thumbnail width.
 *
 * @param logoUrl - Primary image URL to display; if missing or if the image fails to load, `fallbackSrc` is used.
 * @param fallbackSrc - URL used when `logoUrl` is absent or fails to load; defaults to '/images/default.svg'.
 * @param alt - Alternative text for the image; defaults to an empty string when not provided.
 * @param priority - If true, marks the image as high priority for loading.
 * @param ImageWidth - Explicit thumbnail width (CSS value) applied when orientation is horizontal; overrides preset thumbnail width.
 * @param ratioOverride - Aspect ratio string (e.g., '3/2') that overrides the preset ratio.
 * @param interactive - When true, enables a subtle hover scale transform on the image.
 * @param className - Additional container class names merged with internal classes.
 * @returns A JSX element: a styled container div with the configured image element inside.
 */
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

/**
 * Render a single-line metadata string composed from the provided parts.
 *
 * Each non-empty input is trimmed and joined with ' · '. If all inputs are empty or missing, the component renders `null`.
 *
 * @param kind - Optional descriptor (for example, item kind or category)
 * @param clubName - Optional club or organization name
 * @param clubYear - Optional year or season associated with the club
 * @param part - Optional subrole or part information
 * @param className - Additional CSS class names to apply to the container
 * @returns A `div` containing the joined metadata string, or `null` when there is no metadata to display.
 */
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

/**
 * Render right-aligned like and comment counts with accompanying icons.
 *
 * @param likes - Number of likes to display (defaults to 0)
 * @param comments - Number of comments to display (defaults to 0)
 * @returns A div element containing like and comment icons with their counts
 */
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

/**
 * Renders the card title slot with preset typography and single-line truncation.
 *
 * Applies typography, text color, ellipsis overflow, and line-clamp for a single line;
 * accepts an additional `className` and forwards other div props.
 *
 * @returns A div element used as the card's title with single-line truncation and preset styles.
 */
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

/**
 * Renders a bookmark button that reflects subscription state and prevents the click from bubbling to ancestor elements.
 *
 * @param isSubscribed - If `true`, shows the filled bookmark icon and sets the aria-label to "구독 해제"; if `false`, shows the empty icon and sets the aria-label to "구독하기".
 * @param onClick - Optional handler invoked when the button is clicked (the event propagation is stopped before calling this).
 * @param disabled - If `true`, disables the button and applies disabled styling.
 * @returns The bookmark button element with the appropriate icon and accessibility label.
 */
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