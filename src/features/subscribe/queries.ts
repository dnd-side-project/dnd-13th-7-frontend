import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { subscribeQueries } from './queries.factory'
import { SubscribeResponse, SubscriptionStatusResponse } from './types'

export function useUserSubscribes(): UseQueryResult<SubscribeResponse, Error> {
  return useQuery(subscribeQueries.userSubscribes())
}
