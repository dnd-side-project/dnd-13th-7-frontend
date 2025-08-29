import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import apiClient from '@/shared/utils/axios'
import { clubKeys } from './keys'
import { UserSubscriptionCheckData } from './types'

// 예시 뮤테이션: 클럽 정보 갱신 (실제 스키마/API는 확정 후 교체)
type UpdateClubPayload = {
  clubId: number | string
  body: Record<string, unknown>
}
type UpdateClubResponse = Record<string, unknown>

export function useUpdateClub(
  options?: UseMutationOptions<UpdateClubResponse, Error, UpdateClubPayload>,
): UseMutationResult<UpdateClubResponse, Error, UpdateClubPayload> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ clubId, body }) => {
      const { data } = await apiClient.patch(`/api/v1/clubs/${clubId}`, body)
      return data
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: clubKeys.detail(variables.clubId),
      })
      options?.onSuccess?.(data, variables, context as never)
    },
    ...options,
  })
}

// 구독 토글 뮤테이션
export function useToggleClubSubscription(
  options?: UseMutationOptions<UserSubscriptionCheckData, Error, number>,
): UseMutationResult<UserSubscriptionCheckData, Error, number> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (clubId: number) => {
      console.log('구독 토글 API 호출:', clubId)
      const { data } = await apiClient.post(`/api/v1/clubs/${clubId}/subscribe`)
      console.log('구독 토글 API 응답:', data)
      return data
    },
    onSuccess: (data, clubId, context) => {
      console.log('구독 토글 성공, 쿼리 무효화:', clubId)
      // 구독 상태 확인 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: clubKeys.userSubscriptionCheck(clubId),
      })
      options?.onSuccess?.(data, clubId, context as never)
    },
    onError: (error, clubId, context) => {
      console.error('구독 토글 실패:', error, clubId)
      options?.onError?.(error, clubId, context as never)
    },
    ...options,
  })
}
