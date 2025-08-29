'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { parseOAuthCallbackParams } from '@/features/oauth/queries'
import { OAuthProvider } from '@/features/oauth/types'
import AppPath from '@/shared/configs/appPath'
import { tokenCookies } from '@/shared/utils/cookies'

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()

  // provider는 URL 파라미터에서 추출
  const provider = params.provider as OAuthProvider

  // 유효하지 않은 provider인 경우 처리
  useEffect(() => {
    if (provider && !['google', 'kakao'].includes(provider)) {
      console.error('Invalid OAuth provider:', provider)
      router.push(`${AppPath.login()}?error=invalid_provider`)
    }
  }, [provider, router])

  // 쿼리 파라미터로 받은 OAuth 데이터 처리
  useEffect(() => {
    const oauthData = parseOAuthCallbackParams(searchParams)

    if (oauthData) {
      const isActive = oauthData.active === 'true'

      if (!isActive) {
        // 회원가입이 필요한 경우 - OAuth 정보를 세션스토리지에 저장하고 signup으로 이동
        sessionStorage.setItem('oauth_data', JSON.stringify(oauthData))
        router.push(AppPath.signup())
      } else {
        // 이미 가입된 사용자인 경우 - 토큰을 쿠키에 저장하고 홈으로 이동
        const expiresIn = parseInt(oauthData.expiresIn)
        tokenCookies.setAccessToken(oauthData.accessToken, expiresIn)
        tokenCookies.setUserId(oauthData.userId)
        tokenCookies.setExpiresAt(Date.now() + expiresIn * 1000)

        router.push(AppPath.home())
      }
    } else {
      // OAuth 데이터가 없거나 불완전한 경우
      const hasAnyParam =
        searchParams.get('userId') ||
        searchParams.get('active') !== null ||
        searchParams.get('accessToken') ||
        searchParams.get('expiresIn')

      if (hasAnyParam) {
        console.error('Incomplete OAuth callback parameters')
        router.push(`${AppPath.login()}?error=incomplete_oauth_data`)
      }
    }
  }, [searchParams, router])

  // 로딩 상태 표시
  const oauthData = parseOAuthCallbackParams(searchParams)
  if (!oauthData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600">소셜 로그인 처리 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  )
}
