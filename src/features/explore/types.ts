// API 요청 타입
export interface Request {
  field?: string
  part?: string
  way?: string
  target?: string
  sort?: string
  page?: number
  size?: number
  [property: string]: string | number | undefined
}

// API 응답 타입
export interface ClubItem {
  clubId: number
  clubName: string
  description: string
  categories: string[]
  logoUrl: string
  isRecruiting: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ClubListResponse {
  content: ClubItem[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  empty: boolean
}

export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export type ExploreApiResponse = ApiResponse<ClubListResponse>
