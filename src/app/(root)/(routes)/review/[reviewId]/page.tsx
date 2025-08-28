'use client'

import React from 'react'
import { use } from 'react'
import { usePremiumReviewDetail } from '@/features/review/queries'
import { ResultType, ReviewCategory } from '@/features/review/types'

export default function Page({
  params,
}: {
  params: Promise<{ reviewId: string }>
}) {
  const { reviewId } = use(params)
  const {
    data: reviewDetail,
    isLoading,
    error,
  } = usePremiumReviewDetail(Number(reviewId))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-color-2 flex items-center justify-center">
        <div className="text-center">
          <div className="typo-body-1-2-m text-grey-color-1">로딩 중...</div>
        </div>
      </div>
    )
  }

  if (!reviewDetail) {
    return (
      <div className="min-h-screen bg-light-color-2 flex items-center justify-center">
        <div className="text-center">
          <div className="typo-body-1-2-m text-grey-color-1">
            리뷰를 찾을 수 없습니다
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-color-2">
      {/* Hero Section */}
      <div className="bg-main-color-2 pt-20 pb-18 px-5 h-[390px] -mt-20">
        <div className="max-w-[1100px] mx-auto px-5 h-full flex items-end">
          <div className="flex flex-col gap-2">
            <h1 className="typo-main-title text-white-color">
              {reviewDetail.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="typo-body-1-2-m text-white-color opacity-80">
                {reviewDetail.club.name}
              </span>
              <div className="w-1 h-1 bg-white-color opacity-60 rounded-full" />
              <span className="typo-body-1-2-m text-white-color opacity-80">
                {reviewDetail.user.nickname || reviewDetail.user.name}
              </span>
              <div className="w-1 h-1 bg-white-color opacity-60 rounded-full" />
              <span className="typo-body-1-2-m text-white-color opacity-80">
                {reviewDetail.cohort}기
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center">
        <div className="flex gap-5 max-w-[1100px] w-full px-5 pt-14">
          {/* Sidebar */}
          {/* <div className="w-52 flex-shrink-0">
            <div className="flex flex-col gap-2.5">
              <div className="bg-white rounded-lg px-5 py-3">
                <span className="typo-body-1-2-sb text-black-color">
                  프리미엄 후기
                </span>
              </div>
              <div className="rounded-lg px-5 py-3">
                <span className="typo-body-1-2-r text-grey-color-1">
                  목록으로 돌아가기
                </span>
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="flex-1 pb-8">
            {/* 리뷰 이미지 섹션 */}
            {/* {reviewDetail.imageUrl && (
              <div className="bg-white rounded-3xl p-8 mb-6">
                <div className="aspect-video w-full bg-light-color-2 rounded-2xl overflow-hidden">
                  <img
                    src={reviewDetail.imageUrl}
                    alt={reviewDetail.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )} */}

            {/* 리뷰 정보 섹션 */}
            <div className="relative mb-6">
              {/* 상단 탭 부분 */}
              <div className="flex items-center gap-1 bg-white-color px-8 pt-4 pb-2 rounded-tr-4xl rounded-tl-4xl w-fit relative z-20">
                <span className="typo-title-3 text-black-color">
                  {reviewDetail.reviewCategory === ReviewCategory.Document &&
                    '서류'}
                  {reviewDetail.reviewCategory === ReviewCategory.Interview &&
                    '면접'}
                  {reviewDetail.reviewCategory === ReviewCategory.Activity &&
                    '활동'}
                </span>
                <span className="typo-title-3 text-black-color">·</span>
                <span className="typo-title-3 text-main-color-1">
                  {' '}
                  {reviewDetail.resultType === ResultType.Pass
                    ? '합격'
                    : '불합격'}{' '}
                  후기
                </span>
              </div>
              {/* 그림자용 가상 요소 */}
              <div className="absolute inset-0 rounded-tr-4xl rounded-b-4xl shadow-xs pointer-events-none top-[55px] z-[5]" />
              {/* 메인 컨텐츠 부분 */}
              <div className="py-12 px-6 bg-white-color rounded-tr-4xl rounded-b-4xl relative z-10 -mt-[1px]">
                <div className="flex flex-col gap-8">
                  {/* 프로필 카드 - 동아리 정보 */}
                  <div className="bg-light-color-2 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-[50px] h-[50px] bg-grey-color-3 rounded-full overflow-hidden flex-shrink-0">
                      {reviewDetail.club.imageUrl ? (
                        <img
                          src={reviewDetail.club.imageUrl}
                          alt={reviewDetail.club.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-grey-color-3 flex items-center justify-center">
                          <span className="typo-body-2-2-sb text-white-color">
                            {reviewDetail.club.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="typo-title-3 text-black-color">
                        {reviewDetail.club.name}
                      </div>
                      <div className="flex items-center gap-0.5 typo-body-1-3-m text-grey-color-5">
                        <span>{reviewDetail.cohort}기</span>
                        <span className="typo-body-4-m">·</span>
                        <span>{reviewDetail.job.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 리뷰 상세 내용 섹션 */}
                <div className="flex flex-col gap-8 mt-8">
                  {reviewDetail.details.map((detail) => (
                    <div key={detail.id} className="flex flex-col gap-3">
                      <h3 className="typo-body-1-2-sb text-black-color">
                        {detail.question.title}
                      </h3>
                      <div className="min-h-44 p-4 border border-grey-color-4 rounded-lg bg-white">
                        <div className="typo-body-1-3-m text-black-color leading-relaxed">
                          {detail.answerType === 'TEXT' &&
                            typeof detail.value === 'string' && (
                              <p>{detail.value}</p>
                            )}
                          {detail.answerType === 'INTEGER' &&
                            typeof detail.value === 'number' && (
                              <p>{detail.value}</p>
                            )}
                          {detail.answerType === 'ARRAY_INTEGER' &&
                            Array.isArray(detail.value) && (
                              <div className="flex flex-wrap gap-2">
                                {detail.value.map((elementId) => {
                                  const element = detail.question.elements.find(
                                    (el) => el.id === elementId,
                                  )
                                  return element ? (
                                    <span
                                      key={elementId}
                                      className="px-4 py-2 bg-main-color-3 rounded-full typo-caption text-main-color-1"
                                    >
                                      {element.elementTitle}
                                    </span>
                                  ) : null
                                })}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 하단 사용자 정보 및 액션 */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-grey-color-4">
                  <div className="flex items-center gap-2">
                    <div className="w-[50px] h-[50px] bg-light-color-2 rounded-full flex items-center justify-center">
                      {reviewDetail.user.profileImageUrl ? (
                        <img
                          src={reviewDetail.user.profileImageUrl}
                          alt={reviewDetail.user.nickname || ''}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="typo-body-2-2-sb text-grey-color-3">
                          {(
                            reviewDetail.user.nickname || reviewDetail.user.name
                          ).charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="typo-title-3 text-black-color">
                        {reviewDetail.user.nickname}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* <button className="px-4 py-2 bg-main-color-1 text-white-color rounded-full typo-caption">
                      후기 작성
                    </button>
                    <div className="flex items-center gap-3">
                      <button className="w-6 h-6 flex items-center justify-center">
                        <span className="text-grey-color-5">👍</span>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center">
                        <span className="text-grey-color-5">🔗</span>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center">
                        <span className="text-grey-color-5">⋯</span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
