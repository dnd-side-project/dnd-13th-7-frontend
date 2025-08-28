import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import {
  BasicReviewCreateRequest,
  BasicReviewsPage,
  PremiumReviewCreateRequest,
  PremiumReviewCreateResponse,
  PremiumReviewDetail,
  PremiumReviewsPage,
  ReviewsQueryParams,
} from './types'

// 프리미엄 후기 목록 조회
export async function getPremiumReviews(
  params?: ReviewsQueryParams,
): Promise<PremiumReviewsPage> {
  const res = await apiClient.get<ApiResponse<PremiumReviewsPage>>(
    '/api/v1/reviews/premium',
    {
      params,
    },
  )
  return res.data.data
}

// 베이직 후기 목록 조회
export async function getBasicReviews(
  params?: ReviewsQueryParams,
): Promise<BasicReviewsPage> {
  const res = await apiClient.get<ApiResponse<BasicReviewsPage>>(
    '/api/v1/reviews/basic',
    {
      params,
    },
  )
  return res.data.data
}

// 일반 후기 생성
export async function postBasicReview(
  data: BasicReviewCreateRequest,
): Promise<void> {
  await apiClient.post<ApiResponse<void>>('/api/v1/review/basic', data)
}

// 프리미엄 후기 상세 조회
export async function getPremiumReviewDetail(
  premiumReviewId: number,
): Promise<PremiumReviewDetail> {
  const res = await apiClient.get<ApiResponse<PremiumReviewDetail>>(
    `/api/v1/review/premium/${premiumReviewId}`,
  )
  return res.data.data
}

// 프리미엄 후기 생성
export async function postPremiumReview(
  data: PremiumReviewCreateRequest,
): Promise<PremiumReviewCreateResponse> {
  const res = await apiClient.post<ApiResponse<PremiumReviewCreateResponse>>(
    '/api/v1/review/premium',
    data,
  )
  return res.data.data
}
