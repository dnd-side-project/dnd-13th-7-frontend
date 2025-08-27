'use client'

import React from 'react'
import { use } from 'react'
import { OptionButton } from '@/components/atoms/OptionButton'
import { usePremiumReviewDetail } from '@/features/review/queries'
import {
  PremiumReviewDetail,
  ResultType,
  ReviewCategory,
} from '@/features/review/types'

// Mock data for testing
// const mockReviewDetail: PremiumReviewDetail = {
//   id: 1,
//   club: {
//     id: 1,
//     name: '모여잇',
//     slogan: '함께 성장하는 개발자 커뮤니티',
//     bio: '프론트엔드 개발자들이 모여 기술을 공유하고 성장하는 동아리입니다.',
//     establishment: 2023,
//     totalParticipant: 50,
//     operation: 2,
//     offline: '서울 강남구',
//     online: 'Discord',
//     location: '서울',
//     address: '서울시 강남구 테헤란로 123',
//     recruiting: true,
//     imageUrl: 'https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=모여잇',
//   },
//   cohort: 3,
//   job: {
//     id: 1,
//     name: '프론트엔드 개발자',
//     engName: 'Frontend Developer',
//   },
//   user: {
//     id: 1,
//     name: '김모여',
//     email: 'kim@example.com',
//     nickname: '모여킴',
//     profileImageUrl:
//       'https://via.placeholder.com/120x120/10B981/FFFFFF?text=김',
//     jobDto: {
//       id: 1,
//       name: '프론트엔드 개발자',
//       engName: 'Frontend Developer',
//     },
//     provider: 'GOOGLE',
//     active: true,
//   },
//   imageUrl:
//     'https://via.placeholder.com/800x400/6366F1/FFFFFF?text=프리미엄+리뷰+이미지',
//   title: '모여잇 3기 프론트엔드 개발자 합격 후기',
//   resultType: ResultType.Pass,
//   reviewCategory: ReviewCategory.Document,
//   createDazte: '2024-01-15T10:30:00.000Z',
//   updateDate: '2024-01-15T10:30:00.000Z',
//   details: [
//     '안녕하세요! 모여잇 3기 프론트엔드 개발자로 합격한 모여킴입니다. 이번 후기에서는 제가 어떻게 준비했고, 어떤 점이 합격에 도움이 되었는지 공유해드리려고 합니다.',
//     '먼저 지원 동기부터 말씀드리면, 저는 프론트엔드 개발에 대한 깊은 관심과 함께 실제 프로젝트 경험을 쌓고 싶었습니다. 모여잇은 React, TypeScript, Next.js 등 현대적인 기술 스택을 사용하고 있어서 매우 매력적이었습니다.',
//     '서류 준비 과정에서는 GitHub에 개인 프로젝트들을 정리하고, 기술 블로그를 통해 학습한 내용들을 기록했습니다. 특히 React와 TypeScript를 활용한 토이 프로젝트들이 큰 도움이 되었습니다.',
//     '면접에서는 기술적인 질문과 함께 팀워크에 대한 질문들이 나왔습니다. 실제 프로젝트 경험을 바탕으로 한 구체적인 답변이 중요했고, 협업 과정에서 겪었던 어려움과 해결 방법에 대해서도 준비했습니다.',
//     '합격 후 느낀 점은, 단순히 기술력만이 아니라 지속적인 학습 의지와 팀과의 소통 능력이 매우 중요하다는 것입니다. 모여잇에서의 활동을 통해 더욱 성장할 수 있을 것 같아 기대가 큽니다!',
//   ],
// }

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

  // Use mock data for now
  // const reviewDetail = mockReviewDetail
  // const isLoading = false
  // const error = null

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
                {reviewDetail.user.nickname}
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
                  {/* 프로필 카드 */}
                  <div className="bg-light-color-2 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-[50px] h-[50px] bg-grey-color-3 rounded-full overflow-hidden flex-shrink-0">
                      {reviewDetail.user.profileImageUrl ? (
                        <img
                          src={reviewDetail.user.profileImageUrl}
                          alt={reviewDetail.user.nickname}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-grey-color-3 flex items-center justify-center">
                          <span className="typo-body-2-2-sb text-white-color">
                            {reviewDetail.user.nickname.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-3">
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
                <div className="bg-white rounded-3xl p-8">
                  <div className="flex flex-col gap-6">
                    <h2 className="typo-title-3 text-black-color">후기 내용</h2>
                    <div className="flex flex-col gap-4">
                      {reviewDetail.details.map(
                        (detail: string, index: number) => (
                          <div
                            key={index}
                            className="typo-body-1-1-r text-grey-color-4 leading-relaxed"
                          >
                            {detail}
                          </div>
                        ),
                      )}
                    </div>
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
