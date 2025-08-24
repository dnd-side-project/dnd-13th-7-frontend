export type OAuthProvider = 'google' | 'kakao'

export interface OAuthLoginResponse {
  access_token: string
  user_id: number
  active: boolean
  token_type: string
  expires_in: number
}

export interface OAuthLoginParams {
  state?: string
  code?: string
  scope?: string
  authuser?: string
  prompt?: string
}

export interface OAuthRedirectParams {
  provider: OAuthProvider
  params: OAuthLoginParams
}
