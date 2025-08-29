'use client'

import * as React from 'react'
// import { Bell } from 'lucide-react'
import Image from 'next/image'
import { SubscriptionButton } from '@/components/atoms/SubscriptionButton'
import { useToggleClubSubscription } from '@/features/clubs/mutations'
import {
  useClubDetails,
  useUserSubscriptionCheck,
} from '@/features/clubs/queries'

interface DetailProps {
  clubId: number
}

/**
 * 동아리 상세 페이지 (썸네일, 동아리명, 구독 버튼, 슬로건)
 * */

// URL 유효성 검사 함수 (삭제예정)
function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function Detail({ clubId }: DetailProps) {
  const {
    data: clubDetails,
    isLoading: isClubLoading,
    error,
  } = useClubDetails(Number(clubId))

  const toggleSubscriptionMutation = useToggleClubSubscription()

  // 구독 상태 확인
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    error: subscriptionError,
  } = useUserSubscriptionCheck(Number(clubId))
  const isSubscribed = subscriptionData?.subscribed ?? false

  const isLoading = isClubLoading || isSubscriptionLoading

  const handleSubscribe = async () => {
    try {
      await toggleSubscriptionMutation.mutateAsync(Number(clubId))
    } catch (error) {
      console.error('구독 실패:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center w-full mx-auto max-w-[1440px]">
        <div className="w-180 max-w-[720px] px-5">
          <div className="text-center py-20">로딩 중...</div>
        </div>
      </div>
    )
  }

  if (error || !clubDetails) {
    return (
      <div className="flex justify-center w-full mx-auto max-w-[1440px]">
        <div className="w-180 max-w-[720px] px-5">
          <div className="text-center py-20 text-red-500">
            데이터를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full mx-auto max-w-[1440px]">
      <div className="w-180 max-w-[720px] px-5">
        <div className="relative w-full aspect-[3/2] border border-light-color-3 rounded-lg overflow-hidden mb-12">
          <Image
            src={
              isValidUrl(clubDetails.club.imageUrl)
                ? clubDetails.club.imageUrl!
                : '/images/default.svg'
            }
            alt={`${clubDetails.club.name} 썸네일`}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          {/* 로고 */}
          <div className="w-16 h-16 border border-light-color-3 rounded-[16px] flex-shrink-0">
            {isValidUrl(clubDetails.club.imageUrl) && (
              <Image
                src={clubDetails.club.imageUrl!}
                alt={clubDetails.club.name}
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-[16px]"
              />
            )}
          </div>

          {/* 동아리명 */}
          <div className="flex-1">
            <div className="typo-title-1">{clubDetails.club.name}</div>
          </div>

          {/* 구독 버튼
          <SubscriptionButton
            icon={<Bell size={20} />}
            isSubscribed={isSubscribed}
            onClick={handleSubscribe}
          />

        {/* 슬로건 */}
        <div className="bg-white rounded-[16px] py-4 mb-12">
          <div className="text-center typo-body-3-2-m text-grey-color-4">
            {clubDetails.club.slogan}
          </div>
        </div>
      </div>
    </div>
  )
}
