import { useToggleLike } from '../mutations'
import { ReviewType } from '../types'

interface UseLikeOptions {
  onSuccess?: (data: { likeCount: number; liked: boolean }) => void
  onFail?: (message: string) => void
  onError?: (error: Error) => void
}

export function useLike(
  reviewId: string,
  reviewType: ReviewType,
  options?: UseLikeOptions,
) {
  const toggleLikeMutation = useToggleLike({
    onSuccess: (data) => {
      if (data.status === 'SUCCESS') {
        options?.onSuccess?.(data.data)
      } else {
        options?.onFail?.(data.message)
      }
    },
    onError: options?.onError,
  })

  const handleLike = () => {
    toggleLikeMutation.mutate({ reviewId, reviewType })
  }

  return {
    toggleLike: handleLike,
    isLoading: toggleLikeMutation.isPending,
    error: toggleLikeMutation.error,
    isSuccess: toggleLikeMutation.isSuccess,
  }
}
