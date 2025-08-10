import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import { ClubDetailsData, ClubsPage, ClubRecruitsData } from './types'

export async function getClubs(params?: {
  page?: number
  size?: number
  search?: string
}): Promise<ClubsPage> {
  const res = await apiClient.get<ApiResponse<ClubsPage>>('/api/v1/clubs', {
    params,
  })
  return res.data.data
}

export async function getClubDetails(
  clubId: number | string,
): Promise<ClubDetailsData> {
  const res = await apiClient.get<ApiResponse<ClubDetailsData>>(
    `/api/v1/clubs/${clubId}/details`,
  )
  return res.data.data
}

export async function getClubRecruits(
  clubId: number | string,
): Promise<ClubRecruitsData> {
  const res = await apiClient.get<ApiResponse<ClubRecruitsData>>(
    `/api/v1/clubs/${clubId}/recruits`,
  )
  return res.data.data
}
