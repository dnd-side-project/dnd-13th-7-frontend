import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import {
  UserActivateRequest,
  UserActivateResponse,
  UserProfile,
  UpdateUserProfileImageRequest,
  UserInterests,
} from './types'

export const userApi = {
  /**
   * 사용자 활성화 (회원가입 완료)
   * @param data - 사용자 활성화 요청 데이터
   */
  activate: async (
    data: UserActivateRequest,
  ): Promise<UserActivateResponse> => {
    const response = await apiClient.post<UserActivateResponse>(
      '/api/v1/user/activate',
      data,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('oauth_data') || '{}').accessToken}`,
        },
      },
    )
    return response.data
  },
  /**
   * 사용자 프로필 조회 (GET /v1/user/profile)
   */
  getProfile: async (): Promise<UserProfile> => {
    const res = await apiClient.get<ApiResponse<UserProfile>>(
      '/api/v1/user/profile',
    )
    return res.data.data
  },
  /**
   * 프로필 이미지 업데이트 (POST /v1/user/profile/image)
   */
  updateProfileImage: async (
    body: UpdateUserProfileImageRequest,
  ): Promise<UserProfile> => {
    const res = await apiClient.post<ApiResponse<UserProfile>>(
      '/api/v1/user/profile/image',
      body,
    )
    return res.data.data
  },
  /**
   * 관심 통계 조회 (GET /v1/user/interests)
   */
  getInterests: async (): Promise<UserInterests> => {
    const res = await apiClient.get<ApiResponse<UserInterests>>(
      '/api/v1/user/interests',
    )
    return res.data.data
  },
}
