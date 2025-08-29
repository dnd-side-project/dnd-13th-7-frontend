import axios from 'axios'
import AppPath from '@/shared/configs/appPath'
import { tokenCookies } from './cookies'

const baseURL = 'https://api.moyeoit.com'

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
    // 401 에러 시 토큰 유효성을 다시 확인
    if (error.response?.status === 401) {
      // const token = tokenCookies.getAccessToken()
      // const isTokenValid = tokenCookies.isTokenValid()
      // console.log('🚨 401 에러 발생:', {
      //   url: error.config?.url,
      //   token: token ? '존재' : '없음',
      //   isTokenValid,
      //   willRedirect: !token || !isTokenValid,
      // })
      // 토큰이 없거나 만료된 경우에만 로그인 페이지로 리다이렉트
      // if (!token || !isTokenValid) {
      // console.log('🔄 로그인 페이지로 리다이렉트 중...')
      // if (typeof window !== 'undefined') {
      //   window.location.href = AppPath.login()
      // }
      // } else {
      // console.log('⚠️ 토큰이 유효한데 401 에러 발생 - 서버 측 문제일 수 있음')
      // }
      // 토큰이 있는데 401이 발생한 경우는 서버 측 문제이므로 토큰을 삭제하지 않음
    }
    return Promise.reject(error)
  },
)

export default apiClient
export const axiosInstance = apiClient
