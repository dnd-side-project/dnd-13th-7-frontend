import { queryOptions } from '@tanstack/react-query'
import { subscribeApi } from './api'
import { subscribeKeys } from './keys'
import { SubscribeResponse } from './types'

export const subscribeQueries = {
  userSubscribes: () =>
    queryOptions<SubscribeResponse>({
      queryKey: subscribeKeys.userSubscribes(),
      queryFn: () => subscribeApi.getUserSubscribes(),
      staleTime: 60_000,
    }),
} as const

export type SubscribeQueries = typeof subscribeQueries
