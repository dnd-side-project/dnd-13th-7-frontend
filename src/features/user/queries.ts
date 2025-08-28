import { useQuery } from '@tanstack/react-query'
import { tokenCookies } from '@/shared/utils/cookies'
import { userApi } from './api'
import { userKeys } from './keys'
import { UserInterests, UserProfile } from './types'

export const useUserProfile = () => {
  const hasValidToken =
    Boolean(tokenCookies.getAccessToken()) && tokenCookies.isTokenValid()

  return useQuery<UserProfile>({
    queryKey: userKeys.profile(),
    queryFn: () => userApi.getProfile(),
    enabled: hasValidToken,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  })
}

export const useUserInterests = () => {
  const hasValidToken =
    Boolean(tokenCookies.getAccessToken()) && tokenCookies.isTokenValid()

  return useQuery<UserInterests>({
    queryKey: userKeys.interests(),
    queryFn: () => userApi.getInterests(),
    enabled: hasValidToken,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  })
}
