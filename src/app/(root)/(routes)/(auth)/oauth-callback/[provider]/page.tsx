'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { useOAuthLogin } from '@/features/oauth'
import { OAuthProvider } from '@/features/oauth/types'

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  console.log(params, 'params')

  // URL에서 OAuth 파라미터들을 추출
  const state = searchParams.get('state')
  const code = searchParams.get('code')
  const scope = searchParams.get('scope')
  const authuser = searchParams.get('authuser')
  const prompt = searchParams.get('prompt')
  const access_token = searchParams.get('access_token')
  const user_id = searchParams.get('user_id')
  const active = searchParams.get('active')
  const token_type = searchParams.get('token_type')
  const expires_in = searchParams.get('expires_in')

  // provider는 URL 파라미터에서 추출
  const provider = params.provider as OAuthProvider

  console.log('OAuth Callback - Provider:', provider)
  console.log('OAuth Callback - All params:', {
    state,
    code,
    scope,
    authuser,
    prompt,
    access_token,
    user_id,
    active,
    token_type,
    expires_in,
  })

  // 쿼리 파라미터로 직접 OAuth 데이터가 온 경우 (서버에서 처리 완료된 상태)
  const hasDirectOAuthData = access_token && user_id && active !== null

  const oauthParams = {
    state: state || undefined,
    code: code || undefined,
    scope: scope || undefined,
    authuser: authuser || undefined,
    prompt: prompt || undefined,
  }

  const enabled =
    !hasDirectOAuthData &&
    !!provider &&
    !!code &&
    ['google', 'kakao'].includes(provider)
  console.log('OAuth Query - Enabled:', enabled)
  console.log('OAuth Query - Has Direct Data:', hasDirectOAuthData)

  const { data, error, isLoading } = useOAuthLogin(
    provider,
    oauthParams,
    enabled, // code가 있고 직접 데이터가 없을 때만 쿼리 실행
  )

  // 유효하지 않은 provider인 경우 처리
  useEffect(() => {
    if (provider && !['google', 'kakao'].includes(provider)) {
      console.error('Invalid OAuth provider:', provider)
      router.push('/login?error=invalid_provider')
    }
  }, [provider, router])

  // 쿼리 파라미터로 직접 받은 OAuth 데이터 처리
  useEffect(() => {
    if (hasDirectOAuthData) {
      const oauthData = {
        access_token: access_token!,
        user_id: parseInt(user_id!),
        active: active === 'true',
        token_type: token_type || 'Bearer',
        expires_in: expires_in ? parseInt(expires_in) : 900,
      }

      console.log('OAuth 쿼리 파라미터 데이터:', oauthData)

      if (oauthData.active === false) {
        // 회원가입이 필요한 경우 - OAuth 정보를 세션스토리지에 저장하고 signup으로 이동
        sessionStorage.setItem('oauth_data', JSON.stringify(oauthData))
        router.push('/signup')
      } else {
        // 이미 가입된 사용자인 경우 - 토큰을 저장하고 홈으로 이동
        localStorage.setItem('access_token', oauthData.access_token)
        localStorage.setItem('user_id', oauthData.user_id.toString())
        router.push('/')
      }
    }
  }, [
    hasDirectOAuthData,
    access_token,
    user_id,
    active,
    token_type,
    expires_in,
    router,
  ])

  // API 응답으로 받은 OAuth 데이터 처리 (fallback)
  useEffect(() => {
    if (data) {
      // 로그인 성공 시 처리
      console.log('OAuth API 응답 데이터:', data)

      if (data.active === false) {
        // 회원가입이 필요한 경우 - OAuth 정보를 세션스토리지에 저장하고 signup으로 이동
        sessionStorage.setItem('oauth_data', JSON.stringify(data))
        router.push('/signup')
      } else {
        console.log('이미 가입된 사용자인 경우')
        console.log(data, 'data')
        // 이미 가입된 사용자인 경우 - 토큰을 저장하고 홈으로 이동
        // localStorage.setItem('access_token', data.access_token)
        // localStorage.setItem('user_id', data.user_id.toString())
        // router.push('/')
      }
    }
  }, [data, router])

  useEffect(() => {
    if (error) {
      // 로그인 실패 시 처리
      console.error('OAuth 로그인 실패:', error)

      // 로그인 페이지로 리다이렉트
      //   router.push('/login?error=oauth_failed')
    }
  }, [error, router])

  if (isLoading && !hasDirectOAuthData) {
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
