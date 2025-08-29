import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Explore } from '@/components/(pages)/club/explore/Explore'

export const metadata: Metadata = {
  title: '동아리 탐색',
  description:
    '기획자, 디자이너, 개발자를 위한 IT 동아리를 탐색해보세요. 온라인/오프라인 활동, 모집 중인 동아리, 인기 동아리까지 한눈에 확인할 수 있습니다.',
  keywords: [
    'IT 동아리',
    '동아리 모집',
    '기획자 동아리',
    '디자이너 동아리',
    '개발자 동아리',
    '프로젝트 동아리',
  ],
  openGraph: {
    title: '동아리 탐색 | 모여잇',
    description:
      '기획자, 디자이너, 개발자를 위한 IT 동아리를 탐색해보세요. 온라인/오프라인 활동, 모집 중인 동아리, 인기 동아리까지 한눈에 확인할 수 있습니다.',
  },
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Explore />
    </Suspense>
  )
}
