'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/atoms'
import AppPath from '@/shared/configs/appPath'

const ReviewSubmittedContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reviewId = searchParams.get('reviewId')

  const handleHome = () => {
    router.push(AppPath.home())
  }

  const handleReview = () => {
    // reviewId가 있으면 해당 리뷰 상세 페이지로, 없으면 리뷰 탐색 페이지로
    if (reviewId) {
      router.push(AppPath.reviewDetail(reviewId))
    } else {
      router.push(AppPath.reviewExplore())
    }
  }

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="max-w-[500px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col text-center gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="typo-main-title text-black-color">
              소중한 후기 감사합니다
            </h2>
            {reviewId ? (
              <div className="flex flex-col gap-4">
                <div className="relative w-[285px] h-[211.5px] mx-auto">
                  <Image
                    src="/images/cheerup.svg"
                    alt="프리미엄 리뷰 완료"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="typo-body-2-2-m text-grey-color-5">
                  프리미엄 리뷰 작성을 완료했습니다.
                  <br />
                  정성스러운 후기가 많은 분들에게 유용하게 사용됩니다.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative w-[494px] h-[222px] mx-auto">
                  <Image
                    src="/images/dance.svg"
                    alt="일반 리뷰 완료"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="typo-body-2-2-m text-grey-color-5">
                  일반 리뷰 작성을 완료했습니다.
                  <br />
                  정성스러운 후기가 많은 분들에게 유용하게 사용됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <Button
            variant="outlined-secondary"
            size="medium"
            className="w-[194px]"
            onClick={handleHome}
          >
            홈으로
          </Button>
          {reviewId && (
            <Button
              variant="solid"
              size="medium"
              className="w-[194px]"
              onClick={handleReview}
            >
              작성 후기 보기
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}

const ReviewSubmitted = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewSubmittedContent />
    </Suspense>
  )
}

export default ReviewSubmitted
