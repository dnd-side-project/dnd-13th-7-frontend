import { useMutation } from '@tanstack/react-query'
import { oauthApi } from './api'
import { OAuthProvider } from './types'

export const useOAuthAuthorize = () => {
  return useMutation({
    mutationFn: (provider: OAuthProvider) => oauthApi.authorize(provider),
    onError: (error) => {
      console.error('OAuth 인증 요청 실패:', error)
    },
  })
}
