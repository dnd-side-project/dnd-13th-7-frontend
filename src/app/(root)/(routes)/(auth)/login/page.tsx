'use client'

import Image from 'next/image'
import { KakaoIcon, GoogleIcon } from '@/assets/icons'
import { Button } from '@/components/atoms/Button'

export default function LoginPage() {
  const handleKakaoLogin = () => {
    console.log('kakao login')
  }

  const handleGoogleLogin = () => {
    console.log('google login')
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
            size="medium"
            className="typo-body-3-b bg-kakao-color text-black-color border-none hover:bg-kakao-color/80 gap-2 active:bg-kakao-color/50"
          >
            <Image src={KakaoIcon} alt="kakao" width={20} height={20} />
            카카오 계정으로 계속하기
          </Button>
          <Button
            onClick={handleGoogleLogin}
            size="medium"
            className="typo-body-3-b bg-white-color border-light-color-3 text-black-color hover:bg-white-color/80 gap-2 active:bg-white-color/50"
          >
            <Image src={GoogleIcon} alt="google" width={20} height={20} />
            구글 계정으로 계속하기
          </Button>
        </div>
      </main>
    </div>
  )
}
