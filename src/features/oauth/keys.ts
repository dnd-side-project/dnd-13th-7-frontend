import { OAuthProvider } from './types'

export const oauthKeys = {
  all: ['oauth'] as const,
  authorize: (provider: OAuthProvider) =>
    [...oauthKeys.all, 'authorize', provider] as const,
  // 기존 login 키 (임시로 주석 처리)
  // login: (provider: OAuthProvider, params: Record<string, string>) =>
  //   [...oauthKeys.all, 'login', provider, params] as const,
}
