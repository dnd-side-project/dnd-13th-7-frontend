import { queryOptions } from '@tanstack/react-query'
import { getBasicReviews, getPremiumReviews } from './api'
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

  // Basic reviews
  basicList: (params?: ReviewsQueryParams) =>
    queryOptions<BasicReviewsPage>({
      queryKey: reviewKeys.basicList(params),
      queryFn: () => getBasicReviews(params),
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
