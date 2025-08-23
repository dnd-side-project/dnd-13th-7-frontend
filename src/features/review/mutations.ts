import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { postBasicReview, postPremiumReview } from './api'
import { reviewKeys } from './keys'
import { BasicReviewCreateRequest, PremiumReviewCreateRequest } from './types'

// 일반 후기 생성 뮤테이션
export function usePostBasicReview(
  options?: UseMutationOptions<void, Error, BasicReviewCreateRequest>,
): UseMutationResult<void, Error, BasicReviewCreateRequest> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postBasicReview,
    onSuccess: (data, variables, context) => {
      // 베이직 후기 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: reviewKeys.basicLists(),
      })
      options?.onSuccess?.(data, variables, context as never)
    },
    ...options,
  })
}

// 프리미엄 후기 생성 뮤테이션
export function usePostPremiumReview(
  options?: UseMutationOptions<void, Error, PremiumReviewCreateRequest>,
): UseMutationResult<void, Error, PremiumReviewCreateRequest> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postPremiumReview,
    onSuccess: (data, variables, context) => {
      // 프리미엄 후기 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: reviewKeys.premiumLists(),
      })
      options?.onSuccess?.(data, variables, context as never)
    },
    ...options,
  })
}
