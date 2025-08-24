import { Environment } from '@/shared/configs/environment'

const AppPath = {
  home: () => '/' as const,
  myPage: () => '/mypage' as const,
  login: () => '/login' as const,
  logout: () => '/logout' as const,
  signup: () => '/signup' as const,
  oauthCallback: (provider: 'google' | 'kakao') =>
    `/oauth-callback/${provider}` as const,
  kakaoLogin: () =>
    `${Environment.apiAddress()}/users/oauth2/authorize/kakao/login` as const,
  googleLogin: () =>
    `${Environment.apiAddress()}/users/oauth2/authorize/google/login` as const,
  oauthAuthorize: (provider: 'google' | 'kakao') =>
    `${Environment.apiAddress()}/api/oauth2/authorize/${provider}` as const,
  clubExplore: () => '/club/explore' as const,
  clubDetail: (clubId: string) => `/club/${clubId}` as const,
  reviewExplore: () => '/review/explore' as const,
  reviewDetail: (reviewId: string) => `/review/${reviewId}` as const,
  reviewNew: (
    kind: 'paper' | 'interview' | 'activity',
    type?: 'normal' | 'premium',
  ) => `/review/new/${kind}${type ? `/${type}` : ''}` as const,
  reviewEdit: (reviewId: string) => `/review/${reviewId}/edit` as const,
  reviewSubmitted: () => '/review/submitted' as const,
} as const

type AppPathReturnType = {
  [K in keyof typeof AppPath]: ReturnType<(typeof AppPath)[K]>
}

type PathStrings = AppPathReturnType[keyof AppPathReturnType]

export default AppPath
export type { PathStrings }
