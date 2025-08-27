import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { reviewQueries } from './queries.factory'
import {
  BasicReviewsPage,
  PremiumReviewDetail,
  PremiumReviewsPage,
  ReviewsQueryParams,
} from './types'

export function usePremiumReviews(
  params?: ReviewsQueryParams,
): UseQueryResult<PremiumReviewsPage, Error> {
  return useQuery(reviewQueries.premiumList(params))
}

export function usePremiumReviewDetail(
  premiumReviewId: number,
): UseQueryResult<PremiumReviewDetail, Error> {
  return useQuery(reviewQueries.premiumDetail(premiumReviewId))
}

export function useBasicReviews(
  params?: ReviewsQueryParams,
): UseQueryResult<BasicReviewsPage, Error> {
  return useQuery(reviewQueries.basicList(params))
}

export function usePopularPremiumReviews(): UseQueryResult<
  PremiumReviewsPage,
  Error
> {
  return useQuery(reviewQueries.popularPremium())
}
