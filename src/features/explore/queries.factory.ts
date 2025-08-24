import { getExploreClubs } from './api'
import { Request } from './types'

// 쿼리 키 팩토리
export const exploreQueries = {
  list: (params?: Request) => ({
    queryKey: ['explore', params] as const,
    queryFn: () => getExploreClubs(params),
  }),
}
