import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { reviewQueries } from './queries.factory'
import {
  BasicReviewsPage,
  PremiumReviewsPage,
  ReviewsQueryParams,
} from './types'

// 후기 탐색 페이지 (/review/explore) - 모든 프리미엄 후기 필터링
export function usePremiumReviews(
  params?: ReviewsQueryParams,
): UseQueryResult<PremiumReviewsPage, Error> {
  return useQuery(reviewQueries.premiumList(params))
}

// 동아리 상세 페이지 프리미엄 후기 탭 (/club/[clubId]) - 특정 동아리 프리미엄 후기
export function useClubPremiumReviews(
  clubId: number,
  params?: Omit<ReviewsQueryParams, 'club'>,
): UseQueryResult<PremiumReviewsPage, Error> {
  return useQuery(reviewQueries.clubPremiumList(clubId, params))
}

// 동아리 상세 페이지 일반 후기 탭 (/club/[clubId]) - 특정 동아리 일반 후기
export function useBasicReviews(
  params?: ReviewsQueryParams,
): UseQueryResult<BasicReviewsPage, Error> {
  return useQuery(reviewQueries.basicList(params))
}

// 동아리 상세 페이지 일반 후기 탭 (/club/[clubId]) - 특정 동아리 일반 후기 (size 4)
export function useClubBasicReviews(
  clubId: number,
  params?: Omit<ReviewsQueryParams, 'club'>,
): UseQueryResult<BasicReviewsPage, Error> {
  return useQuery(reviewQueries.clubBasicList(clubId, { ...params, size: 4 }))
}

// 메인 페이지 (/) - 인기 프리미엄 후기 4개
export function usePopularPremiumReviews(): UseQueryResult<
  PremiumReviewsPage,
  Error
> {
  return useQuery(reviewQueries.popularPremium())
}
