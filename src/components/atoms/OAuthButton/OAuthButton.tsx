'use client'

import { useOAuthAuthorize } from '@/features/oauth'
import { OAuthProvider } from '@/features/oauth/types'
import { cn } from '@/shared/utils/cn'

interface OAuthButtonProps {
  provider: OAuthProvider
  className?: string
  children?: React.ReactNode
}

export function OAuthButton({
  provider,
  className,
  children,
}: OAuthButtonProps) {
  const { mutate: authorize, isPending } = useOAuthAuthorize()

  const handleClick = () => {
    authorize(provider)
  }

  const getProviderIcon = () => {
    switch (provider) {
      case 'google':
        return '🔍' // Google 아이콘
      case 'kakao':
        return '💬' // Kakao 아이콘
      default:
        return '🔑'
    }
  }

  const getProviderName = () => {
    switch (provider) {
      case 'google':
        return 'Google'
      case 'kakao':
        return 'Kakao'
      default:
        return provider
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors',
        'hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
    >
      <span className="text-lg">{getProviderIcon()}</span>
      <span>{children || `${getProviderName()}로 로그인`}</span>
      {isPending && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
      )}
    </button>
  )
}
