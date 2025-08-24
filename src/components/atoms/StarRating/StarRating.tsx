'use client'

import React from 'react'
import { cn } from '@/shared/utils/cn'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  maxStars?: number
  className?: string
  disabled?: boolean
}

export function StarRating({
  value,
  onChange,
  maxStars = 5,
  className,
  disabled = false,
}: StarRatingProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= value

        return (
          <button
            key={index}
            type="button"
            onClick={() => !disabled && onChange(starValue)}
            disabled={disabled}
            aria-label={`${starValue}점 선택`}
            title={`${starValue}점`}
            className={cn(
              'p-1 transition-colors',
              !disabled && 'hover:scale-110',
              disabled && 'cursor-not-allowed',
            )}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'transition-colors',
                isFilled
                  ? 'fill-yellow-400 stroke-yellow-400'
                  : 'fill-transparent stroke-grey-color-2',
                !disabled && 'hover:fill-yellow-300 hover:stroke-yellow-300',
              )}
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
