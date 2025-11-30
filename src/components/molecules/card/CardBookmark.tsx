'use client'

import * as React from 'react'
import { BookmarkFilledIcon, BookmarkEmptyIcon } from '@/assets/icons'
import { cn } from '@/shared/utils/cn'

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
