import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import {
  ClubDetailsData,
  ClubsPage,
  ClubRecruitsData,
  ClubRecruitsResponse,
  UserSubscriptionCheckData,
  UserSubscriptionCheckResponse,
  SubscriptionResponse,
  ClubSubscriptionResponse,
  ClubSearchRequest,
  ClubSearchResponse,
} from './types'

export async function getClubs(params?: {
  page?: number
  size?: number
  search?: string
  field?: string
  part?: string
  way?: string
  target?: string
  sort?: string
}): Promise<ClubsPage> {
  const res = await apiClient.get<ApiResponse<ClubsPage>>('/api/v1/clubs', {
    params,
  })
  return res.data.data
}

export async function getClubDetails(clubId: number): Promise<ClubDetailsData> {
  const res = await apiClient.get<ApiResponse<ClubDetailsData>>(
    `/api/v1/clubs/${clubId}/details`,
  )
  return res.data.data
}

export async function getClubRecruits(
  clubId: number | string,
): Promise<ClubRecruitsData> {
  const res = await apiClient.get<ClubRecruitsResponse>(
    `/api/v1/clubs/${clubId}/recruits`,
  )
  return res.data.data
}

export async function checkUserSubscription(
  clubId: number,
): Promise<UserSubscriptionCheckData> {
  const res = await apiClient.get<UserSubscriptionCheckResponse>(
    `/api/v1/clubs/user-subscribe/check?clubId=${clubId}`,
  )
  return res.data.data
}

export async function toggleClubSubscription(
  clubId: number,
): Promise<SubscriptionResponse['data']> {
  const res = await apiClient.post<SubscriptionResponse>(
    `/api/v1/clubs/${clubId}/subscribe`,
  )
  return res.data.data
}
export async function searchClubs(
  params?: ClubSearchRequest,
): Promise<ClubSearchResponse['data']> {
  const res = await apiClient.get<ClubSearchResponse>('/api/v1/clubs/search', {
    params,
  })
  return res.data.data
}
