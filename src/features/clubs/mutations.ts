import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import apiClient from '@/shared/utils/axios'
import { clubKeys } from './keys'

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
