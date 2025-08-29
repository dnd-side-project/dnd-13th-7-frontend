/**
 * 토큰 관리를 위한 쿠키 유틸리티 함수들
 */

const isBrowser = typeof document !== 'undefined'

interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
}

/**
 * 쿠키 설정
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  if (!isBrowser) return
  const opts = { ...DEFAULT_COOKIE_OPTIONS, ...options }

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (opts.expires) {
    cookieString += `; expires=${opts.expires.toUTCString()}`
  }

  if (opts.maxAge) {
    cookieString += `; max-age=${opts.maxAge}`
  }

  if (opts.path) {
    cookieString += `; path=${opts.path}`
  }

  if (opts.domain) {
    cookieString += `; domain=${opts.domain}`
  }

  if (opts.secure) {
    cookieString += '; secure'
  }

  if (opts.sameSite) {
    cookieString += `; samesite=${opts.sameSite}`
  }

  document.cookie = cookieString
}

/**
 * 쿠키 읽기
 */
export const getCookie = (name: string): string | null => {
  if (!isBrowser) return null
  const nameEQ = `${encodeURIComponent(name)}=`
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * 쿠키 삭제
 */
export const deleteCookie = (
  name: string,
  options: CookieOptions = {},
): void => {
  if (!isBrowser) return
  const opts = { ...DEFAULT_COOKIE_OPTIONS, ...options }
  setCookie(name, '', { ...opts, maxAge: -1 })
}

/**
 * 인증 토큰 관련 쿠키 관리
 */
export const tokenCookies = {
  // 액세스 토큰 설정
  setAccessToken: (token: string, expiresIn: number) => {
    // 일주일(7일) 동안 유지되는 액세스 토큰 쿠키 설정
    const oneWeekInSeconds = 7 * 24 * 60 * 60
    const expiresAt = new Date(Date.now() + oneWeekInSeconds * 1000)
    setCookie('access_token', token, {
      expires: expiresAt,
      maxAge: oneWeekInSeconds,
    })
  },

  // 액세스 토큰 읽기
  getAccessToken: (): string | null => {
    return getCookie('access_token')
  },

  // 액세스 토큰 삭제
  removeAccessToken: () => {
    deleteCookie('access_token')
  },

  // 사용자 ID 설정
  setUserId: (userId: string) => {
    setCookie('user_id', userId, {
      maxAge: 30 * 24 * 60 * 60, // 30일
    })
  },

  // 사용자 ID 읽기
  getUserId: (): string | null => {
    return getCookie('user_id')
  },

  // 사용자 ID 삭제
  removeUserId: () => {
    deleteCookie('user_id')
  },

  // 토큰 만료 시간 설정
  setExpiresAt: (expiresAt: number) => {
    // expires 옵션과 maxAge 옵션 모두 1주일(7일)로 고정
    const oneWeekInSeconds = 7 * 24 * 60 * 60
    setCookie('expires_at', expiresAt.toString(), {
      expires: new Date(Date.now() + oneWeekInSeconds * 1000),
      maxAge: oneWeekInSeconds,
    })
  },

  // 토큰 만료 시간 읽기
  getExpiresAt: (): number | null => {
    const expiresAt = getCookie('expires_at')
    return expiresAt ? parseInt(expiresAt) : null
  },

  // 토큰 만료 시간 삭제
  removeExpiresAt: () => {
    deleteCookie('expires_at')
  },

  // 모든 인증 관련 쿠키 삭제
  clearAll: () => {
    deleteCookie('access_token')
    deleteCookie('user_id')
    deleteCookie('expires_at')
  },

  // 토큰이 유효한지 확인
  isTokenValid: (): boolean => {
    const token = getCookie('access_token')
    // const expiresAt = getCookie('expires_at')

    // 토큰이 없으면 유효하지 않음
    if (!token) {
      // console.log('🔍 isTokenValid: 토큰이 없음')
      return false
    }

    return true
  },
}
