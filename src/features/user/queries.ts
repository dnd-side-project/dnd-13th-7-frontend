import { useQuery } from '@tanstack/react-query'
import { tokenCookies } from '@/shared/utils/cookies'
import { userApi } from './api'
import { userKeys } from './keys'

export const useUserMe = () => {
  const hasValidToken =
    Boolean(tokenCookies.getAccessToken()) && tokenCookies.isTokenValid()

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.me(),
    enabled: hasValidToken,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
    retry: 1,
  })
}
