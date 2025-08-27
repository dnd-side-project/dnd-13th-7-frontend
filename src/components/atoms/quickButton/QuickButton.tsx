'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useMediaQuery from '@/shared/hooks/useMediaQuery'

// Utility function for combining class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface QuickButtonProps {
  icon: string
  title: string
  description?: string
  href: string
  className?: string
  onClick?: () => void
}

export const QuickButton: React.FC<QuickButtonProps> = ({
  icon,
  title,
  description,
  href,
  className,
  onClick,
}) => {
  const { isDesktop } = useMediaQuery()

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        isDesktop
          ? 'w-130 h-22 flex items-center gap-2 bg-white border border-light-color-3 rounded-[16px] p-4'
          : 'w-38 h-16 flex items-center gap-3 bg-white border border-light-color-3 rounded-[16px] p-4',
        className,
      )}
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 w-8 h-8 md:w-14 md:h-14 flex items-center justify-center min-w-0">
        <Image
          src={icon}
          alt={title}
          width={56}
          height={56}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
        <h3 className="typo-body-3-b text-grey-color-5 truncate">{title}</h3>
        {description && (
          <p className="hidden md:block typo-button-m text-grey-color-3 truncate">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
