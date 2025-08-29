import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { toggleLike } from './api'
import { likeKeys } from './keys'
import { LikeResponse } from './types'

// 좋아요 토글 뮤테이션
export function useToggleLike(
  options?: UseMutationOptions<
    LikeResponse,
    Error,
    { reviewId: string; reviewType: string }
  >,
): UseMutationResult<
  LikeResponse,
  Error,
  { reviewId: string; reviewType: string }
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId, reviewType }) => toggleLike(reviewId, reviewType),
    onSuccess: (data, variables, context) => {
      // 성공한 경우에만 쿼리 무효화
      if (data.status === 'SUCCESS') {
        // 리뷰 목록 쿼리들 무효화 (좋아요 수가 변경되므로)
        queryClient.invalidateQueries({
          queryKey: ['review', 'premiumLists'],
        })
        queryClient.invalidateQueries({
          queryKey: ['review', 'basicLists'],
        })
      }

      options?.onSuccess?.(data, variables, context as never)
    },
    ...options,
  })
}
