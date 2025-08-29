// Like Domain Types

// Types
export type ReviewType = 'PREMIUM' | 'BASIC'

// API Request/Response Types
export interface LikeRequest {
  reviewId: string
  reviewType: string
}

export interface LikeSuccessResponse {
  data: LikeData
  message: string
  status: 'SUCCESS'
}

export interface LikeFailResponse {
  data: null
  message: string
  status: 'FAIL'
}

export type LikeResponse = LikeSuccessResponse | LikeFailResponse

export interface LikeData {
  likeCount: number
  liked: boolean
}

// Internal Types
export interface LikeParams {
  reviewId: string
  reviewType: ReviewType
}
