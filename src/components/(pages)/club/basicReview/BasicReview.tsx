'use client'

import { useState } from 'react'
import { MultiDropDown } from '@/components/molecules/multiDropDown/MultiDropDown'
import { ClubRecruitsData } from '@/features/clubs/types'

interface BasicReviewProps {
  recruitsData: ClubRecruitsData | null
}

export default function BasicReview({ recruitsData }: BasicReviewProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>([])

  // recruitsData에서 모집 파트를 멀티드롭다운 옵션으로 변환
  const recruitmentPartOptions =
    recruitsData?.recruitmentPart?.map((part) => ({
      label: part,
      value: part,
    })) || []

  const groups = [
    {
      title: '모집 파트',
      options: recruitmentPartOptions,
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div>일반 후기 페이지</div>

      {/* 모집 파트 데이터 사용 예시 */}
      {recruitsData && (
        <div className="space-y-4">
          <div>모집 파트: {recruitsData.recruitmentPart?.join(', ')}</div>

          {/* 멀티드롭다운 예시 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">모집 파트 필터</h3>
            <MultiDropDown
              groups={groups}
              value={selectedParts}
              onChange={setSelectedParts}
              placeholder="모집 파트를 선택하세요"
              maxSummary={2}
            />
            {selectedParts.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                선택된 파트: {selectedParts.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
