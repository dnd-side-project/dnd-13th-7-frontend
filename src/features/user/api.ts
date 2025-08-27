import apiClient from '@/shared/utils/axios'
import {
  UserActivateRequest,
  UserActivateResponse,
  UserMeResponse,
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
   * 현재 사용자 정보 조회
   */
  me: async (): Promise<UserMeResponse> => {
    const response = await apiClient.get<UserMeResponse>('/api/v1/user/me')
    return response.data
  },
}
