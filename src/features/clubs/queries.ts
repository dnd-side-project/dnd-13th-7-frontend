import {
  useQuery,
  UseQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import { clubQueries } from './queries.factory'
import {
  ClubDetailsData,
  ClubsPage,
  ClubRecruitsData,
  SubscriptionResponse,
} from './types'

export function useClubsList(params?: {
  page?: number
  size?: number
  search?: string
  field?: string
  part?: string
  way?: string
  target?: string
  sort?: string
}): UseSuspenseQueryResult<ClubsPage, Error> {
  return useSuspenseQuery(clubQueries.list(params))
}

export function useClubDetails(
  clubId: number,
): UseQueryResult<ClubDetailsData, Error> {
  return useQuery(clubQueries.detail(clubId))
}

export function useClubRecruits(
  clubId: number,
): UseQueryResult<ClubRecruitsData, Error> {
  return useQuery(clubQueries.recruit(clubId))
}
