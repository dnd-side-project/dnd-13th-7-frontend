'use client'

import { Button } from '@/components/atoms/Button/button'
import { useClubRecruits } from '@/features/clubs/queries'

interface RecruitProps {
  clubId: string
}

export default function Recruit({ clubId }: RecruitProps) {
  const { data: recruitsData } = useClubRecruits(clubId)

  return (
    <div className="w-80 h-69">
      {/* 위 */}
      <div className="bg-white px-8 py-6 rounded-[16px]">
        {/* 모집 파트 */}
        <div className="flex gap-2 mb-3">
          <div className="w-18 typo-button-b">모집 파트</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.recruitmentPart?.join(', ') || '-'}
          </div>
        </div>

        {/* 자격 요건 */}
        <div className="flex gap-2 mb-3">
          <div className="w-18 typo-button-b">자격 요건</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.qualification || '-'}
          </div>
        </div>

        {/* 모집 일정 */}
        <div className="flex gap-2 mb-3">
          <div className="w-18 typo-button-b">모집 일정</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.recruitmentSchedule || '-'}
          </div>
        </div>

        {/* 활동 기간 */}
        <div className="flex gap-2 mb-3">
          <div className="w-18 typo-button-b">활동 기간</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.activityPeriod || '-'}
          </div>
        </div>

        {/* 활동 방식 */}
        <div className="flex gap-2 mb-3">
          <div className="w-18 typo-button-b">활동 방식</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.activityMethod || '-'}
          </div>
        </div>

        {/* 활동비 */}
        <div className="flex gap-2">
          <div className="w-18 typo-button-b">활동비</div>
          <div className="flex-1 typo-button-m">
            {recruitsData?.activityFee || '-'}
          </div>
        </div>
      </div>

      {/* 아래 - 버튼들 */}
      <div className="mt-4 space-y-2">
        {recruitsData?.homepageUrl && (
          <Button
            variant="solid"
            size="medium"
            className="w-full"
            onClick={() => window.open(recruitsData.homepageUrl)}
          >
            홈페이지 바로가기
          </Button>
        )}
        {recruitsData?.noticeUrl && (
          <Button
            variant="outlined-secondary"
            size="medium"
            className="w-full"
            onClick={() => window.open(recruitsData.noticeUrl!)}
          >
            D-DAY 모집공고 바로가기
          </Button>
        )}
      </div>
    </div>
  )
}
