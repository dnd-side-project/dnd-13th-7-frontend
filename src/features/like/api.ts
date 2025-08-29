import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import { LikeData, LikeResponse } from './types'

// 좋아요 토글 API
export async function toggleLike(
  reviewId: string,
  reviewType: string,
): Promise<LikeResponse> {
  const res = await apiClient.post<ApiResponse<LikeResponse>>(
    `/api/v1/like/${reviewId}/${reviewType}`,
  )
  return res.data.data
}
