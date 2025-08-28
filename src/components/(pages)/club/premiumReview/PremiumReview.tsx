'use client'

import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tag } from '@/components/atoms/tag/Tag'
import { Card } from '@/components/molecules/card'
import { MultiDropDown } from '@/components/molecules/multiDropDown/MultiDropDown'
import { Tab, type TabOption } from '@/components/molecules/tab/Tab'
import { ClubRecruitsData } from '@/features/clubs/types'
import { usePremiumReviews } from '@/features/review/queries'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import useQueryState from '@/shared/hooks/useQueryState'

interface PremiumReviewProps {
  recruitsData: ClubRecruitsData | null
  clubId: number
}

export default function PremiumReview({
  recruitsData,
  clubId,
}: PremiumReviewProps) {
  const router = useRouter()

  const [review, setReview] = useQueryState('review')
  const [part, setPart] = useQueryState('part')
  const [result, setResult] = useQueryState('result')
  const [target, setTarget] = useQueryState('target')
  const [sort, setSort] = useQueryState('sort')

  // recruitsData에서 모집 파트를 멀티드롭다운 옵션으로 변환
  const recruitmentPartOptions =
    recruitsData?.recruitmentPart?.map((part) => ({
      label: part,
      value: part,
    })) || []

  const currentSort = React.useMemo(() => sort || 'popular', [sort])

  const reviewArray = React.useMemo(
    () => (review ? review.split(',').filter(Boolean) : []),
    [review],
  )
  const partArray = React.useMemo(
    () => (part ? part.split(',').filter(Boolean) : []),
    [part],
  )

  const resultArray = React.useMemo(
    () => (result ? result.split(',').filter(Boolean) : []),
    [result],
  )

  const targetArray = React.useMemo(
    () => (target ? target.split(',').filter(Boolean) : []),
    [target],
  )

  const handleReviewChange = React.useCallback(
    (values: string[]) => {
      setReview(values.length > 0 ? values.join(',') : null)
    },
    [setReview],
  )

  const handlePartChange = React.useCallback(
    (values: string[]) => {
      setPart(values.length > 0 ? values.join(',') : null)
    },
    [setPart],
  )

  const handleTargetChange = React.useCallback(
    (values: string[]) => {
      setTarget(values.length > 0 ? values.join(',') : null)
    },
    [setTarget],
  )

  const handleResultChange = React.useCallback(
    (values: string[]) => {
      setResult(values.length > 0 ? values.join(',') : null)
    },
    [setResult],
  )

  const resetFilters = React.useCallback(() => {
    router.replace(`/club/${clubId}/premium-review`)
  }, [router, clubId])

  const queryParams = {
    page: 0,
    size: 5,
    review: reviewArray.length > 0 ? reviewArray.join(',') : undefined,
    part:
      partArray.filter((p) => p !== 'all').length > 0
        ? partArray.filter((p) => p !== 'all').join(',')
        : undefined,
    result:
      resultArray.filter((r) => r !== 'all').length > 0
        ? resultArray.filter((r) => r !== 'all').join(',')
        : undefined,
    target:
      targetArray.filter((t) => t !== 'all').length > 0
        ? targetArray.filter((t) => t !== 'all').join(',')
        : undefined,
    sort: currentSort,
  }

  // 프리미엄 후기 데이터 가져오기
  const { data: premiumReviewsData, isLoading } = usePremiumReviews(queryParams)

  const SORT_OPTIONS: TabOption[] = [
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'popular' },
  ]

  const REVIEW_OPTIONS = [
    {
      title: '후기 종류',
      options: [
        { label: '전체', value: 'all' },
        { label: '서류 후기', value: '서류 후기' },
        { label: '인터뷰 후기', value: '인터뷰 후기' },
        { label: '활동 후기', value: '활동 후기' },
      ],
    },
  ]

  const PART_OPTIONS = [
    {
      title: '파트',
      options: [{ label: '전체', value: 'all' }, ...recruitmentPartOptions],
    },
  ]

  const RESULT_OPTIONS = [
    {
      title: '결과 상태',
      options: [
        { label: '전체', value: 'all' },
        { label: '합격', value: '합격' },
        { label: '불합격', value: '불합격' },
      ],
    },
  ]

  return (
    <div className="mt-12 w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <MultiDropDown
            groups={REVIEW_OPTIONS}
            value={reviewArray}
            onChange={handleReviewChange}
            placeholder="후기 종류"
            maxSummary={1}
            className="w-auto"
          />
          <MultiDropDown
            groups={PART_OPTIONS}
            value={partArray}
            onChange={handlePartChange}
            placeholder="파트"
            maxSummary={1}
            className="w-auto"
          />
          <MultiDropDown
            groups={RESULT_OPTIONS}
            value={resultArray}
            onChange={handleResultChange}
            placeholder="결과 상태"
            maxSummary={1}
            className="w-auto"
          />
          <button
            onClick={() => resetFilters()}
            className="flex items-center gap-1 px-3 py-2  text-grey-color-2 typo-button-m h-[32px] cursor-pointer"
          >
            <Image src="/icons/reset.svg" alt="reset" width={20} height={20} />
            초기화
          </button>
        </div>
        <Tab
          options={SORT_OPTIONS}
          value={currentSort as 'latest' | 'popular'}
          defaultValue="popular"
          onChange={(value) => setSort(value)}
        />
      </div>

      {/* 프리미엄 후기 목록 */}
      <div className="mt-8 p-6 flex justify-center">
        {isLoading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : premiumReviewsData?.content &&
          premiumReviewsData.content.length > 0 ? (
          <div className="flex flex-col gap-4 items-center">
            {premiumReviewsData.content.map((review) => (
              <Link key={review.reviewId} href={`/review/${review.reviewId}`}>
                <Card
                  orientation="horizontal"
                  border={true}
                  gap="20px"
                  pad="24px"
                  className="group cursor-pointer border border-light-color-3 rounded-[16px] transition-all duration-300 w-170 h-50"
                >
                  <Card.Image
                    alt={review.title}
                    interactive
                    className="transition-transform duration-300 ease-out w-56 h-38"
                  />
                  <Card.Content className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {review.identifier.length > 0 && (
                          <>
                            {/* 동아리명 */}
                            <Tag
                              label={review.identifier[0].split(' ')[0]}
                              kind="premiumReview"
                              size="large"
                            />
                            {/* 기수 */}
                            <Tag
                              label={review.identifier[0].split(' ')[1]}
                              kind="premiumReview"
                              size="large"
                            />
                            {/* 세부파트 */}
                            <Tag
                              label={review.identifier[0]
                                .split(' ')
                                .slice(2)
                                .join(' ')}
                              kind="premiumReview"
                              size="large"
                            />
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <Card.Title>{review.title}</Card.Title>
                        <Card.Description>{review.headLine}</Card.Description>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Card.Stats
                        likes={review.likeCount}
                        comments={review.commentCount}
                      />
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-grey-color-2">
            프리미엄 후기가 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
    </div>
  )
}
