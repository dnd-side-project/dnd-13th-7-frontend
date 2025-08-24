import { OAuthProvider } from './types'

export const oauthKeys = {
  all: ['oauth'] as const,
  authorize: (provider: OAuthProvider) =>
    [...oauthKeys.all, 'authorize', provider] as const,
  login: (provider: OAuthProvider, params: Record<string, string>) =>
    [...oauthKeys.all, 'login', provider, params] as const,
}
