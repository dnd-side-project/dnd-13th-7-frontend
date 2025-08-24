/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface User {
  id: number
  email?: string
  active: boolean
}

interface AuthContextType {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  login: (token: string, userData: User) => void
  logout: () => void
  setUserFromOAuth: (oauthData: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 초기 로드 시 로컬스토리지에서 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const userIdStr = localStorage.getItem('user_id')

    if (token && userIdStr) {
      setAccessToken(token)
      setUser({
        id: parseInt(userIdStr),
        active: true, // 로컬스토리지에 있다는 것은 active 상태
      })
    }

    setIsLoading(false)
  }, [])

  const login = (token: string, userData: User) => {
    setAccessToken(token)
    setUser(userData)
    localStorage.setItem('access_token', token)
    localStorage.setItem('user_id', userData.id.toString())
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_id')
    sessionStorage.removeItem('oauth_data')
  }

  const setUserFromOAuth = (oauthData: any) => {
    if (oauthData.active) {
      login(oauthData.access_token, {
        id: oauthData.user_id,
        active: true,
      })
    } else {
      // 비활성 사용자는 토큰만 임시 저장 (signup 완료 전까지)
      setAccessToken(oauthData.access_token)
      setUser({
        id: oauthData.user_id,
        active: false,
      })
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
