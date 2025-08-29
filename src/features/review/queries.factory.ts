import { queryOptions } from '@tanstack/react-query'
import {
  getBasicReviews,
  getPremiumReviews,
  getClubPremiumReviews,
  getClubBasicReviews,
} from './api'
import { reviewKeys } from './keys'
import {
  BasicReviewsPage,
  PremiumReviewsPage,
  ReviewsQueryParams,
} from './types'

export const reviewQueries = {
  // Premium reviews
  premiumList: (params?: ReviewsQueryParams) =>
    queryOptions<PremiumReviewsPage>({
      queryKey: reviewKeys.premiumList(params),
      queryFn: () => getPremiumReviews(params),
      staleTime: 60_000,
    }),

  // Club premium reviews (동아리 상세 페이지용)
  clubPremiumList: (
    clubId: number,
    params?: Omit<ReviewsQueryParams, 'club'>,
  ) =>
    queryOptions<PremiumReviewsPage>({
      queryKey: reviewKeys.clubPremiumList(clubId, params),
      queryFn: () => getClubPremiumReviews(clubId, params),
      staleTime: 60_000,
    }),

  // Basic reviews
  basicList: (params?: ReviewsQueryParams) =>
    queryOptions<BasicReviewsPage>({
      queryKey: reviewKeys.basicList(params),
      queryFn: () => getBasicReviews(params),
      staleTime: 60_000,
    }),

  // Club basic reviews (동아리 상세 페이지용)
  clubBasicList: (clubId: number, params?: Omit<ReviewsQueryParams, 'club'>) =>
    queryOptions<BasicReviewsPage>({
      queryKey: reviewKeys.clubBasicList(clubId, params),
      queryFn: () => getClubBasicReviews(clubId, params),
      staleTime: 60_000,
    }),

  // Popular premium reviews
  popularPremium: () =>
    queryOptions<PremiumReviewsPage>({
      queryKey: reviewKeys.popularPremium(),
      queryFn: () => getPremiumReviews({ size: 4, sort: '인기순' }),
      staleTime: 60_000,
    }),
} as const

export type ReviewQueries = typeof reviewQueries
