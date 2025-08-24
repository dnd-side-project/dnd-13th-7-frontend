import apiClient from '@/shared/utils/axios'
import { OAuthProvider, OAuthLoginResponse, OAuthLoginParams } from './types'

export const oauthApi = {
  /**
   * 소셜 로그인 페이지로 리다이렉트
   * @param provider - OAuth 제공자 ('google' | 'kakao')
   */
  authorize: async (provider: OAuthProvider): Promise<void> => {
    // 클라이언트 콜백 URL을 쿼리 파라미터로 전달
    const callbackUrl = `${window.location.origin}/oauth-callback/${provider}`
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    console.log(callbackUrl)
    // 서버에 클라이언트 콜백 URL을 전달하여 OAuth 설정
    console.log(apiClient.defaults.baseURL)
    window.location.href = `${apiClient.defaults.baseURL}/api/oauth2/authorize/${provider}?client_callback=${encodedCallbackUrl}`
  },

  /**
   * 소셜 로그인/회원가입 처리
   * @param provider - OAuth 제공자 ('google' | 'kakao')
   * @param params - OAuth 콜백 파라미터들
   */
  login: async (
    provider: OAuthProvider,
    params: OAuthLoginParams,
  ): Promise<OAuthLoginResponse> => {
    const searchParams = new URLSearchParams()
    console.log(params, 'searchParams')
    // undefined가 아닌 파라미터들만 추가
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value)
      }
    })

    // CORS preflight 방지를 위해 Simple Request로 변경
    const response = await apiClient.get<OAuthLoginResponse>(
      `/api/oauth2/login/${provider}?${searchParams.toString()}`,
    )

    console.log(response, 'response')

    return response.data
  },
}
