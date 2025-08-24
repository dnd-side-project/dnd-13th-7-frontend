import { useQuery } from '@tanstack/react-query'
import { oauthApi } from './api'
import { oauthKeys } from './keys'
import { OAuthProvider, OAuthLoginParams } from './types'

export const useOAuthLogin = (
  provider: OAuthProvider,
  params: OAuthLoginParams,
  enabled: boolean = true,
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: oauthKeys.login(provider, params as Record<string, string>),
    queryFn: () => oauthApi.login(provider, params),
    enabled:
      enabled && Object.values(params).some((value) => value !== undefined),
    retry: false, // OAuth 로그인은 실패 시 재시도하지 않음
  })
}
