import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import {
  ClubDetailsData,
  ClubsPage,
  ClubRecruitsData,
  ClubRecruitsResponse,
  UserSubscriptionCheckData,
  UserSubscriptionCheckResponse,
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

// export async function checkUserSubscription(
//   clubId: number,
// ): Promise<UserSubscriptionCheckData> {
//   console.log('구독 상태 확인 API 호출:', clubId)
//   const res = await apiClient.get<UserSubscriptionCheckResponse>(
//     `/api/v1/clubs/user-subscribe/check?clubId=${clubId}`,
//   )
//   console.log('구독 상태 확인 API 응답:', res.data)
//   return res.data.data
// }
