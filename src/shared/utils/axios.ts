import axios from 'axios'
import AppPath from '@/shared/configs/appPath'
import { tokenCookies } from './cookies'

const baseURL = 'http://api.moyeoit.com/api'

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 10_000,
})

apiClient.interceptors.request.use(
  (config) => {
    // 쿠키에서 토큰을 가져와서 Authorization 헤더에 추가
    const token = tokenCookies.getAccessToken()
    if (token && tokenCookies.isTokenValid()) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 시 토큰이 만료된 것으로 간주하고 쿠키 정리
    if (error.response?.status === 401) {
      tokenCookies.clearAll()
      // 로그인 페이지로 리다이렉트 (브라우저 환경에서만)
      if (typeof window !== 'undefined') {
        window.location.href = AppPath.login()
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
export const axiosInstance = apiClient
