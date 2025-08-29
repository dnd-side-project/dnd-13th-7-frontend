'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { OAuthCallbackParams } from '@/features/oauth/types'
import { tokenCookies } from '@/shared/utils/cookies'

interface User {
  id: number
  email?: string
  active: boolean
}

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  login: (token: string, userData: User, expiresIn?: number) => void
  logout: () => void
  setUserFromOAuth: (oauthData: OAuthCallbackParams) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 초기 로드 시 쿠키에서 토큰 확인
  useEffect(() => {
    const token = tokenCookies.getAccessToken()
    const userIdStr = tokenCookies.getUserId()
    const isTokenValid = tokenCookies.isTokenValid()
    const expiresAt = tokenCookies.getExpiresAt()

    // console.log('🔍 AuthProvider 초기화 디버깅:', {
    //   token: token ? `존재 (${token.substring(0, 10)}...)` : '없음',
    //   userId: userIdStr,
    //   isTokenValid,
    //   expiresAt: expiresAt ? new Date(expiresAt).toLocaleString() : '없음',
    //   currentTime: new Date().toLocaleString(),
    //   timeDiff: expiresAt
    //     ? Math.floor((expiresAt - Date.now()) / 1000 / 60)
    //     : 'N/A', // 분 단위
    // })

    if (token && userIdStr && isTokenValid) {
      const userData = {
        id: parseInt(userIdStr),
        active: true, // 쿠키에 있다는 것은 active 상태
      }
      setAccessToken(token)
      setUser(userData)
      // console.log('✅ 사용자 로그인 상태로 설정됨:', userData)
    } else {
      // console.log('❌ 토큰이 유효하지 않음:', {
      //   hasToken: !!token,
      //   hasUserId: !!userIdStr,
      //   isTokenValid,
      //   reason: !token
      //     ? '토큰 없음'
      //     : !userIdStr
      //       ? '사용자 ID 없음'
      //       : !isTokenValid
      //         ? '토큰 만료'
      //         : '알 수 없음',
      // })
    }
    // 토큰이 만료되어도 쿠키는 유지 (로그아웃 시에만 삭제)

    setIsLoading(false)
  }, [])

  const login = (token: string, userData: User, expiresIn?: number) => {
    setAccessToken(token)
    setUser(userData)

    // 쿠키에 토큰 정보 저장 (1주일로 고정)
    const tokenExpiresIn = 604800 // 1주일 (7일 * 24시간 * 60분 * 60초)
    tokenCookies.setAccessToken(token, tokenExpiresIn)
    tokenCookies.setUserId(userData.id.toString())
    tokenCookies.setExpiresAt(Date.now() + tokenExpiresIn * 1000)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)

    // 쿠키에서 토큰 정보 삭제
    tokenCookies.clearAll()
    sessionStorage.removeItem('oauth_data')
  }

  const setUserFromOAuth = (oauthData: OAuthCallbackParams) => {
    const isActive = oauthData.active === 'true'

    if (isActive) {
      login(
        oauthData.accessToken,
        {
          id: parseInt(oauthData.userId),
          active: true,
        },
        parseInt(oauthData.expiresIn),
      )
    } else {
      // 비활성 사용자는 토큰만 임시 저장 (signup 완료 전까지)
      setAccessToken(oauthData.accessToken)
      setUser({
        id: parseInt(oauthData.userId),
        active: false,
      })

      // 임시 토큰 저장 (회원가입 완료 후 정식 토큰으로 교체)
      const expiresIn = 604800 // 1주일로 고정
      tokenCookies.setAccessToken(oauthData.accessToken, expiresIn)
      tokenCookies.setUserId(oauthData.userId)
      tokenCookies.setExpiresAt(Date.now() + expiresIn * 1000)
    }
  }

  const value: AuthContextType = {
    user,
    accessToken,
    isLoading,
    login,
    logout,
    setUserFromOAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
