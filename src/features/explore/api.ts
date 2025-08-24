import { axiosInstance } from '@/shared/utils/axios'
import { ExploreApiResponse, Request } from './types'

export async function getExploreClubs(
  params?: Request,
): Promise<ExploreApiResponse['data']> {
  const res = await axiosInstance.get<ExploreApiResponse>('/api/v1/clubs', {
    params,
  })
  return res.data.data
}
