import { queryOptions } from '@tanstack/react-query'
import { getClubDetails, getClubRecruits, getClubs } from './api'
import { clubKeys } from './keys'
import { ClubDetailsData, ClubRecruitsData } from './types'

export const clubQueries = {
  list: (params?: {
    page?: number
    size?: number
    search?: string
    field?: string
    part?: string
    way?: string
    target?: string
    sort?: string
  }) =>
    queryOptions({
      queryKey: clubKeys.list(params),
      queryFn: () => getClubs(params),
      staleTime: 60_000,
    }),
  detail: (clubId: number) =>
    queryOptions<ClubDetailsData>({
      queryKey: clubKeys.detail(clubId),
      queryFn: () => getClubDetails(clubId),
      enabled: Boolean(clubId),
    }),
  recruit: (clubId: number) =>
    queryOptions<ClubRecruitsData>({
      queryKey: clubKeys.recruit(clubId),
      queryFn: () => getClubRecruits(clubId),
      enabled: Boolean(clubId),
    }),
} as const

export type ClubQueries = typeof clubQueries
