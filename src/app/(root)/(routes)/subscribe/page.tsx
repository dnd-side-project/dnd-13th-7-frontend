import { Suspense } from 'react'
import type { Metadata } from 'next'
import Subscribe from '@/components/(pages)/subscribe/Subscribe'

export const metadata: Metadata = {
  title: '구독',
  description:
    '관심 있는 IT 동아리와 활동을 구독하고 새로운 모집 정보와 업데이트를 받아보세요. 맞춤형 알림으로 놓치지 마세요.',
  keywords: ['IT 동아리 구독', '동아리 알림', '모집 정보', '구독 서비스'],
  openGraph: {
    title: '구독 | 모여잇',
    description:
      '관심 있는 IT 동아리와 활동을 구독하고 새로운 모집 정보와 업데이트를 받아보세요. 맞춤형 알림으로 놓치지 마세요.',
  },
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Subscribe />
    </Suspense>
  )
}
