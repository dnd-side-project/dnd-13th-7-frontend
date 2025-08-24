export type OAuthProvider = 'google' | 'kakao'

// 새로운 쿼리 파라미터 기반 OAuth 응답 타입
export interface OAuthCallbackParams {
  userId: string
  active: string
  accessToken: string
  expiresIn: string
}

// 기존 API 응답 타입 (임시로 주석 처리)
// export interface OAuthLoginResponse {
//   access_token: string
//   user_id: number
//   active: boolean
//   token_type: string
//   expires_in: number
// }

// export interface OAuthLoginParams {
//   state?: string
//   code?: string
//   scope?: string
//   authuser?: string
//   prompt?: string
// }

// export interface OAuthRedirectParams {
//   provider: OAuthProvider
//   params: OAuthLoginParams
// }
