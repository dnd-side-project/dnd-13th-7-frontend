import axios from 'axios'

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
