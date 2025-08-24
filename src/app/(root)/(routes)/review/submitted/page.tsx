'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms'
import AppPath from '@/shared/configs/appPath'

const ReviewSubmitted = () => {
  const router = useRouter()

  const handleHome = () => {
    router.push(AppPath.home())
  }

  const handleReview = () => {
    router.push(AppPath.reviewExplore())
  }

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="max-w-[500px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col text-center gap-4">
          <h2 className="typo-main-title text-black-color">
            소중한 후기 감사합니다
          </h2>
          <p className="typo-body-3-2-m text-grey-color-5">
            리뷰 작성이 완료되었습니다
          </p>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <Button
            variant="solid"
            size="medium"
            className="w-full"
            onClick={handleHome}
          >
            홈으로
          </Button>
          <Button
            variant="solid"
            size="medium"
            className="w-full"
            onClick={handleReview}
          >
            작성 후기 보기
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ReviewSubmitted
