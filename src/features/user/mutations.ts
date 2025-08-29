import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from './api'
import { userKeys } from './keys'
import { UpdateUserProfileImageRequest, UserActivateRequest } from './types'

export const useUserActivate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserActivateRequest) => userApi.activate(data),
    onSuccess: (_data) => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
    onError: (error) => {
      console.error('사용자 활성화 실패:', error)
    },
  })
}

export const useUpdateUserProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: userKeys.updateProfileImage(),
    mutationFn: (body: UpdateUserProfileImageRequest) =>
      userApi.updateProfileImage(body),
    onSuccess: () => {
      // 프로필 데이터 갱신
      queryClient.invalidateQueries({ queryKey: userKeys.profile() })
    },
  })
}
