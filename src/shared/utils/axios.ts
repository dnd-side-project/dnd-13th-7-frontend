import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api' //TODO: 환경변수 추가

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
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
