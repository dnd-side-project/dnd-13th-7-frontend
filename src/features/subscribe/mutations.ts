import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { subscribeApi } from './api'
import { subscribeKeys } from './keys'
import { SubscriptionStatusResponse } from './types'

export function useToggleClubSubscription(
  options?: UseMutationOptions<SubscriptionStatusResponse, Error, number>,
): UseMutationResult<SubscriptionStatusResponse, Error, number> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: subscribeApi.toggleClubSubscription,
    onSuccess: (data, clubId, context) => {
      queryClient.invalidateQueries({
        queryKey: subscribeKeys.userSubscribes(),
      })
      options?.onSuccess?.(data, clubId, context as never)
    },
    ...options,
  })
}
