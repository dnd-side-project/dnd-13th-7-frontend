import { queryOptions } from '@tanstack/react-query'
import {
  getClubDetails,
  getClubRecruits,
  getClubs,
  searchClubs,
  // checkUserSubscription,
} from './api'
import { clubKeys } from './keys'
import {
  ClubDetailsData,
  ClubRecruitsData,
  UserSubscriptionCheckData,
  ClubSearchResponse,
} from './types'

// import { getClubDetails, getClubRecruits, getClubs, searchClubs } from './api'

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
  popular: () =>
    queryOptions({
      queryKey: clubKeys.popular(),
      queryFn: () => getClubs({ size: 4, sort: '인기순' }),
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
  // userSubscriptionCheck: (clubId: number) =>
  //   queryOptions<UserSubscriptionCheckData>({
  //     queryKey: clubKeys.userSubscriptionCheck(clubId),
  //     queryFn: () => checkUserSubscription(clubId),
  //     enabled: Boolean(clubId),
  //   }),
  search: (params?: { keyword?: string }) =>
    queryOptions<ClubSearchResponse['data']>({
      queryKey: clubKeys.search(params),
      queryFn: () => searchClubs(params),
      enabled: Boolean(params?.keyword),
      staleTime: 30_000,
    }),
} as const

export type ClubQueries = typeof clubQueries
