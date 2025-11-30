//TODO: 디자인 토큰 정의 필요

'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  BookmarkMobileFilledIcon,
  BookmarkMobileEmptyIcon,
} from '@/assets/icons'
import { cn } from '@/shared/utils/cn'

export interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  logoUrl?: string | null
  fallbackSrc?: string | null
  alt?: string
  clubName?: string
  description?: string
  categories?: string[]
  isSubscribed?: boolean
  onBookmarkClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function MobileCard({
  logoUrl,
  fallbackSrc = '/images/default.svg',
  alt,
  clubName,
  description,
  categories = [],
  isSubscribed = false,
  onBookmarkClick,
  className,
  onClick,
  ...props
}: MobileCardProps) {
  const src = !logoUrl ? fallbackSrc! : logoUrl!

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onBookmarkClick?.(e)
  }

  return (
    <div
      data-slot="mobile-card"
      className={cn(
        'group w-full flex flex-row items-center gap-1 cursor-pointer',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {/* Thumbnail */}
      <div
        data-slot="mobile-card-thumbnail"
        className={cn(
          'relative w-[88px] h-[72px] shrink-0',
          'rounded-[12px] border border-light-color-3',
          'overflow-hidden',
        )}
      >
        <Image
          src={src}
          alt={alt || clubName || ''}
          fill
          className={cn(
            'object-cover transition-transform duration-300 ease-out will-change-transform transform-gpu group-hover:scale-105 group-active:scale-105',
          )}
        />
      </div>

      {/* Contents */}
      <div
        data-slot="mobile-card-contents"
        className="flex-1 flex flex-col px-[6px] min-w-0"
      >
        {/* Description */}
        <div className="flex flex-col gap-1">
          {clubName && (
            <div
              data-slot="mobile-card-club-name"
              className="typo-body-3-sb text-black-color line-clamp-1"
            >
              {clubName}
            </div>
          )}
          {description && (
            <div
              data-slot="mobile-card-description"
              className="typo-caption-m text-grey-color-2 line-clamp-1"
            >
              {description}
            </div>
          )}
        </div>

        {categories.length > 0 && (
          <div
            data-slot="mobile-card-categories"
            className="typo-caption-m text-main-color-1 line-clamp-1"
          >
            {categories.join('\u2009·\u2009')}
          </div>
        )}
      </div>

      <button
        data-slot="mobile-card-bookmark"
        type="button"
        onClick={handleBookmarkClick}
        className={cn(
          'shrink-0 flex items-center justify-center',
          'h-6 w-6',
          'transition-opacity duration-200',
        )}
        aria-label={isSubscribed ? '구독 해제' : '구독하기'}
      >
        {isSubscribed ? (
          <BookmarkMobileFilledIcon />
        ) : (
          <BookmarkMobileEmptyIcon />
        )}
      </button>
    </div>
  )
}
