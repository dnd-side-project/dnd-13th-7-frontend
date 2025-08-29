'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MultiDropDown } from '@/components/molecules/multiDropDown/MultiDropDown'
import { PaginationWithHook } from '@/components/molecules/pagination'
import { StandardReview } from '@/components/molecules/standardReview'
import { Tab, type TabOption } from '@/components/molecules/tab/Tab'
import { ClubRecruitsData } from '@/features/clubs/types'
import { useToggleLike } from '@/features/like'
import { useClubBasicReviews } from '@/features/review/queries'
import useQueryState from '@/shared/hooks/useQueryState'
import { formatDateToYYMMDD } from '@/shared/utils'

interface BasicReviewProps {
  recruitsData: ClubRecruitsData | null
  clubId: number
}

export default function BasicReview({
  recruitsData,
  clubId,
}: BasicReviewProps) {
  console.log('🚀 BasicReview 컴포넌트 렌더링 시작')
  console.log('📋 Props:', { recruitsData, clubId })

  const router = useRouter()

  const [review, setReview] = useQueryState('review')
  const [part, setPart] = useQueryState('part')
  const [result, setResult] = useQueryState('result')
  const [sort, setSort] = useQueryState('sort')
  const [page, setPage] = useQueryState('page')

  const currentSort = React.useMemo(() => sort || '인기순', [sort])
  const currentPage = React.useMemo(() => parseInt(page || '0'), [page])

  // recruitsData에서 모집 파트를 멀티드롭다운 옵션으로 변환
  const recruitmentPartOptions =
    recruitsData?.recruitmentPart?.map((part) => ({
      label: part,
      value: part,
    })) || []

  const reviewArray = React.useMemo(() => {
    if (review === 'all') {
      return ['all']
    }
    if (review === null || review === undefined) {
      return []
    }
    return review ? review.split(',').filter(Boolean) : []
  }, [review])

  const partArray = React.useMemo(() => {
    if (part === 'all') {
      return ['all']
    }
    if (part === null || part === undefined) {
      return []
    }
    return part ? part.split(',').filter(Boolean) : []
  }, [part])

  const resultArray = React.useMemo(() => {
    if (result === 'all') {
      return ['all']
    }
    if (result === null || result === undefined) {
      return []
    }
    return result ? result.split(',').filter(Boolean) : []
  }, [result])

  const handleReviewChange = React.useCallback(
    (values: string[]) => {
      if (values.includes('all')) {
        setReview('all')
      } else {
        setReview(values.length > 0 ? values.join(',') : null)
      }
    },
    [setReview],
  )

  const handlePartChange = React.useCallback(
    (values: string[]) => {
      if (values.includes('all')) {
        setPart('all')
      } else {
        setPart(values.length > 0 ? values.join(',') : null)
      }
    },
    [setPart],
  )

  const handleResultChange = React.useCallback(
    (values: string[]) => {
      if (values.includes('all')) {
        setResult('all')
      } else {
        setResult(values.length > 0 ? values.join(',') : null)
      }
    },
    [setResult],
  )

  const resetFilters = React.useCallback(() => {
    router.replace(`/club/${clubId}`)
  }, [router, clubId])

  const {
    data: basicReviewsData,
    isLoading,
    error,
  } = useClubBasicReviews(clubId, {
    page: currentPage,
    size: 4,
    reviewType:
      review && review !== '' && review !== 'all' ? review : undefined,
    part: part && part !== '' && part !== 'all' ? part : undefined,
    result: result && result !== '' && result !== 'all' ? result : undefined,
    sort: currentSort,
  })

  console.log('📊 리뷰 데이터 상태:', {
    isLoading,
    error: error?.message,
    dataLength: basicReviewsData?.content?.length || 0,
    hasData: !!basicReviewsData?.content,
  })

  // 좋아요 뮤테이션 (구독 기능처럼 구현)
  const toggleLikeMutation = useToggleLike()

  const handleLikeToggle = async (reviewId: number) => {
    try {
      console.log('🎯 좋아요 토글 시도:', reviewId)
      await toggleLikeMutation.mutateAsync({
        reviewId: reviewId.toString(),
        reviewType: 'BASIC',
      })
      console.log('✅ 좋아요 토글 성공')
    } catch (error) {
      console.error('❌ 좋아요 토글 실패:', error)
    }
  }

  const handleRecommend = async (reviewId: number) => {
    try {
      console.log('🎯 후기 추천하기 클릭!')
      console.log('📋 추천할 리뷰 ID:', reviewId)

      await toggleLikeMutation.mutateAsync({
        reviewId: reviewId.toString(),
        reviewType: 'BASIC',
      })
      console.log('✅ 후기 추천 성공')
    } catch (error) {
      console.error('❌ 후기 추천 실패:', error)
    }
  }

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

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      setPage((newPage - 1).toString())
    },
    [setPage],
  )

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>일반 후기 페이지</div>
        <div className="flex items-center justify-center py-8">
          <div className="text-grey-color-4">로딩 중...</div>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="space-y-4">
        <div>일반 후기 페이지</div>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">
            후기를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      </div>
    )
  }

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

      {/* 실제 API 데이터로 StandardReview 렌더링 */}
      <div className="space-y-8">
        {basicReviewsData?.content && basicReviewsData.content.length > 0 ? (
          <div className="space-y-4">
            {basicReviewsData.content.map((review, index) => {
              console.log(`📝 리뷰 ${index + 1} 렌더링:`, {
                reviewId: review.reviewId,
                clubName: review.clubName,
                likeCount: review.likeCount,
              })

              return (
                <StandardReview
                  key={review.reviewId || index}
                  className="pt-8 pb-8 px-6 border-b border-light-color-3 w-full"
                >
                  <div className="flex gap-6 w-full">
                    <StandardReview.Left>
                      <StandardReview.Profile
                        nickname={review.nickname}
                        clubName={review.clubName}
                        generation={review.cohort}
                        part={review.part}
                        profileImage={review.position}
                      />
                      <StandardReview.Questions
                        questions={review.qaPreviews.map((qa) => ({
                          question: qa.questionTitle,
                          answers: [qa.answerValue],
                        }))}
                      />
                    </StandardReview.Left>

                    <StandardReview.Right>
                      <StandardReview.Meta
                        rating={review.rate}
                        reviewType={review.reviewCategory}
                        date={`작성날짜 (${formatDateToYYMMDD(review.createdAt)})`}
                      />
                      <StandardReview.Content
                        title={review.oneLineComment}
                        content={review.impressiveContentPreview}
                      />
                    </StandardReview.Right>
                  </div>

                  <StandardReview.Bottom>
                    <StandardReview.Recommend
                      onRecommend={() => handleRecommend(review.reviewId)}
                      likeCount={review.likeCount}
                    />
                  </StandardReview.Bottom>
                </StandardReview>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-grey-color-4">등록된 후기가 없습니다.</div>
          </div>
        )}
      </div>
      {basicReviewsData && basicReviewsData.totalPages > 1 && (
        <div className="mt-8 mb-48">
          <PaginationWithHook
            totalPages={basicReviewsData.totalPages}
            maxVisiblePages={4}
            initialPage={currentPage + 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
