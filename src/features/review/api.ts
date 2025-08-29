import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import {
  BasicReviewCreateRequest,
  BasicReviewsPage,
  PremiumReviewCreateRequest,
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

// 동아리별 프리미엄 후기 목록 조회 (동아리 상세 페이지용)
export async function getClubPremiumReviews(
  clubId: number,
  params?: Omit<ReviewsQueryParams, 'club'>,
): Promise<PremiumReviewsPage> {
  const res = await apiClient.get<ApiResponse<PremiumReviewsPage>>(
    `/api/v1/reviews/premium?clubId=${clubId}`,
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

// 동아리별 베이직 후기 목록 조회 (동아리 상세페이지용)
export async function getClubBasicReviews(
  clubId: number,
  params?: Omit<ReviewsQueryParams, 'club'>,
): Promise<BasicReviewsPage> {
  const res = await apiClient.get<ApiResponse<BasicReviewsPage>>(
    `/api/v1/reviews/basic?clubId=${clubId}`,
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

// 프리미엄 후기 생성
export async function postPremiumReview(
  data: PremiumReviewCreateRequest,
): Promise<void> {
  await apiClient.post<ApiResponse<void>>('/api/v1/review/premium', data)
}
