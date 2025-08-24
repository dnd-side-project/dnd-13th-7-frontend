import axios from 'axios'

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://13.124.170.206:8080'

const apiClient = axios.create({
  baseURL,
  withCredentials: false, // OAuth 리다이렉트를 위해 false로 설정
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})

apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach auth token if needed
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // You can expand error handling here or integrate Sentry
    return Promise.reject(error)
  },
)

export default apiClient
export const axiosInstance = apiClient
