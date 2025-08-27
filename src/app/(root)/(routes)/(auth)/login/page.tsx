'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { KakaoIcon, GoogleIcon } from '@/assets/icons'
import { Button } from '@/components/atoms/Button'
import { useOAuthAuthorize } from '@/features/oauth'
import AppPath from '@/shared/configs/appPath'
import { useAuth } from '@/shared/providers/auth-provider'

export default function LoginPage() {
  const { mutate: authorize, isPending } = useOAuthAuthorize()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (user) {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back()
      } else {
        router.push(AppPath.home())
      }
    }
  }, [isLoading, user, router])

  const handleKakaoLogin = () => {
    authorize('kakao')
  }

  const handleGoogleLogin = () => {
    authorize('google')
  }

  return (
    <div className="w-full h-full">
      <main className="flex flex-col gap-2 px-5 h-screen justify-center w-full desktop:max-w-[360px] mx-auto">
        <div className="flex flex-col typo-title-1 text-black-color justify-center items-center mb-4">
          <div>나와 잘 맞는 IT 활동,</div>
          <div>
            <span className="text-main-color-1">모여잇</span>에서 쉽게
            찾아보세요!
          </div>
        </div>
        <div className="typo-body-2-2 text-grey-color-3 text-center mb-16">
          다양한 IT 동아리의 솔직한 후기를 확인할 수 있어요
        </div>
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleKakaoLogin}
            disabled={isPending}
            size="medium"
            className="typo-body-3-b bg-kakao-color items-center text-black-color border-none hover:bg-kakao-color/80 gap-2 active:bg-kakao-color/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <KakaoIcon width={25} height={25} role="img" aria-label="kakao" />
            {isPending ? '로그인 중...' : '카카오 계정으로 계속하기'}
          </Button>
          <Button
            onClick={handleGoogleLogin}
            disabled={isPending}
            size="medium"
            className="typo-body-3-b bg-white-color items-center border-light-color-3 text-black-color hover:bg-white-color/80 gap-2 active:bg-white-color/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon width={25} height={25} role="img" aria-label="google" />
            {isPending ? '로그인 중...' : '구글 계정으로 계속하기'}
          </Button>
        </div>
      </main>
    </div>
  )
}
