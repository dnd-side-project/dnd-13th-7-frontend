import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from './api'
import { userKeys } from './keys'
import { UserActivateRequest } from './types'

export const useUserActivate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserActivateRequest) => userApi.activate(data),
    onSuccess: (data) => {
      console.log('사용자 활성화 성공:', data)
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
    onError: (error) => {
      console.error('사용자 활성화 실패:', error)
    },
  })
}
