'use client'

import * as React from 'react'
import { Button } from '@/components/atoms/Button/button'
import { cn } from '@/shared/utils/cn'

interface SubscriptionButtonProps {
  isSubscribed?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function SubscriptionButton({
  isSubscribed = false,
  icon,
  children = '구독',
  onClick,
  className,
  disabled = false,
}: SubscriptionButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleClick = () => {
    if (isSubscribed) {
      setIsHovered(false)
    }
    onClick?.()
  }

  return (
    <Button
      variant="outlined-primary"
      size="small"
      onClick={handleClick}
      onMouseEnter={() => !isSubscribed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={cn(
        'h-auto rounded-full border px-4 py-2 gap-1 typo-button-m transition-all duration-200',
        // 기본 상태
        !isSubscribed &&
          !isHovered && ['!bg-white !border-main-color-1 !text-main-color-1'],
        // 호버 상태
        !isSubscribed &&
          isHovered && [
            '!bg-main-color-3 !border-main-color-1 !text-main-color-1',
          ],
        // 구독중
        isSubscribed && ['!bg-white !border-light-color-3 !text-black-color'],
        className,
      )}
    >
      {icon && (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
      {children}
    </Button>
  )
}
