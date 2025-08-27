import apiClient from '@/shared/utils/axios'
import { SubscribeResponse, SubscriptionStatusResponse } from './types'

export const subscribeApi = {
  getUserSubscribes: async (): Promise<SubscribeResponse> => {
    const response = await apiClient.get<SubscribeResponse>(
      '/api/v1/clubs/user-subscribe',
    )
    return response.data
  },

  toggleClubSubscription: async (
    clubId: number,
  ): Promise<SubscriptionStatusResponse> => {
    const response = await apiClient.post<SubscriptionStatusResponse>(
      `/api/v1/clubs/${clubId}/subscribe`,
    )
    return response.data
  },
}
