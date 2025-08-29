'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tag } from '@/components/atoms/tag/Tag'
import { Card } from '@/components/molecules/card'
import { MultiDropDown } from '@/components/molecules/multiDropDown/MultiDropDown'
import { PaginationWithHook } from '@/components/molecules/pagination'
import { Tab, type TabOption } from '@/components/molecules/tab/Tab'
import { ClubRecruitsData } from '@/features/clubs/types'
import { useClubPremiumReviews } from '@/features/review/queries'
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
  const [page, setPage] = useQueryState('page')

  // recruitsData에서 모집 파트를 멀티드롭다운 옵션으로 변환
  const recruitmentPartOptions =
    recruitsData?.recruitmentPart?.map((part) => ({
      label: part,
      value: part,
    })) || []

  const currentSort = React.useMemo(() => sort || '인기순', [sort])
  const currentPage = React.useMemo(() => parseInt(page || '0'), [page])

  const reviewArray = React.useMemo(() => {
    if (review === 'all') {
      // "전체" 선택 시 ['all'] 반환
      return ['all']
    }
    if (review === null || review === undefined) {
      // 초기 상태 또는 선택 없음 시 빈 배열 반환
      return []
    }
    return review ? review.split(',').filter(Boolean) : []
  }, [review])
  const partArray = React.useMemo(() => {
    if (part === 'all') {
      // "전체" 선택 시 ['all'] 반환
      return ['all']
    }
    if (part === null || part === undefined) {
      // 초기 상태 또는 선택 없음 시 빈 배열 반환
      return []
    }
    return part ? part.split(',').filter(Boolean) : []
  }, [part])

  const resultArray = React.useMemo(() => {
    if (result === 'all') {
      // "전체" 선택 시 ['all'] 반환
      return ['all']
    }
    if (result === null || result === undefined) {
      // 초기 상태 또는 선택 없음 시 빈 배열 반환
      return []
    }
    const parsed = result ? result.split(',').filter(Boolean) : []
    return parsed
  }, [result])

  const targetArray = React.useMemo(
    () => (target ? target.split(',').filter(Boolean) : []),
    [target],
  )

  const handleReviewChange = React.useCallback(
    (values: string[]) => {
      // "전체" 선택 시 특별한 값 "all" 사용
      if (values.includes('all')) {
        setReview('all') // "전체" 선택 시 "all"로 설정
      } else {
        setReview(values.length > 0 ? values.join(',') : null)
      }
    },
    [setReview],
  )

  const handlePartChange = React.useCallback(
    (values: string[]) => {
      // "전체" 선택 시 특별한 값 "all" 사용
      if (values.includes('all')) {
        setPart('all') // "전체" 선택 시 "all"로 설정
      } else {
        setPart(values.length > 0 ? values.join(',') : null)
      }
    },
    [setPart],
  )

  const handleTargetChange = React.useCallback(
    (values: string[]) => {
      // "전체" 선택 시 빈배열로 쿼리스트링 요청
      if (values.includes('all')) {
        setTarget('') // "전체" 선택 시 빈 문자열로 설정
      } else {
        setTarget(values.length > 0 ? values.join(',') : null)
      }
    },
    [setTarget],
  )

  const handleResultChange = React.useCallback(
    (values: string[]) => {
      // "전체" 선택 시 특별한 값 "all" 사용
      if (values.includes('all')) {
        setResult('all') // "전체" 선택 시 "all"로 설정
      } else {
        setResult(values.length > 0 ? values.join(',') : null)
      }
    },
    [setResult],
  )

  const resetFilters = React.useCallback(() => {
    router.replace(`/club/${clubId}`)
  }, [router, clubId])

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      setPage((newPage - 1).toString())
    },
    [setPage],
  )

  // 프리미엄 후기 데이터 가져오기
  const {
    data: premiumReviewsData,
    isLoading,
    error,
  } = useClubPremiumReviews(clubId, {
    page: currentPage,
    size: 5,
    reviewType:
      review && review !== '' && review !== 'all' ? review : undefined,
    part: part && part !== '' && part !== 'all' ? part : undefined,
    result: result && result !== '' && result !== 'all' ? result : undefined,
    sort: currentSort,
  })

  const SORT_OPTIONS: TabOption[] = [
    { label: '최신순', value: '최신순' },
    { label: '인기순', value: '인기순' },
  ]

  const REVIEW_OPTIONS = [
    {
      title: '후기 종류',
      options: [
        { label: '전체', value: 'all' },
        { label: '서류 후기', value: '서류' },
        { label: '인터뷰 후기', value: '인터뷰' },
        { label: '활동 후기', value: '활동' },
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
          value={currentSort as '최신순' | '인기순'}
          defaultValue="인기순"
          onChange={(value) => setSort(value)}
        />
      </div>

      {/* 프리미엄 후기 목록 */}
      <div className=" flex justify-center">
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
                        {review.identifier.length > 0 &&
                          review.identifier.map((tag, index) => (
                            <Tag
                              key={index}
                              label={tag}
                              kind="premiumReview"
                              size="large"
                            />
                          ))}
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

      {premiumReviewsData && premiumReviewsData.totalPages > 1 && (
        <div className="mt-8 mb-48">
          <PaginationWithHook
            totalPages={premiumReviewsData.totalPages}
            maxVisiblePages={5}
            initialPage={currentPage + 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
