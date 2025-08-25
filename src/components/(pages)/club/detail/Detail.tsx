'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import { SubscriptionButton } from '@/components/atoms/SubscriptionButton'

interface DetailProps {
  clubId: string
}

/**
 * 동아리 상세 페이지 (썸네일, 동아리명, 구독 버튼, 슬로건)
 * */

export default function Detail({ clubId }: DetailProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  return (
    <div className="flex justify-center w-full mx-auto max-w-[1440px]">
      <div className="w-180 max-w-[720px] px-5">
        <div className="relative w-full aspect-[3/2] border border-light-color-3 rounded-lg overflow-hidden mb-12">
          <Image
            src="/images/default.svg"
            alt="동아리 썸네일"
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          {/* 로고 */}
          <div className="w-16 h-16 border border-light-color-3 rounded-[16px] flex-shrink-0"></div>

          {/* 동아리명 */}
          <div className="flex-1">
            <div className="typo-title-1">동아리명</div>
          </div>

          {/* 구독 버튼 */}
          <SubscriptionButton
            icon={<Bell size={20} />}
            isSubscribed={isSubscribed}
            onClick={handleSubscribe}
          >
            {isSubscribed ? '구독중' : '구독'}
          </SubscriptionButton>
        </div>

        {/* 슬로건 */}
        <div className="bg-white rounded-[16px] px-5 py-4 mb-12 mx-5">
          <div className="text-center typo-body-3-2-m text-grey-color-4">
            우리 강산 푸르게 푸르게
          </div>
        </div>
      </div>
    </div>
  )
}
