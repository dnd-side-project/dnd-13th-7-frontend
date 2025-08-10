import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { clubQueries } from './queries.factory'
import { ClubDetailsData, ClubsPage } from './types'

export function useClubsList(params?: {
  page?: number
  size?: number
  search?: string
}): UseQueryResult<ClubsPage, Error> {
  return useQuery(clubQueries.list(params))
}

export function useClubDetails(
  clubId: number | string,
): UseQueryResult<ClubDetailsData, Error> {
  return useQuery(clubQueries.detail(clubId))
}

export function useClubRecruits(
  clubId: number | string,
): UseQueryResult<unknown, Error> {
  return useQuery(clubQueries.recruit(clubId))
}
