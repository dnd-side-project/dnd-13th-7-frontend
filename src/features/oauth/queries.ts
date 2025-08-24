import { OAuthCallbackParams } from './types'

/**
 * 쿼리 파라미터에서 OAuth 콜백 데이터를 파싱하는 유틸리티 함수
 */
export const parseOAuthCallbackParams = (
  searchParams: URLSearchParams,
): OAuthCallbackParams | null => {
  const userId = searchParams.get('userId')
  const active = searchParams.get('active')
  const accessToken = searchParams.get('accessToken')
  const expiresIn = searchParams.get('expiresIn')

  if (userId && active !== null && accessToken && expiresIn) {
    return {
      userId,
      active,
      accessToken,
      expiresIn,
    }
  }

  return null
}
