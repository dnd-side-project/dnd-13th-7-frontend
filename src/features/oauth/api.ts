import AppPath from '@/shared/configs/appPath'
import apiClient from '@/shared/utils/axios'
import { OAuthProvider } from './types'

export const oauthApi = {
  /**
   * 소셜 로그인 페이지로 리다이렉트
   * @param provider - OAuth 제공자 ('google' | 'kakao')
   */
  authorize: async (provider: OAuthProvider): Promise<void> => {
    // 클라이언트 콜백 URL을 쿼리 파라미터로 전달
    const callbackUrl = `${window.location.origin}${AppPath.oauthCallback(provider)}`
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    console.log('OAuth Callback URL:', callbackUrl)
    console.log('API Base URL:', apiClient.defaults.baseURL)

    // 새로운 프로세스: 서버에서 직접 처리 후 클라이언트로 리다이렉트
    window.location.href = `${AppPath.oauthAuthorize(provider)}?client_callback=${encodedCallbackUrl}`
  },
}
